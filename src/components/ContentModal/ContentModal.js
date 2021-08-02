import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import swal from 'sweetalert';
//import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Slider from "react-slick";
import SingleContent from "../SingleContent/SingleContent";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';


import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,

};

const useStyles = makeStyles((theme) => ({

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({txt_livecast, movieWatchStatus, txt_movie, genre, inr, dollar, screenshot1, screenshot2, screenshot3, screenshot4, modal, num_movie_id, txt_movie_title, id, num_movie_price_inr, category, duration, children, language, media_type, movie_id, title, banner1, banner2, rating, synopsis, trailer1, trailer2, producer, director }) {
  const [movieWatch, setMovieWatch] = useState(false);
  const [value, setValue] = React.useState(2);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const loginAlert = () => {
    modal(true)

  }
  
  const loginAlert1 = () => {
    alert("modal openingVVVVVVVVVVV")
   

  }
  


  let propsArrayOne = [ banner1, banner2, screenshot1, screenshot2, screenshot3, screenshot4];

  let propsArrayTwo = [];

  propsArrayOne.map((value)=>{
    if(value != null){
      propsArrayTwo.push(value);
    }
  })
  
  // razorpay^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  async function displayRazorpay() {
    if (sessionStorage.getItem('auth')) {
      let { num_user_id, name, txt_emailid, num_mobile_no } = JSON.parse(sessionStorage.getItem('auth'));
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }

      // const datavalue = await fetch('https://www.api3.digimovieplex.com/api/razor_pay', { method: 'POST' }).then((t) =>
      //   t.json()
      // )

      const datavalue = await fetch('https://www.api3.digimovieplex.com/api/razor_pay', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: num_movie_price_inr })
      }).then((t) => t.json()
      )

      const options = {
        key: 'rzp_live_dBZPEjBOzvl7lC',
        currency: datavalue.data.currency,
        amount: num_movie_price_inr * 100,
        order_id: datavalue.data.id,
        name: txt_movie_title,
        description: 'Movie Price',
        image: 'https://yt3.ggpht.com/ytc/AAUvwng3nQkYlePFziyvoYSWbFVdcQ88vhrqJoG8uinx=s900-c-k-c0x00ffffff-no-rj',
        handler: function (response) {

          let paymentDetails = {
            num_amount: num_movie_price_inr,
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            transaction_signature: response.razorpay_signature,
            num_user_id: num_user_id,
            num_movie_id: num_movie_id
          }

          let redirect = fetch('https://www.api3.digimovieplex.com/api/insert_transaction', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentDetails)
          }).then((response) => response.json()).then((data) => data)

          redirect.then((res) => {
            if (res.status === 'success') {
              setMovieWatch(true);
            }
            swal({
              title: res.title,
              text: res.text,
              icon: res.icon,
              successMode: true,
            })
              .then(success => {
                if (success) {
                  window.location.href = "/"
                }
              });
          })
        },

        prefill: {
          id: num_user_id,
          name: name,
          email: txt_emailid,
          phone_number: num_mobile_no
        }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } else {
      // modal(true)
      alert("please login first")
    }

  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    await axios.get('https://www.api3.digimovieplex.com/api/get_Home_allMoviedetails', { id: movie_id }).then((res) => {
      setContent(res.data.response);
      // console.log("aaaaaaaaaaaa",res.data.response)
    });


    // console.log(data);
  };
  const watchMovieModal = () => {
    if (sessionStorage.getItem('auth')) {
      let { num_master_id } = JSON.parse(sessionStorage.getItem('auth'));
      let movieLink = encodeURIComponent(txt_movie)

      if (num_master_id === '4') {

        return (
          <Grid item xs={12} sm={6}>
            <Button variant="contained"
              startIcon={<PlayCircleOutlineIcon />}
              color="secondary">
              <Link to={`/media_player/${movieLink}`}>Movie</Link>
            </Button>

          </Grid>
        )
      } else {
        if (movieWatchStatus) {
          return (
            

              <Button variant="contained" className="watch_movie_button"
                startIcon={<PlayCircleOutlineIcon />}
                color="secondary">
                <Link to={`/media_player/${movieLink}`}>Movie</Link>
              </Button>

          )
        } else {
          return (
            <Button variant="contained"
              startIcon={<ShoppingCartIcon />}
              color="secondary">

              <Link to={`/ticket/${encodeURIComponent(JSON.stringify({ mid: movie_id, mtitle: title, mprice: inr }))}`}> Buy Ticket</Link>
            </Button>
          )
        }
      }
    }
  }


  useEffect(() => {
    fetchData();

  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}

      >

        {/* this is the inner modal ************************************************************************************** */}
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <a className="closebtn" onClick={handleClose}>×</a>

              <div className="ContentModal">
                {/* image of the poster */}
                <Carousel autoPlay >
                  {
                    propsArrayTwo && propsArrayTwo.map((value)=>{
                      return(
                              <img src={`https://www.api3.digimovieplex.com/${value}`}
                                  alt={title || title}
                                  className="ContentModal__portrait"
                                />
                      )
                    })
                  }
                </Carousel>
                {/* end */}


                <div className="ContentModal__about">
                  <h1 className="ContentModal__title">
                    {title}
                  </h1>
                  <div className="information"> <h4>{category} &nbsp;| &nbsp;{language} &nbsp;| &nbsp;{rating} &nbsp;| &nbsp;{genre} &nbsp;| &nbsp;{duration}min</h4>
                    <h4>Ticket Price</h4>
                    <h4 className="price">Rs. {inr} | $ {dollar}</h4>
                  </div>
                  {/* &nbsp;&nbsp;/&nbsp;&nbsp; */}
                  <h3 className="synopsis_modal">Synopsis</h3>

                  <span className="ContentModal__description">
                    {synopsis}
                  </span>


                  <div className="modal_button">
                    <Button variant="contained"
                    className="trailer_one"
                    startIcon={<YouTubeIcon />}
                    color="secondary">
                    <Link to={`/trailer/${encodeURIComponent(trailer1)}`}>Trailer 1</Link>
                  </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  
                  
                    {
                      trailer2 ?
                        <Button variant="contained"
                        className="trailer2_button"
                          startIcon={<YouTubeIcon />}
                          color="secondary">
                          <Link to={`/trailer/${encodeURIComponent(trailer2)}`}>Trailer 2</Link>
                        </Button> : ''
                    }
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      txt_livecast ?
                        <Button variant="contained"
                          startIcon={<YouTubeIcon />}
                          color="secondary">
                          <Link to={`/trailer/${encodeURIComponent(txt_livecast)}`}>Launch Video</Link>
                        </Button> : ''
                    }
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      (sessionStorage.getItem("auth")) ?

                        watchMovieModal()
                        :
                        <Button variant="contained"
                        className="trailer_two"
                          startIcon={<ShoppingCartIcon />}
                          color="secondary"  onClick={loginAlert} onClick={loginAlert} >

                          Buy Ticket
                        </Button>

                    }

                  </div>
                  <div className="production_info">
                    {/* <Carousel id={movie_id} media_type={media_type} /> */}
                    <strong><a>Directed By: {director} </a></strong><br />
                    <strong><a>Produced By: {producer}</a></strong>
                  </div>



                </div>

              </div>
            </div>
          )}

        </Fade>
      </Modal>
    </>
  );
}
