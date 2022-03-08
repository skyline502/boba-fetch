import { Route, Switch, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SignUpForm from './components/SignUpForm';
import SplashPage from './components/SplashPage';
import BusinessList from './components/BusinessList';
import CreateBusiness from './components/CreateBusinessForm';
import Message from './components/Message';
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
      <Switch>
        <Route exact={true} path='/'>
          <SplashPage />
        </Route>
        <Route path='/signup'>
          <SignUpForm />
        </Route>
        <Route exact={true} path='/businesses'>
          <BusinessList />
        </Route>
        <Route exact={true} path='/businesses/create'>
          <CreateBusiness />
        </Route>
        <Route path='/message'>
          <Message />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
