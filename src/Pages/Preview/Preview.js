import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import "./Preview.css";
import EditIcon from '@material-ui/icons/Edit';
import BackupIcon from '@material-ui/icons/Backup';
import axios from "axios";
import swal from 'sweetalert';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    table: {
        minWidth: 650,
    },
}));

const intiValue = {
    movie: '',
    duration: '',
    preview_date: '',
    release_date: '',
}

export default function My_Drafts() {



    const classes = useStyles();

    //for get services
    const [movieDetails, setStateMovieDetails] = useState([]);
    const [selectMovieId, setSelectMovieId] = useState('');
    const [previewDate, setPreviewDate] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [duration, setDuration] = useState('');
    const [movieInfo, setMovieInfo] = useState([]);




    const [startDate, setStartDate] = useState('');

    const getMovieRelaeseDate = (e) => {

        setSelectMovieId(e.target.value);
        let movie_id = e.target.value;
        movieInfo.map((row) => {
            if (row.id === movie_id) {
                console.log("date",row.movie_start_time)
                let getDate = new Date(row.movie_start_time);
                setReleaseDate(getDate.toISOString().slice(0, 10));
                console.log("aaaaaaaaaaa", getDate.toISOString().slice(0, 10))
                setStartDate(getDate.toISOString().slice(0, 10));
            }
        })
    }

    const getMovieListName = () => {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            let producer_id = { 'user_id': num_user_id };
            fetch("https://www.api3.digimovieplex.com/api/get_Producer_live_cast", {
                method: 'POST',
                body: JSON.stringify(producer_id),
                headers: {
                    "Content-Type": 'application/json',
                }
            })
                .then((resp) => {
                    return resp.json();
                }).then((data) => {
                    console.log("vvvvvvvvvvv",data.response)
                    setMovieInfo(data.response)
                })
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            let producer_id = { 'user_id': num_user_id };
            fetch("https://www.api3.digimovieplex.com/api/get_Producer_live_castBy_Id2", {
                method: 'POST',
                body: JSON.stringify(producer_id),
                headers: {
                    "Content-Type": 'application/json',
                }
            })
                .then((resp) => {
                    return resp.json();
                }).then((data) => {
                    setStateMovieDetails(data.response)
                })
        }
        getMovieListName();
    }, [])
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
    const submitHandler = (e) => {
        e.preventDefault()
        console.log({ selectMovieId, previewDate, releaseDate, duration })
        if (sessionStorage.getItem('auth')) {
            console.log("xxxxxxxxxxxxx", JSON.parse(sessionStorage.getItem('auth')))
            let { num_user_id, txt_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            let data = {
                user_id: num_user_id,
                txt_user:txt_user_id,
                movie_id: selectMovieId,
                release_date: releaseDate ,
                livecast_date: previewDate,
                duration_mins: duration,
                livecast_link: "",
                livecast_name: ""
            }
            
            axios.post('https://www.api3.digimovieplex.com/api/add_Producer_Live_Cast', data).then((res) => {
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

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <h3>Producer Movie Table</h3>
                        <TableRow className="colu">
                            <TableCell>Sl No</TableCell>
                            <TableCell>Movie Name</TableCell>
                            <TableCell>Release Date</TableCell>
                            <TableCell>Live Telecast Time</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movieDetails && movieDetails.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">{i + 1}</TableCell>
                                <TableCell>{row.txt_movie_title && row.txt_movie_title}</TableCell>
                                <TableCell>{row.dat_release_date && row.dat_release_date}</TableCell>
                                <TableCell>{row.dat_livecast_date && row.dat_livecast_date}</TableCell>
                                <TableCell>{row.num_duration_mins && row.num_duration_mins}</TableCell>
                                <TableCell><Button className="upload_button" variant="contained" color="primary"><Link to={`/prevUpload/${btoa(row.id)}`}>Upload<BackupIcon className="backup" /></Link></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <hr />

            {/**********************************************************preview upload section**************************************************************** */}
            <h2>Create Preview Details</h2>
            <Grid className="add_description" container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <div class="form-group" >
                        <label >Movie</label>
                        <select id="inputState" class="form-control" name="movie" onChange={getMovieRelaeseDate}>
                            <option value="">-- Select Movie --</option>
                            {movieInfo && movieInfo.length && movieInfo.map((row) => {
                                return (<option value={row.id}>{row.txt_movie_title}</option>);
                            })}
                        </select>
                    </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <form className="" noValidate>
                        <TextField
                            variant="outlined"
                            fullWidth
                            // onChange={this.onChangeInputHandler}
                            // value={this.state.movieData.release_date}
                            id="date"
                            label="Release Date (For preference)"
                            type="date"
                            value={startDate && startDate}
                            className=""
                            readOnly
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="release_date"
                        />
                        {/* {classes.container}, {classes.textField} */}
                    </form>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <form className="" noValidate>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setPreviewDate(e.target.value)}
                            id="datetime-local"
                            label="Live Telecast Time"
                            type="datetime-local"
                            className=""
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="release_date"
                        />
                    </form>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setDuration(e.target.value)}
                        name="duration"
                        label="Duration"
                        type="duration"
                        id="duration"
                        // onChange={this.onChangeInputHandler}
                        // value={this.state.movieData.duration}
                        placeholder="Minutes"
                    />
                </Grid>
            </Grid>
            <Link id="style_button" type="button" to={"/"}>Back to Home</Link>
            <button id="style_button"
                onClick={submitHandler}
                type="submit"><strong>Submit Data</strong></button>


        </>

    );
}
