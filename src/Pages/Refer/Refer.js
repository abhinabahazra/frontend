import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import swal from 'sweetalert';
import HashLoader from "react-spinners/HashLoader";
// import StarRatings from 'react-star-ratings';



const referInitvalue = {
    sent_email: '',
}


 class Refer extends Component {

    
    // changeRating( newRating, name ) {
    //     this.setState({
    //       rating: newRating
    //     });
    //   }

    

    constructor(props) {
        super(props);
        this.state = {
            userDetails: referInitvalue,
            addMovie_msg: '',
            loader: false,
            referCode : ''
        }
    }

    onChangeFormHandler = (e) => {
        this.setState({ 
            userDetails : {...this.state.userDetails, [e.target.name] : e.target.value}
        })
    }


    submitHandler = () => {
        this.setState({...this.state, loader: true})
        if(sessionStorage.getItem('auth')){
            let {num_user_id} = JSON.parse(sessionStorage.getItem('auth'));
            let data = {
                num_user_id        : num_user_id,
                sent_email     : this.state.userDetails.sent_email,         
            } 
            axios.post('https://www.api3.digimovieplex.com/api/share_with',data).then((res) => {
                this.setState({...this.state, loader: false})
                if(res.data.status === 'success') {
                    swal({
                        title: "Success",
                        text: "Referal Done",
                        icon: "success",
                        successMode: true,
                    }).then(res => {
                        if (res) {
                          window.location.href = "/"
                        }
                    });
                    if(this.state.userDetails.profileImage){
                        let formData = new FormData();
                        formData.append('num_user_id', num_user_id);
                    }
                    else{
                        this.setState({
                            addMovie_msg: res.data.message
                        })
                    }
                }else{
                    this.setState({
                        addMovie_msg: res.data.message
                    })
                }
            })
        } 
    }

    componentDidMount(){
        if(sessionStorage.getItem('auth')){
            let {num_user_id} = JSON.parse(sessionStorage.getItem('auth'));
            axios.post('https://www.api3.digimovieplex.com/api/getUserById',{user_id : num_user_id}).then((res)=>{
                if(res.data.status === 'success'){
                    this.setState({
                        referCode : res.data.response.txt_refer_code
                    })
                }
            })
        }
    }

    render() {
        return (
            <div>
               
             <h1>Refer A Friend</h1>
             <h2>Your Referral Code: {this.state.referCode && this.state.referCode}</h2>
             <Grid className="add_description" container spacing={2}>
             <Grid item xs={12} sm={4}>
                 <p>Invite Others with your referal code</p>
                            <TextField
                                variant="outlined"
                                fullWidth
                                 onChange={this.onChangeFormHandler}
                                name="sent_email"
                                value={this.state.userDetails.sent_email}
                                label="Friend's email Id"
                                type="email"
                                placeholder="Enter Friend's email Id "
                                id="fName"
                                required
                            />
                        </Grid>
                        </Grid>
                        <div id="slide_main"></div>

                        {/* <h3 className="message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3> */}
                        <button id="style_button1" onClick={this.submitHandler} type="submit">Refer Friend</button>
                        {/* <StarRatings
          rating={this.state.rating}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={6}
          name='rating'
        /> */}
                        { this.state.loader ? <div className="loader"> <HashLoader color={"green"} />   <p>Please wait.....</p>  </div> : null}
            </div>
            
        )
    }
}

export default Refer
