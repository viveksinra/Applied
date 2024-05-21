"use client";
import React,{Fragment, useState,useEffect} from 'react'
import { Card,CardHeader,Avatar,CardContent,Grid,IconButton, Typography,ImageListItem,ImageList, Stack,Fab } from '@mui/material';
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { AiOutlineHeart,AiFillWechat,AiOutlineShareAlt  } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import CreatePost from "./CreatePost";
import {authService} from "../../services/index";


function MyFeed() {
    const [numberOfPosts, setNoPost]=useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [loadingPost, setLoading] = useState(false);
    const [loadingLike, setLoadLike]= useState(false); 
    const [myFeed, setMyFeed] = useState([]);

      const getBasicData= async()=>{
        try {
            setLoading(true);
            let res = await authService.get(`api/v1/post/getMultiPost/${numberOfPosts}/${pageNo}`);
            if(res.variant === "success"){
              setLoading(false);
              setMyFeed(res.data);
            }  
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
      }

      useEffect(() => {
        getBasicData()
      }, []);
      const handleLike = async (data, i) => {
        try {
          setLoadLike(true);
          let res;
          if (data.likedBy) {
            res = await authService.post(`api/v1/post/likeOrUnlike/unlike/${data.postId}`);
            if (res.variant === "success") {
              const newPost = { ...myFeed[i] };
              newPost.likeCount -= 1; // Decrease likeCount when unliking
              newPost.likedBy = false;
              let oldArr = [...myFeed];
              oldArr[i] = newPost;
              setMyFeed(oldArr); // Update the state with the updated array
            }
          } else {
            res = await authService.post(`api/v1/post/likeOrUnlike/like/${data.postId}`);
            if (res.variant === "success") {
              const newPost = { ...myFeed[i] };
              newPost.likeCount += 1;
              newPost.likedBy = true;
              let oldArr = [...myFeed];
              oldArr[i] = newPost;
              setMyFeed(oldArr); // Update the state with the updated array
            }
          }
        } catch (error) {
          console.log(error);
          setLoadLike(false);
        }
      };
      
  return (
    <Fragment>
        {myFeed?.map((f,i)=><Card key={i} sx={{bgcolor: 'background.paper',marginBottom:"20px"}}>
    <CardHeader
        avatar={
          <Avatar alt={f?.title} src={f?.userImg}/>
        }
                  action={ <Stack direction="row"  sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    {f.action === "follow" ? <Grid sx={{width:"80px",textAlign:"center",border:"1px solid #a9c8e7", padding:"0px 16px",borderRadius:"20px",fontSize:"14px",cursor:"pointer",color:"#65abf2"}}>
            Follow
          </Grid> : f.action === "Unfollow" ? <Grid sx={{width:"80px",textAlign:"center",border:"1px solid #e55aed", padding:"0px",borderRadius:"20px",fontSize:"14px",cursor:"pointer",color:"#d3159d"}}>
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
          {f.text}
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
        <Stack direction="row" onClick={()=>handleLike(f, i)} spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
       {f.likedBy ? <FcLike style={{fontSize:"20px"}}/> : <AiOutlineHeart style={{fontSize:"20px"}}/> }  <Typography>{f.likeCount} Likes</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        <AiFillWechat style={{fontSize:"20px"}}/> <Typography>{f.commentCount} Comments</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        <AiOutlineShareAlt style={{fontSize:"20px"}}/> <Typography>{f.shareCount} Share</Typography>
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