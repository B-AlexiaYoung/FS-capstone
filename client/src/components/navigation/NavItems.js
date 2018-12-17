import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItems.css';

class Header extends Component {
    render(){
        return (
            <div className={classes.NavWrapper}>

                <h2 className={classes.Logo}>Mumo</h2>
                <ul className={classes.NavItems}>
                    <li>
                        <NavLink to="/auth/google" alt="sign in with google">Sign In with Google</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signIn" alt="sign in ">Sign In</NavLink>
                    </li>
                </ul>
                
            </div>
        )
    }
}

export default Header;