from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Store submissions in memory (won't persist if server restarts)
submissions = []

@app.route("/")
def home():
    return render_template("index.html")  # Make sure index.html is in templates/

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

    return jsonify({"status": "success", "message": "Form submitted successfully!"})

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(submissions)
