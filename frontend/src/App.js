import { Route, Switch, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SignUpForm from './components/SignUpForm';
import SplashPage from './components/SplashPage';
import BusinessList from './components/BusinessList';
import CreateBusiness from './components/CreateBusinessForm';
import EditBusiness from './components/EditBusinessForm';
import Message from './components/Message';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from './store/session';
import * as businessActions from './store/businesses';
import './index.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const shops = useSelector(state => state.businesses);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  useEffect(() => {
    dispatch(businessActions.getBusinesses());
  }, [])

  return isLoaded && (
    <div className='app-container'>
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
        <Route path='/businesses/:id/edit'>
          <EditBusiness list={shops}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
