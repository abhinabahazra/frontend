import React, { Component } from 'react';
import { Form } from "usetheform";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import swal from 'sweetalert';

export class SeventhForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num_producer_share : 0,
            num_admin_share    : 0,
            isDisable : false,
            addMovie_msg : ''
        }
    }

    onChangeHandler = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        })
    }

    onSubmitHandler = async (e) => {
        
        e.preventDefault();
        let sedingData = {
            movie_id            : localStorage.getItem('movie_id'),
            producer_percentage : this.state.num_producer_share,
            admin_percentage    : this.state.num_admin_share,
            user                : "c"
        }
        let {num_user_id} = JSON.parse(sessionStorage.getItem('auth'));

        let approveData = {
            movie_id      :  localStorage.getItem('movie_id'),
            approval_type : "1",
            upload_id     : num_user_id
        }

        await axios.post('https://www.api3.digimovieplex.com/api/add_movie_contract/',sedingData).then((res) => {
            if(res.data.status === 'success'){
                axios.post('https://www.api3.digimovieplex.com/api/add_approval/',approveData).then((res1) => {
                    console.log('res1 : ',res1.data.status);
                    if(res1.data.status === 'success'){
                        localStorage.removeItem('movie_id')
                        this.setState({isDisable: true});
                        swal({
                            title: "",
                            // text: `${res.data.message} ${res1.data.message}`,
                            text: "Movie Uploaded Successfully",
                            icon: "success",
                            successMode: true,
                          })
                          .then(proceed => {
                            if (proceed) {
                              window.location.href = "/producer"
                            }
                          });
                    }else{
                        this.setState({addMovie_msg : res.data.message+'. '+res1.data.message});
                    }
                })
            }else{
                this.setState({addMovie_msg : res.data.message});
            }
        })

        this.getDefaultData();
    }
    getDefaultData = async () =>{
        axios.get('https://www.api3.digimovieplex.com/api/get_contract_details').then(res => {
            this.setState({
                num_producer_share : res.data. response[0].num_producer_share,
                num_admin_share    : res.data. response[0].num_admin_share            
            })
        })
    }

    
componentDidMount(){
    this.getDefaultData();
}
    render(){
        //console.log(localStorage.getItem('movie_id'));
        return(
            <Form name="page7" {...this.props}>
                <p>Read these before you start. You will need to keep some image and video files ready.</p>
                <ul>
                <li>Type the movie name carefully. You are not allowed to change the movie name later.</li>
                <li>Select genre carefully. You are not allowed to change the genre later.</li>
                <li>Give proper censor data. Upload censor certificate if you have it.</li>
                <li>Synopsis is required. Providing synopsis will help us to better understand your movie.</li>
                <li>Cast and crew data is required. Providing cast-and-crew data will help us to understand the star-cast in your movie.</li>
                <li>One Banner of size  460(Vertical) x 300 (Horizontal) is required.</li>
                <li>One Banner file is mandatory.</li>
                <li>One Trailer file is mandatory.</li>
                <li> Movie file is mandatory.</li>
                </ul>
                <hr />
                <h2>Movie Contract</h2>
                <Grid className="add_image" container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            value={this.state.num_producer_share}  
                            fullWidth
                            name="num_producer_share"
                            label="Producer percentage"
                            type= "text"
                            placeholder="Enter %"
                            id="producer percentage"
                            onChange={this.onChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="num_admin_share"
                            label="Admin percentage"
                            type= "text"
                            value={this.state.num_admin_share}                       
                            placeholder="Enter %"
                            id="admin percentage"
                            onChange={this.onChangeHandler}
                        />
                    </Grid>
                    <h3 className="message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3>
                </Grid>
                <button id="style_button" type="button" onClick={this.props.previous} disabled={this.state.isDisable}>
                    Previous Page
                </button>
                <button id="style_button" type="submit" onClick={this.onSubmitHandler} disabled={this.state.isDisable}>Submit Data</button>
                
                {/* <Link to = {"/"}><button id="style_button" type="button" disabled={!this.state.isDisable}>Producer Page</button></Link> */}
            </Form>
        )
    }
}

export default SeventhForm;
