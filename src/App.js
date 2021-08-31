import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import AboutScreen from './screens/AboutScreen';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3 '>
        <Container fluid className='px-4 '>
          <PrivateRoute path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/about' component={AboutScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
