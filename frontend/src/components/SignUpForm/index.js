import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/session';
import { Redirect } from 'react-router-dom';

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
      <div>
        <h1>Sign Up!</h1>
      </div>
      <form onSubmit={onSubmit} className="sign-up-form">
        <ul>
          {validationErrors.map(error => <li key={error}>{error}</li>)}
        </ul>
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
        <button type="submit">Create User</button>
      </form>
    </div>
  )
};

export default SignUpForm;
