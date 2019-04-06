import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddUser from "./forms/AddUser";
import AddCourse from "./forms/AddCourse";
import AddClass from "./forms/AddClass";

//A popup with a form  the type of form will be get via props.
class ModalAddForm extends Component {
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
                    Add
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add {this.props.type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoadForm type={this.props.type}/>

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

//Select the correct form to load.
const LoadForm = (props) => {
    switch (props.type) {
        case "course":
            return <AddCourse type={props.type}/>;
        case "student":
            return <AddUser type={props.type}/>;
        case "teacher":
            return <AddUser type={props.type}/>;
        case "class":
            return <AddClass type={props.type}/>;
        default :
            return props.type + "form not found";
    }
};

export default ModalAddForm;