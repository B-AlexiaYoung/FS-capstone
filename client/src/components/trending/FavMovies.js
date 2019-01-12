import React, { Component } from "react";
import axios from "axios";

class FavMovies extends Component{
constructor(props) {
    super();
};
componentDidMount(){
const getSavedFavs = async ()=>{
    const myMovies =  await axios.get('/api/favMovies')
    // when response has been received iterate over the response and display
    //favorite movies.
    console.log(myMovies);
}
getSavedFavs();
}
    render(){
    return(
    <p>Favorite Movies</p>
    )}
}
export default FavMovies;