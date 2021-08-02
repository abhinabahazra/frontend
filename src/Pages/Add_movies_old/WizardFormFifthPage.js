import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "usetheform";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
};

class WizardFormFifthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actorInfo : initValue,
            addMovie_msg : ''
        }
    }

    onChangeInputHandler = (e) => {
        this.setState({
            actorInfo : {...this.state.actorInfo,[e.target.name]: e.target.value}
        })
    }
    onChangeFileHandler = (e) => {
        this.setState({
            actorInfo : {...this.state.actorInfo,[e.target.name]: e.target.files[0]}
        })
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
                this.setState({addMovie_msg : resp.data.message});
            }else{
                this.setState({addMovie_msg : resp.data.message});
            }
        }).catch((error) => {
            console.log(error);
        })

        //e.target.get(0).reset();
        this.setState({actorInfo:initValue});
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img1" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img2" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img3" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img4" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img5" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img6" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img7" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="img8" label="Actor's Image" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        </Grid>
                        <h3 className="message" id="down_message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3>

                    </Grid>
                </Grid>
                <hr />
                <button id="style_button" type="submit" onClick={this.onClickSubmit}>submit data</button>
                <button id="style_button" type="button" onClick={this.props.prevPage}>
                    Previous Page
                </button>
                <button id="style_button" type="submit" onClick={this.props.nextPage}>next page</button>
            </Form>
        )
    }
}
export default WizardFormFifthPage;