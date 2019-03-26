import React, {Component} from 'react';
import './style/App.scss';
import Navigationbar from './components/navigationbar';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Home from "./components/home";
import Teacher from "./components/teachers/Teacher";
import Course from "./components/courses/Course";
import Container from "react-bootstrap/Container";
import Student from "./components/students/Student";
import Classroom from "./components/classes/Classroom";
import Enrollment from "./components/enrollment/Enrollment";

//The main app component handles the routes and pages.
class App extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <>
                        <Navigationbar/>
                        <Container>
                            <div className="main-content">
                                <Switch>
                                    <Route path="/" component={Home} exact/>
                                    <Route path="/teachers" component={Teacher}/>
                                    <Route path="/students" component={Student}/>
                                    <Route path="/courses" component={Course}/>
                                    <Route path="/classes" component={Classroom}/>
                                    <Route path="/enrollment" component={Enrollment}/>
                                    <Route component={Error}/>
                                </Switch>
                            </div>
                        </Container>
                    </>
                </BrowserRouter>
            </>
        );
    }
}

const Error = () => {
    return (
        <h1>404 error</h1>
    );
};

export default App;
