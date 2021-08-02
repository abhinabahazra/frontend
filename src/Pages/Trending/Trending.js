import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SimpleSlider from '../../components/SimpleSlider/SimpleSlider';
import { useHistory } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import { Link, Redirect } from "react-router-dom";
import Marquee from "react-fast-marquee";

const breakPoints = [
  { width: 320, itemsToShow: 3 },
  { width: 500, itemsToShow: 5 }
];
const setting ={
  direction:"right",
};



const Trending = (props) => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [release, setRelease] = useState([]);


  const [movieByCategory, setMovieByCategory] = useState([]);
  const history = useHistory();


  const fetchTrending = async () => {
    const { data } = await axios.get(`https://www.api3.digimovieplex.com/api/get_Home_allMoviedetails`);
    setContent(data.response);
  };

  const fetchRelease = async () => {
    const { data } = await axios.get(`https://www.api3.digimovieplex.com/api/get_all_active_previous_movie_list`);
    setRelease(data.response);
  };


  const movieFilter = async () => {
    let getMovies = await axios.get(`https://www.api3.digimovieplex.com/api/get_Home_allMoviedetails`);
    let getCategories = await axios.get(`https://www.api3.digimovieplex.com/api/movie_category_list`);
    let category = getCategories.data.response;
    let movie = getMovies.data.response;
    let getData = []
    category && category.length && category.map((cat, i) => {
      getData[i] = {}
      getData[i]['movieList'] = []
      //console.log("abhinab",typeof cat.category,cat.id)
      movie && movie.length && movie.map((mov) => {
        //console.log("aaaaaaaaaaaaaaaa",typeof mov.num_movie_category)

        if (parseInt(cat.id) === mov.num_movie_category) {
          //console.log("ccccccc",i,cat.category,mov.txt_movie_title)
          getData[i]['categoryName'] = cat.category
          getData[i]['categoryId'] = cat.id
          getData[i]['movieList'].push(mov)
        }
      })
    })
    console.log("suvayan", getData)

    setMovieByCategory(getData)
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    movieFilter();
    fetchRelease();

  }, [page]);

  if (sessionStorage.getItem('auth')) {
    let { num_master_id } = JSON.parse(sessionStorage.getItem('auth'));
    if (num_master_id === '2') {
      history.push("/producer");
    }
  }
  return (
    <div>
       
      <SimpleSlider />
      
      <span className="pageTitle">Trending Today</span>
      <div className="trending">

        <Carousel breakPoints={breakPoints} >


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
                modal={props.modal}
                txt_movie_rating={c.txt_movie_rating}
                txt_synopsis={c.txt_synopsis}
                txt_trailer1={c.txt_trailer1}
                txt_trailer2={c.txt_trailer2}
                txt_director={c.txt_director}
                txt_producer={c.txt_producer}
                length_min={c.length_min}
                txt_livecast={c.txt_livecast}

              />

            ))}

        </Carousel>
      </div>

      {
        release && release.length &&
        <>
          <span className="pageTitle">New Release</span>
          <div className="trending">
            <div className="seall"><button className="see_more_button"><Link to={"/new_release"} className="view_all">View All</Link></button></div>
            <Carousel breakPoints={breakPoints} >


              {release &&
                release.map((c) => (
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
                    modal={props.modal}
                    txt_movie_rating={c.txt_movie_rating}
                    txt_synopsis={c.txt_synopsis}
                    txt_trailer1={c.txt_trailer1}
                    txt_trailer2={c.txt_trailer2}
                    txt_director={c.txt_director}
                    txt_producer={c.txt_producer}
                    length_min={c.length_min}
                    txt_livecast={c.txt_livecast}


                  />

                ))}

            </Carousel>
          </div>
        </>
      }



      {
        movieByCategory && movieByCategory.length && movieByCategory.map((resData) => {
          if (resData.movieList && resData.movieList.length) {
            return (
              <>
                <div className="trending">
                  <Link
                   to={`/categoryMovie/${btoa(resData.categoryId)}/${btoa(resData.categoryName)}`} className="pageTitle">{resData.categoryName}
                   </Link>
                  <div className="seall"><button className="see_more_button"><Link
                   to={`/categoryMovie/${btoa(resData.categoryId)}/${btoa(resData.categoryName)}`} 
                   className="view_all">View All</Link></button></div>
                  <Carousel breakPoints={breakPoints}>


                    {resData.movieList && resData.movieList.length &&
                      resData.movieList.map((c) => (
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
                          modal={props.modal}
                          txt_movie_rating={c.txt_movie_rating}
                          txt_synopsis={c.txt_synopsis}
                          txt_trailer1={c.txt_trailer1}
                          txt_trailer2={c.txt_trailer2}
                          txt_director={c.txt_director}
                          txt_producer={c.txt_producer}
                          length_min={c.length_min}
                          txt_livecast={c.txt_livecast}

                        />
                      ))}

                  </Carousel>

                </div>

              </>
            );
          }
        })
      }
    </div>
  );
};

export default Trending;
