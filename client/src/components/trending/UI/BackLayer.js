import React from "react";
import classes from './BackLayer.css'
const BackLayer =(props)=>(
    props.show ? <div className={classes.BackLayer} onClick= {props.closeModal}></div> : null
)
export default BackLayer;