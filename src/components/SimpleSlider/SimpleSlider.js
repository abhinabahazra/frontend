import React, { Component } from "react";
import Slider from "react-slick";
import "./SimpleSlider.css";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      
    };


    // arrows: false,
    // dots: false,
    // pauseOnHover: false,
    // infinite: true,
    // speed: 3000,
    // autoplay: true,
    // fade: true,
    // variableWidth: false,
    // slidesToShow: 1,
    // slidesToScroll: 1,




    return (
      <div className="container" id="slide_main">
                      {/* <a id="main"><button className="opennnn">☰</button></a> */}

        <Slider {...settings}>

        <img src=" https://digimovieimages.s3.ap-south-1.amazonaws.com/1624384773567-OTTB1-bakso poster smaLL.jpg" alt="banner" />
        
          <img src="banner.jpg" alt="banner" />
          
        
          <img src="banner1.jpg" alt="banner" />

         
         
         
        </Slider>
      </div>
    );
  }
}