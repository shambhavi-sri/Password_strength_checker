from flask import Flask, render_template, request
from pass_str import assess_password_strength
import os

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    details = None
    if request.method == 'POST':
        password = request.form['password']
        result, details = assess_password_strength(password)
    return render_template('index.html', result=result, details=details)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
