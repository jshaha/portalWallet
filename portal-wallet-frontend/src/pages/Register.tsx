// Import React and useState from the 'react' library.
import React, { useState } from 'react';

// Import axios for making HTTP requests to the backend.
import axios from 'axios';

// Define the Register component as a function.
function Register() {
  // Use useState to store form data.
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [portalClientId, setPortalClientId] = useState('');

  // Define a handleSubmit function to handle form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior.
    e.preventDefault();

    try {
      // Send a POST request to the backend to register a new user.
      const response = await axios.post('http://localhost:3000/api/register', {
        email,
        name,
        portalClientId,
      });

      // Log the response data to the console.
      console.log(response.data);
    } catch (error) {
      // Log any errors to the console.
      console.error(error);
    }
  };

  // Return the JSX for the registration form.
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={portalClientId}
          onChange={(e) => setPortalClientId(e.target.value)}
          placeholder="Portal Client ID"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

// Export the Register component.
export default Register;
