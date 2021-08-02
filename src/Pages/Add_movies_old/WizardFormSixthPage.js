import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "usetheform";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";



// const useStyles = makeStyles((theme) => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },

// }));
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class WizardFormSixthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileData: {},
            addMovie_msg: '',
            loader: false,
            upload: 0,
        }
    }

    onChangeFileHandler = (e) => {
        this.setState({
            fileData: { ...this.state.fileData, [e.target.name]: e.target.files[0] }
        });
    }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        this.setState({ ...this.state, loader: true });
        //console.log(this.state.fileData);
        // let fd = new FormData();
        // fd.append('banner_1', this.state.fileData.banner_1);
        // fd.append('banner_2', this.state.fileData.banner_2);
        // fd.append('screenshot_1', this.state.fileData.screenshot_1);
        // fd.append('screenshot_2', this.state.fileData.screenshot_2);
        // fd.append('screenshot_3', this.state.fileData.screenshot_3);
        // fd.append('screenshot_4', this.state.fileData.screenshot_4);

        let banner_one = new FormData();
        banner_one.append('txt_banner1', this.state.fileData.banner_1);
        banner_one.append('num_movie_id', localStorage.getItem('movie_id'));

        let banner_two = new FormData();
        banner_two.append('txt_banner2', this.state.fileData.banner_2);
        banner_two.append('num_movie_id', localStorage.getItem('movie_id'));

        let screenshot_one = new FormData();
        screenshot_one.append('txt_screenshot1', this.state.fileData.screenshot_1);
        screenshot_one.append('num_movie_id', localStorage.getItem('movie_id'));

        let screenshot_two = new FormData();
        screenshot_two.append('txt_screenshot2', this.state.fileData.screenshot_2);
        screenshot_two.append('num_movie_id', localStorage.getItem('movie_id'));

        let screenshot_three = new FormData();
        screenshot_three.append('txt_screenshot3', this.state.fileData.screenshot_3);
        screenshot_three.append('num_movie_id', localStorage.getItem('movie_id'));

        let screenshot_four = new FormData();
        screenshot_four.append('txt_screenshot4', this.state.fileData.screenshot_4);
        screenshot_four.append('num_movie_id', localStorage.getItem('movie_id'));

        let trailer_one = new FormData();
        trailer_one.append('txt_trailer1', this.state.fileData.trailer_1);
        trailer_one.append('num_movie_id', localStorage.getItem('movie_id'));

        let trailer_two = new FormData();
        trailer_two.append('txt_trailer2', this.state.fileData.trailer_2);
        trailer_two.append('num_movie_id', localStorage.getItem('movie_id'));

        let movie_upload = new FormData();
        movie_upload.append('txt_movie', this.state.fileData.movie);
        movie_upload.append('num_movie_id', localStorage.getItem('movie_id'));


        await axios.post('https://www.api3.digimovieplex.com/api/upload_banner1', banner_one, {onUploadProgress: (ev) => {
            if (ev.lengthComputable) {
                console.log(ev.loaded + " " + ev.total)
                this.setState({...this.state, upload: (Math.round(ev.loaded * 100 / ev.total))})
            }
        }}).then((response) => {
            if (response.data.status === "Success") {
                axios.post('https://www.api3.digimovieplex.com/api/upload_trailer1', trailer_one, {onUploadProgress: (ev) => {
                    if (ev.lengthComputable) {
                        console.log(ev.loaded + " " + ev.total)
                        this.setState({...this.state, upload: (Math.round(ev.loaded * 100 / ev.total))})
                    }
                }}).then((response) => {
    
                    if (response.data.status === "Success") {
                        axios.post('https://www.api3.digimovieplex.com/api/upload_movie', movie_upload,{onUploadProgress: (ev) => {
                            if (ev.lengthComputable) {
                                console.log((Math.round(ev.loaded * 100 / ev.total)))
                                this.setState({...this.state, upload: (Math.round(ev.loaded * 100 / ev.total))})
                            }
                        }}).then((response) => {
                            this.setState({...this.state, upload: 0})
                            if (response.data.status === "Success") {
                                axios.post('https://www.api3.digimovieplex.com/api/upload_banner2', banner_two);
                                axios.post('https://www.api3.digimovieplex.com/api/upload_screenshot1', screenshot_one);
                                axios.post('https://www.api3.digimovieplex.com/api/upload_screenshot2', screenshot_two);
                                axios.post('https://www.api3.digimovieplex.com/api/upload_screenshot3', screenshot_three);
                                axios.post('https://www.api3.digimovieplex.com/api/upload_screenshot4', screenshot_four);
                                axios.post('https://www.api3.digimovieplex.com/api/upload_trailer2', trailer_two);
                                this.setState({ addMovie_msg: 'Movie uploadation is successful', loader: false });
                            } else {
                                this.setState({ addMovie_msg: 'Sorry, Banner_1 and Trailer_1 uploadation is success, but Movie uploadation is fail', loader: false });
                            }
                        })
                    } else {
                        this.setState({ addMovie_msg: 'Sorry, Banner_1 uploadation is success, but Trailer_1 uploadation is fail', loader: false });
                    }
                })
            } else {
                this.setState({ addMovie_msg: 'Sorry, Banner_1 uploadation is fail', loader: false });
            }
        })
    }


    render() {

        return (
            <Form name="page6" {...this.props}>
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
                <h2>Movie links </h2>
                <Grid container spacing={2}>
                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="banner_1" label="Banner 1" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        <p  className="instructions" >Banner should be 460(V) x 300(H) in size</p>

                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="banner_2" label="Banner 2" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                            <p className="instructions" >Banner should be 460(V) x 300(H) in size</p>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="screenshot_1" label="Screenshot 1" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="screenshot_2" label="Screenshot 2" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="screenshot_3" label="Screenshot 3" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="screenshot_4" label="Screenshot 4" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="trailer_1" label="Trailer 1" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="trailer_2" label="Trailer 2" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="movie" label="Movie" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {this.state.loader ?  <div className="loader">
                    <HashLoader color={"green"} />
                        <p>Please wait.. { this.state.upload > 0 ? `Uploading ${this.state.upload}%` : 'Uploading..' }</p>
                    </div>: null}

                        </Grid>
                    </Grid>
                   
                    <h3 className="message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3>


                </Grid>
                <hr />
                <button id="style_button" type="submit" onClick={this.onSubmitHandler}>submit data</button>
                <button id="style_button" type="button" onClick={this.props.prevPage}>
                    Previous Page
                </button>
                <button id="style_button" type="submit" onClick={this.props.nextPage}>next page</button>
            </Form>
        )
    }
}

export default WizardFormSixthPage;