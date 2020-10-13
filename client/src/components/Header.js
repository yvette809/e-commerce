import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>PROSHOP</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/cart">
              <i className="fas fa-shopping-cart mr-2 nav-link"></i>CART
            </Link>
            <Link to="/login">
              <i className="fas fa-user mr-2"></i>SIGN IN
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
