// src/components/Common/Footer.jsx

import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <Container>
        &copy; {new Date().getFullYear()} Course Optimization App
      </Container>
    </footer>
  );
};

export default Footer;
