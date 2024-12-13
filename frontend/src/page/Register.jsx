import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from '../component/modals/StyledBox';
import styled from 'styled-components';
import { Button } from '@mui/material';

const RegisterBox = styled.div`
  background-color: #BFBEF5;
  padding: 30px;

  margin-top: 12vh;
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

const buttonSx = {
  textTransform: 'none',
  color: 'black',
  backgroundColor: 'white',
}

const Register = ({ token, handleSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errMsg, setErrMsg] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const register = () => {
    if (password !== confirmPassword) {
      setErrMsg('Passwords do not match');
      handleOpen();
    } else {
      axios.post('http://localhost:5005/admin/auth/register', {
        email: email,
        password: password,
        name: name
      })
        .then((response) => {
          handleSuccess(response.data.token);
        })
        .catch(() => {
          setErrMsg('Email address already registered');
          handleOpen();
        });
    }
  }

  return (
    <>
      <RegisterBox>
        <h2>Register</h2>
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
          onChange={e => setPassword(e.target.value)}
        /><br />
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        /><br />
        Name
        <input
          type="text"
          value={name}
          onChange={e => setName (e.target.value)}
        />
        <br />
        <Button sx={buttonSx} variant='contained' size='small' onClick={register}>Register</Button>
      </RegisterBox>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Error</h2>
          <p>{errMsg}</p>
          <button onClick={handleClose}>Close</button>
        </StyledBox>
      </Modal>
    </>
  )}

export default Register;