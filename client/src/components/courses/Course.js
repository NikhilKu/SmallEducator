import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import {BeatLoader} from "react-spinners";
import ModalAddForm from "../ModalAddForm";
import APIProvider from "../../provider/APIProvider";

//The course page
class Course extends Component {
    constructor() {
        super();
        this.state = {
            cases: [],
            isLoaded: false
        };
    }

    //Get data from API
    fetchApi = (th) => {
        const provider = new APIProvider();
        this.serverRequest = provider.fetchApi("courses")
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
                <ModalAddForm type="course"/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Ects</th>
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
        <td>{list.title}</td>
        <td>{list.description}</td>
        <td>{list.ects}</td>
    </tr>
);
export default Course;