import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/session';



const DemoButton = () => {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      credential: 'Demo',
      password: 'password'
    }

    dispatch(loginUser(user));
  }
  return (
    <form onSubmit={onSubmit}>
      <button className="demo-button">Demo</button>
    </form>
  )
}

export default DemoButton;
