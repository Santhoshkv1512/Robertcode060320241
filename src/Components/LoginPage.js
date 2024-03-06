import React, { Component, useState } from 'react';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

const PASSWORD = 'prints@password';

const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh'
};

const panelStyle = {
  backgroundColor: 'rgba(255, 255, 255, 1)',
  border: 0,
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 20,
  width: '400px',
};

const formControlStyle = {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    paddingLeft: '10px',
    fontSize: '15px',
    border: '2px solid rgba(19, 193, 255, 0.2)',
    outlineColor: 'rgba(19, 193, 255, 0.7)',
}

const buttonStyle = {
  display: 'flex',
  marginTop: '20px',
  height: '40px',
  width: '70px',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '15px',
  backgroundColor: 'rgba(0, 123, 255, 1)',
  borderRadius: '10px',
  color: 'white',
  border: 0,
};

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const handleFormSubmit = () => {
        if (password === PASSWORD) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.replace("/main");
        } else {
            alert('Please input the correct password!')
        }
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const enterKeyClick = (e) => {
        if (e.key === 'Enter') {
            handleFormSubmit();
        }
    }

    return (
        <div style={divStyle}>
            <Panel style={panelStyle}>
                <h2 style={{fontFamily: 'aria', color: 'rgb(0, 123, 255)'}}>Sign In</h2>
                <Form horizontal className="LoginForm" id="loginForm">
                    <FormGroup controlId="formEmail">
                        <FormControl style={{...formControlStyle, marginBottom: '15px'}} defaultValue={'Prints@gmail.com'} disabled type="email" placeholder="Email Address" />
                    </FormGroup>
                    <FormGroup controlId="formPassword">
                        <FormControl style={formControlStyle} type="password" placeholder="Password" onChange={changePassword} onKeyDown={enterKeyClick}/>
                    </FormGroup>
                    <FormGroup controlId="formSubmit" style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10px'}}>
                        <Button style={buttonStyle} bsStyle="primary" onClick={handleFormSubmit}>
                            Login
                        </Button>
                    </FormGroup>
                </Form>
            </Panel>
        </div>
    )
}

export default LoginPage;
