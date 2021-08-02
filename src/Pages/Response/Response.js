import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';


export default function Response() {
    const [txnid, setTxnId] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [payUId, setPayu] = useState('');

    useEffect(() => {
        Axios.get('https://www.api3.digimovieplex.com/getResponse').then(res => {
            console.log("aaaaaaaaa", res.data.amount)
            setTxnId(res.data.txnid);
            setAmount(res.data.amount);
            setStatus(res.data.status);
            setPayu(res.data.payUId);
        });


    }, [txnid, amount, status]);
    console.log("bbbbbbbbbb", amount)
    swal({
        title: status,
         icon: status,
         text: "Transaction   " +status,
        successMode: true,
    }).then(res => {
        if (res) {
            window.location.href = "/"
        }
    });
    return (
        <div>
            <h1>Transaction Description</h1>
            <h4>Transaction ID: {txnid}</h4>
            <h4>Pay ID: {payUId}</h4>
            <h4>Amount: {amount}</h4>
            <h4>Transaction Status: {status}</h4>
        </div>
    )
}
