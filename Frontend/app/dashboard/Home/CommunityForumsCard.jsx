"use client";
import React,{Fragment, useState} from 'react'
import { Card,List,ListItem,ListItemAvatar,Avatar,ListItemText,Badge, Divider, Typography } from '@mui/material';
import { GrMail } from "react-icons/gr";
import Link from 'next/link';
function CommunityForumsCard() {
    const [forumData,setForumData] = useState([{img:"https://img.freepik.com/free-photo/people-taking-selfie-together-registration-day_23-2149096795.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1713484800&semt=sph",title:"Tech Guys - Penacal", subtitle:"UI/UX Designers Community",unread:"15",link:"/"},{img:"https://static.vecteezy.com/system/resources/previews/016/119/632/original/pro-gamer-mascot-gamer-logo-illustration-free-vector.jpg",title:"Game Development", subtitle:"Game Developers Community",unread:"",link:"/"},{img:"https://www.betterreading.com.au/wp-content/uploads/2019/06/shutterstock_345816716-768x401.jpg.webp",title:"Proud Book Nerd", subtitle:"Book lovers Community",unread:"4",link:"/"},{img:"https://edynamiclearning.com/wp-content/uploads/2019/04/Creative-Writing-I-HIGH-RES.jpg",title:"Creative Writers", subtitle:"Creative Writers Community",unread:"50",link:"/"}])
  return (
    <Card elevation={2} sx={{width: '100%'}}>
         <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {forumData?.map((f,i)=><Link href={f.link} key={i}>
            <ListItem >
        <ListItemAvatar>
        <Avatar alt={f?.title} src={f?.img} />
        </ListItemAvatar>
        <ListItemText primary={f?.title} secondary={<Typography variant='caption' color="textSecondary">{f?.subtitle}</Typography>} />
      {f?.unread && <Badge color="secondary" badgeContent={f?.unread}>
        <GrMail />
        </Badge>} 
      </ListItem>
    <Divider light/>
        </Link> 
        
    )}
         </List>
    </Card>
  )
}

export default CommunityForumsCard