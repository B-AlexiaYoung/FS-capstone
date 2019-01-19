import React, { Component } from "react";
import axios from "axios";
import Aux from "../../hoc/Auxillary";
let currentMovFavs;

class FavMovies extends Component {
  constructor(props) {
    super()
    this.state = {
        loading: true,
        movie: [
          {
            key: "",
            backdrop: "",
            id: "",
            overview: "",
            poster: "",
            release_date: ""
            
          }
        ]
    }
  }
  componentDidMount() {
    const getSavedFavs = async () => {
      const myMovies = await axios.get("/api/favMovies");
      
      currentMovFavs = await myMovies.data.movieList;
      console.log("myMovies", myMovies.data);
      if (this.state.loading) {
        this.setState ({
          loading: false,
          movies: currentMovFavs,
          
        });
      }
      // when response has been received iterate over the response and display
      //favorite movies.
      //console.table(currentMovFavs);
      console.log(this.state.movies.length);
    };
    getSavedFavs();
  }
  render() {
    
    if (this.state.loading){
        return ( <p>Make sure you logged in, so we can get your list. </p>  )
    } else if(this.state.movies !==undefined) {
       return(
           <Aux>
        {this.state.movies.map((mov,i) =>{
            return(
                <Aux key= {mov.movieId} id={mov.movieId}>
                <img src={mov.poster} alt={mov.name} />
                <p>{mov.title}</p>
                <p>{mov.release_date}</p>
                <p>{mov.overview}</p>

                </Aux>
            )
        })}
        
        
    </Aux>
    )
  } else if(this.state.movies.length===0){
    return (
        <p>No movies saved yet </p>
        
    )
}
}

}//end component
export default FavMovies;
