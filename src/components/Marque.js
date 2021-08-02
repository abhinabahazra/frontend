import React, { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Marquee from "react-fast-marquee";
import axios from "axios";


const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2d313a",
        zIndex: 100,
    },
});

export default function Marque(props) {
    const setting = {
        direction: "right",
        
    };
    // const [movieLink, setMovieLink] = useState([]);
    // const getMovieLink = () =>{
    //     axios.get('https://www.api3.digimovieplex.com/api/get_All_Livecast_link').then(res =>{
    //         setMovieLink(res.data.response)
    //     })
    // }

    // useEffect(() =>{
    //     getMovieLink();
    // },[])


    if (sessionStorage.getItem('auth')) {
        let { num_master_id } = JSON.parse(sessionStorage.getItem('auth'));
        // console.log(typeof num_master_id);
        if (num_master_id === '3' || num_master_id === '4') {
            console.log('check');
            return (
                
                <Marquee {...setting}  >

                    {
                        props.movies && props.movies.length && props.movies.map((val)=>{
                            if(val.txt_livecast_link){
                                return(<a href={val.txt_livecast_link} target="_blank" style={{marginRight:'20px'}}>{val.txt_movie_title} Live Telecast is started. Click Here :::</a>)
                            }
                        })
                    }
                </Marquee>
            );
        } else {
            return null;
        }
    } else {
        return null;
    }

}
