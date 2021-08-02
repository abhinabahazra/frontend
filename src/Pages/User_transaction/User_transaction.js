import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import "./User_transaction.css";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 650,
  },
}));

export default function User_transaction() {
  const classes = useStyles();

  //for get services
  const [transactionDetails, setStatetransactionDetails] = useState([]);



  useEffect(() => {
    if (sessionStorage.getItem('auth')) {
      let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
      let user_id = { 'user_id': num_user_id };
      fetch("https://www.api3.digimovieplex.com/api/userTransactionHistory", {
        method: 'POST',
        body: JSON.stringify(user_id),
        headers: {
          "Content-Type": 'application/json',
        }
      })
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          console.log("aaaaaaaaaaaaaaaa",data.response)
          setStatetransactionDetails(data.response)
        })
    }
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <h3>User Transactions Table</h3>
          <TableRow className="colu">
            <TableCell>Sl/No.</TableCell>
            <TableCell>Movie</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment Id</TableCell>
            <TableCell>Transaction Number</TableCell>
            <TableCell>Transaction Date</TableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionDetails && transactionDetails.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">{i + 1}</TableCell>
              <TableCell>{row.txt_movie_title && row.txt_movie_title}</TableCell>
              <TableCell>{row.num_amount && row.num_amount}</TableCell>
              {/* <TableCell>{row.payment_id && `${row.payment_id} min`}</TableCell> */}
              <TableCell>{row.payment_id && row.payment_id}</TableCell>
              <TableCell>{row.txt_transaction_no && row.txt_transaction_no}</TableCell>

              <TableCell>{row.dat_transaction_date && row.dat_transaction_date}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div id="slide_main"></div>

    </TableContainer>
    
  );
}

