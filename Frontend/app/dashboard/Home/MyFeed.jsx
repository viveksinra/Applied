"use client";
import React,{Fragment, useState} from 'react'
import { Card,CardHeader,Avatar,CardContent,Grid,IconButton, Typography,ImageListItem,ImageList, Stack,Fab } from '@mui/material';
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { AiOutlineHeart,AiFillWechat,AiOutlineShareAlt  } from "react-icons/ai";
import CreatePost from "./CreatePost";
function MyFeed() {
    const [myFeed, setMyFeed] = useState([{userImg:"https://mui.com/static/images/avatar/3.jpg",title:"Maria Mayer",subtitle:"Sr. Python Developer at Google",subtitle2:"Python, Node Js, Mongo DB",action:"follow",itemData:[{
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
      },]}])
  return (
    <Fragment>
        {myFeed?.map((f,i)=><Card key={i} sx={{bgcolor: 'background.paper'}}>
    <CardHeader
        avatar={
          <Avatar alt="User-Img" src={f?.userImg}/>
        }
        action={ <Stack direction="row"  sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
           {f.action==="follow" ? <Grid sx={{width:"80px",textAlign:"center",border:"1px solid #a9c8e7", padding:"0px 16px",borderRadius:"20px",fontSize:"14px",cursor:"pointer",color:"#65abf2"}}>
  Follow
</Grid> : f.action ==="Unfollow" ? <Grid sx={{width:"80px",textAlign:"center",border:"1px solid #e55aed", padding:"0px",borderRadius:"20px",fontSize:"14px",cursor:"pointer",color:"#d3159d"}}>
 Unfollow
</Grid>  : null} 
 <IconButton aria-label="settings">
            <HiOutlineEllipsisVertical />
          </IconButton>
        </Stack>
         
        }
        title={f?.title}
        subheader={<div style={{display:"flex"}}><Typography variant='caption' color="textSecondary">{f?.subtitle} &nbsp; | &nbsp;</Typography>  <Typography sx={{fontSize:"12px"}} color="textSecondary"> {f?.subtitle2}</Typography></div>}
      />
    <CardContent>
        <Typography variant="body2" gutterBottom color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
        
        <ImageList
      sx={{ width: "100%", height: "100%" }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {f?.itemData.map((item,j) => (
        <ImageListItem key={j} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    
    </CardContent>

        <Grid sx={{borderTop:"1px solid #f7f2f2",borderBottom:"1px solid #f7f2f2", padding:"10px 20px",display:"flex",justifyContent:"space-around"}}>
        <Stack direction="row" spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        <AiOutlineHeart/> <Typography>125K Likes</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        <AiFillWechat /> <Typography>125K Likes</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        <AiOutlineShareAlt  /> <Typography>125K Likes</Typography>
        </Stack>
        </Grid>
        <CreatePost placeholder="Write your comment..."/>
    </Card>)}
    
    </Fragment>
  )
}

function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

export default MyFeed