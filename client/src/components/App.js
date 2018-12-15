import React from  'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';

//const Header = () => <h2>Header</h2>;
const Landing = () => <h2>Landing</h2>;
const MovieList = () => <h2>MovieList</h2>;
const SongList = () => <h2>SongList</h2>;


const App = () =>{
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path= '/' exact component = {Landing} />
                    <Route path= '/movieList' component = { MovieList } />
                    <Route path= '/songlist' component = { SongList } />

                </div>
            </BrowserRouter>
        </div>
    );
};
export default App;