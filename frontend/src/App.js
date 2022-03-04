import { Route, Switch, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import './index.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <div>
      <Navigation />
      <h1>Boba fetch!</h1>
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
