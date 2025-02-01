import React, { useState } from "react";
import '../styles/LoginForm.css';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'

const SignupForm = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessages = { firstname: "", lastname: "", email: "", password: "" };

    if (!formData.firstname) {
      errorMessages.firstname = "First name is required";
      isValid = false;
    }

    if (!formData.lastname) {
      errorMessages.lastname = "Last name is required";
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errorMessages.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      errorMessages.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errorMessages.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      setFormData({ firstname: "", lastname: "", email: "", password: "" });
    }
  };

  const backToLogin = () =>{
    navigate("/")
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Signup Form</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                isInvalid={!!errors.firstname}
              />
              <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                isInvalid={!!errors.lastname}
              />
              <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button className='btn-block' type="submit" block>
              Sign Up
            </Button>
          </Form>
            <Button onClick={backToLogin} variant="success" className="w-100 mt-3" type="submit" block>
              Login
            </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
