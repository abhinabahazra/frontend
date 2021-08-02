import React from "react";
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

const intiValue = {
    title: '',
    category: '',
    genre: '',
    language: '',
    duration: '',
    certificate: '',
    certificate_link: '',
    director: '',
    producer: '',
    publication: '',
    synopsis: '',
    release_date: ''
}

export default class WizardFormThirdPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: intiValue,
            category: [],
            language: [],
            genre: [],
            movie_id: 0,
            isCensor: false,
            addMovie_msg: ''
        }
    }

    onChangeInputHandler = (e) => {
        this.setState({
            movieData: { ...this.state.movieData, [e.target.name]: e.target.value }
        });
    }

    onChangeFileHandler = (e) => {
        this.setState({
            movieData: { ...this.state.movieData, certificate_link: e.target.files[0] }
        });
    }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        //console.log(sessionStorage.getItem('auth'));
        let { txt_user_id } = (sessionStorage.getItem('auth')) ? JSON.parse(sessionStorage.getItem('auth')) : { txt_user_id: 'dunny.user@gmail.com' };

        let formData = new FormData();
        let movieDetails = {
            movie_title: this.state.movieData.title,
            movie_category: this.state.movieData.category,
            movie_genre: this.state.movieData.genre,
            director: this.state.movieData.director,
            producer: this.state.movieData.producer,
            publication: this.state.movieData.publication,
            synopsis: this.state.movieData.synopsis,
            movie_language: this.state.movieData.language,
            length_min: this.state.movieData.duration,
            release_date: this.state.movieData.release_date,
            user_created: txt_user_id || 'dunny.user@gmail.com'
        };

        await axios.post('https://www.api3.digimovieplex.com/api/add_movie/', movieDetails).then((res) => {
            // console.log(res.data);
            if (res.data.status === "success") {
                localStorage.setItem('movie_id', res.data.response.id);
                this.setState({
                    movie_id: res.data.response.id
                }, () => {
                    if (parseInt(this.state.movieData.certificate)) {
                        // console.log(this.state.movie_id);
                        // console.log(this.state.movieData.certificate_link);
                        formData.append('id', this.state.movie_id);
                        formData.append('txt_certificate_link', this.state.movieData.certificate_link);
                        axios.post('https://www.api3.digimovieplex.com/api/upload_CensorCertificate', formData).then((resp) => {
                            //console.log(resp.data);
                            if (resp.data.status === "Success") {
                                this.setState({
                                    addMovie_msg: res.data.message
                                })
                            } else {
                                this.setState({
                                    addMovie_msg: res.data.message + ". But Censor Certificate is faild to upload"
                                })
                            }
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else {
                        this.setState({
                            addMovie_msg: res.data.message
                        })
                    }
                })
            } else {
                this.setState({
                    addMovie_msg: res.data.message
                })
            }
        }).catch((error) => {
            console.log(error);
        })

        //e.target.reset();
        this.setState({ movieData: intiValue });
    }

    async componentDidMount() {
        await axios.get('https://www.api3.digimovieplex.com/api/movie_category_list').then((res) => {
            this.setState({ category: res.data.response })
        });

        await axios.get('https://www.api3.digimovieplex.com/api/movie_language_list').then((res) => {
            this.setState({ language: res.data.response })
        });

        await axios.get('https://www.api3.digimovieplex.com/api/genre_user_list').then((res) => {
            this.setState({ genre: res.data.response })
        });
    }

    render() {
        //sessionStorage.removeItem('auth')
        return (
            <Form name="page3" {...this.props}>
                <p>Read these before you start. You will need to keep some image and video files ready</p>
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
                <h2>Movie Details</h2>
                <Grid container spacing={2}>
                    <Grid className="add_description" container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="mtitle"
                                name="title"
                                variant="outlined"
                                fullWidth
                                id="title"
                                type="text"
                                onChange={this.onChangeInputHandler}
                                value={this.state.movieData.title}
                                label="Movie Title"
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Grid className="add_description" container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <div class="form-group" >
                                <label >Category</label>
                                <select onChange={this.onChangeInputHandler}
                                    value={this.state.movieData.category} id="inputState" class="form-control" name="category">
                                    <option selected>~ SELECT ~</option>
                                    {this.state.category && this.state.category.map(e => <option value={e.id}>{e.category}</option>)}
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div class="form-group" >
                                <label >Genre</label>
                                <select onChange={this.onChangeInputHandler}
                                    value={this.state.movieData.genre} id="inputState" class="form-control" name="genre">
                                    <option selected>~ SELECT ~</option>
                                    {this.state.genre && this.state.genre.map(e => <option value={e.id}>{e.genre}</option>)}
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div class="form-group" >
                                <label >Language</label>
                                <select onChange={this.onChangeInputHandler}
                                    value={this.state.movieData.language} id="inputState" class="form-control" name="language">
                                    <option selected>~ SELECT ~</option>
                                    {this.state.language && this.state.language.map(e => <option value={e.id}>{e.language}</option>)}
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="duration"
                                label="Duration"
                                type="duration"
                                id="duration"
                                onChange={this.onChangeInputHandler}
                                value={this.state.movieData.duration}
                                placeholder="Minutes"
                            />
                        </Grid>
                    </Grid>
                    <Grid className="add_description" container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <div class="form-group" >
                                <label >Censor Certificate</label>
                                <select id="inputState" class="form-control" name="certificate" onChange={this.onChangeInputHandler}>
                                    <option selected>~ SELECT ~</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                onChange={this.onChangeFileHandler}
                                fullWidth
                                name="certificate_link"
                                type="file" accept="video/image/*" name="img" label="Upload Certificate WORD/PDF" id="castsss"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="director"
                                label="Director"
                                type="director"
                                id="director"
                                onChange={this.onChangeInputHandler}
                                value={this.state.movieData.director}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="producer"
                                label="Producer"
                                type="producer"
                                id="producers"
                                onChange={this.onChangeInputHandler}
                                value={this.state.movieData.producer}
                            />
                        </Grid>
                    </Grid>
                    <Grid className="add_description" container spacing={2}>
                    <Grid item xs={12} sm={3}>
                            <div class="form-group" >
                                <label >Subtitles</label>
                                <select id="inputState" class="form-control" name="Subtitles" onChange={this.onChangeInputHandler}>
                                    <option selected>~ SELECT ~</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="publication"
                                label="Production House"
                                type="publication"
                                id="publication"
                                onChange={this.onChangeInputHandler}
                                value={this.state.movieData.publication}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="synopsis"
                                label="Synopsis"
                                type="synopsis"
                                id="synopsis"
                                onChange={this.onChangeInputHandler}
                                value={this.state.movieData.synopsis}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <form className="" noValidate>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.onChangeInputHandler}
                                    value={this.state.movieData.release_date}
                                    id="date"
                                    label="Release Date (For preference)" 
                                    type="date"
                                    className=""
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="release_date"
                                />
                                {/* {classes.container}, {classes.textField} */}
                            </form>
                        </Grid>
                        <h3 className="message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3>
                    </Grid>
                    <hr />
                </Grid>
                <button id="style_button" type="submit" onClick={this.onSubmitHandler}>submit data</button>
                <button id="style_button" type="button" onClick={this.props.prevPage}>
                    Previous Page
                </button>
                <button id="style_button" type="submit" onClick={this.props.nextPage}>next page</button>
            </Form>
        );
    }

}