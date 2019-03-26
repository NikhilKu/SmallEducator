import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import {BeatLoader} from "react-spinners";

//Form to add users like student or teacher.
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            isLoaded: true,
        };

        this.userType = this.props.type;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = () => {
        const th = this;
        th.setState({
            isLoaded: false
        });

        // post data to api.
        axios.post('http://localhost:3400/' + this.userType, (this.state))
            .then(() => {
                th.setState({
                    sent: true,
                    isLoaded: true,
                });
                window.location.reload();
                this.props.history.push('/' + this.userType + 's');
            })
            .catch((error) => {
                console.log(error);
            });


    };

    render() {
        return (
            <>
                {this.state.sent ?
                    <Alert variant="success">
                        The {this.props.type} is added.
                    </Alert>

                    :
                    <Form className="contact-form">
                        {this.props.type == "student" ?
                            <Form.Group>
                                <Form.Label>Student number</Form.Label>
                                <Form.Control
                                    name="student_number"
                                    value={this.state.student_number}
                                    onChange={this.handleInputChange}
                                    placeholder="5007xxxxx"/>
                            </Form.Group>
                            : ""}

                        <Form.Group>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                placeholder="First name"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Initials</Form.Label>
                            <Form.Control
                                name="initials"
                                value={this.state.initials}
                                onChange={this.handleInputChange}
                                placeholder="Initials"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleInputChange}
                                placeholder="Last name"
                            />
                        </Form.Group>


                        <Button onClick={this.handleSubmit}>
                            Add {this.props.type}
                            {!this.state.isLoaded ?
                                (
                                    <BeatLoader
                                        sizeUnit={"px"}
                                        size={20}
                                        color={'#ecf0f1'}
                                        loading={!this.state.isLoaded}
                                    />
                                ) : (null)}
                        </Button>
                    </Form>
                }

            </>
        );
    }
}

export default AddUser;