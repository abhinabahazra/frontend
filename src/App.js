import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import "./App.css";
import React, { useEffect,useState }  from 'react'
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Marque from "./components/Marque";
import axios from "axios";

import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
import { Container } from "@material-ui/core";
import Login from "./Pages/Login/Login";
import Producer from "./Pages/Producer/Producer";
import Add_movies from "./Pages/Add_movies/Add_movies";
import Bank_account from "./Pages/Bank_account/Bank_account";
import My_Drafts from "./Pages/My_Drafts/My_Drafts";
import Preview from "./Pages/Preview/Preview";
import Producer_movies from "./Pages/Producer_movies/Producer_movies";
import User_profile from "./Pages/User_profile/User_profile";
import Media_player from "./Pages/Media_player/Media_player";
import Trailer from "./Pages/TrailerPlayer/TrailerPlayer";
import Footer from './components/Footer/Footer';
import Terms from "./Pages/Terms/Terms";
import Privacy from "./Pages/PrivacyPolicy/Privacy";
import Refund from "./Pages/Refund/Refund";
import Contact from "./Pages/Contact/Contact";
import ScrollTop from "./Pages/ScrollTop";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Aboutus from "./Pages/Aboutus/Aboutus";
import Changepass from "./Pages/ChangePassword/Changepass";
import User_transaction from "./Pages/User_transaction/User_transaction";
import Refer from "./Pages/Refer/Refer";
import Feedback from "./Pages/Feedback/Feedback";
import ConfirmForgot from "./Pages/Confirm_forgot/Confirm_forgot";
import Rating from "./Pages/Rating/Rating";
import TicketPage from "./Pages/TicketPage/TicketPage";
import Balance from "./Pages/Balance/Balance";
import UploadPreview from "./Pages/UploadPreview/UploadPreview";
import caro from "./Pages/caro/caro";
import CategoryMovie from "./Pages/CategoryMovie/CategoryMovie";
import MovieLaunch from "./Pages/MovieLaunch/MovieLaunch";
import ProducerLaunch from "./Pages/ProducerLaunch/ProducerLaunch";
import NewRelease from "./Pages/NewRelease/NewRelease";
import Response from "./Pages/Response/Response";
import MobileVari from "./Pages/MobileVari/MobileVari";


// import Payu from "./Pages/Payu/Payu";



import Marquee from "react-fast-marquee";




const setting ={
  direction:"right",
};

const LoginModal = ({ close, login }) => (
  <div className="modal-bg">
    <div className="modal">
      <Login close={close} login={login} />
    </div>
  </div>
)

const Disclaimer = ({close}) => {
  const accept = () => {
    localStorage.setItem('accepted', true);
    close();
  }
  return (
    <div className="modal-bg" >
    <div className="modal" id="disclaimer">
    <h2>Disclaimer</h2>
                <p>Digi Movieplex is a digital cinema hall. Different kinds of contents are available here. Some of these contents are strictly limited to those over 18 or of legal age in your jurisdiction, whichever is greater.
                It is important that responsible parents and guardians take the necessary steps to prevent minors from accessing unsuitable contents online, especially age-restricted contents.
                Anyone with a minor in their household or under their supervision should implement basic parental control protections, including computer hardware and device settings, software installation, to block your minors from accessing inappropriate contents.
</p>
      <button className="disclaimer_button" onClick={accept}>Proceed</button>
      <a className="disclaimer_button" href="https://www.google.com/">Reject</a>
    </div>
  </div>
  )
}

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const accepted = JSON.parse(localStorage.getItem('accepted'));
  const [showDisclaimer, setShowDisclaimer] = useState(accepted);
  const [login, setLogin] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [movieLink, setMovieLink] = useState([]);
    const getMovieLink = () =>{
        axios.get('https://www.api3.digimovieplex.com/api/get_All_Livecast_link').then(res =>{
          console.log("aaaaaaaaaaaa",res.data.response)
            setMovieLink(res.data.response)
        })
    }

    useEffect(() =>{
        getMovieLink();
    },[])
  const showLoginModal = (signup) => {
    setLoginModal(() => {
      setLogin(signup);
      return true;
    })
  }

  const closeDisclaimer = () => {
    setShowDisclaimer(false);
  }

  const getUserState = () => {
    console.log('ssss');
    setIsLogin(true)
  }

  const closeModal = () => {
    setLoginModal(false)
  }
  return (
    <BrowserRouter>
      { accepted ? null : <Disclaimer close={closeDisclaimer}/> }
      <Header showLogin={showLoginModal}
      />
      { loginModal ? <LoginModal close={closeModal} login={login} getUserState={getUserState} /> : null}
      <div className="app" id="app">
        <Container>
        <ScrollTop>
        {(movieLink && movieLink.length >0)?
          <Marque movies={movieLink}/>
          : null
        }
        {/* <Marque movies={movieLink}/> */}

          <Switch>
            <Route path="/" component={() => <Trending modal={showLoginModal} />} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search/:qString?" component={Search} />
            <Route path="/producer" component={Producer} />
            <Route path="/add_movies/:id?/:num?" component={Add_movies} />
            <Route path="/bank_account" component={Bank_account} />
            <Route path="/my_drafts" component={My_Drafts} />
            <Route path="/preview" component={Preview} />
            <Route path="/producer_movies" component={Producer_movies}/>
            <Route path="/user_profile" component={User_profile} />
            <Route path="/media_player/:link" component={Media_player} />
            <Route path="/trailer/:link" component={Trailer}/>
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/refund" component={Refund} />
            <Route path="/contact" component={Contact} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/about" component={Aboutus} />
            <Route path="/changePass" component={Changepass} />
            <Route path="/userTransaction" component={User_transaction} />
            <Route path="/refer" component={Refer} />
            <Route path="/feedback" component={Feedback} />
            <Route path="/rating/:id" component={Rating} />
            <Route exact path="/confirm_password/:id" component={ConfirmForgot} />
            <Route exact path="/ticket/:id" component={TicketPage} />
            <Route exact path="/prevUpload/:id" component={UploadPreview} />
            <Route exact path="/balance" component={Balance} />
            <Route exact path="/caro" component={caro} />
            <Route exact path="/categoryMovie/:id/:name" component={CategoryMovie} />
            <Route exact path="/launch" component={MovieLaunch} />
            <Route exact path="/producer_launch" component={ProducerLaunch} />
            <Route exact path="/new_release" component={NewRelease} />
            <Route exact path="/getResponse" component={Response} />
            <Route exact path="/mobile_varification" component={MobileVari} />

            

            {/* <Route exact path="/payu" component={Payu} /> */}



            


            

          </Switch>
          </ScrollTop>
        </Container>
      </div>
      <Footer />

      {/* <SimpleBottomNavigation /> */}



    </BrowserRouter>

  );
}

export default App;
