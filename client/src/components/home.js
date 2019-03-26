import React, {Component} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

//A simple homepage
class Home extends Component {
    render() {
        return (
            <>
                <Jumbotron>
                    <h1>Welcome!</h1>
                    <p>
                        This is the homepage of the great Smalleducator app.
                    </p>
                </Jumbotron>
            </>
        );
    }
}

export default Home;