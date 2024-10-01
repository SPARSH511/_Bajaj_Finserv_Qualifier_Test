from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/bfhl', methods=['POST'])
def handle_post():
    data = request.json
    print(data)
    
    # Extract values from the JSON data
    roll_number = data.get('roll_number', '')
    user_id = data.get('user_id', '')
    email = data.get('email', '')
    
    # Extract and process data fields
    numbers = [item for item in data.get('data',[]) if item.isdigit()]
    alphabets = [item for item in data.get('data',[]) if item.isalpha()]
    
    # Find the highest lowercase alphabet if any
    highest_lowercase_list = [item for item in data.get('data', []) if item.islower()]
    highest_lowercase = sorted(highest_lowercase_list)[-1] if highest_lowercase_list else None
    
    # Construct the response
    response = {
        "is_success": True,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
    }
    
    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def handle_get():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=False)
