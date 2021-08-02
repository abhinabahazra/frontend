import React, { Component } from 'react';
import { Form} from "usetheform";
import {Link} from "react-router-dom";

export class SecondForm extends Component {
    render() {
        return (
            <div className="main">
                <Form name="page2">
                    <h3>Terms and Conditions for Filmmakers:</h3>
                    <h4>1.	General Terms and Conditions:</h4>
                    <li>Digi Movieplex will exhibit the film /content on its APP and Website “Digi Movieplex” on an Exclusive Digital Rights basis.</li>
                    <li>
                        Digi Movieplex also accepts films/contents on a Non Exclusive Digital Rights basis. For this please contact us separately.
                    </li>
                    <li>All rights except digital rights of the film will remain with the producer.</li>
                    <li>Release date will be finalised by Digi Movieplex. Although it will be within One month from the date of submission of that film/content.</li>
                    <li>	Real-time dashboard will be provided to the producers to help them track the number of tickets sold and total revenue generated.</li>
                    <li>	Ticket price for a film/content will be fixed by Digi Movieplex.</li>
                    <li>	Digi Movieplex reserves the right to remove a film/content at any time by giving a 7 days prior notice.</li>
                    <hr />
                    <h4>2.	Financial Terms and Conditions:</h4>
                    <li>	Digi Movieplex does not take any uploading charge from the Producer/Filmmaker.</li>
                    <li>The Producers/Filmmakers will get 60% of the revenue generated from their film/content.Digi Movieplex will retain the remaining 40%. It is negotiable for films with famous Actors/Actresses. For this please contact us separately.
                        <li>If Producers/Filmmakers want to release their film/content on a Non Exclusive Digital Rights
basis then their percentage of revenue will be 50%.</li>
                    </li>
                    <li>The producer/film makers will get his/her share of revenue net of applicable rate of GST, applicable rate of TDS as per government norms and internet handling charges including ticket charges, communication charges and financial gateway charges (not exceeding 3%).</li>
                    <li>	Payment will be directly made to the producer’s bank account at the end of every month or when the film is withdrawn from this platform.</li>
                    <hr />
                    <h4>3. Marketing Terms and Conditions:</h4>
                    <li>Digi Movieplex will not take any film/content specific promotional activity. Digi Movieplex
                        will only do basic promotional activity to announce the release of the film on its social media
                        platforms. It will also take promotional activity to promote the platform.
                    </li>
                    <li>The Producer will do film/content specific marketing at its own cost.</li>
                    <li>Digi Moviplex may use any trailer/poster available on its platform for promotional activity. </li>
                    <li>Producers may use the logo of Digi Movieplex only for the purpose of digital marketing of the film/content.</li>
                    <hr />
                    <h4>4. Piracy Safeguards:</h4>
                    <li>Digi Movieplex uses an online streaming technology that provides a limited period access to the audience. It ensures that the film will not be downloadable and will also be protected from screen sharing. </li>
                    <li>Digi Movieplex cannot take responsibility for piracy activity such as film being recorded using a recording device.</li>
                    <hr />
                    <h4>5.<strong>The producer/filmmaker hereby undertakes to ensure that this film/content does not infringe on the copyright and/or the performing rights held by any third party and in the event of any litigation being started in respect of this film/content, the producer/filmmaker hereby agrees and undertakes to take full responsibility. Digi Movieplex will not be responsible for any kind of COPYRIGHT issue by any means.</strong>	</h4>
                    <Link id="style_button" type="submit" to={"/"}>
                    I DON'T ACCEPT</Link> 
                    <button id="style_button" type="submit" onClick={this.props.next}>I ACCEPT, PROCEED TO ADD MOVIE</button>
                </Form>
            </div>
        )
    }
}

export default SecondForm;
