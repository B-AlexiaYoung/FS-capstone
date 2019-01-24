const keys = require("../config/keys");
const express = require("express");
const router = express.Router();

const axios = require("axios");
var qs = require("qs");
let tmdbID = keys.tmdbID;
const basetmbdURI = "https://api.themoviedb.org/3/trending/movie/week?api_key=";
let trendingMoviesURI = basetmbdURI + tmdbID;

const musicTokenURI = "https://accounts.spotify.com/api/token";
const musicSearchURI = "https://api.spotify.com/v1/search?type=album&q=";
let mongoose = require("mongoose");

const User = mongoose.model("users");
module.exports = app => {
  app.get("/api/trending", async (req, res) => {
    let movieJSON = await axios.get(trendingMoviesURI);

    const movies = movieJSON.data.results.map(results => {
      return {
        key: results.id,
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
    let spotifyClientData =
      keys.spotifyClientID + ":" + keys.spotifyClientSecret;
    let buff = Buffer.from(new String(spotifyClientData));
    let base64data = buff.toString("base64");

    let body = {
      grant_type: "client_credentials"
    };
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + base64data
    };
    let tokenJSON = await axios.post(musicTokenURI, qs.stringify(body), {
      headers: headers
    });

    return tokenJSON.data.access_token;
  }

  app.get("/api/soundtrack/:album", async (req, res) => {
    let searchTerm = req.params.album;
    let token = await getSpotifyToken();
    let baseSpotifySearch =
      "https://api.spotify.com/v1/search?type=album,artist&q=";
    let musicSearchURI = baseSpotifySearch + searchTerm;
    let searchHeader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };

    let musicJSON = await axios.get(musicSearchURI, { headers: searchHeader });
    function filterSingles(album) {
      return album.album_type !== "single";
    }
    if (musicJSON.length === 0) {
      return (musicJSON = [
        {
          noMatch: true,
          error: "no matching albums found"
        }
      ]);
    }

    let noSingles = musicJSON.data.albums.items.filter(filterSingles);

    const albums = noSingles.map(results => {
      return {
        key: results.id,
        id: results.id,
        name: results.name,
        release_date: results.release_date,
        external_urls: results.external_urls.spotify,
        image: results.images[2].url,
        searchTerm: results.id,
        noMatch: false
      };
    });
    res.send(albums);
  });

  app.post("/api/FavMovies/update", (req, res, next) => {
    let result;
    if (req.user === undefined) {
      var error = new Error("You must be logged in");
      error.code = 401;
      return res.status(401).send({ error: error });
    } else {
      User.findOne(
        { googleId: req.user.googleId },
        { movieList: { $elemMatch: { movieId: req.body.savMovs.id } } },
        function(err, data) {
          if (err) {
            res.status(404);
          }
          result = data;
        }
      ).then(data => {
        if (result.movieList.length === 0) {
          User.findOneAndUpdate(
            { googleId: req.user.googleId },
            {
              $push: {
                movieList: {
                  title: req.body.savMovs.name,
                  movieId: req.body.savMovs.id,
                  poster: req.body.savMovs.poster,
                  movieReleaseDate: req.body.savMovs.movieReleaseDate,
                  overview: req.body.savMovs.overview
                }
              }
            },
            { new: true },
            (error, movie) => {}
          );
        }
        res.status(200).send({ saved: "All set" });
      });
    }
  });
  // get favorite movies
  app.get("/api/FavMovies", async (req, res, next) => {
    if (req.user === undefined) {
      var error = new Error("You must be logged in");
      error.code = 401;
      return res.status(401).send({ error: error });
    } else {
      User.findOne(
        { googleId: req.user.googleId },
        "movieList",
        (err, movie) => {
          if (err) {
            return res.status(500).send(err);
          } else {
            res.send(req.user);
            return res.status(404);
          }
        }
      ).catch(function(err) {
        console.log(err);
      });
    } //end else
  });

  app.post("/api/FavMovies/delete", (req, res, next) => {
    User.updateOne(
      { googleId: req.user.googleId },
      {
        $pull: {
          movieList: {
            title: req.body.deleteMovs.name
          }
        }
      },
      { new: true },
      (error, movie) => {
        if (error) {
          return error;
        } else {
          return res.status(200).end();
        }
      }
    );
  });

}; 
