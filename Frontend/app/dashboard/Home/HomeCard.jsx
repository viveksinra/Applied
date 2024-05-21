"use client";
import React, { useEffect, useState } from 'react'
import "./homeStyle.css"
import { Card,Avatar, Typography,Divider,Box,Grid } from '@mui/material';
import { ImLocation } from "react-icons/im";
import {authService} from "../../services/index";
import Link from 'next/link';

function HomeCard() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("Maria Mayer");
    const [userImg, setUserImg] = useState("https://mui.com/static/images/avatar/3.jpg");
    const [work,setWork] = useState("Sr. Python Developer");
    const [company, setCompany] = useState("Google");
    const [experience, setExp ] = useState("3+ years of Experience");
    const [currentLocation, setLocation] = useState("San Diego, California, US")
    const [currentData, setCurrentData]= useState([{name:"Post",data:"65"},{name:"Connections",data:"745"},{name:"Ratings",data:"845"},{name:"Followers",data:"2K"},{name:"Following",data:"945"}])
    const [brief, setBrief] = useState("Born and raised in Pennsylvania, Maria Moved to San Diego, at the age of 21 to pursue career in Computer Engineering.");

    const getUserData = async()=>{
        try {
            setLoading(true)
            let res = await authService.get(`api/v1/auth/profile/get/personalData/type1`);
            if(res.variant === "success"){
              setLoading(false);
              setUserImg(res.data.userImg);
              setName(res.data.name);
              setWork(res.data.work);
              setCompany(res.data.company);
              setExp(res.data.experience);
              setLocation(res.data.currentLocation);
              setCurrentData(res.data.currentData);
              setBrief(res.data.brief);
            }  
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
    }
    useEffect(() => {
        getUserData();
    }, [])
    
    return (
    <Card elevation={2} sx={{width:"100%",height:"480px", overflow:"hidden"}}>
        <Box sx={{padding:"20px",display:"flex",flexDirection:"column",alignItems:"center",}}>
        <Avatar variant="rounded" alt="User-Img" src={userImg} id="cardUserImg"  />
        <Typography color="primary">{name}</Typography>
        <div >
        <Typography variant='caption'>{work}</Typography> <Typography variant='caption' color="textSecondary">at</Typography> <Typography variant='caption'>{company}</Typography>
        </div>
        <Typography variant='caption'>{experience}</Typography>
        <Typography variant='caption' color="textSecondary"><ImLocation/> {currentLocation}</Typography>
        </Box>
      
        <Divider light flexItem/>
        <Grid container spacing={1} sx={{padding:"10px"}}>
            {currentData?.map(c=><Grid item key={c?.name} xs={4}> 
            <Grid className="dataBox"> 
            <Typography color="primary">{c?.data}</Typography> <Typography variant='caption'>{c?.name}</Typography>
            </Grid>
            </Grid>)}
        </Grid>
        <Divider light flexItem/>
        <Grid sx={{padding:"10px",display:"flex",flexDirection:"column"}}>
        <Grid sx={{height:"90px", display:"flex",justifyItems:"center",alignItems:"center"}}>
        <Typography variant='caption' textAlign="center" sx={{justifyItems:"right"}} color="textSecondary"> {brief}</Typography>
        </Grid>
   
        <Link href="/" style={{fontSize:"14px",textAlign:"center"}}>Learn More</Link>
        </Grid>
    </Card>
  )
}

export default HomeCard