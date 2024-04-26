from flask import Flask, request, jsonify, send_from_directory, abort
import os
from flask_mail import Mail, Message
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email
from flask_cors import CORS

app = Flask(__name__, static_folder='../dist', static_url_path='')
CORS(app)  

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'dashboardcoa@gmail.com'
app.config['MAIL_PASSWORD'] = 'eqwx okux omfr soxa' #os.getenv('MAIL_PASSWORD') #
app.config['MAIL_DEFAULT_SENDER'] = 'dashboardcoa@gmail.com'
app.config['SECRET_KEY'] = 'doronaaron' #os.getenv('SECRET_KEY')


mail = Mail(app)

class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    message = TextAreaField('Message', validators=[DataRequired()])
    submit = SubmitField('Send')

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data['name']
    email = data['email']
    message = data['message']
    msg = Message("Contact Form Submission",
                  recipients=['dashboardcoa@gmail.com'],
                  body=f"From: {name} <{email}>\n\n{message}")
    mail.send(msg)
    return jsonify({"status": "success", "message": "Message sent successfully!"})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    elif os.path.exists(os.path.join(app.static_folder, 'index.html')):
        return send_from_directory(app.static_folder, 'index.html')
    else:
        return abort(404)

if __name__ == '__main__':
    app.run(debug=True)