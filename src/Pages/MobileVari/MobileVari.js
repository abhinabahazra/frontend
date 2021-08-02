import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import swal from 'sweetalert';
import HashLoader from "react-spinners/HashLoader";
// import StarRatings from 'react-star-ratings';
import Swal from "sweetalert2";



const referInitvalue = {
    sent_email: '',
}


class MobileVari extends Component {


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
            phone: ''
        }
    }

    onChangeFormHandler = (e) => {
        this.setState({
            userDetails: { ...this.state.userDetails, [e.target.name]: e.target.value }
        })
    }


    submitHandler = () => {
        this.setState({ ...this.state, loader: true })
        if (sessionStorage.getItem('auth')) {
            let { num_mobile_no } = JSON.parse(sessionStorage.getItem('auth'));
            let data = {
                mobile: num_mobile_no,
            }
            axios.post('https://www.api3.digimovieplex.com/api/otp_sent', data).then((res) => {
                if (res.data.status === 'success') {
                    console.log("soumya", res.data.response.otp)
                    let otp = res.data.response.otp;
                    Swal.fire({
                        title: ' Enter the OTP sent to your number',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        confirmButtonText: 'Submit',
                        showLoaderOnConfirm: true,
                        preConfirm: (otpInput) => {
                            if (otpInput) {
                                if (otp === parseInt(otpInput)) {
                                    if (sessionStorage.getItem('auth')) {
                                        let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
                                        let data = {
                                            num_user_id: num_user_id
                                        }
                                        return fetch(`https://www.api3.digimovieplex.com/api/verify_phone`, {
                                            method: 'POST',
                                            body: JSON.stringify(data),
                                            headers: {
                                                "Content-Type": 'application/json',
                                            }
                                        }).then(response => {
                                            return response.json()
                                        })
                                    }

                                } else {
                                    Swal.showValidationMessage(
                                        `OTP not matched`
                                    )
                                }
                            } else {
                                Swal.showValidationMessage(
                                    `Please enter your OTP`
                                )
                            }
                        }

                    }).then((data)=>{
                        if(data.value.status === 'success'){
                            Swal.fire(data.value.message).then((data)=>{
                                 window.location.href = "/"
                            });
                        }
                    })
                }
            })
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            axios.post('https://www.api3.digimovieplex.com/api/getUserById', { user_id: num_user_id }).then((res) => {
                if (res.data.status === 'success') {
                    this.setState({
                        phone: res.data.response.num_mobile_no
                    })
                }
            })
        }
    }

    render() {
        return (
            <div>

                <h1>Mobile verification</h1>
                <h2>Your Phone Number: {this.state.phone && this.state.phone}</h2>

                <div id="slide_main"></div>
                <button id="style_button1" onClick={this.submitHandler} type="submit">Sent OTP</button>

            </div>

        )
    }
}

export default MobileVari
