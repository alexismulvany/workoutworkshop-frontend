import React from "react";

const AVAILABLE_STYLES={
    border: "solid #ffffff5a",
    display:"flex",
    height:"85%",
    width:"15%",
    backgroundColor:"#14AE5C",
    borderRadius:"5px",
    alignItems:"center",
    justifyContent:"center",
    color:"#ffffff",
    fontSize:"200%"
}

const NOTAVAILABLE_STYLES={
    border: "solid #ffffff5a",
    display:"flex",
    height:"85%",
    width:"15%",
    backgroundColor:"#2C2C2C",
    borderRadius:"5px",
    alignItems:"center",
    justifyContent:"center",
    color:"#ffffff",
    fontSize:"200%"
}

export default function DOTWvailibility( {available, DOTW}){
    if (available){
        return(
            <div style={AVAILABLE_STYLES}>
                {DOTW}
            </div>
        )
    }
    else{
        return(
            <div style={NOTAVAILABLE_STYLES}>
                {DOTW}
            </div>
        )
    }
}