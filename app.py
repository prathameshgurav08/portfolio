from flask import Flask, render_template,request,jsonify
import json
import os

app = Flask(__name__)
DATA_FILE = 'form_submissions.json'
# Load existing data if file exists
if os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'r') as f:
        submissions = json.load(f)
else:
    submissions = []

@app.route("/")
def home():
    return render_template("index.html")


@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message = request.form.get('message')

    submission = {
        'name': name,
        'email': email,
        'subject': subject,
        'message': message
    }

    submissions.append(submission)

    with open(DATA_FILE, 'w') as f:
        json.dump(submissions, f, indent=4)

    return jsonify({"status": "success", "message": "Form submitted successfully!"})

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(submissions)
    
