import axios from "axios";
import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import SingleContent2 from "../../components/SingleContent2/SingleContent2";
import SingleContent3 from "../../components/SingleContent3/SingleContent3";

import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./MovieLaunch.css";

const MovieLaunch = (props, modal) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [previous, setPrevious] = useState([]);

  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);
  console.log("movieJS", props.modal);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://www.api3.digimovieplex.com/api/get_all_livecast_movie`
    );

    setContent(data.response);
  };

  const fetchPrevious = async () => {
    const { data } = await axios.get(
      `https://www.api3.digimovieplex.com/api/get_all_previous_cast_movie`
    );

    setPrevious(data.response);
  };


  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    fetchPrevious();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="LauchTitle">Upcoming Movie Launches</span>
      <div className="trending">

      {
          (content && content.length)? 
            <>
            {content &&
          content.map((c) => (
            <SingleContent3
              key={c.id}
              id={c.id}
              txt_banner1={c.txt_banner1}
              txt_banner2={c.txt_banner2}
              txt_screenshot1={c.txt_screenshot1}
              txt_screenshot2={c.txt_screenshot2}
              txt_screenshot3={c.txt_screenshot3}
              txt_screenshot4={c.txt_screenshot4}
              txt_movie_title={c.txt_movie_title || c.name}
              category={c.category}
              language={c.language}
              num_movie_price_inr={c.num_movie_price_inr}
              num_movie_price_dollar={c.num_movie_price_dollar}
              media_type={c.media_type}
              vote_average={c.vote_average}
              genre={c.genre}
              num_movie_id={c.num_movie_id}
              txt_movie={c.txt_movie}
              modal={props.modal}
              txt_movie_rating={c.txt_movie_rating}
              txt_synopsis={c.txt_synopsis}
              txt_trailer1={c.txt_trailer1}
              txt_trailer2={c.txt_trailer2}
              txt_director={c.txt_director}
              txt_producer={c.txt_producer}
              length_min={c.length_min}
              txt_livecast={c.txt_livecast}
              dat_livecast_date={c.dat_livecast_date}
              duration={c.duration}
            />
          ))}
            </>
            :
                <h1>No Upcoming Movie Found</h1>
        }
      </div>
      <br />
      <br /><br />
      <br />
      {/* ############################################## previous ############################################### */}
      <span className="LauchTitle">Previous Movie Launches</span>
      <div className="trending">
      {
          (previous && previous.length)? 
            <>
        {previous &&
          previous.map((c) => (
            <SingleContent2
              key={c.id}
              id={c.id}
              txt_banner1={c.txt_banner1}
              txt_banner2={c.txt_banner2}
              txt_screenshot1={c.txt_screenshot1}
              txt_screenshot2={c.txt_screenshot2}
              txt_screenshot3={c.txt_screenshot3}
              txt_screenshot4={c.txt_screenshot4}
              txt_movie_title={c.txt_movie_title || c.name}
              category={c.category}
              language={c.language}
              num_movie_price_inr={c.num_movie_price_inr}
              num_movie_price_dollar={c.num_movie_price_dollar}
              media_type={c.media_type}
              vote_average={c.vote_average}
              genre={c.genre}
              num_movie_id={c.num_movie_id}
              txt_movie={c.txt_movie}
              modal={props.modal}
              txt_movie_rating={c.txt_movie_rating}
              txt_synopsis={c.txt_synopsis}
              txt_trailer1={c.txt_trailer1}
              txt_trailer2={c.txt_trailer2}
              txt_director={c.txt_director}
              txt_producer={c.txt_producer}
              length_min={c.length_min}
              dat_livecast_date={c.dat_livecast_date}
              txt_livecast={c.txt_livecast}

            />
          ))}
           </>
            :
                <h1>No Previous Movie Found</h1>
        }
      </div>
      <div id="slide_main"></div>

    </div>
  );
};

export default MovieLaunch;
