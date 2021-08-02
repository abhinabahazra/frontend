import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Swal from "sweetalert2";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import "./ProducerLaunch.css";
import EditIcon from '@material-ui/icons/Edit';
import BackupIcon from '@material-ui/icons/Backup';
import axios from "axios";
import swal from 'sweetalert';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

//  const  myUrl = "http://example.com/index.html?param=1&anotherParam=2";
const loginWithOtp = async (title, id, pId, lId) => {

    if (sessionStorage.getItem('auth')) {
        let { num_mobile_no } = JSON.parse(sessionStorage.getItem('auth'));
        let data = {
            mobile: num_mobile_no,
        }
        axios.post('https://www.api3.digimovieplex.com/api/otp_sent', data).then((res) => {
            if (res.data.status === 'success') {
                console.log("soumya", res.data.response.otp)
                let otp = res.data.response.otp;
                swal({
                    title: "Success",
                    text: "One time OTP sent to your mobile number.Please click OK to proceed.",
                    icon: "success",
                    value: res.data.response.otp,
                    successMode: true,

                })
                    .then(res => {

                        if (res) {
                            //   console.log("php url", "https://admin.digimovieplex.com/?otp=" + btoa(otp) + "&launchID=" + btoa(lId))
                            //   console.log("php url", "https://admin.digimovieplex.com/?id=" + btoa(id) + "&title=" + btoa(title) + "&producer=" + btoa(pId) + "&otp=" + btoa(otp) + "&launchID=" + btoa(lId))
                            window.open("https://live.digimovieplex.com/?otp=" + btoa(otp) + "&launchID=" + btoa(lId),'_blank');
                            // window.location.href = "https://live.digimovieplex.com/?otp=" + btoa(otp) + "&launchID=" + btoa(lId);

                        }
                    });
            }
        })
    }

};

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

export default function ProducerLaunch() {



    const classes = useStyles();

    //for get services
    const [movieDetails, setStateMovieDetails] = useState([]);
    const [selectMovieId, setSelectMovieId] = useState('');
    const [previewDate, setPreviewDate] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [duration, setDuration] = useState('');
    const [numId, setNumId] = useState('');



    const [startDate, setStartDate] = useState('');

    const getMovieRelaeseDate = (e) => {

        setSelectMovieId(e.target.value);
        let movie_id = e.target.value;
        movieDetails.map((row) => {
            if (row.id === movie_id) {
                let getDate = new Date(row.movie_start_time);
                setReleaseDate(getDate.toISOString().slice(0, 10));
                console.log("aaaaaaaaaaa", getDate.toISOString().slice(0, 10))
                setStartDate(getDate.toISOString().slice(0, 10));
            }
        })
    }

    useEffect(() => {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            setNumId(num_user_id);
            let producer_id = { 'user_id': num_user_id };
            fetch("https://www.api3.digimovieplex.com/api/get_Producer_live_castBy_Id", {
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
                txt_user: txt_user_id,
                movie_id: selectMovieId,
                release_date: releaseDate,
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
                        <h1>&nbsp;&nbsp;Producer Live Telecast</h1>
                        <p>&nbsp;&nbsp;&nbsp; ( Movie details will appear 30 mins prior to Live Telecast Time. )   </p>
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
                                <TableCell>{row.num_duration_mins && row.num_duration_mins}{row.launch_id}</TableCell>
                                <TableCell><Button className="upload_button" variant="contained" color="primary" onClick={() => loginWithOtp(row.txt_movie_title, row.id, numId, row.launch_id)}>Start<PlayCircleFilledWhiteIcon className="backup" /></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}
