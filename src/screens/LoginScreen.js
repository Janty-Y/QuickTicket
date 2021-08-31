import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Table,
  Container,
  Accordion,
  Badge,
} from 'react-bootstrap';
import Loader from '../components/ui/Loader';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/ui/Message';
import { loginUser, clearLoginErrors, loadUser } from '../actions/authActions';
import { listTechs } from '../actions/techActions';
import { listTickets } from '../actions/ticketActions';

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const authActions = useSelector((state) => state.login);
  const { isAuthenticated, error, loading, token } = authActions;

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      dispatch(loadUser);
    }
    dispatch(listTechs());
    if (isAuthenticated) {
      dispatch(listTickets());
      setTimeout(() => {
        props.history.push('/');
      }, 500);
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const onSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    const user = { email, password };
    dispatch(loginUser(user));
  };

  const clearMessage = () => {
    dispatch(clearLoginErrors);
  };

  const badgeMaker = (userEmail) => {
    return (
      <h5>
        <Badge text='dark' onClick={() => setEmail(`${userEmail}`)}>
          {userEmail}
        </Badge>
      </h5>
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error}
          <Button
            variant='danger'
            size='md'
            style={{ float: 'right' }}
            onClick={clearMessage}
          >
            Clear Error
          </Button>
        </Message>
      ) : (
        ''
      )}
      {token !== null ? (
        ''
      ) : (
        <div className='scrollable'>
          <Container style={{ width: '1000px' }}>
            <Message variant='primary'>
              <center>
                <h4>Thank you for visiting QuickTicket!</h4>{' '}
              </center>
              <Accordion flush>
                <Accordion.Item variant='light' eventKey='0'>
                  <Accordion.Header>
                    Click here to see login instructions
                  </Accordion.Header>
                  <Accordion.Body>
                    <br />
                    <h5>
                      If this is your first time visiting, please check the
                      "About" page for more details.
                    </h5>
                    <br />
                    You may log in as any tech listed here. The username is the
                    full email address (ex: starkt@example.com). <br />
                    For convenience, you can click on an email address to
                    automatically load it into the login field
                    <br />
                    The password for every tech is the same: 123456
                    <br /> <br />
                    <Table striped bordered size='sm'>
                      <thead>
                        <tr>
                          <th>Tech Name</th>
                          <th>Email</th>
                          <th>Tech Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Tony Stark</td>
                          <td>{badgeMaker('starkt@example.com')}</td>
                          <td>Bruce Wayne</td>
                          <td>{badgeMaker('wayneb@example.com')}</td>
                        </tr>
                        <tr>
                          <td>Mathew Murdock</td>
                          <td>{badgeMaker('murdockm@example.com')}</td>
                          <td>Jessica Jones</td>
                          <td>{badgeMaker('jonesj@example.com')}</td>
                        </tr>
                        <tr>
                          <td>Charlie Kelly</td>
                          <td>{badgeMaker('kellyc@example.com')}</td>
                          <td>John Zoidberg</td>
                          <td>{badgeMaker('zoidbergj@example.com')}</td>
                        </tr>
                        <tr>
                          <td>Lisa Simpson</td>
                          <td>{badgeMaker('simpsonl@example.com')}</td>
                          <td>Huebert Farnsworth</td>
                          <td>{badgeMaker('farnsworthh@example.com')}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Message>
          </Container>
          <Form validated={validated} className='py-5 px-5 loginContainer'>
            <h1 align='center'>Log In</h1>
            <Form.Group className='mb-5 loginFields' style={{ color: '#fff' }}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
              />
              <Form.Control.Feedback
                type='invalid'
                style={{ backgroundColor: '#fff' }}
              >
                Enter email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3 loginFields' style={{ color: '#fff' }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback
                type='invalid'
                style={{ backgroundColor: '#fff' }}
              >
                Enter password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant='outline-info'
              className='ms-auto'
              type='submit'
              style={{ float: 'right' }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default LoginScreen;
