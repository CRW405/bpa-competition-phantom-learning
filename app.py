from flask import Flask, render_template, redirect, request, session, flash, url_for, jsonify
import mysql.connector
import string
import random
import decimal
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length, EqualTo
from flask_bcrypt import Bcrypt

# ----SETUP----
app = Flask(__name__)
app.config['SECRET_KEY'] = ''


# def db_connection():
#     return mysql.connector.connect(
#         host='localhost',
#         user='root',
#         password='Password1',
#         database='app'
#     )

# connection function, this is used at the start of a connection, then we create a cursor object and when we are done we close both - this system improves efficiency and prevents overloading
def db_connection():
    return mysql.connector.connect(
        host='',
        user='',
        password='',
        database=''
    )


bcrypt = Bcrypt()  # encryption setup


def hash_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

# ----FUNC------
# form classes for wtforms


class SignUpForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(
        min=6), EqualTo('confirmPassword', message='Passwords must match')])
    confirmPassword = PasswordField('Confirm Password')
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    class_code = StringField('Class Code', validators=[DataRequired()])
    submit = SubmitField('Sign Up')


class TeacherSignUpForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(
        min=6), EqualTo('confirmPassword', message='Passwords must match')])
    confirmPassword = PasswordField('Confirm Password')
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    submit = SubmitField('Sign Up')
    reset = SubmitField('Reset Password')


class login(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[
                             DataRequired(), Length(min=6)])
    submit = SubmitField('Log in')


class progress(FlaskForm):
    submit = SubmitField('Save Progress')


class resetForm(FlaskForm):
    newPassword = PasswordField('Password', validators=[DataRequired(), Length(
        min=6), EqualTo('confirmPassword', message='Passwords must match')])
    confirmPassword = PasswordField('Confirm Password')
    submit = SubmitField('Sign Up')

# not random passwords. this is actually the class code


def get_random_password():  # MADE BY MIKE
    random_source = string.ascii_letters + string.digits
    password = random.choice(string.digits)
    password += random.choice(string.digits)
    password += random.choice(string.digits)

    for i in range(3):
        password += random.choice(random_source)

    password_list = list(password)
    random.SystemRandom().shuffle(password_list)
    password = ''.join(password_list)
    return password.lower()

# this is the function that is used in saving progress, we use the inputs to decide whats being changed and to what, after that, we calculate the avg and add that to db
# this can act as a guide to the rest of the code, well add necessary documentation here to prevent repeating ourselves to much in the future


def save_progress(email, chapter, grade, activity):
    try:
        msql = db_connection()
        # buffered=True sets the cursor to execute query's and actions one at a time, this just helps to prevent overloading and makes certain actions easier to execute
        crs = msql.cursor(buffered=True)

        # email sanitization for student table selection and generation
        email = email.replace("@", "_at_").replace(".", "_dot_")
        user = 'user_' + email

        query = (f'UPDATE {user} SET `{chapter}` = %s WHERE activity = %s')
        crs.execute(query, (grade, activity))

        msql.commit()

        crs.execute(
            f"SELECT lesson_grade, activity_grade, quiz_grade FROM `{user}` WHERE activity = '{activity}'")

        average = 0
        for i in crs.fetchall():
            for decimal_val in i:
                average += decimal_val
        average /= 3

        query = (f'UPDATE {user} SET avg = %s WHERE activity = %s')
        crs.execute(query, (average, activity))
        msql.commit()

        if chapter == 'quiz_grade':
            query = (f'UPDATE {user} SET access = 0 WHERE activity = %s')
            crs.execute(query, ([activity]))
            msql.commit()

        crs.close()  # just closing the crs and db objects
        msql.close()

    except Exception as e:
        msql.rollback()  # rolls db back to last valid state
        # the flash system is just a convenient way to send message to the page from flask live
        flash('There was a problem saving your progress, please try again', 'warning')

# ----FUNC------


# ------------------------------APP---------------------
# -----INDEX-------
# this is just an admins list so that only we can decide who is and isn't a site admin
msql = db_connection()
crs = msql.cursor(buffered=True)
crs.execute('SELECT * FROM admin_list')
adminList = [row[0] for row in crs.fetchall()]

# log in on homepage


