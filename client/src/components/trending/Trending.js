import React, { Component } from "react";
//import axios from 'axios';
import Aux from "../../hoc/Auxillary";
import axios from "axios";
//import classes from "./Trending.css";
import SpotifyAlbums from"./SpotifyAlbums";
import Modal from "./UI/Modal";
import classes from "./Trending.css"
//import requireLogin from ""
//import keys from '../../config/keys';
let json;
let soundtrackJSON;
//let saveThisMov;
//let savedMovies;

//memo:  Could have used this too for the button
//<button onClick={ this.movieAlbumHandler.bind(this,{name:movie.title})}> soundtrack</button>

//let spotifyMusic;
class TrendingMovie extends Component {
  constructor(props){
  super(props);
  this.ref = React.createRef();
  this.state = {
    loading: true,
    movie: [
      {
        key: "",
        backdrop: "",
        genre_ids: [],
        id: "",
        overview: "",
        poster: "",
        release_date: "",
        
      }
      
    ],
    album:[
      {
        name: "",
        release_date: "",
        image_url: "",
        external_urls: "",
        noMatch: null
    }
    ],
    show: false,
    
  };
  }
  componentDidMount() {
    const trending = async () => {
      //console.log("trending");
      const res = await axios.get("/api/trending");
      console.log(res)
      json = await res.data;
     
      if (json !== undefined) {
        this.setState ({
          loading: false,
          movies: json,
          
        });
      }
    };
    trending();
    





  }
  movieAlbumHandler = (props) =>{
    let newSearch = encodeURIComponent(props.name);
    
    this.setState((state) => ({ show : true}));  
    const getMovieAlbum = async ()=>{
      let soundtrack = await axios.get("/api/soundtrack/" + newSearch);
      soundtrackJSON = await soundtrack.data;
     

      if (soundtrackJSON !== undefined) {
        this.setState ({
          album: soundtrackJSON,
          //showAlbum:true
          noMatch: false,
          //show: false,

          
        })
        
        
      }else {
        this.setState({noMatch:true, show:true})
        
      }
      //spotifyMusic=[...this.state.album];
      }
    getMovieAlbum();
  }//end movieAlbumHandle 

  closeModalHandler = () =>{
    this.setState({
      show:false
    })
  }
  favMovieHandler =(props,e) =>{
    e.preventDefault();
    let savMovs ={...props}
    //    console.log(savMovs);
    

    axios.post("/api/FavMovies/update", {savMovs})
    .then(function (res) {
      
      alert("All set and saved to Favs");
    })
    .catch(function (error) {
      //console.log(error);
      alert("Login to save this movie")
    });
    
      

  }
  render() {
    if (this.state.loading) {
      return (
        <Aux>
          <h2>Trending</h2>
          <div>loading...</div>
        </Aux>
      );
    } 
    
      else{
      //console.log(soundtrackJSON.length);
      return (
        <Aux>
          <h2>Trending Movies</h2>
          <Modal show = {this.state.show} closeModal ={this.closeModalHandler}>
                <SpotifyAlbums  album={this.state.album} noMatch = {this.state.noMatch}></SpotifyAlbums>
          </Modal>
          <div>
          
          { this.state.movies.map((movie, i) => { 
            return (
              <Aux key= {movie.id} id={movie.id}>
                <div className={classes.Container}>
                <div className={classes.Content}>
                <img  src= {movie.poster} alt={movie.title}></img>
                </div>
                <div>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <p>{movie.overview}</p>
                </div>
                <button onClick={(e) => this.movieAlbumHandler({name:movie.title, id:movie.id}, e)}>Soundtrack</button>
                <form>
                <button action="submit" onClick={(e) => this.favMovieHandler({
                  name:movie.title, 
                  id:movie.id,
                  poster:movie.poster,
                  overview:movie.overview,
                  movieReleaseDate:movie.release_date }, e)}>Favs</button>
                </form>
               </div>
              </Aux>

            )
          })}   
                  
            </div>
            
        </Aux>
      );
    }
  }
  
    
  
}


export default TrendingMovie;
