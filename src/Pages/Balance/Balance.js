import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import swal from 'sweetalert';
import "./Balance.css";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


class TicketPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet_balance: ""
        }
    }

    getWalletBalance = async () => {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            // console.log("abhinab",num_user_id)
            await axios.post('https://www.api3.digimovieplex.com/api/getUserWalletBalanceById', { user_id: num_user_id }).then((res) => {
                if (res.data.status === 'success') {
                    this.setState({
                        wallet_balance: res.data.response.cur_balance_amount
                    })
                }
            });
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        this.getWalletBalance();
    }



    render() {
        return (
            <div>
                <div className="container-fluid">
                <h1 className="heading">
                  User Wallet
                </h1>
                <hr/>
                <div className="information">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} className="card" id="abhi">
                    
                    <strong><h2> <AccountBalanceIcon id="wallet_icon"/>Wallet Balance:- Rs. {this.state.wallet_balance}</h2></strong>
                    </Grid>
                </Grid>
                <div id="slide_main"></div>


                </div>
               
                </div>
            </div>
        );
    }
}

export default TicketPage;