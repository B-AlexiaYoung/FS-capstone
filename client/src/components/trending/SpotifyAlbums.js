import React from 'react';
import Aux from '../../hoc/Auxillary';
import classes from "./SpotifyAlbums.css";
const SpotifyAlbums =(props)=>{
    console.log(props.album[0]);
    //console.log(props.noMatch);
    // if(props.album){
if (props.noMatch===undefined|| props.noMatch===true ){
    return (
    null
    )
}if(props.album.length ===0){
return(
    <h2>Whoops!! couldn't find a soundtrack on Spotify</h2>
)
}else{
    console.log(props.album)

return(
            <Aux className ={classes.show}>
            <h2>Best match from Spotify</h2>
            <img src= {props.album[0].image} alt={props.album[0].name}/>
            <div className={classes.moveRight}>
            <a className={classes.AlbumLink} href={props.album[0].external_urls} target= "_blank" alt= {props.album[0].name}>{props.album[0].name}</a>
            <p>{props.album[0].release_date}</p>
            </div>
             </Aux>
            )
     
}   
}
   
//}
 export default SpotifyAlbums;