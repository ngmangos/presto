import React, { useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import Register from './page/Register';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import Presentation from './page/Presentation';
import NavBar from './component/NavBar';
import Preview from './page/Preview';
import Versions from './page/Versions';
import Rearrange from './page/Rearrange'

const Router = () => {
  /* token handling */
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const handleNewToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/dashboard');
  }

  React.useEffect(() => {
    if (token && ['/login', '/register'].includes(location.pathname)) {
      navigate('/dashboard');
    } else if (!token && (!['/login', '/register'].includes(location.pathname))) {
      navigate('/login');
    }
  }, [token, location.pathname, navigate]);

  /* store handling */
  const [store, setStore] = React.useState({});

  React.useEffect(() => {
    if (token) {
      axios.get('http://localhost:5005/store', {
        headers: { Authorization: `Bearer ${token}` }
      })
		  .then((response) => {
		    setStore(response.data.store);
		  })
		  .catch((error) => {
		    console.log(error.response.data.error);
		  });
    }
  }, [token]);

  const actuallySetStore = (newStore) => {
    axios.put('http://localhost:5005/store', {
      store: newStore,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setStore(newStore);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }

  /* navbar state handling */
  const [navBarState, setNavBarState] = React.useState('entry');

  React.useEffect(() => {
    if (token && ['/dashboard'].includes(location.pathname)) {
      setNavBarState('dashboard');
    } else if (token && ['presentation'].includes(location.pathname.split('/')[1])) {
      setNavBarState('presentation');
    } else if (!token && (['/login', '/register'].includes(location.pathname))) {
      setNavBarState('entry');
    } else if (token && (['preview'].includes(location.pathname.split('/')[1]))) {
      setNavBarState('preview');
    } else if (token && (['versions'].includes(location.pathname.split('/')[1]))) {
      setNavBarState('versions');
    } else if (token && (['rearrange'].includes(location.pathname.split('/')[1])))
      setNavBarState('versions');
  }, [token, location.pathname, navigate]);

  return (
    <>
      <NavBar navBarState={navBarState} token={token} setToken={setToken} store={store} actuallySetStore={actuallySetStore}></NavBar>
      <Routes>
        <Route path='/' element={<Navigate to='/register' />} />
        <Route path='/dashboard' element={<Dashboard token={token} store={store} actuallySetStore={actuallySetStore}/>} />
        <Route path='/presentation/:id/:num' element={<Presentation store={store} setStore={setStore} actuallySetStore={actuallySetStore}/>} />
        <Route path='/preview/:id/:num' element={<Preview store={store} setStore={setStore} actuallySetStore={actuallySetStore}/>} />
        <Route path='/rearrange/:id' element={<Rearrange store={store} setStore={setStore} actuallySetStore={actuallySetStore}/>} />
        <Route path='/versions/:id/' element={<Versions store={store} setStore={setStore} actuallySetStore={actuallySetStore}/>} />
        <Route path='/register' element={<Register token={token} handleSuccess={handleNewToken} />} />
        <Route path='/login' element={<Login token={token} handleSuccess={handleNewToken} />} />
      </Routes>
    </>
  )
}

export default Router;