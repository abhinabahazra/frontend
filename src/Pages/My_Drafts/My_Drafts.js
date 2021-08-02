import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link,Redirect} from 'react-router-dom'
import "./My_Drafts.css";
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 650,
  },
}));

export default function My_Drafts() {
  const classes = useStyles();

  //for get services
  const [movieDetails, setStateMovieDetails] = useState([]);



  useEffect(() => {
    if (sessionStorage.getItem('auth')) {
      let { txt_emailid } = JSON.parse(sessionStorage.getItem('auth'));
      let producer_email = { 'producer_email': txt_emailid };
      fetch("https://www.api3.digimovieplex.com/api/get_Draft_Movie", {
        method: 'POST',
        body: JSON.stringify(producer_email),
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <h3>Producer Movie Table</h3>
          <TableRow className="colu">
            <TableCell>Sl/No.</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Director</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movieDetails && movieDetails.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">{i + 1}</TableCell>
              <TableCell>{row.txt_movie_title && row.txt_movie_title}</TableCell>
              <TableCell>{row.category && row.category}</TableCell>
              <TableCell>{row.genre && row.genre}</TableCell>
              <TableCell>{row.language && row.language}</TableCell>
              <TableCell>{row.length_min && `${row.length_min} min`}</TableCell>
              <TableCell>{row.txt_director && row.txt_director}</TableCell>
              <TableCell><Button variant="contained" color="primary"><Link to={`/add_movies/${row.id}/${row.num_movie_page}`}>Edit <EditIcon/></Link></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
