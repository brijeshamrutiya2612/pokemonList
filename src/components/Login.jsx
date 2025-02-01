import { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import '../styles/LoginForm.css'; 
import axios from 'axios'; 
// import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/v3/user/login', {
        email: email,
        password: password,
      });

      if (response.data) {
        console.log('Login successful', response.data);
            }
    } catch (err) {
      setError('Invalid credentials, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="login-form">
            <h2 className="text-center">Login to Pokedex</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Button type="submit" className="btn-block">
              {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
