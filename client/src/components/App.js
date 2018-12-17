import React, {Component} from  'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './navigation/NavItems';
import {connect} from 'react-redux';
import * as actions from '../actions';


// these are dummy routes for components will be changed
    //const Header = () => <h2>Header</h2>;
    const Landing = () => <h2>Landing</h2>;
    const MovieList = () => <h2>MovieList</h2>;
    const SongList = () => <h2>SongList</h2>;

class App extends Component {
    componentDidMount (){
        this.props.fetchUser();
    }
    render (){
        return (     
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path= '/' exact component = {Landing} />
                    <Route path= '/movieList' component = { MovieList } />
                    <Route path= '/songlist' component = { SongList } />

                </div>
            </BrowserRouter>
            
        );
    }
};
export default connect(null, actions)(App);