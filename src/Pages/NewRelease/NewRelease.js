import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../components/Pagination/CustomPagination";

const NewRelease = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://www.api3.digimovieplex.com/api/get_all_active_previous_movie_list`
    );

    setContent(data.response);
  };

  // const NewReleaseFunc = () =>{
  //     (content && content.length)? 
  //     <>
  //     </>
  //     :
  //     null
  // }

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">New Release</span>
      <div className="trending">
        {
          (content && content.length)? 
            <>
            {content &&
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
            </>
            :
                <h1>No Movies Found</h1>
        }
        
      </div>
      <div id="slide_main"></div>
     

      {/* {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )} */}
    </div>
  );
};

export default NewRelease;
