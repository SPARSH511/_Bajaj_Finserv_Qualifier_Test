import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async () => {
    try {
      // Parse the input JSON to ensure it's valid
      const parsedJson = JSON.parse(inputJson);

      // Construct the full request object including the user details
      const requestData = {
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        data: parsedJson.data,
      };

      // Make the POST request to the Flask backend
      const response = await axios.post('http://127.0.0.1:5000/bfhl', requestData);

      // Log the response data to the console
      console.log('Response JSON:', response.data);

      // Set the response data in state to display it in the app
      setResponseData(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      alert('Invalid JSON or request failed.');
    }
  };

  return (
    <div className="container">
      <h1> Sparsh Saxena VIT Chennai 21BCE6015 Qualifier Project </h1> <br></br>
      <h1>Submit JSON</h1>
  
      <div>
        <label>User ID:</label>
        <input 
          type="text" 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
      </div>
  
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter College Email"
        />
      </div>
  
      <div>
        <label>Roll Number:</label>
        <input 
          type="text" 
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter College Roll Number"
        />
      </div>
  
      <textarea
        rows="10"
        cols="50"
        value={inputJson}
        onChange={(e) => setInputJson(e.target.value)}
        placeholder='Enter JSON here...'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
  
      {responseData && (
        <div className="response">
          <h2>Response</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
  
}

export default App;
