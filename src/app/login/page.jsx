"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import "./login.css";
import ForgotPassword from './forgot/page';

export default function AuthComponent() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('token', responseData.token);
        if (email === 'admin@gmail.com' && password === 'admin@123') {
          router.push('/admin'); 
        } else {
          console.log('Login successful');
        }
      } else {
        setErrorMessage(responseData.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Internal server error');
    }
  };

  const handleSignUp = async (data) => {
    try {
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
  const ForgotPassword = ()=>{
    router.push("/login/forgot")
  }

  return (
    <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
      <div className="form sign-in">
        <h2 style={{color:'orange', fontSize:"30px", fontWeight:"700"}}>WELCOME</h2>
        <form onSubmit={handleSignIn} style={{marginTop:"50px"}}>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="forgot-pass" onClick={ForgotPassword} style={{color:"red", fontSize:"15px", marginTop:"50px"}}>Forgot password?</p>
          <button type="submit" className="submit">Sign In</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h3 style={{fontSize:"27px", fontWeight:"700"}}>Don't have an account? Please Sign up!</h3>
          </div>
          <div className="img__text m--in">
            <h3 style={{fontSize:"27px", fontWeight:"700"}}>If you already have an account, just sign in.</h3>
          </div>
          <div className="img__btn" onClick={handleToggle}>
            <span className="m--up">Sign Up</span>
            <span className="m--in">Sign In</span>
          </div>
        </div>
        <div className="form sign-up">
          <h2 style={{color:'orange', fontSize:"30px", fontWeight:"700"}}>Create your Account</h2>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <label>
              <span>Name</span>
              <input type="text" {...register('name', { required: true, pattern: /^[A-Za-z]+$/ })} className="input-field" />
              {errors.name && <span className="error">Name is required and should contain only letters</span>}
            </label>
            <label>
              <span>Email</span>
              <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input-field" />
              {errors.email && <span className="error">Email is required and must be valid</span>}
            </label>
            <label>
              <span>Password</span>
              <input type="password" {...register('password', { required: true, minLength: 8, maxLength: 15 })} className="input-field" />
              {errors.password && errors.password.type === 'required' && <span className="error">Password is required</span>}
              {errors.password && errors.password.type === 'minLength' && <span className="error">Password must be at least 8 characters long</span>}
              {errors.password && errors.password.type === 'maxLength' && <span className="error">Password cannot exceed 15 characters</span>}
            </label>
            <label>
              <span>Contact</span>
              <input type="text" {...register('contact', { required: true, pattern: /^[0-9]{10}$/ })} className="input-field" />
              {errors.contact && <span className="error">Contact is required and must be 10 digits long</span>}
            </label>
            <button type="submit" className="submit">Sign Up</button>
          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}
