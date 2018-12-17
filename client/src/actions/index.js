import axios from 'axios';
import FETCH_USER from './types';
// uses Redux Thunk to gain access to dispatch
//the following will return a function and immediatly call it
// the axios call is made and when that response is received then the action is dispatched.
export const fetchUser =() =>{
    return function (dispatch){
        axios.get('/api/verifiedUser')
        .then(res => dispatch({type: FETCH_USER, payload: res}));
    }
};


// export const fetchUser = () =>  async dispatch => {
//     dispatch({ type: FETCH_USER, payload: await axios.get("/api/verifiedUser")}
//     );console.log({type:FETCH_USER})
// };