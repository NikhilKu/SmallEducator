import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import {BeatLoader} from "react-spinners";
import ModalAddForm from "../ModalAddForm";
import APIProvider from "../../provider/APIProvider";


//Student page
class Student extends Component {
    constructor() {
        super();
        this.state = {
            cases: [],
            isLoaded: false
        };
    }


    fetchApi = (th) => {
        const provider = new APIProvider();
        this.serverRequest = provider.fetchApi("students")
            .then((event) => {
                th.setState({
                    cases: event.data,
                    isLoaded: true,
                });
            })
            .catch(() => {
                alert("Something went wrong");
                th.setState({
                    isLoaded: true,
                });
            });
    };

    componentDidMount() {
        var th = this;
        this.fetchApi(th);
    }

    render() {
        return (
            <>
                <ModalAddForm type="student"/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Student Number</th>
                        <th>First Name</th>
                        <th>Initials</th>
                        <th>Last Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.isLoaded ?
                        this.state.cases.map(caseItem => (
                            <TableRow list={caseItem}/>
                        )) : (
                            <BeatLoader
                                sizeUnit={"px"}
                                size={20}
                                color={'#7dc8de'}
                                loading={!this.state.isLoaded}
                            />
                        )
                    }
                    </tbody>
                </Table>
            </>
        );
    }
}
const TableRow = ({list}) => (
    <tr key={list.id}>
        <td>{list.id}</td>
        <td>{list.student_number}</td>
        <td>{list.user.name}</td>
        <td>{list.user.initials}</td>
        <td>{list.user.lastname}</td>
    </tr>
);
export default Student;