import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {BeatLoader} from "react-spinners";
import APIProvider from "../../provider/APIProvider";

//The enrollment page.
class Enrollment extends Component {
    //Get data from API
    fetchApi = (th, key) => {

        const provider = new APIProvider();
        this.serverRequest = provider.fetchApi("class/enroll/" + key)
            .then((event) => {
                th.setState({
                    cases: event.data,
                    isLoaded: true,
                });
                var data = th.state.cases[0];
                alert("Your key " + data.key + " is enrolled. You are enrolled for the course " + data.classroom.course.title + " and your class is " + data.classroom.name) ;
            })
            .catch(() => {
                alert("Something went wrong");
                th.setState({
                    isLoaded: true,
                });
            });
    };
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

        var key = th.state.enrollmentkey;
        this.fetchApi(this, key);
    };

    constructor() {
        super();
        this.state = {
            cases: [],
            isLoaded: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var th = this;
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Group>
                        <Form.Label>Enter enrollment key</Form.Label>
                        <Form.Control
                            name="enrollmentkey"
                            value={this.state.enrollmentkey}
                            onChange={this.handleInputChange}
                            placeholder="1234567890"/>
                    </Form.Group>

                    <Button onClick={this.handleSubmit}>
                        Enroll me
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
            </>
        );
    }
}

export default Enrollment;