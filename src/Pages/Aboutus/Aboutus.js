import React, { Component } from 'react'
import "./Aboutus.css";

export default class Aboutus extends Component {
    render() {
        return (
            <div className="conditions">
                <h2>About us</h2>
                <hr />

                <h4>For Audience</h4>
                <p className="content">Digi Movieplex is an on demand pay per view video streaming service. You don’t need to
                pay any monthly/quarterly/half yearly/yearly subscription fees to view any content. Pay
                only for the content you want to watch. It is like a cinema hall/multiplex for you. Digi
                Movieplex will bring short films, large short films, mobile shorts, feature films,
                    documentaries, web series for the audience.</p>
                <hr />
                <h4>For Filmmakers</h4>
                <p className="content">We are offering every filmmaker a unique opportunity to showcase and earn from his/her
                content through Digi Movieplex. You can upload your feature films, short films, large short
                films, documentaries, mobile shorts, web series at Digi Movieplex by registering yourself as
                a producer/filmmaker at our platform. If your content is liked by our team we will release it
                at our portal. You will get a transparent dashboard to view the performance of yourcontent.</p>
                <div id="slide_main"></div>

            </div>
        )
    }
}
