import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddUsersToCourse from "./forms/AddStudentsToClass";

//Add a list of students to course. This is a pop-up that laods the AddStudentToClass form
class ModalAddGroup extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Add students
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add {this.props.type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddUsersToCourse type={this.props.type} class={this.props.class}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ModalAddGroup;