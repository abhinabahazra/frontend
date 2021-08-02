import React, { Component } from 'react';
import { Form} from "usetheform";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },

}));

let initValue = {
    actor1: '',
    actor2: '',
    actor3: '',
    actor4: '',
    actor5: '',
    actor6: '',
    actor7: '',
    actor8: '',

    role1: '',
    role2: '',
    role3: '',
    role4: '',
    role5: '',
    role6: '',
    role7: '',
    role8: '',

    img1 : '',
    img2 : '',
    img3 : '',
    img4 : '',
    img5 : '',
    img6 : '',
    img7 : '',
    img8 : '',

    file1 : '',
    file2 : '',
    file3 : '',
    file4 : '',
    file5 : '',
    file6 : '',
    file7 : '',
    file8 : '',
};

let isFileInit = {
    isFile1 : false,
    isFile2 : false,
    isFile3 : false,
    isFile4 : false,
    isFile5 : false,
    isFile6 : false,
    isFile7 : false,
    isFile8 : false,
}

let isErrorInit = {
    error1 : '',
    error2 : '',
    error3 : '',
    error4 : '',
    error5 : '',
    error6 : '',
    error7 : '',
    error8 : '',
}

export class FifthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actorInfo : initValue,
            isFile    : isFileInit,
            isError   : isErrorInit,
            addMovie_msg : ''
        }
    }

    onChangeInputHandler = (e) => {
        this.setState({
            actorInfo : {...this.state.actorInfo,[e.target.name]: e.target.value}
        })
    }

    onChangeFileHandler = (e) => {
        let name = e.target.name.split('');
        let num  = name[3]

        if(e.target.files[0]){
            if(e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg'){
                let dataFile = URL.createObjectURL(e.target.files[0]);
                let varIsFile  = 'isFile'+num;
                let errVar = 'error'+num;
                let varFile = 'file'+num;
                this.setState({
                    actorInfo : {...this.state.actorInfo, [e.target.name]: e.target.files[0], [varFile]: dataFile},isFile : {...this.state.isFile, [varIsFile]: true},isError: {...this.state.isError,[errVar]: ''}
                })
                
            }else{
                let errVar = 'error'+num
                e.target.value = null;
                this.setState({
                    isError : {
                        ...this.state.isError,
                        [errVar] : 'Please upload only jpeg, png, jpg file'
                    }
                })
            }
        }
    }





    onClickSubmit = async (e) =>{
        e.preventDefault();
        //console.log(this.state.actorInfo);
        let fd1 = new FormData();
        fd1.append('num_movie_id',localStorage.getItem('movie_id'));
        fd1.append('txt_player1_image', this.state.actorInfo.img1);

        let fd2 = new FormData();
        fd2.append('num_movie_id',localStorage.getItem('movie_id'));
        fd2.append('txt_player2_image', this.state.actorInfo.img2);

        let fd3 = new FormData();
        fd3.append('num_movie_id',localStorage.getItem('movie_id'));
        fd3.append('txt_player3_image', this.state.actorInfo.img3);

        let fd4 = new FormData();
        fd4.append('num_movie_id',localStorage.getItem('movie_id'));
        fd4.append('txt_player4_image', this.state.actorInfo.img4);

        let fd5 = new FormData();
        fd5.append('num_movie_id',localStorage.getItem('movie_id'));
        fd5.append('txt_player5_image', this.state.actorInfo.img5);

        let fd6 = new FormData();
        fd6.append('num_movie_id',localStorage.getItem('movie_id'));
        fd6.append('txt_player6_image', this.state.actorInfo.img6);

        let fd7 = new FormData();
        fd7.append('num_movie_id',localStorage.getItem('movie_id'));
        fd7.append('txt_player7_image', this.state.actorInfo.img7);

        let fd8 = new FormData();
        fd8.append('num_movie_id',localStorage.getItem('movie_id'));
        fd8.append('txt_player8_image', this.state.actorInfo.img8);
        

        let playerData = {
            movie_id           : localStorage.getItem('movie_id'),

            player_name_1      : this.state.actorInfo.actor1,
            player_name_role_1 : this.state.actorInfo.role1,

            player_name_2      : this.state.actorInfo.actor2,
            player_name_role_2 : this.state.actorInfo.role2,

            player_name_3      : this.state.actorInfo.actor3,
            player_name_role_3 : this.state.actorInfo.role3,

            player_name_4      : this.state.actorInfo.actor4,
            player_name_role_4 : this.state.actorInfo.role4,

            player_name_5      : this.state.actorInfo.actor5,
            player_name_role_5 : this.state.actorInfo.role5,

            player_name_6      : this.state.actorInfo.actor6,
            player_name_role_6 : this.state.actorInfo.role6,

            player_name_7      : this.state.actorInfo.actor7,
            player_name_role_7 : this.state.actorInfo.role7,

            player_name_8      : this.state.actorInfo.actor8,
            player_name_role_8 : this.state.actorInfo.role8
        }


        await axios.post('https://www.api3.digimovieplex.com/api/add_movie_player/',playerData).then((resp) => {
            //console.log(resp.data.status);
            if(resp.data.status === 'success'){
                axios.post('https://www.api3.digimovieplex.com/api/upload_ImagePlayer1/',fd1);
                axios.post('https://www.api3.digimovieplex.com/api/upload_ImagePlayer2/',fd2);
                axios.post('https://www.api3.digimovieplex.com/api/upload_ImagePlayer3/',fd3);
                axios.post('https://www.api3.digimovieplex.com/api/upload_ImagePlayer4/',fd4);
                axios.post('https://www.api3.digimovieplex.com/api/upload_ImagePlayer5/',fd5);
                axios.post('https://www.api3.digimovieplex.com/api/upload_ImagePlayer6/',fd6);
                axios.post('https://www.api3.digimovieplex.com/api/upload_ImagePlayer7/',fd7);
                axios.post('https://www.api3.digimovieplex.com/api/upload_ImagePlayer8/',fd8);
                this.setState({addMovie_msg : resp.data.message},()=>{
                    setTimeout(()=>{
                        this.props.next()
                    },500)
                });
                this.setState({actorInfo:initValue});
            }else{
                this.setState({addMovie_msg : resp.data.message});
            }
        }).catch((errorMsg) => {
            console.log(errorMsg);
        })

        //e.target.get(0).reset();
    }

    removeFile = (num) => {
        let imgVar  = 'img'+num;
        let varIsFile = 'isFile'+num;
        let varFile = 'file'+num;
        this.setState({
            actorInfo : {...this.state.actorInfo, [imgVar] : null, [varFile] : null},
            isFile    : {...this.state.isFile,[varIsFile] : false}
        })
    }

    async componentDidMount() {
        if(localStorage.getItem('movie_id')){
            let movie_id = localStorage.getItem('movie_id');
            await axios.post('https://www.api3.digimovieplex.com/api/getMoviePlayerDetails/',{movie_id}).then((res) => {
                
                if(res.data.status === 'success'){
                    this.setState({
                        actorInfo : {
                            ...this.state.actorInfo,
                            actor1: res.data.response.txt_player1,
                            actor2: res.data.response.txt_player2,
                            actor3: res.data.response.txt_player3,
                            actor4: res.data.response.txt_player4,
                            actor5: res.data.response.txt_player5,
                            actor6: res.data.response.txt_player6,
                            actor7: res.data.response.txt_player7,
                            actor8: res.data.response.txt_player8, 

                            role1: res.data.response.txt_player1_role,
                            role2: res.data.response.txt_player2_role,
                            role3: res.data.response.txt_player3_role,
                            role4: res.data.response.txt_player4_role,
                            role5: res.data.response.txt_player5_role,
                            role6: res.data.response.txt_player6_role,
                            role7: res.data.response.txt_player7_role,
                            role8: res.data.response.txt_player8_role,
                        }
                    })
                    if(res.data.response.txt_player1_image !== '' && res.data.response.txt_player1_image !== 'undefined'){
                        this.setState({
                            actorInfo : {...this.state.actorInfo, file1 : `https://www.api3.digimovieplex.com/${res.data.response.txt_player1_image}`},
                            isFile    : {...this.state.isFile, isFile1 : true}
                        })
                    }

                    if(res.data.response.txt_player2_image !== '' && res.data.response.txt_player2_image !== 'undefined'){
                        this.setState({
                            actorInfo : {...this.state.actorInfo, file2 : `https://www.api3.digimovieplex.com/${res.data.response.txt_player2_image}`},
                            isFile    : {...this.state.isFile, isFile2 : true}
                        })
                    }

                    if(res.data.response.txt_player3_image !== '' && res.data.response.txt_player3_image !== 'undefined'){
                        this.setState({
                            actorInfo : {...this.state.actorInfo, file3 : `https://www.api3.digimovieplex.com/${res.data.response.txt_player3_image}`},
                            isFile    : {...this.state.isFile, isFile3 : true}
                        })
                    }

                    if(res.data.response.txt_player4_image !== '' && res.data.response.txt_player4_image !== 'undefined'){
                        this.setState({
                            actorInfo : {...this.state.actorInfo, file4 : `https://www.api3.digimovieplex.com/${res.data.response.txt_player4_image}`},
                            isFile    : {...this.state.isFile, isFile4 : true}
                        })
                    }

                    if(res.data.response.txt_player5_image !== '' && res.data.response.txt_player5_image !== 'undefined'){
                        this.setState({
                            actorInfo : {...this.state.actorInfo, file5 : `https://www.api3.digimovieplex.com/${res.data.response.txt_player5_image}`},
                            isFile    : {...this.state.isFile, isFile5 : true}
                        })
                    }

                    if(res.data.response.txt_player6_image !== '' && res.data.response.txt_player6_image !== 'undefined'){
                        this.setState({
                            actorInfo : {...this.state.actorInfo, file6 : `https://www.api3.digimovieplex.com/${res.data.response.txt_player6_image}`},
                            isFile    : {...this.state.isFile, isFile6 : true}
                        })
                    }

                    if(res.data.response.txt_player7_image !== '' && res.data.response.txt_player7_image !== 'undefined'){
                        this.setState({
                            actorInfo : {...this.state.actorInfo, file7 : `https://www.api3.digimovieplex.com/${res.data.response.txt_player7_image}`},
                            isFile    : {...this.state.isFile, isFile7 : true}
                        })
                    }

                    if(res.data.response.txt_player8_image !== '' && res.data.response.txt_player8_image !== 'undefined'){
                        this.setState({
                            actorInfo : {...this.state.actorInfo, file8 : `https://www.api3.digimovieplex.com/${res.data.response.txt_player8_image}`},
                            isFile    : {...this.state.isFile, isFile8 : true}
                        })
                    }
                }

            })
        }
    }
    render(){
        return(
            <Form name="page5" {...this.props}>
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
                <h2>Movie Characters</h2>
                <Grid container spacing={2}>
                
                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="actor1"
                                label="Actor's name"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.actor1}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="role1"
                                label="Actor's Role"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.role1}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        {(this.state.isFile.isFile1)? 
                            <>
                                <img style={{width: "300px", height: "160px"}} src={this.state.actorInfo.file1} />
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={()=> this.removeFile(1)}>Remove File</button>
                                </div>
                            </>
                        :
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img1" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        }
                        <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isError.error1 && this.state.isError.error1}</span>  
                        </Grid>
                    </Grid><hr/>


                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="actor2"
                                label="Actor's name"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.actor2}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="role2"
                                label="Actor's Role"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.role2}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        {(this.state.isFile.isFile2)? 
                            <>
                                <img style={{width: "300px", height: "160px"}} src={this.state.actorInfo.file2} />
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={()=> this.removeFile(2)}>Remove File</button>
                                </div>
                            </>
                        :
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img2" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        }
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isError.error2 && this.state.isError.error2}</span> 
                        </Grid>
                    </Grid><hr/>


                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="actor3"
                                label="Actor's name"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.actor3}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="role3"
                                label="Actor's Role"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.role3}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        {(this.state.isFile.isFile3)? 
                            <>
                                <img style={{width: "300px", height: "160px"}} src={this.state.actorInfo.file3} />
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={()=> this.removeFile(3)}>Remove File</button>
                                </div>
                            </>
                        :
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img3" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        }
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isError.error3 && this.state.isError.error3}</span> 
                        </Grid>
                    </Grid><hr/>


                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="actor4"
                                label="Actor's name"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.actor4}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="role4"
                                label="Actor's Role"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.role4}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        {(this.state.isFile.isFile4)? 
                            <>
                                <img style={{width: "300px", height: "160px"}} src={this.state.actorInfo.file4} />
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={()=> this.removeFile(4)}>Remove File</button>
                                </div>
                            </>
                        :
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img4" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        }
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isError.error4 && this.state.isError.error4}</span> 
                        </Grid>
                    </Grid><hr/>


                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="actor5"
                                label="Actor's name"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.actor5}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="role5"
                                label="Actor's Role"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.role5}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        {(this.state.isFile.isFile5)? 
                            <>
                                <img style={{width: "300px", height: "160px"}} src={this.state.actorInfo.file5} />
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={()=> this.removeFile(5)}>Remove File</button>
                                </div>
                            </>
                        :
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img5" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        }
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isError.error5 && this.state.isError.error5}</span> 
                        </Grid>
                    </Grid><hr/>


                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="actor6"
                                label="Actor's name"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.actor6}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="role6"
                                label="Actor's Role"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.role6}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        {(this.state.isFile.isFile6)? 
                            <>
                                <img style={{width: "300px", height: "160px"}} src={this.state.actorInfo.file6} />
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={()=> this.removeFile(6)}>Remove File</button>
                                </div>
                            </>
                        :
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img6" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        }
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isError.error6 && this.state.isError.error6}</span> 
                        </Grid>
                    </Grid><hr/>


                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="actor7"
                                label="Actor's name"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.actor7}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="role7"
                                label="Actor's Role"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.role7}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        {(this.state.isFile.isFile7)? 
                            <>
                                <img style={{width: "300px", height: "160px"}} src={this.state.actorInfo.file7} />
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={()=> this.removeFile(7)}>Remove File</button>
                                </div>
                            </>
                        :
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img7" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        }
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isError.error7 && this.state.isError.error7}</span> 
                        </Grid>
                    </Grid><hr/>


                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="actor8"
                                label="Actor's name"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.actor8}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="role8"
                                label="Actor's Role"
                                type="actor"
                                id="actor"
                                value={this.state.actorInfo.role8}
                                onChange={this.onChangeInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        {(this.state.isFile.isFile8)? 
                            <>
                                <img style={{width: "300px", height: "160px"}} src={this.state.actorInfo.file8} />
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={()=> this.removeFile(8)}>Remove File</button>
                                </div>
                            </>
                        :
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img8" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        }
                            <span style={{color:'#ff0000',fontSize:'10px'}}>{this.state.isError.error8 && this.state.isError.error8}</span> 
                        </Grid>
                        <h3 className="message" id="down_message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3>

                    </Grid>
                </Grid>
                <hr />
                <button id="style_button" type="button" onClick={this.props.previous}>
                    Previous Page
                </button>
                <button id="style_button" type="submit" onClick={this.onClickSubmit}>Submit and Proceed</button>
            </Form>
        )
    }
}

export default FifthForm;
