import axios from "axios";
import {
    Button,
    createMuiTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";
import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useParams } from "react-router-dom";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";

const Movies = () => {
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState([]);
    const { id, name } = useParams();
    const getMovieByCategoryId = async () => {
        await axios.post(`https://www.api3.digimovieplex.com/api/getHomeMovieDetailsByCategory`, { id: atob(id) }).then((res) => {
            //console.log(res.data.response)
            setContent(res.data.response);
        })
    }
    const fetchSearch = async () => {

        axios.post('https://www.api3.digimovieplex.com/api/getHomeMovieDetailsByCategoryIdandText',{movie_title :searchText,id: atob(id)}).then((resp)=>{
         //console.log(resp.data);
          if(resp.data.status === "success"){
            setContent(resp.data.response);
          }
          
        })
      };
    useEffect(() => {
        getMovieByCategoryId();
    }, [])
    return (
        <div>
            <span className="pageTitle">{atob(name)}</span>
            <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            placeholder={atob(name)}
            variant="filled"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
            <div className="trending">
                {content && content.length &&
                    content.map((c) => (
                      <SingleContent
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
                      // modal={props.modal}
                      txt_movie_rating={c.txt_movie_rating}
                      txt_synopsis={c.txt_synopsis}
                      txt_trailer1={c.txt_trailer1}
                      txt_trailer2={c.txt_trailer2}
                      txt_director={c.txt_director}
                      txt_producer={c.txt_producer}
                      length_min={c.length_min}
      
                    />
                    ))}
            </div>
            <div id="slide_main"></div>

        </div>
    );
};

export default Movies;
