import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './NavItems.css';
import Aux from '../../hoc/Auxillary';

class Header extends Component {
    show(){
        switch(this.props.auth){
            case null:
            return ;
         case false:
        return (
        <Aux>
        
            <li>
            <a href ="/auth/google" alt="sign in with google">Sign In with Google</a>
            </li>
            <li>
            <a href ="/signIn" alt="sign in ">Sign In</a>
            </li> 
        
        </Aux>
        )
        default:
        return   <a href="/api/logout" alt="sign out ">Sign out</a>;
        }
    }
    render(){
        console.log(this.props);
        return (
            <div className={classes.NavWrapper}>

                <h2 className={classes.Logo}>Mumo</h2>
                <ul className={classes.NavItems}>
                </ul>
                {this.show()}
            </div>
        )
    }
}

//refactored, destructured the auth property of the state,
//keys and values are the same so these can be condensed to just auth.
// function mapStateToProps (state){
//     return { auth :state.auth};
// }

function mapStateToProps ({auth}){
    return {auth}
}

export default connect (mapStateToProps) (Header);