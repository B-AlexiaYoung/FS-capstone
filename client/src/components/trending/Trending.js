import React, { Component } from "react";
//import axios from 'axios';
import Aux from "../../hoc/Auxillary";
import axios from "axios";
import classes from "./Trending.css";
//import keys from '../../config/keys';
//let MovieData;
let json;
//let movie;

class TrendingMovie extends Component {
  state = {
    loading: true,
    movie: [
      {
        backdrop: "",
        genre_ids: [],
        id: "",
        overview: "",
        poster: "",
        release_date: "",
        title: ""
      }
    ]
  };
  componentDidMount() {
    const trending = async () => {
      console.log("trending");
      const res = await axios.get("/api/trending");
      json = await res.data;
      if (json !== undefined) {
        this.setState ({
          loading: false,
          movies: json
        });
        // console.log("state.loading: " + this.state.loading);
        // movie = "load";
      }
    //   this.setState.movies = await json;
      //movie = await json;
    //   console.log(json);
    };

    trending();
  }
  movieHandler = () =>{
      // display modal
  }
  render() {
    if (this.state.loading) {
    //   console.log("loading");
      return (
        <Aux>
          <h2>Trending</h2>
          <div>loading...</div>
        </Aux>
      );
    } else {
    //   console.log("loaded");
      return (
        <Aux>
          <h2>Trending</h2>

          <div>return 
          
			
            { this.state.movies.map((movie, i) => {
				return (
                    <Aux>
					<img onClick={() => this.movieHandler()} src= {movie.poster} alt={movie.title}></img>
					<p onClick={() => this.movieHandler()}>{movie.title}</p>
					<p>{movie.release_date}</p>
                    </Aux>
				
                )
        })
      }
    
    </div>
        </Aux>
      );
    }
  }
}
export default TrendingMovie;
