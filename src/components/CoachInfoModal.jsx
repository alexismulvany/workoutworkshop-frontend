import React, { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image';
import DefaultProfilePic from '../images/DefaultProfile.jpg'
import test from '../images/SAMSULEKTEST.png'

import DOTWvailibility from './DOTWavailibility'

import fivestars from '../images/5_star_NOBG.png'


const MODAL_STYLES={
  position: "fixed",
  display:"flex",
  top:"50%",
  left:"50%",
  transform:"translate(-50%, -50%)",
  backgroundColor:"#FFF",
  width:"45vw",
  height:"75vh",
  paddingTop:"22px",
  borderRadius:"3%",
  alignItems:"center",
  flexDirection: "column",
  zIndex:1000,
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

const HEADER_STYLES={
    display: "flex",
    height: "3rem",
    width:"95%",
    maxWidth:"60rem",
    PaddingBottom: "10%",
    borderRadius: "50px",
    border: "none",
    backgroundColor: "#D9D9D9",
    alignItems:"center",
    paddingLeft:"5%",
    fontSize: "175%"
}

const BIO_STYLES={
    display:"flex",
    backgroundColor:"#D9D9D9",
    borderRadius:"5%", 
    width:"45%", 
    height:"100%", 
    marginTop:"25px", 
    marginLeft:"5%", 
    paddingTop: "5px",
    alignItems:"center",
    justifyContent:"center",
    flexDirection: "column"
}

const BIOTEXT_STYLES={
    display:"flex",
    backgroundColor:"#ffffff",
    width:"90%",
    height:"90%",
    borderRadius:"5%",
    marginBottom:"20px", 
    paddingTop: "5px", 
    paddingLeft:"5px", 
    paddingRight:"5px", 
    overflowWrap:"breakWord",
    overflowY:"auto"
}

const REVIEW_STYLES={
    display:"flex",
    backgroundColor:"#D9D9D9",
    borderRadius:"15px", 
    width:"50%", 
    height:"100%", 
    marginTop:"25px", 
    paddingTop: "5px",
    alignItems:"center",
    justifyContent:"center",
    flexDirection: "column"
}

const NCOLUMN1_STYLES={
    display:"flex",
    width:"50%", 
    height:"100%", 
    marginTop:"25px",
    marginLeft:"35px",
    flexDirection:"column"
}

const COACHINGINFO_STYLES={
    display:"flex",
    backgroundColor:"#D9D9D9",
    borderRadius:"25px", 
    width:"100%", 
    height:"60%", 
    paddingLeft:"25px",
    alignItems:"center"
}

const RATING_STYLES={
    display:"flex",
    backgroundColor:"#D9D9D9",
    borderRadius:"25px", 
    width:"100%", 
    height:"35%", 
    marginTop:"5%",
    paddingLeft:"25px",
    alignItems:"center",
    fontSize:"x-large"
}

export default function CoachInfoModal( {show, handleClose, name, URL, price, is_nutritionist, id} ){
    if(!show){return null;}
    let imgURL = ""
    if (URL === "error: Field 'null' not found" || !URL){
        imgURL = DefaultProfilePic
    }
    else{
        imgURL = URL;
    }

    let category="Strength"
    if(is_nutritionist){category="Strength, Nutrition"}

    let stars= fivestars
    return(
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <div style={HEADER_STYLES}>
                        SAM SULEK
                    </div>
                    <div style={{width:"100%", height:"95%", display:"flex", flexDirection:"column", marginLeft:"5%"}}>{/*MAIN body*/}
                            <div style={{display:"flex", width:"100%", heigh:"50%", flexDirection:"row"}}> {/*ROW 1*/}
                            <div style={{width:"45%", height:"100%", paddingTop:"25px"}}> {/*PROFILE PICTURE*/}
                                <Image src={test} roundedCircle style={{ width: "100%", height: "100%", objectFit:"cover"}}/>
                            </div> {/*PROFILE PICTURE*/}
                            <div style={BIO_STYLES}> {/*BIO*/}
                                <h3>BIO</h3>
                                <div style={BIOTEXT_STYLES}>
                                    <p>My name is Sam Sulek, I am a fitness content creator. I love to workout, it is my passion. I also enjoy diving and eating right. High protien, low calories is the key to success in the gym. Please allow me to join you on you fitness journey so we can share this passion together!</p>
                                </div>
                            </div> {/*BIO*/}
                        </div>{/*ROW1*/}

                        <div style={{display: "flex", width:"95%", height:"25%", marginTop:"20px", flexDirection:"row"}}>{/*Row2*/}
                            <div style={REVIEW_STYLES}> {/*REVIEWS*/}
                                <h3>REVIEWS</h3>
                                <div style={BIOTEXT_STYLES}/>
                            </div> {/*REVIEWS*/}
                            <div style={NCOLUMN1_STYLES}>{/*Nested Column*/}
                            <div style={COACHINGINFO_STYLES}> {/*INFO*/}
                                    Coach Type: {category}<br/>
                                    Price: $25.99/week
                            </div>
                            <div style={RATING_STYLES}> {/*RATING*/}
                                <b>RATING:</b>
                                <Image src={stars} style={{ width: "60%", height: "60%"}}/>
                            </div> {/*RATING*/}
                            </div>{/*Nested COlumn*/}
                        </div>{/*Row2*/}
                        <div style={{display: "flex", backgroundColor:"#D9D9D9", borderRadius: "15px", width:"95%", height:"18%", marginTop:"5%", alignItems:"center", justifyContent:"center"}}> {/*Row3*/}
                            <div style={{display: "flex",width:"95%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                            <DOTWvailibility available={false} DOTW={"Sun"}/>
                            <DOTWvailibility available={true} DOTW={"Mon"}/>
                            <DOTWvailibility available={true} DOTW={"Tue"}/>
                            <DOTWvailibility available={true} DOTW={"Wed"}/>
                            <DOTWvailibility available={true} DOTW={"Thu"}/>
                            <DOTWvailibility available={true} DOTW={"Fri"}/>
                            <DOTWvailibility available={false} DOTW={"Sat"}/>
                            </div>
                        </div> {/*Row3*/}
                    </div> {/*MAIN BODY*/}
                </div> {/*MODAL*/}
            </div> {/*OVERLAY*/}
        </>

    )
}