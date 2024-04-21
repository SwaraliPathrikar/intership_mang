# from flask import Flask, render_template, request, redirect, url_for
# import sqlite3

# app = Flask(__name__)

# # Function to create database table
# def create_table():
#     conn = sqlite3.connect('internship_reports.db')
#     c = conn.cursor()
#     c.execute('''CREATE TABLE IF NOT EXISTS reports 
#                  (id INTEGER PRIMARY KEY AUTOINCREMENT, 
#                   student_name TEXT,
#                   semester INTEGER,
#                   report TEXT)''')
#     conn.commit()
#     conn.close()

# # Function to insert a new report
# def insert_report(student_name, semester, report):
#     conn = sqlite3.connect('internship_reports.db')
#     c = conn.cursor()
#     c.execute('''INSERT INTO reports (student_name, semester, report) 
#                  VALUES (?, ?, ?)''', (student_name, semester, report))
#     conn.commit()
#     conn.close()

# # Function to retrieve reports for a given semester
# def get_reports_by_semester(semester):
#     conn = sqlite3.connect('internship_reports.db')
#     c = conn.cursor()
#     c.execute('''SELECT student_name, report FROM reports 
#                  WHERE semester=?''', (semester,))
#     reports = c.fetchall()
#     conn.close()
#     return reports

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/submit_report', methods=['POST'])
# def submit_report():
#     student_name = request.form['student_name']
#     semester = int(request.form['semester'])
#     report = request.form['report']
#     insert_report(student_name, semester, report)
#     return redirect(url_for('index'))

# @app.route('/reports/<int:semester>')
# def view_reports(semester):
#     reports = get_reports_by_semester(semester)
#     return render_template('reports.html', semester=semester, reports=reports)

# if __name__ == '__main__':
#     create_table()
#     app.run(debug=True)

from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
db = SQLAlchemy(app)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    roll_number = db.Column(db.String(10), nullable=False)
    semester_number = db.Column(db.Integer, nullable=False)
    internship_status = db.Column(db.String(5), nullable=False)
    internship_info = db.Column(db.Text, nullable=False)

@app.route('/')
def index():
    return render_template('fillnew.html')

@app.route('/submit', methods=['POST'])
def submit():
    roll_number = request.form['rollNumber']
    semester_number = request.form['semesterNumber']
    internship_status = request.form['internshipStatus']
    internship_info = request.form['internshipInfo']

    student = Student(roll_number=roll_number, semester_number=semester_number, internship_status=internship_status, internship_info=internship_info)
    db.session.add(student)
    db.session.commit()

    return redirect(url_for('admin'))

@app.route('/admin')
def admin():
    students = Student.query.all()
    return render_template('admin.html', students=students)

if __name__ == '__main__':
    app.run(debug=True)







