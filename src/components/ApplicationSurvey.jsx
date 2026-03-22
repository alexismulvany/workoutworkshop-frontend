import React, { useState, useEffect } from "react"

const MODAL_STYLES={
  position: "fixed",
  display:"flex",
  top:"50%",
  left:"50%",
  transform:"translate(-50%, -50%)",
  backgroundColor:"#FFF",
  width:"40vw",
  height:"50vh",
  paddingTop:"22px",
  borderRadius:"3%",
  alignItems:"center",
  flexDirection: "column",
  zIndex:1000,
  border:"solid"
}
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

const CLOSEBUTTON_STYLES={
    display: "flex", 
    height: "100%", 
    width:"100%",
    maxWidth:"25px",
    background: "none", 
    justifyContent: "center",
    alignItems:"center",
    border: "none",
    background: "none",
    color:"#ff0000",
    float:"right"
}

function ApplicationError({show}){
    if(!show){return null}
    return(
    <font color="#f50303">Please Enter Valid Application</font>
    )
}

export default function ApplicationSurvey( {show, handleClose} ){
    if (!show){return null}

    const [comment, setComment] = useState("")
    const [applicationError, setApplicationError] = useState(false)
    const [applyButton, setApplyButton] = useState("Apply")

    function validateComment(){
        let valid=true
        let data ={}
        //data["user"] = /*ID of the logged in user*/
        if(comment.length === 0 || comment.trim() === ""){
            setApplicationError(true)
            valid = false
            return
        }
        else{
            data["message"] = comment
            console.log(comment)
            setApplyButton("Applied!")
        }

        /*post the data*/
    }

    return(
    <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
            <div style={{display:"flex", minWidth:"450px", justifyContent:"center", fontSize:"34px"}}>
                <b>APPLICATION SURVEY</b>
                <button style={CLOSEBUTTON_STYLES} onClick={handleClose}> X </button>
            </div>
            <p>
                -Explain why you want/need coaching <br/>
                -Explain why you think im a good fit to be your coach
            </p>
            <textarea onChange={(e)=>{setComment(e.target.value), setApplicationError(false)}} style={{width:"95%", height:"65%", overflowWrap:"break-word"}}/>
            <ApplicationError show={applicationError}/>
            <button onClick={validateComment} style={{display:"flex", width:"95%", height:"10%", borderRadius:"5px", marginBottom:"10px", marginTop:"10px", color:"#ffffff", backgroundColor:"#2C2C2C", alignItems:"center", justifyContent:"center"}}> {applyButton} </button>
        </div>
    </div>
    )
}