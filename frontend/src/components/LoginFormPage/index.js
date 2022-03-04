import { useState } from 'react';
import { loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      <h1>Please Login!</h1>
      <form className='login-form' onSubmit={onSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
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
        <button type="submit" className='login-button'>Login</button>
      </form>
    </div>
  );
};

export default LoginFormPage;
