import React, { Component } from 'react'
import "./Footer.css";
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <div>
                 <Grid className="footer_tag" container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    <a><Link to={"/terms"}>Terms & Conditions</Link></a>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <a><Link to={"/privacy"}>Privacy Policy</Link></a>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <a><Link to={"/refund"}>Refund Policy</Link></a>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <a><Link to={"/contact"}>Contact us</Link></a>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <a><Link to={"/about"}>About us</Link></a>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <a><Link to={"/feedback"}>Feedback Form</Link></a>
                    </Grid>
                   
                    <p className="Copyright">Digi Movieplex (Trademark owned by Dere Productions)</p>
                    <p className="magnox">Designed By Magnox Technology Pvt.Ltd </p>
                   
                  

                </Grid>
            </div>
           
            
        )
    }
}
