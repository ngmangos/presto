import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from '../component/modals/StyledBox';
import styled from 'styled-components';
import { Button } from '@mui/material';

const LoginBox = styled.div`
  background-color: #BFBEF5;
  padding: 30px;

  margin-top: 20vh;
  margin-left: auto;
  margin-right: auto;

  width: clamp(250px, 60%, 300px);
  height: clamp(500px, 60%, 700px);

  border-radius: 30px;

  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  align-items: center;

  font-size: 20px;
`

const loginButtonSx = {
  textTransform: 'none',
  color: 'black',
  backgroundColor: 'white',
}

const Login = ({ token, handleSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const login = () => {
    axios.post('http://localhost:5005/admin/auth/login', {
      email: email,
      password: password
    })
      .then((response) => {
        handleSuccess(response.data.token);
      })
      .catch(() => {
        handleOpen();
      });
  }

  return (
    <>
      <LoginBox>
        <h2>Login</h2>
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail (e.target.value)}
        />
        <br />
        Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value) }
        /><br />
        <Button sx={loginButtonSx} variant='contained' size='small' onClick={login}>Login</Button>
      </LoginBox>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Error</h2>
          <p>Invalid username or password</p>
          <button onClick={handleClose}>Close</button>
        </StyledBox>
      </Modal>
    </>
  )};

export default Login;