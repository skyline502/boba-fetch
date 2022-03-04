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
          console.log('data....errors', data)
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
        <div className='header'>
          <h1>Welcome to Boba Fetch!</h1>
          <p>Sign up to continue</p>
        </div>
        <ul>
          {validationErrors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <div className='input-fields'>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label htmlFor='confirm-password'>Confirm Password: </label>
          <input
            type="password"
            name="confirm-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="create-user">Create User</button>
          <div className='cancel'>
            <Link to='/' style={{textDecoration:"none", fontFamily:"Ubuntu"}}>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  )
};

export default SignUpForm;
