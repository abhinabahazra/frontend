import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import axios from 'axios';
import { data } from 'jquery';

const kycInitValue = {
    accountNo : '',
    retypeAccountNo : '',
    bankName : '',
    branchName : '',
    ifscNo : '',
    chequeImage : '',
    panNo : '',
    panImage : ''
}

const errorMsgInit = {
    accountErr  : '',
    isChequeErr : '',
    isPanErr    : '',
}

const isFileInit = {
    isChequeFile : '',
    isCheque: false,

    isPanFile : '',
    isPan: false
}

class KycForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kycDetails : kycInitValue,
            isErr : errorMsgInit,
            isFile : isFileInit,
            addMovie_msg : ''
        }
    }

    onChangeFormHandler = (e) => {
       
        this.setState({ 
            kycDetails : {...this.state.kycDetails, [e.target.name]: e.target.value}
        },() => {
            if(this.state.kycDetails.retypeAccountNo){
                if(this.state.kycDetails.accountNo === this.state.kycDetails.retypeAccountNo){
                    this.setState({
                        isErr : {...this.state.isErr, accountErr : ''}
                    })
                }else{
                    this.setState({
                        isErr : {...this.state.isErr, accountErr : 'account number not matched'}
                    })
                }
            }else{
                this.setState({
                    isErr : {...this.state.isErr, accountErr : ''}
                })
            }
        })
    }

    onChangeFileHandler = (e) => {
        if(e.target.files[0]){
            if(e.target.name === 'chequeImage'){
                if(e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/jpg'){
                    this.setState({
                        kycDetails : {...this.state.kycDetails, [e.target.name]: e.target.files[0]},
                        isFile : {...this.state.isFile, isChequeFile : URL.createObjectURL(e.target.files[0]), isCheque: true},
                        isErr : {...this.state.isErr, isChequeErr : ''}
                    })
                }else{
                    e.target.value = null;
                    this.setState({
                        isErr : {...this.state.isErr, isChequeErr : 'Please, upload any png, jpeg, jpg file.'}
                    })
                }
            }else{
                if(e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/jpg'){
                    this.setState({
                        kycDetails : {...this.state.kycDetails, [e.target.name]: e.target.files[0]},
                        isFile : {...this.state.isFile, isPanFile : URL.createObjectURL(e.target.files[0]), isPan: true},
                        isErr : {...this.state.isErr, isPanErr : ''}
                    })
                }else{
                    e.target.value = null;
                    this.setState({
                        isErr : {...this.state.isErr, isPanErr : 'Please, upload any png, jpeg, jpg file.'}
                    })
                }
            }
        }
    }

    removeFile = (name) => {
        if(name === 'cheque'){
            this.setState({
                kycDetails : {...this.state.kycDetails, chequeImage: null},
                isFile : {...this.state.isFile, isChequeFile : null, isCheque: false},
                isErr : {...this.state.isErr, isChequeErr : ''}
            })
        }else{
            this.setState({
                kycDetails : {...this.state.kycDetails, panImage: null},
                isFile : {...this.state.isFile, isPanFile : null, isPan: false},
                isErr : {...this.state.isErr, isPanErr : ''}
            })
        }
    }

    submitHandler = async() => {
        if(sessionStorage.getItem('auth')){
            let {num_user_id} = JSON.parse(sessionStorage.getItem('auth'));

            let panFileData = new FormData();
            let chequeFileData = new FormData();
            let kycData = {
                user_id: num_user_id,
                pancard_no: this.state.kycDetails.panNo,
                account_no: this.state.kycDetails.accountNo,
                ifsc_code:  this.state.kycDetails.ifscNo,
                bank_name: this.state.kycDetails.bankName,
                branch_name: this.state.kycDetails.branchName
            }

            await axios.post('https://www.api3.digimovieplex.com/api/add_kyc_data', kycData).then((res) => {
                console.log(res);
                if(res.data.status==='success'){
                    panFileData.append('num_user_id',num_user_id);
                    panFileData.append('txt_pancard_link',this.state.kycDetails.panImage);

                    console.log(this.state.kycDetails.panImage);

                    chequeFileData.append('num_user_id',num_user_id);
                    chequeFileData.append('txt_cheque_link',this.state.kycDetails.chequeImage);

                    axios.post('https://www.api3.digimovieplex.com/api/upload_PanImage',panFileData).then((res) => {
                        console.log(res.data)
                    });
                    axios.post('https://www.api3.digimovieplex.com/api/upload_ChequeImage',chequeFileData).then((res) => {
                        console.log(res.data)
                    });

                    swal({
                        title: "Success",
                        text: "Your KYC Details is successfully uploaded",
                        icon: "success",
                        successMode: true,
                    }).then(res => {
                        if (res) {
                          window.location.href = "/producer"
                        }
                    });

                }else{
                    this.setState({
                        addMovie_msg : res.data.message
                    })
                }
            })
        }
    }

    componentDidMount(){
        if(sessionStorage.getItem('auth')){
            let {num_user_id} = JSON.parse(sessionStorage.getItem('auth'));
            let user_id = num_user_id
            axios.post('https://www.api3.digimovieplex.com/api/kyc_data',{user_id}).then((res)=>{
                console.log(res.data)
                if(res.data.status === 'success'){
                    this.setState({
                        kycDetails : {
                            ...this.state.kycDetails,
                            accountNo : res.data.response.account_no,
                            retypeAccountNo : res.data.response.account_no,
                            bankName : res.data.response.txt_bank_name,
                            branchName : res.data.response.txt_branch_name,
                            ifscNo : res.data.response.ifsc_code,
                            panNo : res.data.response.txt_pancard_no
                        }
                    })

                    if(res.data.response.txt_cheque_link!==null && res.data.response.txt_cheque_link!=='' && res.data.response.txt_cheque_link!=='undefined'){
                        this.setState({
                            isFile : {
                                ...this.state.isFile,
                                isChequeFile : `https://www.api3.digimovieplex.com/${res.data.response.txt_cheque_link}`,
                                isCheque: true
                            }
                        })
                    }

                    if(res.data.response.txt_pancard_link!==null && res.data.response.txt_pancard_link!=='' && res.data.response.txt_pancard_link!=='undefined'){
                        this.setState({
                            isFile : {
                                ...this.state.isFile,
                                isPanFile : `https://www.api3.digimovieplex.com/${res.data.response.txt_pancard_link}`,
                                isPan: true
                            }
                        })
                    }
                }
            })
        }
    }
    render() {
        return (
            <>
                
                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                onChange={this.onChangeFormHandler}
                                name="accountNo"
                                label="Account number"
                                type="text"
                                id="Account"
                                value={this.state.kycDetails.accountNo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>    
                            <TextField
                                variant="outlined"
                                fullWidth
                                onChange={this.onChangeFormHandler}
                                name="retypeAccountNo"
                                label="Retype Account number"
                                type="text"
                                id="Account"
                                value={this.state.kycDetails.retypeAccountNo}
                            />
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isErr.accountErr && this.state.isErr.accountErr}</span>
                        </Grid>
                        <Grid item xs={12} sm={6}>     
                            <TextField
                                variant="outlined"
                                fullWidth
                                onChange={this.onChangeFormHandler}
                                name="bankName"
                                label="Bank name"
                                type="text"
                                id="PAN"
                                value={this.state.kycDetails.bankName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>      
                            <TextField
                                variant="outlined"
                                fullWidth
                                onChange={this.onChangeFormHandler}
                                name="branchName"
                                label="Bank branch"
                                type="text"
                                id="PAN"
                                value={this.state.kycDetails.branchName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>      
                            <TextField
                                variant="outlined"
                                fullWidth
                                onChange={this.onChangeFormHandler}
                                name="ifscNo"
                                label="IFSC Code"
                                type="text"
                                id="PAN"
                                value={this.state.kycDetails.ifscNo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>     
                            {(this.state.isFile.isCheque)? 
                                <>
                                    <img style={{width: "300px", height: "160px"}} src={this.state.isFile.isChequeFile} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile ('cheque')}>Remove File</button>
                                    </div>
                                </> 
                                : 
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        onChange={this.onChangeFileHandler}
                                        type="file" accept="video/image/*" name="chequeImage" label="Upload cheque" id="castsss"
                                    />
                                </>
                            } 
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isErr.isChequeErr && this.state.isErr.isChequeErr}</span>
                        </Grid>
                        <Grid item xs={12} sm={6}>  
                            <TextField
                                variant="outlined"
                                fullWidth
                                onChange={this.onChangeFormHandler}
                                name="panNo"
                                label="Enter Your PAN No."
                                type="text"
                                id="PAN"
                                value={this.state.kycDetails.panNo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>     
                            {(this.state.isFile.isPan)? 
                                <>
                                    <img style={{width: "300px", height: "160px"}} src={this.state.isFile.isPanFile} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile ('pan')}>Remove File</button>
                                    </div>
                                </> 
                                : 
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        onChange={this.onChangeFileHandler}
                                        type="file" accept="video/image/*" name="panImage" label="Upload Your PAN image" id="castsss"
                                    />
                                </>
                            }
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isErr.isPanErr && this.state.isErr.isPanErr}</span>
                        </Grid>
                        <button id="style_button1" onClick={this.submitHandler} type="submit">submit data</button>
                        <h3 className="message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3>
                    </Grid>
                
            </>
        )
    }
}

export default KycForm