@app.route('/', methods=['GET', 'POST'])
def index():
    form = login()
    if form.validate_on_submit():  # == if form has been submitted:
        try:
            msql = db_connection()
            crs = msql.cursor(buffered=True)

            crs.execute(
                'SELECT user_email FROM users WHERE user_email = %s', ([form.email.data]))
            existing_email = crs.fetchone()

            crs.execute(
                'SELECT user_password FROM users WHERE user_email = %s', ([form.email.data]))
            existing_password = crs.fetchone()

            if not existing_password:
                flash('Email or Password is incorrect', 'warning')

            if not existing_email:
                flash('Email does not match any account', 'warning')

            if existing_email and bcrypt.check_password_hash(existing_password[0], form.password.data):
                crs.execute('''
                SELECT user_id, user_first_name, user_last_name, account_type, class_code 
                FROM users 
                WHERE user_email = %s
                ''', ([form.email.data]))
                user_data = crs.fetchone()
                if user_data:  # if user_data exists we add all necessary data to the session object, the session object is just a convenient way to store user data in the form of a client side cookie
                    session['logged'] = True
                    session['id'], session['first'], session['last'], session['accountType'], session['classCode'] = user_data
                    session['email'] = form.email.data
                    if session['email'] in adminList:
                        return redirect('/admin')
                    if session['accountType'] == 0:
                        return redirect('/student')
                    else:
                        return redirect('/teacher')
                else:
                    flash('Email or Password is incorrect', 'warning')
            crs.close()
            msql.close()
        except Exception as e:
            flash(
                'There was an error contacting our servers, please try again later', 'warning')
            print(e)
            msql.rollback()

    return render_template('index.html', form=form)
# -----INDEX------


# ----STUDENT------

# driver route for grade submission
@app.route('/submit_grade', methods=['POST'])
def submit_grade():
    data = request.json
    grade = data.get('grade')

    save_progress(session['email'], session['chapter'],
                  # this is the function that does all the work, this route is just used for convenience
                  grade, session['subject'])

    return redirect('/student')


