import React, {Component} from 'react';
import axios from 'axios';
import {BeatLoader} from "react-spinners";

//All courses in a option field.
class CourseOptions extends Component {
    constructor() {
        super();
        this.state = {
            cases: [],
            isLoaded: false
        };
    }

    //Get data from API
    fetchApi = (th) => {
        this.serverRequest = axios.get("http://localhost:3400/courses")
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
                <option> </option>
                {this.state.isLoaded ?
                    this.state.cases.map(caseItem => (
                        <option value={caseItem.id} key={caseItem.id}>
                            {caseItem.title}
                        </option>
                    )) : (
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

export default CourseOptions;