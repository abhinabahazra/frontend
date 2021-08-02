import "./Dashboard.css";
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Redirect,Link} from "react-router-dom";
import MovieIcon from '@material-ui/icons/Movie';
import "./Dashboard.css";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    table: {
        minWidth: 650,
    },
}));

export default function Dashboard() {

    let [total_movie,setTotalMovie] = useState("");
    let [approve_movie,setApprovedMovie] = useState("")
    let [pending_movie,setPendingMovie] = useState("")
    let [reject_movie,setRejectedMovie] = useState("")

    let [sum,setSum] = useState("")

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //for get services
    const [movieDetails, setStateMovieDetails] = useState([]);


    let { name } =(sessionStorage.getItem('auth'))? JSON.parse(sessionStorage.getItem('auth')) : '';

    const movieUploadDetailsByProducer = () =>{
        let { txt_user_id } = (sessionStorage.getItem('auth'))? JSON.parse(sessionStorage.getItem('auth')) : '';
        let user_created = { 'user_created': txt_user_id };
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user_created),
        };
        fetch('https://www.api3.digimovieplex.com/api/movieUploadDetailsByProducer', requestOptions)
            .then(response => response.json())
            .then(data =>{
                console.log("rrrrrrrrrrrrrrrr",data);
                setTotalMovie(data.response[0].total_movie);
                setApprovedMovie(data.response[0].approve_movie);
                setRejectedMovie(data.response[0].reject_movie);
                setPendingMovie(data.response[0].pending_movie);
            });
            
    }

    //********************************************************************** */
    const walletBalnceProducer = () => {
        let { txt_user_id } = (sessionStorage.getItem('auth'))? JSON.parse(sessionStorage.getItem('auth')) : '';
        let user_created = { 'user_created': txt_user_id };
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user_created),
        };
        fetch('https://www.api3.digimovieplex.com/api/walletBalanceProducer', requestOptions)
        .then(response => response.json())
        .then(data =>{
            console.log("rrrrrrrrrrrrrrrr",data);
            setSum(data.response[0].sum);
        });
    }

    useEffect(() => {
        
       
        movieUploadDetailsByProducer();
        walletBalnceProducer();
       
       
            if (sessionStorage.getItem('auth')) {

            let { txt_user_id } = (sessionStorage.getItem('auth'))? JSON.parse(sessionStorage.getItem('auth')) : '';
            let user_created = { 'user_created': txt_user_id };
            let result = fetch("https://www.api3.digimovieplex.com/api/ProducerAndMovieDeatils", {
                method: 'POST',
                body: JSON.stringify(user_created),
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
    
    if(sessionStorage.getItem('auth')){
        let {num_master_id} = JSON.parse(sessionStorage.getItem('auth'));
        if(num_master_id !== '2'){
          //history.push("/producer");
          console.log("userpage");
          return  <Redirect to="/" />
        }
    }else{
        console.log("homepage");
     return   <Redirect to="/" />

    }
    return (
        <div>
            <div className="container">
                <h1 className="heading">{name}'s DASHBOARD</h1>
                <hr/>
                <div className="producer_information">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} className="card">
                            <div>
                                <h4>{`No. of Movies Uploaded : ${total_movie}`}</h4>
                                <h4>{`Movies pending for approval : ${pending_movie}`} </h4>
                                <h4>{`Approved Movies : ${approve_movie}`} </h4>
                                <h4>{`Rejected Movies : ${reject_movie}`} </h4>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div >
                                <h2 className="card1">{`Wallet Balance (Rs.) : ${sum}`}</h2>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <h3>Producer Movie Table</h3>
                            <TableRow className="colu">
                                {/* <TableCell>Movie ID</TableCell> */}
                                <TableCell align="left">Movie Title</TableCell>
                                <TableCell align="left">Language</TableCell>
                                <TableCell align="left">Rating</TableCell>
                                <TableCell align="left">Contract <br /> (Producer:Admin)</TableCell>
                                <TableCell align="left">Ticket Price<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;( Rs. )</TableCell>
                                <TableCell align="left">No .of Ticket Sold</TableCell>
                                <TableCell align="left">Producer Income <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;( Rs. )</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movieDetails && movieDetails.map((row, i) => (
                                <TableRow key={i}>
                                    {/* <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell> */}
                                    <TableCell align="left">{row.txt_movie_title}</TableCell>
                                    <TableCell align="left">{row.language}</TableCell>
                                    <TableCell align="left">{row.txt_movie_rating}</TableCell>
                                    <TableCell align="left">{row.contract}</TableCell>
                                    <TableCell align="left">{row.num_movie_price_inr}</TableCell>
                                    <TableCell align="left">{row.count}</TableCell>
                                    <TableCell align="left">{row.sum}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );

}

