import React, { useContext } from 'react';
import {
  Navbar,
  Container,
  Nav,
  ListGroupItem,
  InputGroup,
  Card,
  Button,
  Dropdown,
} from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';
// import { IoIosWallet } from 'react-icons/io';

export const NavComp = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <Navbar
      id='navbar-container'
      className='navbar sticky-top navbar-dark'
      expand='lg'
    >
      <Container className='container-fluid'>
        <Navbar.Brand href='#' className='navbar-brand ' id='navbar-logo'>
          Auction
        </Navbar.Brand>

        {/* <InputGroup.Text className='me-auto wallet'>$ 1000.00</InputGroup.Text> */}

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav className='btn'>
              {currentUser ? (
                <>
                  <div className='btn btn-outline-secondary mx-2 disabled'>
                    {currentUser.email}
                  </div>
                </>
              ) : (
                <>
                  <LoginComp />
                </>
              )}
            </Nav>
            <Nav className='btn'>
              {currentUser ? (
                <>
                  <div
                    onClick={() => logout()}
                    className='btn btn-outline-secondary mx-2'
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <RegisterComp />
                </>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
