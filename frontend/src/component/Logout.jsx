import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const logoutButtonSx = {
  textTransform: 'none',
  color: 'white',
  borderColor: 'white',
}

const Logout = ({ token, setToken }) => {
  const navigate = useNavigate();

  const logout = () => {
    axios.post('http://localhost:5005/admin/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        localStorage.removeItem('token', response.data.token);
        setToken(null);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }
  return (
    <>
      <Button sx={logoutButtonSx} variant='outlined' size='small' onClick={logout}>
        Logout
      </Button>
    </>
  );
}

export default Logout;