import axios from "axios";

class APIProvider {
    url = "http://localhost:3400/";

    //Fetch API Use the given endpoint to get data.
    //Returns a promise
    fetchApi(endPoint) {
        return axios.get( this.url + endPoint).then((data) => {return data;})
    };

    //Post data in the API, use the given endpoint to post data to.
    //Returns a promise
    postData(endPoint, data) {
       return axios.post(this.url + endPoint, (data))
            .then((data) => {return data});
    };
}

export default APIProvider;