import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import axios from 'axios';
import { data } from 'jquery';
import EditIcon from '@material-ui/icons/Edit';
import "./User_profile.css";
import {Link,Redirect} from 'react-router-dom'



const userInitvalue = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    first_address: '',
    second_address: '',
    pin_code: '',
    profileImage: '',
    country:''
}

const initFile = {
    file: '',
    isFile: false,
    isFileError: ''
}



class KycForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userDetails: userInitvalue,
            userFile: initFile,
            addMovie_msg: ''
        }
    }

    onChangeFormHandler = (e) => {
        this.setState({
            userDetails: { ...this.state.userDetails, [e.target.name]: e.target.value }
        })
    }

    onChangeFileHandler = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg') {
                this.setState({
                    userDetails: { ...this.state.userDetails, [e.target.name]: e.target.files[0] },
                    userFile: { ...this.state.userFile, file: URL.createObjectURL(e.target.files[0]), isFile: true, isFileError: '' }
                })

            } else {
                e.target.value = null;
                this.setState({
                    userFile: { ...this.state.userFile, isFileError: 'Please upload only jpeg, png, jpg, doc and pdf file' }
                })
            }
        }
    }

    removeFile = () => {
        this.setState({
            userDetails: { ...this.state.userDetails, profileImage: null },
            userFile: { ...this.state.userFile, file: null, isFile: false, isFileError: '' }
        })
    }

    submitHandler = () => {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            let data = {
                user_id: num_user_id,
                first_name: this.state.userDetails.first_name,
                last_name: this.state.userDetails.last_name,
                email: this.state.userDetails.email,
                // country: this.state.userDetails.txt_user_country,
                phone: this.state.userDetails.phone,
                dateofbirth: this.state.userDetails.birthDate,
                gender: this.state.userDetails.gender,
                first_address: this.state.userDetails.first_address,
                second_address: this.state.userDetails.second_address,
                pin_code: this.state.userDetails.pin_code
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
                console.log("monu",res.data);
                if (res.data.status === "success") {
                    let getDate = (res.data.response.txt_user_dob) ? new Date(res.data.response.txt_user_dob) : '';
                    let dob = (getDate) ? getDate.toISOString().slice(0, 10) : '';
                    this.setState({
                        userDetails: {
                            first_name: res.data.response.first_name,
                            last_name: res.data.response.last_name,
                            email: res.data.response.txt_emailid,
                            country: res.data.response.txt_user_country,
                            phone: res.data.response.num_mobile_no,
                            birthDate: dob,
                            gender: res.data.response.txt_gender,
                            first_address: res.data.response.txt_address_1,
                            second_address: res.data.response.txt_address_2,
                            pin_code: res.data.response.num_pin_code,
                        }
                    })
                    if (res.data.response.txt_profile_pic !== '' && res.data.response.txt_profile_pic !== 'undefined' && res.data.response.txt_profile_pic !== null) {
                        this.setState({
                            userFile: { ...this.state.userFile, file: `${res.data.response.txt_profile_pic}`, isFile: true, isFileError: '' }
                        })
                    }
                }
            })
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
            <>
                <h1>User Profile</h1>
                <Grid className="add_image" container spacing={2}>
                    <Grid item xs={12}>
                        <div className="profile_image">
                            <h2 >Your Profile Picture</h2>
                            <h3 className="country"><strong> {this.state.userDetails.country}</strong></h3>
                            {(this.state.userFile.isFile) ?
                                <>
                                    <img className="img_responsive" src={this.state.userFile.file} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('cheque')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    {/* <h3>Upload Profile Picture </h3> */}

                                    <TextField

                                        onChange={this.onChangeFileHandler}
                                        type="file" accept="video/image/*" name="profileImage" label="Upload profile pic"
                                    />
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.userFile.isFileError && this.state.userFile.isFileError}</span>

                        </div>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="first_name"
                            value={this.state.userDetails.first_name}
                            label="First Name"
                            type="fName"
                            placeholder="Enter First Name "
                            id="fName"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="last_name"
                            value={this.state.userDetails.last_name}
                            label="Last Name"
                            type="lName"
                            id="lName"
                            placeholder="Enter Last Name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="email"
                            value={this.state.userDetails.email}
                            label="Email"
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="phone"
                            value={this.state.userDetails.phone}
                            label="Mobile"
                            type="mobile"
                            id="mobile"
                            placeholder="Enter Mobile Number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <form >
                            <TextField
                                id="date"
                                label="Date Of Birth"
                                type="date"
                                name="birthDate"
                                value={this.state.userDetails.birthDate}
                                variant="outlined"
                                placeholder="Enter Date Of Birth"
                                onChange={this.onChangeFormHandler}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                         <div>
                                <label > Gender</label>
                                <select id="inputState" class="form-control" name="gender" onChange={this.onChangeFormHandler} >
                                    <option selected>~ SELECT ~</option>
                                    <option value="M"  selected={this.state.userDetails.gender === 'M'}>Male</option>
                                    <option value="F"  selected={this.state.userDetails.gender === 'F'}>Female</option>
                                </select>
                            </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            value={this.state.userDetails.first_address}
                            name="first_address"
                            label="Address 1"
                            placeholder="Enter Address 1"
                            type="add1"
                            id="add1"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            value={this.state.userDetails.second_address}
                            name="second_address"
                            label="Address 2"
                            type="add2"
                            id="add2"
                            placeholder="Enter Address 2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={this.onChangeFormHandler}
                            name="pin_code"
                            value={this.state.userDetails.pin_code}
                            label="Pin Code"
                            type="pin"
                            placeholder="Enter Pin Code"
                            id="pin"
                        />
                    </Grid>
                   
                    {/* <h3 className="message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3> */}
                </Grid>
                <div id="slide_main"></div>

                <Link id="style_button" type="button" to={"/"}>Back to Home</Link> 
                <button id="style_button" onClick={this.submitHandler} type="submit"><strong>Submit Data</strong></button>
            </>
        )
    }
}

export default KycForm
