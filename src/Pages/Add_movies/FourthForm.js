import React, { Component } from 'react';
import { Form } from "usetheform";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from "axios";

const initValue = {
    cast_1: '',
    cast_2: '',
    cast_3: '',
    cast_4: '',
    cast_5: '',
    cast_6: '',
}

export class FourthForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieCast: initValue,
            addMovie_msg: ''
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            movieCast: { ...this.state.movieCast, [e.target.name]: e.target.value }
        })
    }

    addMovieCast = async (e) => {
        e.preventDefault();
        //console.log(this.state.movieCast);
        let movieCast = {
            movie_id: localStorage.getItem('movie_id'),
            cast_1: this.state.movieCast.cast_1,
            cast_2: this.state.movieCast.cast_2,
            cast_3: this.state.movieCast.cast_3,
            cast_4: this.state.movieCast.cast_4,
            cast_5: this.state.movieCast.cast_5,
            cast_6: this.state.movieCast.cast_6,
            launch_event: "0"
        }
        //status: "success", message: "Movie Cast registration successfully"
        await axios.post('https://www.api3.digimovieplex.com/api/add_movie_cast/', movieCast).then((res) => {
            if (res.data.status === "success") {
                this.setState({ cast: initValue });
                this.setState({ addMovie_msg: res.data.message },()=>{
                    setTimeout(()=>{
                        this.props.next()
                    },500)
                });
            } else {
                this.setState({ addMovie_msg: res.data.message });
            }
        })
    }

    async componentDidMount() {
        if(localStorage.getItem('movie_id')){
            let movie_id = localStorage.getItem('movie_id');
            await axios.post('https://www.api3.digimovieplex.com/api/getMovieCastDetails',{movie_id}).then((res) => {
                //console.log(res.data.response);
                if(res.data.status === "success"){
                    this.setState({
                        movieCast: {
                            ...this.state.movieCast,
                            cast_1: res.data.response.txt_cast_1,
                            cast_2: res.data.response.txt_cast_2,
                            cast_3: res.data.response.txt_cast_3,
                            cast_4: res.data.response.txt_cast_4,
                            cast_5: res.data.response.txt_cast_5,
                            cast_6: res.data.response.txt_cast_6    
                        }
                    })
                }
            })
        }
    }

    render() {
        return (
            <Form name="page4">
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
                <h2>Movie Casts</h2>
                <Grid className="add_image" container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="cast_1"
                            label="Cast's name"
                            type="cast"
                            id="cast"
                            value={this.state.movieCast.cast_1}
                            onChange={this.onChangeHandler}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="cast_2"
                            label="Cast's name"
                            type="cast"
                            id="cast"
                            value={this.state.movieCast.cast_2}
                            onChange={this.onChangeHandler}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="cast_3"
                            label="Cast's name"
                            type="cast"
                            id="cast"
                            value={this.state.movieCast.cast_3}
                            onChange={this.onChangeHandler}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="cast_4"
                            label="Cast's name"
                            type="cast"
                            id="cast"
                            value={this.state.movieCast.cast_4}
                            onChange={this.onChangeHandler}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="cast_5"
                            label="Cast's name"
                            type="cast"
                            id="cast"
                            value={this.state.movieCast.cast_5}
                            onChange={this.onChangeHandler}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="cast_6"
                            label="Cast's name"
                            type="cast"
                            id="cast"
                            value={this.state.movieCast.cast_6}
                            onChange={this.onChangeHandler}
                            />
                    </Grid>
                    <h3 className="message" >{this.state.addMovie_msg && this.state.addMovie_msg}</h3>
                </Grid>
                <button id="style_button" type="button" onClick={this.props.previous}>Previous Page</button>
                <button id="style_button" type="submit" onClick={this.addMovieCast}>Submit and Proceed</button>
            </Form>

        )
    }
}

export default FourthForm;
