import { useState } from 'react';
import { loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const user = {
      credential,
      password
    }

    dispatch(loginUser(user))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='form-container'>
      <form className='login-form' onSubmit={onSubmit}>
        <ul
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
        >
          {errors.map((error, idx) => <li style={{color: 'red', width: '300px'}} key={idx}>{error}</li>)}
        </ul>
        <div className='login-input-fields'>
          <div className='message'>
            <p style={{ fontWeight: 'bolder' }}>Sign in to continue</p>
          </div>
          <input
            type="text"
            name="name-email"
            placeholder="username or email"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            required
          >
          </input>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          >
          </input>
          <div className='submit-cancel'>
            <button type="submit" className='login-button'>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
