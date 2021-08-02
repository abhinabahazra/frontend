import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import swal from 'sweetalert';
import HashLoader from "react-spinners/HashLoader";
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import {Link,Redirect} from 'react-router-dom'


const ConfirmPassInitvalue = {
    new_password: '',
    retype_newPassword: '',
}

const errorMsgInit = {
    passErr: '',
    passErr1: ''
}

class ConfirmPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passDetails: ConfirmPassInitvalue,
            isErr: errorMsgInit,
            error: {},
            addMovie_msg: ''
        }
    }

    onChangeFormHandler = (e) => {
        this.setState({
            passDetails: { ...this.state.passDetails, [e.target.name]: e.target.value }
        }, () => {
            if (this.state.passDetails.retype_newPassword) {
                if (this.state.passDetails.new_password === this.state.passDetails.retype_newPassword) {
                    this.setState({
                        isErr: { ...this.state.isErr, passErr: '', passErr1: '' }
                    })
                } else {
                    this.setState({
                        isErr: { ...this.state.isErr, passErr: 'password not matched', passErr1: 'password not matched' }
                    })
                }
            } else {
                this.setState({
                    isErr: { ...this.state.isErr, passErr: '', passErr1: '' }
                })
            }
        })
    }


    submitHandler = () => {
        let { id } = this.props.match.params;
        let user_id = Base64.parse(id).toString(Utf8);
        let { error, isValid } = this.vlidationHandler();
        if (true) {
            let data = {
                user_id: user_id,
                new_password: this.state.passDetails.new_password,
            }
            
axios.post ("https://www.api3.digimovieplex.com/api/forgot_password",data).then(resp => {
    if(resp.data.status==="success"){
        swal({
            title: 'Password Updated Successfully',
        text: "Please Re-login",
        icon: 'success',
        successMode: true,
        })
        .then(resp => {
            if (resp) {
              window.location.href = "/"
            }
        });
    }else{
        swal({
            title: 'Something Went Wrong',
        text: "Password Updation Failed",
        icon: 'error',
        successMode: true,
        })

    }
})
        }else{
            this.setState({error : error})
        }
    }

    vlidationHandler = () => {
        let error = {}
        let { new_password, retype_newPassword } = this.state.passDetails;
        this.setState({
            isErr: { ...this.state.isErr, passErr: '', passErr1: '' }
        })
        if (!new_password) {
            error.err1 = "This field is required";
        }

        if (!retype_newPassword) {
            error.err2 = "This field is required";
        }

        if (new_password !== retype_newPassword) {
            error.err1 = "Password not matched";
            error.err2 = "Password not matched";
        }

        return {
            error,
            isValid: Object.keys(error).lenght === 0
        }
    }

    render() {
        return (
            <div>

                <h1>Change Password</h1>
                <div className="add_description" id="password_main">
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
                        <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isErr.passErr && this.state.isErr.passErr}</span>
                        <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.error.err1 && this.state.error.err1}</span>
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
                        <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isErr.passErr1 && this.state.isErr.passErr1}</span>
                        <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.error.err2 && this.state.error.err2}</span>
                    </Grid>
                </div>

                <h3 className="message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3>
                <Link id="style_button" type="button" to={"/"}>Back to Home</Link> 
                <button id="style_button1" onClick={this.submitHandler} type="submit"><strong>Change Password</strong></button>


            </div>
        )
    }
}

export default ConfirmPass
