import React, { Component } from 'react'
import {Link} from "react-router-dom";

export class Disclaimer extends Component {
    render() {
        return (
            <div>
               <h2>Disclaimer</h2>
                <p>Digi Movieplex is a digital cinema hall. Different kinds of contents are available here. Some of these contents are strictly limited to those over 18 or of legal age in your jurisdiction, whichever is greater.
                It is important that responsible parents and guardians take the necessary steps to prevent minors from accessing unsuitable contents online, especially age-restricted contents.
                Anyone with a minor in their household or under their supervision should implement basic parental control protections, including computer hardware and device settings, software installation, to block your minors from accessing inappropriate contents.
</p>
                <Link id="style_button" type="submit" to={"/"}> Proceed</Link>
                <Link id="style_button" type="submit" to={"/"}> Reject</Link>
                   
            </div>
        )
    }
}

export default Disclaimer
