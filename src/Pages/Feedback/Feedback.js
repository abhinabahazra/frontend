import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import swal from 'sweetalert';
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";

// import StarRatings from 'react-star-ratings';



const initValue = {
    first_name: '',
    last_name: '',
    txt_emailid: '',
    phone: '',
    feedback: '',

}


export class Feedback extends Component {


    // changeRating( newRating, name ) {
    //     this.setState({
    //       rating: newRating
    //     });
    //   }



    constructor(props) {
        super(props);
        this.state = {
            userFeedback: initValue,
            addMovie_msg: ''
        }
    }

    onChangeFormHandler = (e) => {
        this.setState({
            userFeedback: { ...this.state.userFeedback, [e.target.name]: e.target.value }
        })
    }


    adduserFeedback = async (e) => {
        e.preventDefault();
        //console.log(this.state.userFeedback);
        let data = {
            first_name: this.state.userFeedback.first_name,
            last_name: this.state.userFeedback.last_name,
            txt_emailid: this.state.userFeedback.txt_emailid,
            phone: this.state.userFeedback.phone,
            feedback: this.state.userFeedback.feedback,

        }
        //status: "success", message: "Movie Cast registration successfully"
        axios.post('https://www.api3.digimovieplex.com/api/user_feedback', data).then((res) => {
            this.setState({ ...this.state, loader: false })
            if (res.data.status === 'success') {
                swal({
                    title: "Success",
                    text: "Feedback Done",
                    icon: "success",
                    successMode: true,
                }).then(res => {
                    if (res) {
                        window.location.href = "/"
                    }
                });
            } else {
                swal({
                    title: "Failed",
                    text: "Feedback Interupted",
                    icon: "error",
                    successMode: true,
                })
            }
        })
    }



    render() {
        return (
            <div>

                <h1>Feedback Form</h1>
                <h2>We will be happy to receive your feedback</h2>

                <Grid className="add_description" container spacing={2}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="first_name"
                            value={this.state.userFeedback.first_name}
                            label="First Name"
                            type="name"
                            id="fName"

                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="last_name"
                            value={this.state.userFeedback.last_name}
                            label="Last Name"
                            type="name"
                            id="lName"

                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="txt_emailid"
                            value={this.state.userFeedback.txt_emailid}
                            label="Email"
                            type="email"
                            id="email"

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="phone"
                            value={this.state.userFeedback.phone}
                            label="Phone"
                            type="phone"
                            id="phone"

                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="feedback"
                            value={this.state.userFeedback.feedback}
                            label="Feedback"
                            type="feedback"
                            id="feedback"
                            multiline
                            rows={10}
                        />
                    </Grid>
                </Grid>
                <Link id="style_button" type="button" to={"/"}>Back to Home</Link>
                <button id="style_button" onClick={this.adduserFeedback} type="submit">Submit</button>

                {this.state.loader ? <div className="loader"> <HashLoader color={"green"} />   <p>Please wait.....</p>  </div> : null}
            </div>

        )
    }
}

export default Feedback
