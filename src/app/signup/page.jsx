"use client"
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import "./style.css"

export default function SignUp() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      // Make POST request to backend /signup endpoint
      const response = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData.message);
      } else {
        setErrorMessage(responseData.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Internal server error');
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" {...register('name', { required: true, pattern: /^[A-Za-z]+$/ })} className="input-field" />
          {errors.name && <span className="error">Name is required and should contain only letters</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input-field" />
          {errors.email && <span className="error">Email is required and must be valid</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register('password', { required: true, minLength: 8, maxLength: 15 })} className="input-field" />
          {errors.password && errors.password.type === 'required' && <span className="error">Password is required</span>}
          {errors.password && errors.password.type === 'minLength' && <span className="error">Password must be at least 8 characters long</span>}
          {errors.password && errors.password.type === 'maxLength' && <span className="error">Password cannot exceed 15 characters</span>}
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input type="text" {...register('contact', { required: true, pattern: /^[0-9]{10}$/ })} className="input-field" />
          {errors.contact && <span className="error">Contact is required and must be 10 digits long</span>}
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <style jsx>{`
        .container {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        .input-field {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .submit-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          cursor: pointer;
        }
        .submit-button:hover {
          background-color: #0056b3;
        }
        .error {
          color: red;
          font-size: 0.8em;
        }
        .success {
          color: green;
          font-size: 0.8em;
        }
      `}</style>
    </div>
  );
}
