import React, {Component}from 'react';
import Aux from '../../hoc/Auxillary'
class Login extends Component{
render(){
   return( 
    <Aux>
        <li>
        <a href ="/auth/google" alt="sign in with google">Sign In with Google</a>
        </li>
    </Aux>
   )
}
}

export default Login;