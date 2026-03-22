import React from "react"

const OVERLAY_STYLES={
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex:1000,
}

const MODAL_STYLES={
  position: "fixed",
  display:"flex",
  top:"50%",
  left:"50%",
  transform:"translate(-50%, -50%)",
  backgroundColor:"#FFFFFF",
  width:"35vw",
  height:"30vh",
  borderRadius:"3%",
  flexDirection: "column",
  zIndex:1000,
}


export default function FireModal( {show, handleClose, name, coach_id}){
    if(!show){return null}

    /* Handle removing the user coach pair from coach_subscriptions */

    return(
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <div style={{display:"flex", width:"100%", height:"70%", minWidth:"100%", maxWidth:"100%", minHeight:"70%", maxHeight:"70%", fontSize:"300%", alignContent:"center", justifyContent:"center", textAlign:"-webkit-center"}}>
                    <b>Are you sure you want to fire<br/>{name}</b>
                </div>
                <div style={{display:"flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", gap:"10%"}}>
                    <button onClick={handleClose} style={{border:"none", backgroundColor:"#2C2C2C", height:"50%", width:"35%", borderRadius:"8px", color:"#ffffff"}}>Back</button>
                    <button style={{border:"none", backgroundColor:"#711A19", height:"50%", width:"35%", borderRadius:"8px", color:"#ffffff"}}>Yes</button>
                </div>
            </div>
        </div>
    )
}