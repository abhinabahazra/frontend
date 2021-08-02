import React, { useEffect, useState } from "react";
import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
import { Button } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from "axios";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReactStars from "react-rating-stars-component";

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

const SingleContent = ({

  id,
  txt_movie,
  num_movie_id,
  txt_banner1,
  txt_banner2,
  txt_screenshot1,
  txt_screenshot2,
  txt_screenshot3,
  txt_screenshot4,
  txt_movie_title,
  category,
  num_movie_price_inr,
  num_movie_price_dollar,
  media_type,
  vote_average,
  language,
  txt_movie_rating,
  txt_synopsis,
  num_movie_genre,
  txt_trailer1,
  txt_trailer2,
  txt_director,
  txt_producer,
  modal,
  genre,
  length_min,txt_livecast
}) => {
  const [video, setVideo] = useState();
  const [content, setContent] = useState();
  const [name, setName] = useState('Abhinab')
  const [movieWatch, setMovieWatch] = useState(false);

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
      modal(true)
    }

  }
  // const fetchVideo = async () => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  //   );

  //   setVideo(data.results[0]?.key);
  // };
  // const fetchData = async () => {
  //   const { data } = await axios.get(
  //     `https://www.api3.digimovieplex.com/api/get_Home_allMoviedetails`
  //   );

  //   setContent(data.response.filter(e => e.id = id)[0]);
  // };
  const watchMovieStatus = async () => {
    if (sessionStorage.getItem('auth')) {
      let { num_user_id } = JSON.parse(sessionStorage.getItem('auth'));
      let data = {
        num_user_id: num_user_id,
        num_movie_id: num_movie_id
      }
      await axios.post('https://www.api3.digimovieplex.com/api/get_tran_by_id', data).then((res) => {
        console.log(res.data.status);
        if (res.data.status === 'success') {
          setMovieWatch(true);
        }
      })
    }
  }

  useEffect(() => {
    // fetchData();
    watchMovieStatus();
  }, []);
  // console.log("hhhhhhhhhhh",{num_movie_genre});

  const movieUserStatus = () => {
    if (sessionStorage.getItem('auth')) {
      let { num_master_id } = JSON.parse(sessionStorage.getItem('auth'));

      console.log("abhinab", num_master_id);
      if (num_master_id === '4') {
        let movieLink = encodeURIComponent(txt_movie)
        return (
          <>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <Button className="movie_icon" ><Link to={`/media_player/${movieLink}`}>Movie<PlayCircleOutlineIcon /></Link></Button>

              </Grid>
              <Grid item xs={12} sm={6}>
                <Button className="rating_icon" ><Link to={"/rating"}>Rating<ThumbUpIcon /></Link></Button>

              </Grid> */}
            </Grid>

            {/* <Button> <StarRatings
          starRatedColor="blue"
          numberOfStars={6}
          name='rating'
        />  </Button>        */}
          </>
        )
      } else {
        if (movieWatch) {
          let movieLink = encodeURIComponent(txt_movie)
          return (
            <>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}>
              <Button className="movie_icon" ><Link to={`/media_player/${movieLink}`}>Movie<PlayCircleOutlineIcon  className="icons"/></Link></Button>

              </Grid>
              <Grid item xs={12} sm={6}>
                <Button  className="rating_icon" ><Link to={`/rating/${encodeURI(JSON.stringify({mid:num_movie_id}))}`}>Rating<ThumbUpIcon className="icons" /></Link></Button>
                
              </Grid> */}
              </Grid>
            </>

          )
        } else {
          return (

            <div></div>
            // <Button variant="contained"
            // startIcon={<ShoppingCartIcon />}
            // color="secondary">
            // <Link className="youtube_icon" to={`/ticket/${encodeURI(JSON.stringify({mid:num_movie_id,mtitle:txt_movie_title,mprice:num_movie_price_inr}))}`}>But Tickets</Link>
            // </Button>
          )
        }
      }
    }

  }

  return (
    <ContentModal
      media_type={media_type}
      movie_id={num_movie_id}
      title={txt_movie_title}
      banner1={txt_banner1}
      banner2={txt_banner2}
      screenshot1={txt_screenshot1}
      screenshot2={txt_screenshot2}
      screenshot3={txt_screenshot3}
      screenshot4={txt_screenshot4}
      rating={txt_movie_rating}
      synopsis={txt_synopsis}
      trailer1={txt_trailer1}
      trailer2={txt_trailer2}
      producer={txt_producer}
      director={txt_director}
      language={language}
      category={category}
      duration={length_min}
      genre={genre}
      dollar={num_movie_price_dollar}
      inr={num_movie_price_inr}
      modal={modal}
      movieWatchStatus={movieWatch}
      txt_movie={txt_movie}
      txt_livecast={txt_livecast}
    >
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />

      <div >
        <img
          className="txt_banner1"
          src={txt_banner1 ? `${img_300}${txt_banner1}` : unavailable}
          alt={txt_movie_title}
        />
        <h6 className="down_title">{txt_movie_title}</h6>

        <div className="showme">
          <h3 className="txt_movie_title"><strong>{txt_movie_title}</strong></h3>

          <div className="movie_des">
            <strong><p>{category}  /  {language}  / {txt_movie_rating}</p></strong>
            <strong> <p>Ticket Rs. {num_movie_price_inr} | $ {num_movie_price_dollar}</p></strong>
          </div>
        </div>
      </div>






      {movieUserStatus()}
    </ContentModal>
  );
};

export default SingleContent;
