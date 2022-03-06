import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/session';
import { Redirect, Link } from 'react-router-dom';
import './signupform.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return <Redirect to='/' />
  }

  const onSubmit = e => {
    e.preventDefault();

    const user = { username, email, password }

    if (password === confirmPassword) {
      setValidationErrors([]);
      return dispatch(signUp(user))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setValidationErrors(data.errors);
          }
        });
    } else {
      setValidationErrors(['Passwords do not match']);
    }


  }

  return (
    <div className="sign-up-container">
      <form onSubmit={onSubmit} className="sign-up-form">
        <div className='sign-up-header'>
          <h1>Welcome to Boba Fetch!</h1>
        </div>
        <ul>
          {validationErrors.map(error => <li style={{ color: "red" }} key={error}>{error}</li>)}
        </ul>
        <div className='input-fields'>
          <div className='signup-message'>
            <p style={{ fontWeight: 'bolder' }}>Sign up to continue</p>
          </div>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirm-password"
            placeholder='confirm password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="create-user">Create User</button>
          <div className='cancel'>
            <Link to='/' style={{ textDecoration: "none", fontFamily: "Ubuntu", marginTop: 10 }}>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  )
};

export default SignUpForm;
