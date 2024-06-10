"use client";
import React,{Fragment} from 'react'
import { Card, Container,Grid, Typography } from '@mui/material';
import HomeCard from './Home/HomeCard';
import CommunityForumsCard from "./Home/CommunityForumsCard";
import CreatePost from './Home/CreatePost';
import MyFeed from "./Home/MyFeed";
import YouMayKnow from "./Home/YouMayKnow";
import Invitation from "./Home/Invitation";

import Link from 'next/link';

function Dashboard() {
  return (
    <Fragment>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} sx={{display:{xs:"none",sm:"block"}}}>
           <HomeCard/>
           <div style={{display:"flex",justifyContent:"space-between",marginTop:"15px",marginBottom:"15px"}}>
            <Typography variant='subtitle2' sx={{fontWeight:600}}>Community Forums</Typography>
           <Link href="/"><Typography color="primary" sx={{fontSize:"14px"}}>View All</Typography></Link> 
           </div>
           <CommunityForumsCard/>
          </Grid>
          <Grid item xs={12} md={6}>
          <CreatePost placeholder="What's on your mind ?"/>
          <br/>
          <MyFeed/>
          </Grid>
          <Grid item xs={12} md={3} sx={{display:{xs:"none",sm:"block"}}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"15px"}}>
            <Typography variant='subtitle2' sx={{fontWeight:600}}>Invitation for you</Typography>
           <Link href="/"><Typography color="primary" sx={{fontSize:"14px"}}>View All</Typography></Link> 
           </div>
           <Invitation/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:"15px",marginBottom:"15px"}}>
            <Typography variant='subtitle2' sx={{fontWeight:600}}>People you may know</Typography>
           <Link href="/"><Typography color="primary" sx={{fontSize:"14px"}}>View All</Typography></Link> 
           </div>
           <YouMayKnow/>
          </Grid>
        </Grid>
     
      </Container>
    </Fragment>
  )
}

export default Dashboard