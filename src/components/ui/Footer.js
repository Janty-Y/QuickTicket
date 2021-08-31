import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='footerColor'>
      <Container>
        <Row>
          <Col className='text-center'>Copyright &copy; QuickTicket</Col>
        </Row>
        <Row>
          <Col className='text-center'>
            This is a portfolio project created by Janty Youssef - not intended
            for commercial use.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
