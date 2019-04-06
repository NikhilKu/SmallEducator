import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import {BeatLoader} from "react-spinners";
import ModalAddForm from "../ModalAddForm";
import ModalAddGroup from "../ModalAddGroup";
import APIProvider from "../../provider/APIProvider";

//The classes page
class Classroom extends Component {
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
        this.serverRequest = provider.fetchApi("classes")
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
                <ModalAddForm type="class"/>
                {this.state.isLoaded ?
                    <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Classname</th>
                            <th>Course</th>
                            <th>Enrollmentkey</th>
                            <th>Students</th>
                            <th>Tools</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.cases.map(caseItem => (
                                <TableRow key={caseItem.id} list={caseItem}/>
                            ))
                        }

                        </tbody>
                    </Table>
                    </div>
                    : (
                        <BeatLoader
                            sizeUnit={"px"}
                            size={20}
                            color={'#7dc8de'}
                            loading={!this.state.isLoaded}
                        />
                    )
                }
            </>
        );
    }
}

const ClassStudents = ({students}) => {
    return (
        <ul>
            {
                students.map(student => (
                    <li>{student.student_number}</li>
                ))
            }
        </ul>
    )
};

const TableRow = ({list}) => (
    <tr key={list.id}>
        <td>{list.id}</td>
        <td>{list.name}</td>
        {list.course ? (
                <td>{list.course.title}</td>
            ) :
            <td>undefined</td>}
        {list.enrollment ? (
                <td>{list.enrollment.key}</td>
            ) :
            <td>undefined</td>}
        {list.students ? (
                <td><ClassStudents students={list.students}/></td>
            ) :
            <td>Empty class</td>}

        <td><ModalAddGroup type="class" class={list.id}/></td>
    </tr>
);


export default Classroom;