import React, { Component } from "react";
import axios from "axios";
import Aux from "../../hoc/Auxillary";
import classes from "./FavMovies.css";
let currentMovFavs;

class FavMovies extends Component {
  constructor(props) {
    super();
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
      ],
      update: false
    };
  }
  componentDidMount() {
    this.setState({ update: false });
    const getSavedFavs = async () => {
      const myMovies = await axios.get("/api/favMovies");

      currentMovFavs = await myMovies.data.movieList;
      if (this.state.loading) {
        this.setState({
          loading: false,
          movies: currentMovFavs
        });
      }
    };
    getSavedFavs();
  }

  deleteMovieHandler = (props, e) => {
    e.preventDefault();
    let deleteMovs = { ...props };

    axios
      .post("/api/FavMovies/delete", { deleteMovs })
      .then(() => {
        this.setState({ update: true });
        window.location.reload();
      })
      .catch(function(error) {
        //console.log(error);
        if (error) {
          //console.log(error)
          //alert("deleted")
        }
      });
  };
  render() {
    if (this.state.loading) {
      return (
        <Aux>
          <div className={classes.Container}>
            <p>Make sure you are signed in, so we can get your list.</p>
          </div>
        </Aux>
      );
    } else if (this.state.movies.length === 0) {
      return (
        <Aux>
          <h2>My Movies</h2>
          <div className={classes.Container}>
            <p className={classes.Content}>
              No movies currently saved to your list
            </p>
          </div>
        </Aux>
      );
    } else if (this.state.movies !== undefined) {
      return (
        <Aux>
          <h2>My Movies</h2>

          {this.state.movies.map((mov, i) => {
            return (
              <Aux key={mov.movieId} id={mov.movieId}>
                <div className={classes.Container}>
                  <div className={classes.Content}>
                    <img src={mov.poster} alt={mov.name} />
                  </div>
                  <div>
                    <p>{mov.title}</p>
                    <p>{mov.release_date}</p>
                    <p>{mov.overview}</p>
                  </div>
                  <form>
                    <button
                      action="submit"
                      onClick={e =>
                        this.deleteMovieHandler(
                          {
                            _id: mov._id,
                            name: mov.title,
                            poster: mov.poster,
                            overview: mov.overview
                          },
                          e
                        )
                      }
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </Aux>
            );
          })}
        </Aux>
      );
    } else if (this.state.movies.length === 0) {
      return <p>No movies saved yet </p>;
    }
  }
} //end component
export default FavMovies;
