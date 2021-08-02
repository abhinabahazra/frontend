import React from 'react';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function Varification() {
    let [mobile, setMobile] = React.useState("Suvayan");
    let [email, setEmail] = React.useState("Suvayan");

    React.useEffect(() => {
        if(sessionStorage.getItem('auth')){
            let {txt_emailid, num_mobile_no} = JSON.parse(sessionStorage.getItem('auth'));
            setMobile(num_mobile_no);
            setEmail(txt_emailid)
        }
    },[])



    return (
        <>
            <div className="mobile_tab">  
                <PhoneIphoneIcon className="phone" />
                <h3 className="mobile">{mobile && mobile}</h3>
                <br/>
                <p>{(mobile)? 'Your mobile number is verified' : 'Your mobile number is not available'}</p>
            </div>
            <br />
            <div className="mobile_tab">  
                <MailOutlineIcon className="phone" />
                <h3 className="mobile">{email && email}</h3>
                <p>{(email)?'Your Email Address is verified':'Your Email Address is not available'}</p>
            </div>
        </>
    )
}

export default Varification;
