const keys = require("../config/keys");
const express = require("express");
//const router = express.Router();

const axios = require("axios");
var qs = require('qs');

let tmdbID = keys.tmdbID;
const basetmbdURI = "https://api.themoviedb.org/3/trending/movie/week?api_key=";
let trendingMoviesURI = basetmbdURI + tmdbID;

const musicTokenURI = "https://accounts.spotify.com/api/token";
const musicSearchURI = "https://api.spotify.com/v1/search?type=album&q=";

module.exports = app => {
  app.get("/api/trending", async (req, res) => {
    //console.log("app.get");
    // console.log(trendingMoviesURI);
    let movieJSON = await axios.get(trendingMoviesURI);
    // let json = await res;
    //console.log(movieJSON.data.results);

    const movies = movieJSON.data.results.map(results => {
      return {
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
   //   let encoded = 'YTE1OWUwN2YzN2JiNDc3ZjgwYWEyZmZiYTk5NDIxZDU6NzRlMzI0YzU1MDJkNDcwNmEwNjM1NmM0N2ExYTM4ZWQ=';
   let spotifyClientData = keys.spotifyClientID + ":" + keys.spotifyClientSecret;
   let buff = new Buffer(spotifyClientData);  
   let base64data = buff.toString('base64');
   // console.log("spotifyClientData ", spotifyClientData);
   // console.log("base64data ", base64data);
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

  app.get("/api/soundtrack", async (req, res) => {
    let token = getSpotifyToken();

    //Use musicSearchURI to get results

    //Filter results for album-type = 'album' or 'compilation' (i.e. != 'single')

    //Map json to create json to return to client

    //return the json

    //write the rest of the app

    //console.log("app.get");
    // console.log(apiCall);
    // let musicJSON = await axios.get(musicSearchURI);
    // let json = await res;
    //console.log(movieJSON.data.results);

    // const movies = movieJSON.data.results.map(results => {
    //    return{
    //    id: results.id,
    //    title: results.title,
    //    release_date: results.release_date,
    //    overview: results.overview,
    //    poster: 'https://image.tmdb.org/t/p/w154' + results.poster_path,
    //    backdrop: 'https://image.tmdb.org/t/p/w780' + results.backdrop_path,
    //    genre_ids: results.genre_ids
    //    }
    // });

    res.send("aquaman");
  });
};
//=========================
