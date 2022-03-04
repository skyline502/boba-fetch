import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginFormPage from './components/LoginFormPage';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <div>
      <h1>Hello from App</h1>
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
