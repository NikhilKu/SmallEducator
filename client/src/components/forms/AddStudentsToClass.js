import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import {BeatLoader} from "react-spinners";
import StudentOptions from "../students/StudentOptions";

class AddStudentsToClass extends Component {

    //Add list of students to a class.
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            cases: [],
            isLoaded: true,
        };

        this.classId = this.props.class;
        this.type = this.props.type;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({students: Array.from(event.target.selectedOptions, (item) => item.value)});
    };


    handleSubmit = () => {
        const th = this;
        th.setState({
            isLoaded: false
        });

        //Post students to the api
        axios.post('http://localhost:3400/class/' + this.classId + "/students", (this.state))
            .then(() => {
                th.setState({
                    sent: true,
                    isLoaded: true,
                });
                window.location.reload();
                this.props.history.push('/' + this.type + 's');
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
                        Students are added.
                    </Alert>
                    :
                    <Form className="contact-form">


                        <Form.Group>
                            <Form.Label>Students to add</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                name="students"
                                onChange={this.handleInputChange}

                            >
                             <StudentOptions />

                            </Form.Control>
                        </Form.Group>

                        <Button onClick={this.handleSubmit}>
                            Add students to class
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

export default AddStudentsToClass;