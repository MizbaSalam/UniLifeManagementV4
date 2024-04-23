import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './LoginPage.css'; // Make sure to create a LoginPage.css file in the same directory
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Un-comment this line to prevent default form submission
    try {
      navigate('/home'); // Redirect to the homepage on success
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Authentication failed:', error);
      // Handle errors such as wrong password, user not found etc.
    }
  };

  return (
    <div className='login-background'>
      <div className='d-flex justify-content-center align-items-center login-container'>
        <div className='login-modal'>
          <form className='login-form text-center' onSubmit={handleSubmit}>
            <h1 className='mb-5 font-weight-light text-uppercase'>Login</h1>
            <div className='form-group'>
              <input
                type='text'
                className='form-control rounded-pill form-control-lg'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control rounded-pill form-control-lg'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='forgot-link d-flex justify-content-between align-items-center'>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='rememberMe'
                />
                <label className='form-check-label' htmlFor='rememberMe'>
                  Remember Password
                </label>
              </div>
              <a href='#'>Forgot Password?</a>
            </div>
            <button
              type='submit'
              className='btn mt-5 rounded-pill btn-lg btn-custom btn-block'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
