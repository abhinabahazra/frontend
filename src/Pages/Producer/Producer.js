import React, { Component } from 'react';
import "./Producer.css";
import { Redirect, Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import swal from 'sweetalert';


const userInitvalue = {
    phone: '',
    phoneValidate:'',
    masterId:''
}

const initFile = {
    file: '',
    isFile: false,
    isFileError: ''
}


class Producer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails: userInitvalue,
            userFile: initFile,
            addMovie_msg: ''
        }
    }

    submitHandler = () => {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            let data = {

                phone: this.state.userDetails.phone,

            }
            console.log(data);
            axios.post('https://www.api3.digimovieplex.com/api/update_profile', data).then((res) => {
                if (res.data.status === 'success') {
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

                    if (this.state.userDetails.profileImage) {
                        let formData = new FormData();
                        formData.append('num_user_id', num_user_id);
                        formData.append('file', this.state.userDetails.profileImage);
                        axios.post('https://www.api3.digimovieplex.com/api/file/upload_ProfilePic', formData).then((res1) => {
                            if (res1.data.status === 'success') {
                                this.setState({
                                    addMovie_msg: `${res.data.message}. ${res1.data.message}`
                                })
                            } else {
                                this.setState({
                                    addMovie_msg: `${res.data.message}. ${res1.data.message}`
                                })
                            }
                        })
                    } else {
                        this.setState({
                            addMovie_msg: res.data.message
                        })
                    }
                } else {
                    swal({
                        title: res.data.title,
                        text: res.data.text,
                        icon: res.data.icon,
                        successMode: true,
                    })

                }
            })
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            let data = { user_id: num_user_id };
            axios.post('https://www.api3.digimovieplex.com/api/getUserById', data).then((res) => {
                console.log("monu", res.data);
                if (res.data.status === "success") {
                    this.setState({
                        userDetails: {
                            phone: res.data.response.num_mobile_no,
                            phoneValidate:res.data.response.yn_mobile_verified,
                            masterId:res.data.response.num_master_id,
                        }
                    })
                    if(this.state.userDetails.masterId === '2' && this.state.userDetails.phoneValidate === '0'){
                        swal({
                            title: "Mobile Number is not verified!",
                            text: "please verify your Number",
                            icon: 'warning',
                            successMode: true,
                          }).then(res => {
                            if (res) {
                              window.location.href = "/mobile_varification"
                            }
                          });
                    }
                }
            })
        }
    }

    render() {
        if (sessionStorage.getItem('auth')) {
            let { num_master_id } = JSON.parse(sessionStorage.getItem('auth'));
            if (num_master_id !== '2') {
                //history.push("/producer");
                console.log("userpage");
                return <Redirect to="/" />
            }
        } else {
            console.log("homepage");
            return <Redirect to="/" />

        }

        if (localStorage.getItem('movie_id')) {
            localStorage.removeItem('movie_id')
        }

        return (
            <div>
                <div className="topnav">
                    <Link id="style_button" to={"/add_movies"}>ADD MOVIES<AddIcon className="upload_button" /></Link>
                    <Link id="style_button" to={"/dashboard"}>MY DASHBOARD</Link>
                    <Link id="style_button" to={"/producer_movies"}>MY MOVIES</Link>
                    <Link id="style_button" to={"/my_drafts"}>MY DRAFTS</Link>
                    <Link id="style_button" to={"/preview"}>Launch Details</Link>
                    <Link id="style_button" to={"/producer_launch"}>Live Telecast</Link>


                    <Link id="style_button" to={"/bank_account"}>BANK ACCOUNT</Link>
                </div>
                <img className="img-responsive" src="cinema.jpg" alt="rill" />
            </div>
        );
    }
}

export default Producer;