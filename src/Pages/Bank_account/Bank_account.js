import React, { Component } from 'react';
import "./Bank_account.css";
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
import {Redirect,Link} from "react-router-dom";

import Varification from './Varification';
import PanAndAccount from './PanAndAccount';
import KycForm from './KycForm';

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






class Bank_account extends Component {

    state = {
        pageNo: 1
    }

    onClickPageChange = (num) => {
        this.setState({
            pageNo: num
        })
    }

    conditionalRendering = () => {
        if (this.state.pageNo === 1) {
            return <Varification />
        } else {
            return <KycForm />
        }
    }

    render() {
        if(sessionStorage.getItem('auth')){
            let {num_master_id} = JSON.parse(sessionStorage.getItem('auth'));
            if(num_master_id !== '2'){
              //history.push("/producer");
              console.log("userpage");
              return  <Redirect to="/" />
            }
        }else{
            console.log("homepage");
         return   <Redirect to="/" />

        }
        return (
            <div className="">
                <h1>Kyc Details</h1>
                <AppBar position="static">
                    <Tabs
                        variant="fullWidth"
                        aria-label="nav tabs example"
                    >
                        <LinkTab className="link_tab" icon={<PhoneIcon />} label="MOBILE & EMAIL" {...a11yProps(0)} onClick={() => this.onClickPageChange(1)} />
                        {/* <LinkTab label="PAN" icon={<PanToolIcon />} className="link_tab" {...a11yProps(1)} onClick={() => this.onClickPageChange(2)} /> */}
                        <LinkTab label="Account Details" icon={<AccountBalanceIcon />} className="link_tab" {...a11yProps(2)} onClick={() => this.onClickPageChange(2)} />
                    </Tabs>
                    <TabPanel>
                        {this.conditionalRendering()}
                    </TabPanel>
                </AppBar>

            </div>
        )
    }
}

export default Bank_account;
