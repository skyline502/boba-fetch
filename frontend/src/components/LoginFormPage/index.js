import { useState } from 'react';
import { loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css';

const LoginFormPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) { //if there is a session user, then redirect to home
    return <Redirect to="/" />
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const user = {
      credential,
      password
    }

    return dispatch(loginUser(user))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='form-container'>
      <form className='login-form' onSubmit={onSubmit}>
        <div className='header'>
          <h1>Welcome to Boba Fetch!</h1>
        </div>
          <p style={{fontWeight:'lighter'}}>Sign in to continue</p>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='input-fields'>
          <label htmlFor='name-email'>Username or Email: </label>
          <input
            type="text"
            name="name-email"
            value={credential}
            onChange={e => setCredential(e.target.value)}
          >
          </input>
          <label htmlFor='password'>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          >
          </input>
          <div className='submit-cancel'>
            <button type="submit" className='login-button'>Login</button>
            <Link 
            exact to='/'
            style={{
              textDecoration:'none',
              marginTop: '5px'
            }}
            >Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginFormPage;
