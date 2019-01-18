import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./navigation/NavItems";
import { connect } from "react-redux";
import * as actions from "../actions";
import TrendingMovie from "./trending/Trending";

// these are dummy routes for components will be changed
//const Header = () => <h2>Header</h2>;
//const Landing = () => <h2>Landing</h2>;
//const Deck = () => <h2> Deck</h2>;
import FavMovies from "./trending/FavMovies";
import Login from "./trending/Login";

//const MovieList = () => <h2>MovieList</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path= '/' exact component ={TrendingMovie} />
          <Route path='/FavMovies' component={FavMovies} />
          <Route path='/Login' component={Login} />

        </div>
      </BrowserRouter>
    );
  }
}
export default connect(
  null,
  actions
)(App);
