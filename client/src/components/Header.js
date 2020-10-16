// import React from "react";
// import { LinkContainer } from "react-router-bootstrap";
// import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { login } from "../actions/userActions";
// import { logout } from "../actions/userActions";

// const Header = ({ userLogin, login ,logout}) => {
//   const { user } = userLogin;

//   const logoutHandler = () => {
//     logout()
//   };
//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
//       <Container>
//         <LinkContainer to="/">
//           <Navbar.Brand>PROSHOP</Navbar.Brand>
//         </LinkContainer>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             <Link to="/cart">
//               <i className="fas fa-shopping-cart nav-link mr-2no"></i>CART
//             </Link>
//             {user ? (
//               <NavDropdown title={user.name} id='username'>
//               <LinkContainer to='/profile'>
//                 <NavDropdown.Item>Profile</NavDropdown.Item>
//               </LinkContainer>
//               <NavDropdown.Item onClick={logoutHandler}>
//                 Logout
//               </NavDropdown.Item>
//             </NavDropdown>
//               // <NavDropdown title={user.name} id="username">
//               //   <Link to="/profile">
//               //     <NavDropdown.item>Profile</NavDropdown.item>
//               //   </Link>
//               //   <NavDropdown.item onClick={logoutHandler}>
//               //     Logout
//               //   </NavDropdown.item>
//               // </NavDropdown>
//             ) : (
//               <LinkContainer to='/login'>
//                   <Nav.Link>
//                     <i className='fas fa-user'></i> Sign In
//                   </Nav.Link>
//                 </LinkContainer>
//             )}
             
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// const mapStateToProps = (state) => ({
//   userLogin: state.userLogin,
// });

// export default connect(mapStateToProps, { login,logout })(Header);
import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
// import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
