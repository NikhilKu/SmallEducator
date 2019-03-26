import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import { NavLink} from "react-router-dom";

// Navigationbar at the top of every page.
class Navigationbar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg">
                <div className="container">
                    <Navbar.Brand href="#home">Smalleducator</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                            <NavLink className="nav-link" to="/teachers">Teachers</NavLink>
                            <NavLink className="nav-link" to="/students">Students</NavLink>
                            <NavLink className="nav-link" to="/courses">Courses</NavLink>
                            <NavLink className="nav-link" to="/classes">Classes</NavLink>
                            <NavLink className="nav-link" to="/enrollment">Enrollment</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}

export default Navigationbar;