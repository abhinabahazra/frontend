import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { AppBar } from '@material-ui/core';

import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) {
    } else if (value === 1) {
      history.push("/movies");
    } else if (value === 2) {
      history.push("/series");
    } else if (value === 3) {
      history.push("/search");
    }
  }, [value, history]);


  if (sessionStorage.getItem('auth')) {
    let { num_master_id } = JSON.parse(sessionStorage.getItem('auth'));
    // console.log(typeof num_master_id);
    if (num_master_id === '3' || num_master_id === '4') {
      console.log('check');
      return (
        <React.Fragment>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction
              style={{ color: "white" }}
              label="Trending"
              icon={<WhatshotIcon />}
            />
            <BottomNavigationAction
              style={{ color: "white" }}
              label="Movies"
              icon={<MovieIcon />}
            />
            <BottomNavigationAction
              style={{ color: "white" }}
              label="TV Series"
              icon={<TvIcon />}
              // disabled
    
            />
            <BottomNavigationAction
              style={{ color: "white" }}
              label="Search"
              icon={<SearchIcon />}
              // disabled
            />
          </BottomNavigation>
    
        </React.Fragment>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
  return (
    <React.Fragment>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="TV Series"
          icon={<TvIcon />}
          // disabled

        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
          // disabled
        />
      </BottomNavigation>

    </React.Fragment>
  );
}
