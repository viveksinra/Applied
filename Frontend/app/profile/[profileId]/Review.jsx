"use client";
import React,{ useState } from 'react'
import { Card, Avatar,Grid,Box, Typography,styled,Tooltip,IconButton  } from '@mui/material';

function Review() {
  const [rev, setRev] = useState([{coverImg:"",userImage:"https://mui.com/static/images/avatar/3.jpg",firstName:"Maria",lastName:"Mayer",work:"Sr Python Developer",company:"Google",skill:"Python, Node JS",experience:"30 Years",dateTime:"04 Sep, 2020 12:00 PM",title:"Creative and Innovative",comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, cupiditate. Officia voluptatibus possimus vitae commodi ipsa minima adipisci, aspernatur, ea nisi animi ullam sed! Consectetur numquam beatae distinctio quis optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, cupiditate. Officia voluptatibus possimus vitae commodi ipsa minima adipisci, aspernatur, ea nisi animi ullam sed! Consectetur numquam beatae distinctio quis optio."}])
  return (
    <main>
        <Grid container spacing={2}>
        {rev.map((r,i)=> <Grid item key={i} xs={12}>
         <Card sx={{padding:"20px",borderRadius:"6px"}}>
            <Box sx={{display:"flex",alignItems:"center",marginBottom:"10px"}}>
            <Avatar alt={r.firstName} src={r.userImage} sx={{ width: 56, height: 56,marginRight:"20px" }} />
            <Box>
                <Typography>{`${r.firstName} ${r.lastName}`}</Typography>
                <Box sx={{display:"flex",flexDirection:"row"}}>
                {r.work && <Typography>&bull; {r.work}</Typography>}  
              {r?.company && <> <Typography color="textSecondary" sx={{margin:"0px 6px"}}>at</Typography><Typography>{r?.company}</Typography>
              </> }  
                </Box>
            </Box>
            <span style={{flexGrow:1}}/>
            <Typography color="textSecondary">{r?.dateTime}</Typography>
            </Box>
            <Typography color="darkslategrey" gutterBottom>{r?.title}</Typography>
            <Typography color="textSecondary" gutterBottom>{r?.comment}</Typography>
            </Card>   
             </Grid>)}
        </Grid>
       
    </main>
  )
}

export default Review