import React from "react";
import Aux from "../../../hoc/Auxillary"
import classes from "./Modal.css";
import BackLayer from "./BackLayer";
import { PromiseProvider } from "mongoose";
//import { PromiseProvider } from 'mongoose';

const Modal =(props)=> {
    return(
        <Aux>
            <BackLayer show={props.show}/>
            <div className={classes.Modal}
                style ={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? 1: 0
                }
                    
                }>
                {props.children}
            </div>
        </Aux>
    )
}
export default Modal;