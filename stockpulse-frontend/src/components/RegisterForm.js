import React, { useState } from 'react';
import './RegisterForm.css'; // Assuming the CSS file is named RegisterForm.css
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add axios for API calls
import { register } from '../services/authService';

const RegisterForm = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'intern', // Default role
  });

  // Handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log(response.data);
      if (response.status === 400) {
        alert(response.data);
        return;
      }
      navigate('/'); // Redirect to dashboard on success
    } catch (error) {
      console.error(
        'Error registering user:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className='register-container'>
      <div className='register-card'>
        <div className='image-container'>
          <img src='/images/register.jpg' alt='Background' />
        </div>
        <div className='form-container'>
          <h2>Register</h2>
          <p>Manage all your inventory efficiently</p>
          <p>
            Let's get you all set up so you can verify your personal account and
            begin setting up your work profile.
          </p>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                name='firstName'
                placeholder='First name'
                minLength='3'
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type='text'
                name='lastName'
                placeholder='Last name'
                minLength='3'
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type='text'
                name='phone'
                placeholder='Phone no.'
                minLength='8'
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              {/* Role selection dropdown */}
              <label htmlFor='role'>Select Role</label>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value='intern'>Intern</option>
                <option value='admin'>Admin</option>
                <option value='executive'>Executive</option>
                <option value='user'>User</option>
                <option value='stock manager'>Stock Manager</option>
              </select>
            </div>
            <div className='form-group'>
              <input type='checkbox' id='terms' required />
              <label htmlFor='terms'>
                I agree to all terms, privacy policies, and fees
              </label>
            </div>
            <button type='submit' className='sign-up-button'>
              Sign up
            </button>
          </form>
          <p className='login-link'>
            Already have an account? <a href='/login'>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
