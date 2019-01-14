import React, { Component } from "react";
//import axios from 'axios';
import Aux from "../../hoc/Auxillary";
import axios from "axios";
//import classes from "./Trending.css";
import SpotifyAlbums from"./SpotifyAlbums";
import Modal from "./UI/Modal"
//import requireLogin from ""
//import keys from '../../config/keys';
let json;
let soundtrackJSON;
//let savedMovies;

//memo:  Could have used this too for the button
//<button onClick={ this.movieAlbumHandler.bind(this,{name:movie.title})}> soundtrack</button>

let spotifyMusic;
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
      //console.log(res)
      json = await res.data;
      if (json !== undefined) {
        this.setState ({
          loading: false,
          movies: json
        });
      }
    };
    trending();
    





  }
  movieAlbumHandler = (props) =>{
    let newSearch = encodeURIComponent(props.name);
    
    //console.log("newsearch" + newSearch);
    this.setState((state) => ({ show : true}));  
    const getMovieAlbum = async ()=>{
      //console.log("hello");
      let soundtrack = await axios.get("/api/soundtrack/" + newSearch);
      //console.log(soundtrack)
      soundtrackJSON = await soundtrack.data;
      //console.log(soundtrackJSON.length);
      //console.log(soundtrackJSON)

      if (soundtrackJSON !== undefined) {
        this.setState ({
          album: soundtrackJSON,
          //showAlbum:true
          noMatch: false,
          //show: false,

          
        })
        
        //console.log(spotifyMusic[0].name);
        //console.log(this.state.album[0].name);
      }else {
        this.setState({noMatch:true, show:true})
        
      }
      spotifyMusic=[...this.state.album];
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
    //  let bdy={...props};
    let savMovs ={...props}
    //console.log(e.googleId)
    //savMovs.googld =(e.googleId)
    console.log(savMovs);

       axios.post("/api/FavMovies/update", {savMovs})
      
      
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
          <h2>Trending</h2>
          <Modal show = {this.state.show} closeModal ={this.closeModalHandler}>
                <SpotifyAlbums  album={this.state.album} noMatch = {this.state.noMatch}></SpotifyAlbums>
          </Modal>
          <div>
          
          { this.state.movies.map((movie, i) => { 
            return (
              <Aux key= {movie.id} id={movie.id}>
                <img  src= {movie.poster} alt={movie.title}></img>
                <p >{movie.title}</p>
                <p>{movie.release_date}</p>
                <p>{movie.overview}</p>

                <button onClick={(e) => this.movieAlbumHandler({name:movie.title, id:movie.id}, e)}>Soundtrack</button>
                <form>
                <button action="submit" onClick={(e) => this.favMovieHandler({
                  name:movie.title, 
                  id:movie.id,
                  poster:movie.poster,
                  overview:movie.overview,
                  movieReleaseDate:movie.release_date }, e)}>Save to favs</button>
                </form>
               <div></div>
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
