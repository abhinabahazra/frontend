import React, { Component } from 'react'
import "./Terms.css";
import SimpleSlider from '../../components/SimpleSlider/SimpleSlider';

export default class Terms extends Component {
    render() {
        return (
            <div className="conditions">
                <h2>Terms and Conditions</h2>
                <hr/>
                <h4>Age of majority</h4>
                <p className="content">Unless otherwise specified, Digi Movieplex is available for individuals who have attained the
                age of majority in their jurisdiction. In the case of Indian jurisdiction, this service is restricted
                to Users below the age of 18 also referred to as minors. If you are under the relevant age of
                majority in your jurisdiction, you may only access the Website/ Application and avail the
                services only in accordance with applicable law which enables a minor in your jurisdiction to
                access such a service. In India, by browsing or downloading and/or installing and/or using
                Digi Movieplex, you represent and warrant that you are 18 years of age or older and in case
                you are less than 18 years of age, you have taken consent of your parent or guardian. Some
                content offered on the site may not be suitable for some viewers and therefore viewer's
                discretion is advised. Also, some content offered on the site may not be appropriate for
                viewership by minors. Parents and/or legal guardians are advised to exercise discretion before
                allowing their children and/or wards to access content on this website.</p>
                <h4>Ownership</h4>
                <p className="content">
                    Digi Movieplex is a Trademark owned by Dere Productions.</p>
                <h4>Your Responsibilities</h4>
                <p className="content">
                    You will be solely responsible for obtaining and maintaining the device and internet
                    connection needed in order to access and use Digi Movieplex and paying for all such charges
                    in relation thereto. Internet charges will depend on the plan subscribed by you from the
                    internet service provider. Digi Movieplex is compatible on selected operating systems and
                    specific versions and device(s). The download procedure of the application shall be subject to
                    the process specified by the operating system of your device(s). You need to have a device
                    connected with internet to download Digi Movieplex application to begin and complete. Digi
                    Movieplex shall not be responsible in case of any fluctuation in the internet connection speed
                    leading to corruption of application file download or any delayed or defective download of
                    the application on your device(s). Digi Movieplex shall not be responsible or liable to you for
                    interruption, disruption, deactivation of Digi Movieplex on account of any Force Majeure
                    Event. For the purpose of these Terms of Use, “Force Majeure Event” shall mean any event
                    beyond the reasonable control of Digi Movieplex including but not limited to act of God, any
                    act or omission of government or quasi-government agencies or lockout, strike, curfew,
                    epidemic, technical errors etc. Digi Movieplex may, at its sole discretion, make bug fixes,
                    updates for the installed application. In the event Digi Movieplex has upgraded the
                    application or any features thereof, you will be required to update your device in order to
                    make the device compatible with such upgrades. Digi Movieplex shall not be responsible or

                    liable to you in the event you are unable to access Digi Movieplex or view the content on
                    Digi Movieplex due to your failure to upgrade your device.
                    You further agree not to use our packages for any illegal or unauthorized purpose nor may
                    you, in the use of the service, violate any laws in your jurisdiction including but not limited to
                    copyright laws. You must not transmit any worms or viruses or any code of a destructive
                    nature. A breach or violation of any of the Terms will result in immediate termination of your
                    services.
                    You understand that your contents - not including credit card information, may be transferred
                    unencrypted and involve transmissions over various networks; and changes to conform and
                    adapt to technical requirements of connecting networks or devices. Credit card information is
                    always encrypted during transfer over networks.
                </p>
                <h4>Registration</h4>
                <p className="content">To register for the Digi Movieplex Website/ Application, you shall be required to open an
                account by completing the registration process by providing us with your current, complete
                and accurate information as prompted by the applicable registration form; you shall also
                choose a password and a user name. Digi Movieplex reserves the right to suspend or
                terminate your registration as Registered User without assigning any reason (including for
                provision of inaccurate, not current or incomplete information during the registration process
                or thereafter). As a Registered User, you shall be responsible for safeguarding your password
                and for all transactions undertaken using your Username and Password. You agree not to
                disclose your password to any third party and to take sole responsibility for any activities or
                actions under your account, whether or not you have authorized such activities or actions. In
                particular, as a parent or legal guardian, you acknowledge and assume sole responsibility to
                ensure that content which is meant for mature audiences, i.e., above the age of majority, is
                not accessed by children. Hence, you may not share your log in credentials with your
                children. It is your sole responsibility to change your password immediately if you believe
                that your password has been compromised. Digi Movieplex will not be responsible for any
                financial loss, inconvenience or mental agony resulting from misuse of your Username and
                Password in any circumstances. You expressly agree to absolve Digi Movieplex and/or the
                Digi Movieplex Website/ Application of any responsibility/ liability in this regard. We
                reserve the right to refuse service to anyone for any reason at any time.</p>
                <h4>Subscriptions</h4>
                <p className="content">There is no need of subscription you just have to login / install Digi Movieplex and buy
                tickets for the movies you want to watch. Any Registered User can buy the tickets. As
                registered User, you can buy tickets made available by Digi Movieplex from time to time.
                Depending on the tickets and/or value added services and the term of the proposed tickets,
                you will be required to make payment via a Payment Method provided by Digi Movieplex for
                accessing and browsing Digi Movieplex. If You wish to avail Digi Movieplex after the expiry
of the initial term of tickets, you can again buy the tickets for the movies you want to watch.</p>
                <p className="content">These tickets will have a limited period validity.</p>
                <div className="content"><li>Short Films will be valid for 24 hours.</li>
                <li>Large Short Films will be valid for 48 hours.</li>
                <li>Feature Films will be valid for 60 hours.</li>
                <li>Documentaries will be valid for 30 hours.</li>
                <li>Every episode of a web series will be valid for 30 hours.
                Digi Movieplex reserves the right to modify or discontinue Website/ Application at its sole
                discretion with or without notice to you. Digi Movieplex shall not be liable to you or any
                third party in any manner, should Digi Movieplex exercise its right to modify or discontinue
                Website/ Application.</li></div>
                
                <h4>Further, Digi Movieplex reserves the right, at any time, with or without notice and without
                    any liability to</h4>
                    <div className="content"><li>Replace or otherwise withdraw Subscription Packages or Content.</li>
                <li>Change or reduce the number of hours of any Content; blackout any Content.</li>
                <li>Modify the prices of tickets or any part of Digi Movieplex service. Further, Digi
                Movieplex reserves the right to change packaging and introduce base and add on
                packages and/or offer content on individual basis.</li>

                </div>
                <div id="slide_main"></div>

            </div>
        )
    }
}
