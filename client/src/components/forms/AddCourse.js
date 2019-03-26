import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import {BeatLoader} from "react-spinners";

//Form to add user
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

        //Post data to API
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
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name="title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                placeholder="Title"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ECTS</Form.Label>
                            <Form.Control
                                name="ects"
                                value={this.state.ects}
                                onChange={this.handleInputChange}
                                placeholder="ECTS"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                type="text"
                                placeholder="Description"/>
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