@app.route('/student')
def student():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)

        email = session['email']
        email = email.replace("@", "_at_").replace(".", "_dot_")
        user = 'user_' + email

        # this section gets access and the page uses it to decide what should be locked and unlocked
        crs.execute(f'SELECT access from {user}')
        accessList = crs.fetchall()

        tagList = ['', '', '']

        j = 0
        for i in accessList:
            if i[0] == 1:
                tagList[j] = "unlocked"
            else:
                tagList[j] = "locked"
            j += 1
        # /

        # this section uses nested for loops and lists to get grades for each activity
        subjectList = ['HTML and CSS', 'Javascript', 'Python']
        htmlGradeList = []
        JsGradeList = []
        PyGradeList = []
        gradeList = [htmlGradeList, JsGradeList, PyGradeList]

        for subject_index, subject in enumerate(subjectList):
            crs.execute(
                f"SELECT lesson_grade, activity_grade, quiz_grade FROM `{
                    user}` WHERE activity = '{subject}'"
            )
            print('Subject:', subject)
            for row in crs.fetchall():
                # Convert Decimal values to floats and create a list within the tuple
                row_values = [float(value) if isinstance(
                    value, decimal.Decimal) else value for value in row]
                row_values = [int(round(value)) if isinstance(
                    value, float) else value for value in row_values]
                gradeList[subject_index].append(row_values)
        # /
        avgList = []  # gets the average of all the activities and stores it in a list
        for subject in subjectList:
            crs.execute(
                f"SELECT avg FROM `{user}` WHERE activity = '{subject}'")
            avgList.append(crs.fetchone()[0])

        crs.close()
        msql.close()
    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        msql.rollback()

    return render_template(
        'student.html',
        first=session['first'],
        last=session['last'],
        classCode=session['classCode'],
        html=tagList[0], js=tagList[1],
        py=tagList[2],
        lesson=htmlGradeList[0][0],
        activity=htmlGradeList[0][1],
        quiz=htmlGradeList[0][2],
        jsLesson=JsGradeList[0][0],
        jsActivity=JsGradeList[0][1],
        jsQuiz=JsGradeList[0][2],
        pyLesson=PyGradeList[0][0],
        pyActivity=PyGradeList[0][1],
        pyQuiz=PyGradeList[0][2],
        avg=avgList[0],
        jsAvg=avgList[1],
        pyAvg=avgList[2]
    )
# ----STUDENT------

# ----TEACHER------

# how all the data is displayed


@app.route('/teacher')  # MADE BY MIKE
def teacher():
    msql = db_connection()
    crs = msql.cursor(buffered=True)

    code = session['classCode']

    crs.execute(
        'SELECT user_email, student_first_name, student_last_name FROM class_{}'.format(code))
    classTable = crs.fetchall()

    if classTable:  # checks if theres any students in a class and sets blank attributes to all the requested variables
        StoredClassTable = []
        listOfStudentLists = []

        # this is a nested for loop that goes through the class table, uses that data to go through each student table and stores everything in lists
        for row in classTable:
            StoredClassTable.append(row)
            studentName = row[1] + ' ' + row[2]
            userEmail = row[0]
            email = userEmail.replace("@", "_at_").replace(".", "_dot_")
            user = 'user_' + email
            findStudentTable = """SELECT activity, avg, lesson_grade, activity_grade, quiz_grade, access FROM {tab}""".format(
                tab=user)
            crs.execute(findStudentTable)
            studentTable = crs.fetchall()
            storedStudentTable = []
            studentTableList = []
            for row2 in studentTable:
                storedStudentTable.append(row2)
                course = row2[0]
                lessonGrade = row2[2]
                assignmentGrade = row2[3]
                quizGrade = row2[4]
                access = bool(row2[5])
                studentTuple = {'course': course, 'lessonGrade': lessonGrade,
                                'assignmentGrade': assignmentGrade, 'quizGrade': quizGrade, 'access': bool(access)}
                studentTableList.append(studentTuple)
            listOfStudentLists.append(storedStudentTable)
    else:
        studentName = 'No Students'
        StoredClassTable = ['no students']
        storedStudentTable = ['  ']
        listOfStudentLists = ['  ']
        course = [' ']
        lessonGrade = ['    ']
        assignmentGrade = ['    ']
        quizGrade = ['  ']
        email = ['']
        access = 0
        listOfStudentLists = ['  ']
        storedStudentTable = ['  ']

    return render_template('teacher.html',
                           first=session['first'],
                           last=session['last'],
                           classCode=code,
                           Name=studentName,
                           Information=StoredClassTable,
                           len1=len(StoredClassTable),
                           Info1=storedStudentTable,
                           len2=len(storedStudentTable),
                           Info2=listOfStudentLists,
                           len3=len(listOfStudentLists),
                           Course=course,
                           LessonGrade=lessonGrade,
                           AssignmentGrade=assignmentGrade,
                           QuizGrade=quizGrade,
                           Email=email,
                           Access=access,
                           data1=listOfStudentLists,
                           data2=storedStudentTable)

# this is the route we use to update access, it gets its inputs from a js function that makes a POST request to this route with the needed data


@app.route('/update_access', methods=['POST'])
def update_access():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)
        data = request.json  # this is how we get the data from the js request, since we are sending multiple variables we get each one by itself below
        user = data.get('user')
        section = data.get('section')
        access = data.get('access')
        email = user.replace("@", "_at_").replace(".", "_dot_")
        user = 'user_' + email

        new = None
        # if locked; unlock it
        if int(access) == 0:
            new = 1
        # if unlock; lock it
        if int(access) == 1:
            new = 0

        query = (f'UPDATE {user} SET access = {new} WHERE activity = %s')
        crs.execute(query, ([section]))
        print(query, ([section]))
        msql.commit()
    except Exception as e:
        msql.rollback()

    # returns a response back to the js stating it was successful
    return jsonify({'message': 'Access updated successfully'})


# very similar to update_access but deletes accounts instead
@app.route('/delete_Student', methods=['POST'])
def delete_Student():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)

        data = request.json
        email = data.replace("@", "_at_").replace(".", "_dot_")
        user = 'user_' + email
        crs.execute(
            'SELECT user_id FROM users WHERE user_email = %s', ([data]))
        id = crs.fetchone()

        crs.execute('DELETE FROM class_{} WHERE user_id = %s'.format(
            session['classCode']), ([id[0]]))
        print('after deletion from users')

        crs.execute("DROP TABLE {}".format(user))

        crs.execute('DELETE FROM users WHERE user_id = %s', ([id[0]]))
        msql.commit()
        print('after deletion from users')
    except Exception as e:
        msql.rollback()


# we used flask url names for this because it was just more convenient, this is the deletion solution for the admin page
@app.route('/admin_delete/<email>/<code>')
def admin_delete(email, code):
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)

        sanEmail = email.replace("@", "_at_").replace(".", "_dot_")
        user = 'user_' + sanEmail
        crs.execute(
            'SELECT user_id, account_type FROM users WHERE user_email = %s', ([email]))
        idAndType = crs.fetchall()

        if idAndType[0][1] == 1:
            crs.execute("SELECT user_id FROM class_{}".format(code))
            students = crs.fetchall()
            for i in students[0]:
                crs.execute(
                    "SELECT user_email FROM users WHERE user_id = {}".format(i))
                student_email = crs.fetchone()[0]
                sanitize = 'user_' + student_email.replace(
                    "@", "_at_").replace(".", "_dot_")
                crs.execute(
                    'DELETE FROM class_{} WHERE user_id = %s'.format(code), ([i]))
                msql.commit()
                crs.execute("DROP TABLE {}".format(sanitize))
                msql.commit()
                crs.execute('DELETE FROM users WHERE user_id = {}'.format(i))
                msql.commit()
            crs.execute('DROP TABLE class_{}'.format(code))
            msql.commit()
            crs.execute(
                'DELETE FROM users WHERE user_id = {}'.format(idAndType[0][0]))
            msql.commit()
        else:
            try:
                crs.execute(
                    'DELETE FROM class_{} WHERE user_id = %s'.format(code), ([idAndType[0][0]]))
                msql.commit()
                crs.execute("DROP TABLE {}".format(user))
                msql.commit()
            except:
                crs.execute('DELETE FROM users WHERE user_id = %s',
                            ([idAndType[0][0]]))
                msql.commit()
            finally:
                crs.execute('DELETE FROM users WHERE user_id = %s',
                            ([idAndType[0][0]]))
                msql.commit()
    except Exception as e:
        msql.rollback()
        print(e)
    return redirect('/admin')


# password reset using flask url naming
@app.route('/reset/<email>/<place>', methods=['GET', 'POST'])
def reset(email, place):
    try:
        form = resetForm()
        print(email)
        if form.validate_on_submit():
            msql = db_connection()
            crs = msql.cursor(buffered=True)
            if place == 'admin':
                crs.execute("UPDATE users SET user_password = %s WHERE user_email = %s",
                            (hash_password(form.newPassword.data), email))
                msql.commit()

            else:
                email = email.replace('_at_', '@').replace('_dot_', '.')
                print(email)
                crs.execute("UPDATE users SET user_password = %s WHERE user_email = %s",
                            (hash_password(form.newPassword.data), email))
                msql.commit()

            crs.close()
            msql.close()
            return redirect('/')
    except Exception as e:
        msql.rollback()
        print(e)

    return render_template('reset.html', form=form)


# ----TEACHER------


# ---STUDENT SIGN UP---


@app.route('/studentSignUp', methods=['GET', 'POST'])
def studentSignUp():
    form = SignUpForm()

    if form.validate_on_submit():
        try:
            msql = db_connection()
            crs = msql.cursor(buffered=True)

            # EMAIL AND CODE VALIDATION
            crs.execute(
                'SELECT user_email FROM users WHERE user_email = %s', ([form.email.data]))
            existing_email = crs.fetchone()
            if existing_email:
                flash('Email already in use, please use another email', 'warning')

            crs.execute(
                'SELECT class_code FROM users WHERE class_code = %s', ([form.class_code.data]))
            existing_code = crs.fetchone()
            if not existing_code:
                flash('Code does not exist, please enter different code', 'warning')
            #

            # ---CREATION---
            if (not existing_email and existing_code):
                # ---USER INSERT
                hashed_password = hash_password(form.password.data)
                crs.execute('INSERT INTO users (user_email, user_password, user_first_name, user_last_name, account_type, class_code) VALUES (%s, %s, %s, %s, 0, %s)',
                            (form.email.data, hashed_password, form.first_name.data, form.last_name.data, form.class_code.data))
                #

                email = form.email.data.replace(
                    "@", "_at_").replace(".", "_dot_")  # EMAIL SANITATION

                # ---USER TABLE CREATION
                newTable = f"""
                    create table user_{email} (
                        activity varchar(255) primary key,
                        avg decimal(5, 2),
                        lesson_grade decimal(5, 2),
                        activity_grade decimal(5, 2),
                        quiz_grade decimal(5, 2),
                        access tinyint(1)
                    );
                """
                # for new accounts we unlock HTML and CSS by default so that there is something to do
                crs.execute(newTable)
                activities = ['HTML and CSS', 'Javascript', 'Python']
                for activity in activities:
                    if activity == 'HTML and CSS':
                        subject_access = 1
                    else:
                        subject_access = 0
                    crs.execute(
                        f'INSERT INTO user_{email} (activity, avg, lesson_grade, activity_grade, quiz_grade, access) VALUES (%s, 0, 0, 0, 0, {subject_access})', ([activity]))
                msql.commit()
                #

                # CLASS TABLE INSERTION
                crs.execute(
                    "SELECT user_id FROM users WHERE user_email = %s", ([form.email.data]))
                id = crs.fetchone()
                crs.execute('INSERT INTO class_{} (user_id, user_email, student_first_name, student_last_name) VALUES (%s, %s, %s, %s)'.format(form.class_code.data),
                            (id[0], form.email.data, form.first_name.data, form.last_name.data))
                msql.commit()
                #

                # ---LOG IN---
                crs.execute(
                    'SELECT user_email FROM users WHERE user_email = %s', ([form.email.data]))
                existing_email = crs.fetchone()

                crs.execute('SELECT user_password FROM users WHERE user_email = %s', ([
                            form.email.data]))
                existing_password = crs.fetchone()

                if existing_email and bcrypt.check_password_hash(existing_password[0], form.password.data):
                    crs.execute('''
                    SELECT user_id, user_first_name, user_last_name, account_type, class_code 
                    FROM users 
                    WHERE user_email = %s
                    ''', ([form.email.data]))
                    user_data = crs.fetchone()
                    if user_data:
                        session['logged'] = True
                        session['id'], session['first'], session['last'], session['accountType'], session['classCode'] = user_data
                        session['email'] = form.email.data
                        if session['email'] in adminList:
                            return redirect('/admin')
                        if session['accountType'] == 0:
                            return redirect('/student')
                        else:
                            return redirect('/teacher')
                    else:
                        flash('Email or Password is incorrect', 'warning')
                    crs.close()
                    msql.close()
        except Exception as e:
            flash(
                'There was an error contacting our servers, please try again later', 'warning')
            msql.rollback()
        # ---CREATION---

    return render_template('studentSignUp.html', form=form)
# ---STUDENT SIGN UP---

# ---TEACHER SIGN UP---


@app.route('/teacherSignUp', methods=['GET', 'POST'])
def teacherSignUp():
    form = TeacherSignUpForm()
    if form.validate_on_submit():
        try:
            msql = db_connection()
            crs = msql.cursor(buffered=True)

            # EMAIL VALIDATION
            crs.execute(
                'SELECT user_email FROM users WHERE user_email = %s', ([form.email.data]))
            existing_email = crs.fetchone()
            if existing_email:
                flash('Email already in use, please use another email', 'warning')
            else:
                # ---CREATION---
                crs.execute(f"SELECT class_code FROM users")
                codeList = [row[0] for row in crs.fetchall()]
                code = get_random_password()
                while code in codeList:
                    code = get_random_password()

                # ---USER INSERT
                hashed_password = hash_password(form.password.data)
                crs.execute('INSERT INTO users (user_email, user_password, user_first_name, user_last_name, account_type, class_code) VALUES (%s, %s, %s, %s, 1, %s)',
                            (form.email.data, hashed_password, form.first_name.data, form.last_name.data, code))
                #

                # -----CLASS TABLE CREATION ----

                newTable = f"""
                    create table class_{code} (
                        user_id int auto_increment primary key,
                        user_email varchar(50),
                        student_first_name varchar(50),
                        student_last_name varchar(50),
                        foreign key(user_id) references users(user_id)
                    );
                """
                crs.execute(newTable)
                # -----CLASS TABLE CREATION ----

                # ---LOG IN---
                crs.execute(
                    'SELECT user_email FROM users WHERE user_email = %s', ([form.email.data]))
                existing_email = crs.fetchone()

                crs.execute('SELECT user_password FROM users WHERE user_email = %s', ([
                            form.email.data]))
                existing_password = crs.fetchone()

                if existing_email and bcrypt.check_password_hash(existing_password[0], form.password.data):
                    crs.execute('''
                    SELECT user_id, user_first_name, user_last_name, account_type, class_code 
                    FROM users 
                    WHERE user_email = %s
                    ''', ([form.email.data]))
                    user_data = crs.fetchone()
                    if user_data:
                        session['logged'] = True
                        session['id'], session['first'], session['last'], session['accountType'], session['classCode'] = user_data
                        session['email'] = form.email.data
                        if session['email'] in adminList:
                            return redirect('/admin')
                        if session['accountType'] == 0:
                            return redirect('/student')
                        else:
                            return redirect('/teacher')
                    else:
                        flash('Email or Password is incorrect', 'warning')
                    crs.close()
                    msql.close()
        except Exception as e:
            flash(
                'There was an error contacting our servers, please try again later', 'warning')
            print(e)
            msql.rollback()

        # ---CREATION---
    return render_template('teacherSignUp.html', form=form)
# ---TEACHER SIGN UP---

# ---LEARNING PAGES---

# -HTML


# all of the class routes just set the session variables so that we can use them in the grade submission process
@app.route('/lesson')
def lesson():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)

        session['subject'] = 'HTML and CSS'
        session['chapter'] = 'lesson_grade'

    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        print(e)
        if msql:
            msql.rollback()

    return render_template('lesson.html')


@app.route('/htmlActivity')
def htmlActivity():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)

        session['subject'] = 'HTML and CSS'
        session['chapter'] = 'activity_grade'

    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        print(e)
        if msql:
            msql.rollback()

    return render_template('html-activity.html')


@app.route('/quiz')
def quiz():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)

        session['subject'] = 'HTML and CSS'
        session['chapter'] = 'quiz_grade'

    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        print(e)
        if msql:
            msql.rollback()

    return render_template('quiz.html')
# -HTML

# -JS


@app.route('/JavaLesson')
def JavaLesson():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)

        session['subject'] = 'Javascript'
        session['chapter'] = 'lesson_grade'
    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        print(e)
        if msql:
            msql.rollback()

    return render_template('Javalesson.html')


@app.route('/jsActivity')
def jsActivity():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)

        session['subject'] = 'Javascript'
        session['chapter'] = 'activity_grade'
    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        print(e)
        if msql:
            msql.rollback()

    return render_template('js-activity.html')


@app.route('/jsQuiz')
def jsQuiz():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)

        session['subject'] = 'Javascript'
        session['chapter'] = 'quiz_grade'
    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        print(e)
        if msql:
            msql.rollback()

    return render_template('js_quiz.html')
# -JS

# -PY


@app.route('/PythonLesson')
def PythonLesson():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)
        session['subject'] = 'Python'
        session['chapter'] = 'lesson_grade'
    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        print(e)
        if msql:
            msql.rollback()

    return render_template('Pythonlesson.html')


@app.route('/PythonActivity')
def PythonActivity():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)
        session['subject'] = 'Python'
        session['chapter'] = 'activity_grade'
    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        print(e)
        if msql:
            msql.rollback()

    return render_template('Python-activity.html')


@app.route('/pyQuiz')
def pyQuiz():
    try:
        msql = db_connection()
        crs = msql.cursor(buffered=True)
        session['subject'] = 'Python'
        session['chapter'] = 'quiz_grade'
    except Exception as e:
        flash(
            'There was an error contacting our servers, please try again later', 'warning')
        print(e)
        if msql:
            msql.rollback()

    return render_template('py_quiz.html')
# -JS

# -----NO LOGIC-----


@app.route('/aboutUs')
def aboutUs():
    return render_template('aboutUs.html')


@app.route('/helpPage')
def helpPage():
    return render_template('helpPage.html')

# -----NO LOGIC-----


@app.route('/logout', methods=['POST'])  # just handles logging out
def logout():
    session.clear()
    return redirect('/')


@app.route('/admin')  # this is the admin page, its pretty simple
def admin():
    msql = db_connection()
    crs = msql.cursor(buffered=True)

    code = session['classCode']

    crs.execute(
        'SELECT * FROM users'.format(code))
    all = crs.fetchall()

    return render_template('admin.html', first=session['first'], last=session['last'], all=all)


if __name__ == '__main__':
    app.run(debug=True)
