import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import swal from 'sweetalert';
import "./TicketPage.css";



class TicketPage extends Component {



    constructor(props) {
        super(props);
        this.state = {
            movie_id: "",
            movie_title: "",
            movie_price: "",
            wallet_balance: "",
            baseURL: 'https://secure.payu.in/_payment',
            key: 'B013Qo',
            salt: '2YhyQwuH',
            txnid: `TXN_${Math.round(Math.random(1000000000, 9999999999) * 1000000000)}`,
            surl: 'https://www.api3.digimovieplex.com/response',
            furl: 'https://www.api3.digimovieplex.com/response',
            hash: '',
            name:'',
            email:'',
            phone:'',
            user_id:'',
            
        }

    }

    getWalletBalance = async () => {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id,name,num_mobile_no,txt_emailid } = JSON.parse(sessionStorage.getItem('auth'));
            //  console.log("abhinab",JSON.parse(sessionStorage.getItem('auth')))

            await axios.post('https://www.api3.digimovieplex.com/api/getUserWalletBalanceById', { user_id: num_user_id }).then((res) => {
                if (res.data.status === 'success') {
                    this.setState({
                        wallet_balance: res.data.response.cur_balance_amount
                    })
                }
            });
        }
    }
    getMovieFromWallet = async () => {
        if (sessionStorage.getItem('auth')) {
            let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            let data = {
                num_amount: this.state.movie_price.toString(),
                num_user_id: num_user_id,
                num_movie_id: this.state.movie_id
            }
            await axios.post('https://www.api3.digimovieplex.com/api/insert_transactionByWallet', data).then((res) => {
                console.log(res);
                if (res.data.status === 'success') {
                    swal({
                        title: "Success",
                        text: "Transaction successfully completed!",
                        icon: "success",
                        successMode: true,
                    }).then(res => {
                        if (res) {
                            window.location.href = "/"
                        }
                    });
                } else {
                    swal({
                        title: "Error",
                        text: "Sorry! Insufficient Wallet Balance!",
                        icon: "error",
                        successMode: true,
                    })

                }
            })
        }
    }

    hashGenerate =() =>{
        if (sessionStorage.getItem('auth')) {
            let { name,num_mobile_no,txt_emailid,num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
            //  console.log("abhinab",JSON.parse(sessionStorage.getItem('auth')))
            console.log("suvayan",num_user_id)
             this.setState({
                 name: name,
                 email: txt_emailid,
                 phone: num_mobile_no,
                 user_id: num_user_id,
             },()=>{
                let data = {
                    key : this.state.key, 
                    txnid : this.state.txnid, 
                    amount : this.state.movie_price,
                    productinfo : this.state.movie_title.slice(0, 10), 
                    firstname : this.state.name, 
                    email : this.state.email, 
                    salt :  this.state.salt,
                    user_id: this.state.user_id,
                    movie_id: this.state.movie_id,
                }
                console.log("hhhhhhhhhhh",data)
                axios.post('https://www.api3.digimovieplex.com/hash',data).then((res)=>{
                    this.setState({
                        hash: res.data.hash
                    },()=>{
                        console.log("fffffffffff",this.state.hash)
                    })
                })
             })
        }
       
    }


    componentDidMount() {
        let { id } = this.props.match.params;
        console.log("aaaaaa", JSON.parse(decodeURIComponent(id)))
        let params = JSON.parse(decodeURIComponent(id));
        this.setState({ movie_id: params.mid, movie_title: params.mtitle, movie_price: params.mprice });

        this.getWalletBalance();
        this.hashGenerate();
    }



    render() {
        return (
            <div>
                <div className="container-fluid">
                    <h1 className="heading">
                        Book Your Ticket
                    </h1>
                    <hr />
                    <div className="information">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} className="card" id="abhi">
                                <h3>Movie Name:- {this.state.movie_title}</h3>
                                <hr />
                                <h3>Ticket Price :- Rs. {this.state.movie_price}/-
                                </h3>
                            </Grid>
                            <Grid item xs={12} sm={4} className="card1">
                                <div >
                                    <h2>Choose Payment options</h2>
                                    <button onClick={this.getMovieFromWallet} id="style_button1" type="submit"><strong className="wall_button">Wallet<p>(Wallet Balance:- Rs. {this.state.wallet_balance})</p></strong></button>


                                    <form action={this.state.baseURL} method="post">
                                        <input type="hidden" name="key" value={this.state.key} ></input>
                                        <input type="hidden" name="txnid" value={this.state.txnid} ></input>
                                        <input type="hidden" name="amount" value={this.state.movie_price} ></input>
                                        <input type="hidden" name="firstname" value={this.state.name} ></input>
                                        <input type="hidden" name="email" value={this.state.email} ></input>
                                        <input type="hidden" name="phone" value={this.state.phone} ></input>
                                        <input type="hidden" name="productinfo" value={this.state.movie_title.slice(0, 10)} ></input>
                                        <input type="hidden" name="surl" value={this.state.surl} readOnly></input>
                                        <input type="hidden" name="furl" value={this.state.furl} readOnly></input>
                                        <input type="hidden" name="hash" value={this.state.hash} readOnly></input>
                                        <input type="hidden" name="user_id" value={this.state.user_id} readOnly></input>
                                        <input type="hidden" name="movie_id" value={this.state.movie_id} readOnly></input>
                                        <button id="style_button1" type="submit"><strong className="wall_button">Payment Merchant<p>(Pay U)</p></strong></button>

                                    </form>
                                </div>
                            </Grid>
                        </Grid>

                    </div>

                </div>
            </div>
        );
    }
}

export default TicketPage;