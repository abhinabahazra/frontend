import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import swal from 'sweetalert';
import HashLoader from "react-spinners/HashLoader";
import "./Changepass.css";
import {Link,Redirect} from 'react-router-dom'




const changepassInitvalue = {
  old_password:'',
  new_password: '',
  retype_newPassword: '',
}

const errorMsgInit = {
  passErr  : '',
}

 class Changepass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passDetails: changepassInitvalue,
            isErr : errorMsgInit,
            addMovie_msg: ''
        }
    }

    onChangeFormHandler = (e) => {
        this.setState({ 
            passDetails : {...this.state.passDetails, [e.target.name] : e.target.value}
          },() => {
            if(this.state.passDetails.retype_newPassword){
                if(this.state.passDetails.new_password === this.state.passDetails.retype_newPassword){
                    this.setState({
                        isErr : {...this.state.isErr, passErr : ''}
                    })
                }else{
                    this.setState({
                        isErr : {...this.state.isErr, passErr : 'password not matched'}
                    })
                }
            }else{
                this.setState({
                    isErr : {...this.state.isErr, passErr : ''}
                })
            }
        })
    }


    submitHandler = () => {
        if(sessionStorage.getItem('auth')){
            let {num_user_id} = JSON.parse(sessionStorage.getItem('auth'));
            let data = {
                num_user_id        : num_user_id,
                new_password     : this.state.passDetails.new_password,  
                old_password     : this.state.passDetails.old_password,         
       
            } 
            let opass = document.getElementById("oldPass").value;
            let npass = document.getElementById("newPass").value;
            let fpass = document.getElementById("confirm").value;

            if (opass != "" && npass != "" && fpass != "") {
                //============================================
                console.log(data);
                axios.post('https://www.api3.digimovieplex.com/api/change_password_id',data).then((res) => {
                    if(res.data.status === 'success') {
                        swal({
                            title: res.data.title,
                        text: res.data.text,
                        icon: res.data.icon,
                        successMode: true,
                        }).then(res => {
                            if (res) {
                            window.location.href = "/"
                            }
                        });
                        if(this.state.passDetails.profileImage){
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
                //=============================================
            } else {
                swal({
                    title: "All the fields are required.",
                    text: "Please enter all the fields.",
                    icon: "error",
                    successMode: true,
                })            }
        } 
    }

    render() {
        if(sessionStorage.getItem('auth')){
            let {num_master_id} = JSON.parse(sessionStorage.getItem('auth'));
            //console.log(num_master_id !== '3' || num_master_id !== '4')
            if(num_master_id === '1'){
                return  <Redirect to="/" />
            }
        }else{
            return   <Redirect to="/" />
        }
        return (
            <div>
             
             <h1>Change Password</h1>
             <div className="add_description" id="password_main">
             <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                 onChange={this.onChangeFormHandler}
                                name="old_password"
                                value={this.state.passDetails.old_password}
                                label="Current Password"
                                type="password"
                                placeholder="Enter old Password "
                                id="oldPass"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                 onChange={this.onChangeFormHandler}
                                name="new_password"
                                value={this.state.passDetails.new_password}
                                label="New Password"
                                type="password"
                                placeholder="Enter New Password "
                                id="newPass"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                 onChange={this.onChangeFormHandler}
                                name="retype_newPassword"
                                value={this.state.passDetails.retype_newPassword}
                                label="Re type New Password"
                                type="password"
                                placeholder="Enter New Password "
                                id="confirm"
                                required
                            />
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isErr.passErr && this.state.isErr.passErr}</span>
                        </Grid>
                        <div id="slide_main"></div>

             </div>
             
                        <h3 className="message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3>
                        <Link id="style_button" type="button" to={"/"}>Back to Home</Link> 
                        <button id="style_button" onClick={this.submitHandler} type="submit"><strong>Change Password</strong></button>
                     

            </div>
        )
    }
}

export default Changepass
