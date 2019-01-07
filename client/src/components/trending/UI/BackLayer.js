import React from "react";
import classes from './BackLayer.css'
const BackLayer =(props)=>(
    props.show ? <div className={classes.BackLayer}></div> : null
)
export default BackLayer;