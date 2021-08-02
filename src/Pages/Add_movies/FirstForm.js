import React, { Component } from 'react';
import { Form} from "usetheform";
import {Link} from "react-router-dom";

export class FirstForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="main">
                <Form name="page1">
                    <h2>ADD NEW MOVIES</h2>
                    <hr />
                    <h3>Read these before you start. You will need to keep some image and video files ready.</h3>
                    <ul>
                        <li>Type the movie name carefully. You are not allowed to change the movie name later.</li>
                        <li>Select genre carefully. You are not allowed to change the genre later.</li>
                        <li>Give proper censor data. Upload censor certificate if you have it.</li>
                        <li>Synopsis is required. Providing synopsis will help us to better understand your movie.</li>
                        <li>Cast and crew data is required. Providing cast-and-crew data will help us to understand the star-cast in your movie.</li>
                        <li>One Banner of size  460(Vertical) x 300 (Horizontal) is required.</li>
                        <li>One Banner file is mandatory.</li>
                        <li>One Trailer file is mandatory.</li>
                        <li> Movie file is mandatory.</li>
                    </ul>
                    <h3>Required Instructions for uploading. </h3>
                    <ul>
                        <li>Short films should be upto 30 minutes.</li>
                        <li>Large short film (more than 30 minutes & upto 60 minutes).</li>
                        <li>Feature film (more than 60 minutes).</li>
                        <li>Web Series (per episode max 30 minutes).</li>
                        <li>Documentary.</li>
                        <li>Music Video.</li>
                    </ul>
                    <hr />
                    <Link id="style_button" type="button" to={"/producer"}>Back to Home</Link>  
                    <button id="style_button" type="submit" onClick={this.props.next}>OK , Proceed</button>
                </Form>
            </div>
        )
    }
}

export default FirstForm;
