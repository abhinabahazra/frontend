import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const { qString } = useParams();
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {

    axios.post('https://www.api3.digimovieplex.com/api/getMovieByTitle', { movie_title: searchText }).then((resp) => {
      //console.log(resp.data);
      if (resp.data.status === "success") {
        setContent(resp.data.response);
      }

    })
  };

  const getSearch = () => {
    if (qString) {
      let data = decodeURIComponent(escape(qString));
      setSearchText(data);
      axios.post('https://www.api3.digimovieplex.com/api/getMovieByTitle', { movie_title: data }).then((resp) => {
        //console.log(resp.data);
        if (resp.data.status === "success") {
          setContent(resp.data.response);
        }

      })
    }
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    getSearch();

  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
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
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c, index) => (
            <SingleContent
              key={c.index}
              txt_banner1={c.txt_banner1}
              txt_movie_title={c.txt_movie_title || c.txt_movie_title}
              txt_synopsis={c.txt_synopsis || c.txt_synopsis}
              language={c.language || c.language}
              txt_producer={c.txt_producer || c.txt_producer}
              txt_director={c.txt_director || c.txt_director}
              category={c.category || c.category}
              txt_movie_rating={c.txt_movie_rating || c.txt_movie_rating}
              num_movie_price_inr={c.num_movie_price_inr || c.num_movie_price_inr}

            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
      <div id="slide_main"></div>
    </div>
  );
};

export default Search;
