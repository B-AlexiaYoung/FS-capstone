 const keys = require("../config/keys");
const express = require("express");
const router = express.Router();

const axios = require("axios");
var qs = require('qs');
let tmdbID = keys.tmdbID;
const basetmbdURI = "https://api.themoviedb.org/3/trending/movie/week?api_key=";
let trendingMoviesURI = basetmbdURI + tmdbID;

const musicTokenURI = "https://accounts.spotify.com/api/token";
const musicSearchURI = "https://api.spotify.com/v1/search?type=album&q=";
//let User = require("../models/User")
let mongoose = require("mongoose");
const requireLogin = require('../middlewares/requireLogin')

const User = mongoose.model('users');

module.exports = app => {
  app.get("/api/trending", async (req, res) => {
    //console.log("app.get");
    // console.log(trendingMoviesURI);
    let movieJSON = await axios.get(trendingMoviesURI);
    // let json = await res;
    //console.log(movieJSON.data.results);

    const movies = movieJSON.data.results.map(results => {
      return {
        key:results.id,
        id: results.id,
        title: results.title,
        release_date: results.release_date,
        overview: results.overview,
        poster: "https://image.tmdb.org/t/p/w154" + results.poster_path,
        backdrop: "https://image.tmdb.org/t/p/w780" + results.backdrop_path,
        genre_ids: results.genre_ids
      };
    });

    res.send(movies);
  });

  async function getSpotifyToken() {
  let encoded = 'YTE1OWUwN2YzN2JiNDc3ZjgwYWEyZmZiYTk5NDIxZDU6NzRlMzI0YzU1MDJkNDcwNmEwNjM1NmM0N2ExYTM4ZWQ=';
  //  let spotifyClientData = keys.spotifyClientID + ":" + keys.spotifyClientSecret;
  //  let buff = new Buffer(spotifyClientData);  
  //  let base64data = buff.toString('base64');
//++++++++++++++++++++++++++++++++++++++++++++++
 let spotifyClientData = keys.spotifyClientID + ":" + keys.spotifyClientSecret;
   let buff = Buffer.from(new String (spotifyClientData));  
   let base64data = buff.toString('base64');

 //++++++++++++++++++++++++++++++++++++++++++++++  
    //console.log("spotifyClientData ", spotifyClientData);
   //console.log("base64data ", base64data);
   // console.log("encoded ", encoded);
    let body = {
      "grant_type": "client_credentials"
    };
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":
        "Basic " + base64data
    };
    let tokenJSON = await axios.post(musicTokenURI, qs.stringify(body), { headers: headers });

    console.log(tokenJSON.data);

    return tokenJSON.data.access_token;
  }

  app.get("/api/soundtrack/:album", async (req, res) => {
    let searchTerm = req.params.album;
    //let searchTerm = '\"bird\" ';
    console.log("wibble" + searchTerm);
    let token = await getSpotifyToken();
    let baseSpotifySearch ="https://api.spotify.com/v1/search?type=album,artist&q=";
    let musicSearchURI = baseSpotifySearch + searchTerm;
    let searchHeader = {
     "Accept": "application/json",
     "Content-Type": "application/json",
      "Authorization": "Bearer "+ token
    };


    //Map json to create json to return to client

    //return the json

     let musicJSON = await axios.get(musicSearchURI, {headers : searchHeader});
     //let json = await res;
    //console.log(musicJSON.data.albums.items);
    function filterSingles(album){
       return album.album_type !== "single";
         
       
    }
    if (musicJSON.length === 0){
      return musicJSON = [{
        noMatch : true,
        error: "no matching albums found"
      }]
    }

    let noSingles= musicJSON.data.albums.items.filter(filterSingles);
    //console.log(noSingles);

     const albums = noSingles.map(results => {
        return{
          key:results.id,
          id: results.id,
          name: results.name,
          release_date: results.release_date,
          external_urls: results.external_urls.spotify,
          image: results.images[2].url,
          searchTerm: results.id,
          noMatch: false
        }
     });
res.send(albums);
  });

  
app.get("/api/FavMovies",(req,res,next)=>{
  //make database request and send to client
  res.send(req.user)
  //console.log(req.user,"wibb");
})

  app.post("/api/FavMovies/update",requireLogin,(req, res, next)=>{
    //make database find and update
    console.log("mugs",req.body.savMovs.name);
    console.log("mugs",req.body.savMovs.id);
    console.log("mugs",req.body.savMovs.poster);
    console.log("mugs",req.body.savMovs.movieReleaseDate);

    console.log(req.user.googleId)
// title, movieId, poster, movieReleaseDate
      
        User.findOneAndUpdate({googleId:req.user.googleId}, {$push : {
          movieList:{
            title: req.body.savMovs.name,
            movieId:req.body.savMovs.id.toString(),
            poster: req.body.savMovs.poster.toString(),
            movieReleaseDate:req.body.savMovs.movieReleaseDate.toString()

          }
          
        }},
        {new: true},
        (err, movie) => {
          // Handle any possible database errors
              if (err) return res.status(500).send(err);
              console.log(res.body)
              return res.send(movie);
              //return res.status(200);
          }
        );
      });

      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // can get rid of this if it doen't work
  // get favorite movies
  app.get("/api/FavMovies",requireLogin,(req, res, next)=>{
    //search by googleId and retrieve movieList
    User.findOne({googleId:req.user.googleId}, 'movieList',(err, movie) => {
      if (err) return res.status(500).send(err);
              console.log(res.body)
              return res.statuscode(200);
    })
    
    // handle errors (no movies saved)and set statuscode to 404
    // set response code to 200
    //send movieList to client
  })
  // get get rid of the above between lines 164 to 176 get for api/FavMovies
  // +++++++++++++++++++++++++++++++++++++++




  
  //++++++++++++++++++++++++++++++++++++
 }; // do not remove


