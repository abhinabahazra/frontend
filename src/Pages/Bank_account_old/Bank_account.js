import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PhoneIcon from '@material-ui/icons/Phone';
import PanToolIcon from '@material-ui/icons/PanTool';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



import "./Bank_account.css";



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

let kycInitValue = {
    accountNo : '',
    retypeAccountNo : '',
    bankName : '',
    branchName : '',
    ifscNo : '',
    chequeImage : '',
    panNo : '',
    panImage : ''
}

export default function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let { num_user_id } = (sessionStorage.getItem('auth')) ? JSON.parse(sessionStorage.getItem('auth')) : { num_user_id: 'dunny.user@gmail.com' };

    //for post service
    // for POST services 
    const [account_no, setAccountno] = useState("")
    const [ifsc_code, setIfsc] = useState("")
    const [pancard_no, setPanno] = useState("")
    const [pancard_link, setPanlink] = useState("")
    const [bank_name, setBankname] = useState("")
    const [branch_name, setBranch] = useState("")
    const [cheque_link, setChequelink] = useState("")
    const [addMovie_msg, setMsg] = useState("")


    let [kycDetails, setKycDetails] = useState(kycInitValue);
    let [accountNoMsg, setAccountnoMsg] = useState('');

    const onChangeFormHandler = (e) => {
        setKycDetails({...kycDetails, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(kycDetails.retypeAccountNo !== ''){
            if(kycDetails.accountNo === kycDetails.retypeAccountNo){
                setAccountnoMsg('');
            }else{
                setAccountnoMsg('not matched')
            }
        }
    })

    async function KycSubmit(e) {
        e.preventDefault()
        let item = {
            account_no: account_no, ifsc_code: ifsc_code, pancard_no: pancard_no,
            pancard_link: pancard_link, bank_name: bank_name, branch_name: branch_name,
            cheque_link: cheque_link, user_id: num_user_id,
        }

        console.warn(item)

        let result = await fetch("https://www.api3.digimovieplex.com/api/add_kyc_data", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
            }
        })
            .then((resp) => resp.json().then(r => {
                setMsg(r.message)
            }))
    }

    return (
        <div className={classes.root}>
            <h1>Kyc Details</h1>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <LinkTab className="link_tab" icon={<PhoneIcon />} label="MOBILE & EMAIL" {...a11yProps(0)} />
                    <LinkTab label="PAN" icon={<PanToolIcon />} className="link_tab" {...a11yProps(1)} />
                    <LinkTab label="BANK" icon={<AccountBalanceIcon />} className="link_tab" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div className="mobile_tab">  <PhoneIphoneIcon className="phone" />
                    <h3>   Your mobile number is verified</h3>
                    <br />
                    <p className="mobile">6295622155</p></div>
                <br />
                <div className="mobile_tab">  <MailOutlineIcon className="phone" />
                    <h3>   Your Email Address is verified</h3>
                    <br />
                    <p className="mobile">abhinabahazra960@gmail.com</p></div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <hr />
                <button id="style_button" type="submit">submit data</button>
                <hr />
                <img src="pancard.jfif" alt="pancard" />
                <strong>        <h2>Your PAN is verified</h2>
                </strong>
            </TabPanel>

            <TabPanel value={value} index={2}>

{/* ============================================================================================================ */}
                <Grid className="add_image" container spacing={2}>
                    {/* <div>
                    <h3>  <AccountBalanceIcon className="bank" />VERIFY BANK ACCOUNT</h3>
                    <p>(Verify your account to withdraw winnings)</p>
                    <p>(Bank proof of passbook, Cheque book or bank statement which shows your Name , IFSC Code & Account No.)</p>
                </div> */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={onChangeFormHandler}
                            name="accountNo"
                            label="Account number"
                            type="text"
                            id="Account"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>    
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={onChangeFormHandler}
                            name="retypeAccountNo"
                            label="Retype Account number"
                            type="text"
                            id="Account"
                        />
                        <span style={{color:'#ff0000',fontSize:'12px'}}>{accountNoMsg && accountNoMsg}</span>
                    </Grid>
                    <Grid item xs={12} sm={6}>     
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={onChangeFormHandler}
                            name="bankName"
                            label="Bank name"
                            type="text"
                            id="PAN"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>      
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setBranch(e.target.value)}
                            name="branchName"
                            label="Bank branch"
                            type="text"
                            id="PAN"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>      
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setIfsc(e.target.value)}
                            name="ifscNo"
                            label="IFSC Code"
                            type="text"
                            id="PAN"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>      
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setChequelink(e.target.value)}
                            type="file" accept="video/image/*" name="chequeImage" label="Upload cheque" id="castsss"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>  
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setPanno(e.target.value)}
                            name="panNo"
                            label="Enter Your PAN No."
                            type="text"
                            id="PAN"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>     
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setPanlink(e.target.value)}
                            type="file" accept="video/image/*" name="panImage" label="Upload Your PAN image" id="castsss"
                        />
                    </Grid>
                    <p>All fields are mandatory</p>
                    <button id="style_button1" onClick={KycSubmit} type="submit">submit data</button>
                </Grid>
            </TabPanel>
            <h3 className="message">{addMovie_msg}</h3>


        </div>
    );
}
