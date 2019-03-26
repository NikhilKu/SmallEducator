import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import axios from 'axios';
import {BeatLoader} from "react-spinners";
import ModalAddForm from "../ModalAddForm";

//Teacher page
class Teacher extends Component {
    constructor() {
        super();
        this.state = {
            cases: [],
            isLoaded: false
        };
    }

    fetchApi = (th) => {
        this.serverRequest = axios.get("http://localhost:3400/teachers")
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
                <ModalAddForm type="teacher"/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
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
        <td>{list.user.name}</td>
        <td>{list.user.initials}</td>
        <td>{list.user.lastname}</td>
    </tr>
);

export default Teacher;