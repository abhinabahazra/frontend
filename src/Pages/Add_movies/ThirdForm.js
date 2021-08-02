import React, { Component } from 'react';
import { Form} from "usetheform";
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import doc from './doc.jpg';
import pdf from './pdf.png';

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
    subtitle: '',
    publication: '',
    synopsis: '',
    release_date: '',
    file:''
}

export class ThirdForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: intiValue,
            category: [],
            language: [],
            genre: [],
            movie_id: 0,
            isCensor: false,
            progress:0,
            addMovie_msg: '',
            fileError: '',
            isFile: false,
        }
    }

    onChangeInputHandler = (e) => {
        //alert(e.target)
        this.setState({
            movieData: { ...this.state.movieData, [e.target.name]: e.target.value }
        });
    }

    removeFile = () => {
        this.setState({ 
            movieData: { ...this.state.movieData, certificate_link: null, file: null}, isFile : false
        })
    }
    
    onChangeFileHandler = (e) => {
        
        if(e.target.files[0]){
            if((e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'application/pdf' || e.target.files[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || e.target.files[0].type === 'application/vnd.oasis.opendocument.text')){

                let dataFile = '';
                if(e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg'){
                    dataFile = URL.createObjectURL(e.target.files[0]);
                }else if(e.target.files[0].type === 'application/pdf'){
                    dataFile = pdf;
                }else if(e.target.files[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || e.target.files[0].type === 'application/vnd.oasis.opendocument.text'){
                    dataFile = doc;
                }
                
                this.setState({
                    movieData: { ...this.state.movieData, certificate_link: e.target.files[0], file: dataFile}
                },()=>{
                    this.setState({fileError : '', isFile: true})
                });
            }else{
                e.target.value = null;
                this.setState({fileError:'Please upload only jpeg, png, jpg, doc and pdf file'})
            }
        }
        
    }

    // onChangeFileHandler = (e) => {
        
    // }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        let { txt_user_id } = JSON.parse(sessionStorage.getItem('auth'));

        let formData = new FormData();
        let movieDetails = {
            movie_title: this.state.movieData.title,
            movie_category: this.state.movieData.category,
            movie_genre: this.state.movieData.genre,
            director: this.state.movieData.director,
            producer: this.state.movieData.producer,
            subtitle: this.state.movieData.subtitle,
            publication: this.state.movieData.publication,
            synopsis: this.state.movieData.synopsis,
            movie_language: this.state.movieData.language,
            length_min: this.state.movieData.duration,
            release_date: this.state.movieData.release_date,
            user_created: txt_user_id,
            censor_certificate: this.state.movieData.certificate,
            movie_id : (localStorage.getItem('movie_id'))? localStorage.getItem('movie_id') : ''
        };


        await axios.post('https://www.api3.digimovieplex.com/api/add_movie/', movieDetails).then((res) => {
            if (res.data.status === "success") {
                localStorage.setItem('movie_id', res.data.response.id);
                this.setState({
                    movie_id: res.data.response.id
                }, () => {
                    if (parseInt(this.state.movieData.certificate) && this.state.movieData.certificate_link) {
                            
                            formData.append('id', this.state.movie_id);
                            formData.append('file', this.state.movieData.certificate_link);
                            const options = {
                                onUploadProgress: (progressEvent) => {
                                    const {loaded, total} = progressEvent;
                                    let percent = Math.floor((loaded * 100) / total)
                                    if(percent < 100){
                                        this.setState({progress : percent})
                                    }
                                }
                            }
                            console.log('Enter');
                            axios.post('https://www.api3.digimovieplex.com/api/file/upload_CensorCertificate', formData, options).then((resp) => {
                                if (resp.data.status === "success") {
                                    //this.setState({ movieData: intiValue });
                                    this.setState({progress : 100},()=>{
                                        setTimeout(()=>{
                                            this.setState({progress : 0})
                                        },100)
                                    })
                                    this.setState({
                                        addMovie_msg: res.data.message
                                    },()=>{
                                        setTimeout(()=>{
                                            this.props.next()
                                        },500)
                                    })
                                } else {
                                    this.setState({
                                        addMovie_msg: res.data.message + ". But Censor Certificate is failed to upload"
                                    })
                                }
                            }).catch((error) => {
                                console.log(error);
                            });
                    } else {
                        this.setState({ movieData: intiValue });
                        this.setState({
                            addMovie_msg: res.data.message
                        },()=>{
                            setTimeout(()=>{
                                this.props.next()
                            },500)
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

        if(localStorage.getItem('movie_id')){
            let id = localStorage.getItem('movie_id');
            await axios.post('https://www.api3.digimovieplex.com/api/getMovieDetails',{id}).then((res) => {
                console.log("aaaaa",res.data.response)
                if(res.data.status === "success"){
                    let getDate = new Date(res.data.response.dat_release_date);
                    let releseDate = getDate.toISOString().slice(0,10);
                    this.setState({movieData: { ...this.state.movieData, 
                        title: res.data.response.txt_movie_title,
                        category: res.data.response.num_movie_category,
                        genre   : res.data.response.num_movie_genre,
                        duration : res.data.response.length_min,
                        director : res.data.response.txt_director,
                        producer : res.data.response.txt_producer,
                        publication : res.data.response.txt_publication,
                        synopsis : res.data.response.txt_synopsis,
                        language : res.data.response.num_movie_language,
                        release_date: releseDate,
                        certificate: res.data.response.yn_censor_certificate.trim(),
                        subtitle : res.data.response.yn_movie_subtitle
                    }});

                    if(res.data.response.txt_certificate_link !== '' && res.data.response.txt_certificate_link !== 'undefined' && res.data.response.txt_certificate_link !==null){
      
                        let var1 = res.data.response.txt_certificate_link.split('/');
                        let var2 = var1[2].split('.');
                        let fileData;

                        if(var2[1] === 'png' || var2[1] === 'jpeg' || var2[1] === 'jpg'){
                            fileData = `${res.data.response.txt_certificate_link}`;
                        }else if(var2[1] === 'pdf'){
                            fileData = pdf
                        }else{
                            fileData = doc
                        }

                        this.setState({
                            fileError : '', isFile: true, movieData: { ...this.state.movieData, file: fileData}
                        })
                    }
                }
            })
        }
    }

    render() {
        //localStorage.removeItem('movie_id');
        //console.log(localStorage.getItem('movie_id'))
        return (
            <Form name="page3">
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
                                    {this.state.category && this.state.category.map(e => <option value={e.id} selected={this.state.movieData.category === e.id}>{e.category}</option>)}
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div class="form-group" >
                                <label >Genre</label>
                                <select onChange={this.onChangeInputHandler}
                                    value={this.state.movieData.genre} id="inputState" class="form-control" name="genre">
                                    <option selected>~ SELECT ~</option>
                                    {this.state.genre && this.state.genre.map(e => <option value={e.id} selected={this.state.movieData.genre === e.id}>{e.genre}</option>)}
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div class="form-group" >
                                <label >Language</label>
                                <select onChange={this.onChangeInputHandler}
                                    value={this.state.movieData.language} id="inputState" class="form-control" name="language">
                                    <option selected>~ SELECT ~</option>
                                    {this.state.language && this.state.language.map(e => <option value={e.id} selected={this.state.movieData.language === e.id}>{e.language}</option>)}
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
                                    <option value="1" selected={this.state.movieData.certificate === '1'}>Yes</option>
                                    <option value="0" selected={this.state.movieData.certificate === '0'}>No</option>
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        {(this.state.isFile)?
                            <>
                                <img style={{width: "300px", height: "160px"}} src={this.state.movieData.file} />
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={this.removeFile}>Remove File</button>
                                </div>
                            </>
                            :
                            <>
                            <TextField
                                className="mb-3"
                                variant="outlined"
                                onChange={this.onChangeFileHandler}
                                fullWidth
                                name="certificate_link"
                                type="file" accept="video/image/*" name="img" label="Upload Certificate PDF" id="castsss"
                            />
                            <p className="instructions" >Only PDF Files.</p>
                            </>
                        }
                            
                            <span style={{color:'#ff0000', fontSize:'10px'}}>{this.state.fileError && this.state.fileError}</span>
                            {this.state.progress && <LinearProgress variant="determinate" value={this.state.progress} />}
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
                                <select id="inputState" class="form-control" name="subtitle" onChange={this.onChangeInputHandler}>
                                    <option selected>~ SELECT ~</option>
                                    <option value="1" selected={this.state.movieData.subtitle === '1'}>Yes</option>
                                    <option value="0" selected={this.state.movieData.subtitle === '0'}>No</option>
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
                <button id="style_button" type="button" onClick={this.props.previous}>Previous Page</button>
                <button id="style_button" type="submit" onClick={this.onSubmitHandler}>Submit and Proceed</button>
            </Form>
        );
    }
}

export default ThirdForm;
