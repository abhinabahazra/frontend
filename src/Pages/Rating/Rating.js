import React, { Component } from 'react'
import ReactStars from "react-rating-stars-component";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link, Redirect } from 'react-router-dom'

const thirdExample = {
    size: 40,
    count: 5,
    isHalf: false,
    color: "white",
    activeColor: "blue",
    onChange: newValue => {
        console.log(`Example 3: new value is ${newValue}`);
    }
};

class Rating extends Component {


    render(){
        
        if (sessionStorage.getItem('auth')) {
            let { num_master_id } = JSON.parse(sessionStorage.getItem('auth'));
            if (num_master_id !== '3') {
                //history.push("/producer");
                console.log("userpage");
                return <Redirect to="/" />
            }
        } else {
            console.log("homepage");
            return <Redirect to="/" />
    
        }
    return (
        <div>
            <h2>Your Review means a lot for us.</h2>
            <Grid className="add_description" container spacing={2}>
                <Grid item xs={12} sm={12}>

                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={10}
                        name="feedback"
                        label="Enter Your Feedback"
                        type="name"
                        placeholder="Feedback"
                        id="feedback"
                    />
                </Grid>
            </Grid>
            <ReactStars {...thirdExample} />
            <button id="style_button" type='button' class='btn btn-primary'>Rate Me!</button>

        </div>
    );
}
}
export default Rating;


