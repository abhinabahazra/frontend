import "./Header.css";
import { Link, Redirect } from "react-router-dom";
import React from "react";
import axios from 'axios';
import Slider from "react-slick";

import { Collapse } from "bootstrap";
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShareIcon from '@material-ui/icons/Share';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleSlider from "../SimpleSlider/SimpleSlider";
import App from "../../App";

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchItem: '',
      txt_profile_pic: '',
      anchorEl: null,
      navBarToggle: "none",
      sideBarToggle: "0"

    }
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  onClickSignOut = () => {
    sessionStorage.removeItem('auth')
    window.location.reload()
    window.location.href = "/"
  }


  componentDidMount() {
    if (sessionStorage.getItem('auth')) {
      let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
      axios.post('https://www.api3.digimovieplex.com/api/getUserById', { user_id: num_user_id }).then((res) => {
        if (res.data.status === 'success') {
          this.setState({
            txt_profile_pic: res.data.response.txt_profile_pic
          })
        }
      })
    }
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,

    };
    const closeNav1 = () => {
      console.log('media : ', window.matchMedia("(max-width: 600px)"));
      let media = window.matchMedia("(max-width: 600px)").matches;
      if (media) {
        document.getElementById("menu").style.display = "none";
        document.getElementById("slide_main").style.paddingTop = "0px";
        document.getElementById("app").style.paddingTop = "0px";
      }

    }

    const openNav1 = async () => {
      this.setState({
        navBarToggle: (this.state.navBarToggle === 'none') ? 'block' : 'none'
      }, () => {
        document.getElementById("menu").style.display = this.state.navBarToggle;
        if (this.state.navBarToggle === 'none') {
          document.getElementById("slide_main").style.paddingTop = "0px";
          document.getElementById("app").style.paddingTop = "0px";
        } else {
          // document.getElementById("app").style.paddingTop = "250px";

        }
      })


    }





    // *****************************************toggle button **********************************************

    const openNav = async () => {
      this.setState({
        sideBarToggle: (this.state.sideBarToggle === "0") ? "250px" : "0"
      }, () => {
        document.getElementById("mySidebar").style.width = this.state.sideBarToggle;
        document.getElementById("main").style.marginLeft = this.state.sideBarToggle;
      })
    }

    const closeNav = async () => {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }

    const renderAuthButton = () => {
      if (sessionStorage.getItem('auth')) {
        let { name, num_master_id } = JSON.parse(sessionStorage.getItem('auth'));

        if (num_master_id === '3' || num_master_id === '4') {
          return (
            <>
              <Link className="login_in">Welcome {name}</Link>
              <a id="main"><button className="openbtn" onClick={openNav}>☰</button></a>
              {/* <a id="main" className="mobile_button"><img onClick={openNav} src={(this.state.txt_profile_pic) ? `${this.state.txt_profile_pic}` : 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png'} /></a> */}
            </>
          )
        } else {
          return (
            <>
              <Link className="login_in">Welcome {name}</Link>
              <a id="main"><button className="openbtn" onClick={openNav}>☰</button></a>
            </>
          )
        }
      }
    }
    const producerMenue = () => {
      if (sessionStorage.getItem('auth')) {
        let { num_master_id } = JSON.parse(sessionStorage.getItem('auth'));
        if (num_master_id === '2') {
          console.log('check');
          return (
            <>
              <Link className="active" onClick={closeNav1} to={"/producer"}>Producer</Link>
              <div id="mySidebar" className="sidebar">
                <div className="sidebar_logo">
                  <img src={(this.state.txt_profile_pic) ? `${this.state.txt_profile_pic}` : 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png'} />
                </div>
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
                <strong><a><Link onClick={closeNav} to={"/user_profile"}><div className="sidebar_icon"><PersonIcon /></div>MY PROFILE</Link></a></strong>
                <hr />
                <strong><a><Link onClick={closeNav} to={"/changePass"}><div className="sidebar_icon"><SettingsIcon /></div>Settings</Link></a></strong>
                <hr />
                <strong><a onClick={this.onClickSignOut}><div className="sidebar_icon"><ExitToAppIcon /></div>Logout</a></strong>
              </div>
            </>
          );
        } else {

          // **************************************    USERPART  **************************************************
          return (
            <>
              <Link className="active" onClick={closeNav1} to={"/"}>HOME</Link>
              <Link className="header_movies"> <Button className="SELECTION_BUTTON" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                MOVIES
              </Button></Link>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <Link to={"/movies"} onClick={closeNav1}><MenuItem onClick={this.handleClose}>All Movies</MenuItem></Link>
                <Link to={"/new_release"} onClick={closeNav1}><MenuItem onClick={this.handleClose}>New Releases</MenuItem></Link>
              </Menu>
              <Link to={"/launch"} onClick={closeNav1} className="header_launch"><Button className="SELECTION_BUTTON">
                Launch
              </Button></Link>
              <div id="mySidebar" className="sidebar" >
                <div className="sidebar_logo">
                  <img src={(this.state.txt_profile_pic) ? `${this.state.txt_profile_pic}` : 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png'} />
                </div>
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/user_profile"}><div className="sidebar_icon"><PersonIcon /></div>MY PROFILE</Link></a></strong>
                <hr />
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/changePass"}><div className="sidebar_icon"><SettingsIcon /></div>Settings</Link></a></strong>
                <hr />
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/userTransaction"}><div className="sidebar_icon"><AccountBalanceIcon /></div>Transactions Details</Link></a></strong>
                <hr />
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/refer"}><div className="sidebar_icon"><ShareIcon /></div>Refer A Friend</Link></a></strong>
                <hr />
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/balance"}><div className="sidebar_icon"><AccountBalanceWalletIcon /></div>My Wallet</Link></a></strong>
                <hr />
                <strong><a onClick={this.onClickSignOut}><div className="sidebar_icon"><ExitToAppIcon /></div>Logout</a></strong>
              </div>

            </>
          );
        }
      } else {
        return (
          <>
            <div className="header_item">
              <Link className="active" onClick={closeNav1} to={"/"}>HOME</Link>
              <Link className="header_movies"> <Button className="SELECTION_BUTTON" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                MOVIES
              </Button></Link>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <Link to={"/movies"} onClick={closeNav1}><MenuItem onClick={this.handleClose}>All Movies</MenuItem></Link>
                <Link to={"/new_release"} onClick={closeNav1}><MenuItem onClick={this.handleClose}>New Releases</MenuItem></Link>
              </Menu>
              <Link to={"/launch"} onClick={closeNav1} className="header_launch"><Button className="SELECTION_BUTTON">
                Launch
              </Button></Link>

              <input className="search_box" type="text" placeholder="Search.." onChange={(e) => this.setState({ searchItem: e.target.value })} />
              <Link className="search_icon" onClick={closeNav1} type="submit" to={(this.state.searchItem) ? `/search/${unescape(encodeURIComponent(this.state.searchItem))}` : ''}><i id="search_bar" class="fa fa-search"></i></Link>

              <div className="login_getway">
                <Link className="login_hover" onClick={() => { this.props.showLogin(true) }}>LOG IN</Link>
                <Link className="subscribe" onClick={() => { this.props.showLogin(false) }}>SIGN UP</Link>
              </div>
            </div>

            {/* <button className="HEAD">☰</button> */}
          </>);
      }
    }

    // 44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444

    const lastButton = () => {
      if (sessionStorage.getItem('auth')) {
        let { num_master_id } = JSON.parse(sessionStorage.getItem('auth'));
        if (num_master_id === '3') {
          console.log('check');
          return (
            <>
              <a id="main" className="mobile_button"><img onClick={openNav} src={(this.state.txt_profile_pic) ? `${this.state.txt_profile_pic}` : 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png'} /></a>

              <div id="mySidebar" className="sidebar" >
                <div className="sidebar_logo">
                  <img src={(this.state.txt_profile_pic) ? `${this.state.txt_profile_pic}` : 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png'} />
                </div>
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/user_profile"}><div className="sidebar_icon"><PersonIcon/></div>MY PROFILE</Link></a></strong>
                <hr />
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/changePass"}><div className="sidebar_icon"><SettingsIcon /></div>Settings</Link></a></strong>
                <hr />
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/userTransaction"}><div className="sidebar_icon"><AccountBalanceIcon /></div>Transactions Details</Link></a></strong>
                <hr />
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/refer"}><div className="sidebar_icon"><ShareIcon /></div>Refer A Friend</Link></a></strong>
                <hr />
                <strong><a onClick={closeNav1}><Link onClick={closeNav} to={"/balance"}><div className="sidebar_icon"><AccountBalanceWalletIcon /></div>My Wallet</Link></a></strong>
                <hr />
                <strong><a onClick={this.onClickSignOut}><Link onClick={closeNav} to={""}><div className="sidebar_icon"><ExitToAppIcon /></div>Logout</Link></a></strong>
              </div>
            </>
          );
        }
      }
    }

    return (
      <>
        <div className="container">
          <div onClick={() => window.scroll(0, 0)} className="header">
            <div class="header_logo">
              <Link to={"/"}><img src="digital.png" alt="movie-plex" /></Link>
              {lastButton()}
            </div>
            <div className="main_header" id="menu">
              {producerMenue()}
              {renderAuthButton()}

            </div>
            <button type="button" id="collapse2" onClick={openNav1} class="collapse2">☰</button>


          </div>

        </div>

      </>
    )
  }

}

export default Header;

//onClick={showCollapse()}
