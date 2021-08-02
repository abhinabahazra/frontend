import React, { Component } from 'react'
import "./Refund.css";

export default class Refund extends Component {
    render() {
        return (
            <div className="conditions">
                <h2>Payment</h2>
                <hr/>
                <p className="content">Digi Movieplex is a pay per view model which means you need to pay only for the movie you want to
watch. To use the Digi Movieplex service you must have internet access and a Digi Movieplex ready
device and provide a current, valid, accepted method of payment. You can change your payment
method for every ticket you want to buy. Also, if you want to buy another ticket before the validity
of your current/active ticket ends even then you can change your payment method. In short it
means you can choose different payment methods for different movie tickets.</p>
<h2>Refund or Cancellation</h2>
<hr/>
<p className="content">You cannot cancel your ticket before the end of the validity of your ticket since it is a onetime
payment model. However if you discontinue to login or watch the content on Digi Movieplex, you
will not be entitled for a refund for any portion of the ticket price paid by you for the unexpired
period or for the unwatched Digi Movieplex content. However if you have paid and the amount is
deducted from your account but still your ticket is not updated then you will not be entitled for a
refund but you will be provided with all kind of technical assistance and support to deal with the
problem. You can mail us at support@digimovieplex.com to get further assistance and help with
payment queries. We ensure you that your amount deducted will not be lost in transit.</p>
<div id="slide_main"></div>

            </div>
        )
    }
}
