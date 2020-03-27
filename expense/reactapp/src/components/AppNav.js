import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

export default class AppNav extends React.Component{
    state = {

    }

    render(){
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Expenses Management</NavbarBrand>
                {/* <NavbarToggler onClick={toggle} /> */}
                {/* <Collapse isOpen={isOpen} navbar> */}
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/categories">Categories</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/expenses">Expenses</NavLink>
                    </NavItem>
                    
                  </Nav>
                  {/* <NavbarText>Simple Text</NavbarText> */}
                {/* </Collapse> */}
              </Navbar>
            </div>
        );

    }
}