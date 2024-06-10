"use client";
import React,{Fragment, useState,useEffect,useRef} from 'react'
import { Card,CardHeader,Avatar,CardContent,Grid,IconButton, Typography,ImageListItem,ImageList, Stack,Dialog,DialogTitle,DialogContent,DialogActions,Button,CircularProgress } from '@mui/material';
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { AiOutlineHeart,AiFillWechat,AiOutlineShareAlt  } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import CreatePost from "./CreatePost";
import {authService} from "../../services/index";
import { FcNext,FcPrevious  } from "react-icons/fc";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";

function MyFeed() {
    const [numberOfPosts, setNoPost]=useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [loadingPost, setLoading] = useState(false);
    const [loadingLike, setLoadLike]= useState(false); 
    const [myFeed, setMyFeed] = useState([]);
    const [openImageBox, setImgBox] = useState(false);
    const [allImg,setAllImg] = useState([]);
    const [imgIndex, setImgIndex] = useState(null)
    const snackRef = useRef();
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
        getBasicData();
      }, []);
      const handleLike = async (data, i) => {
        try {
          setLoadLike(true);
          if(data.likedBy){
            let res = await authService.post(`api/v1/post/likeOrUnlike/unlike/${data.postId}`);
            if(res.variant === "success"){
              let oldArr = [...myFeed];
              oldArr[i].likeCount -= 1;
              oldArr[i].likedBy = false;
              setMyFeed([...oldArr]);
              setLoadLike(false);
            } 
          }else{
            let res = await authService.post(`api/v1/post/likeOrUnlike/like/${data.postId}`);
            if(res.variant === "success"){
              let oldArr = [...myFeed];
              oldArr[i].likeCount += 1;
              oldArr[i].likedBy = true;
              setMyFeed([...oldArr]);
              setLoadLike(false);
            } 
          }
        } catch (error) {
          console.log(error);
          setLoadLike(false);
        }
      };
      const handleFollow = async(f,oneId)=>{
        let url ="";
        if (f === "follow"){
          url = `api/v1/network/follow/followSomeOne`
        }else if(f === "unfollow"){
          url = `api/v1/network/unfollow/unFollowSomeOne`
        };

        let res = await authService.post(url, {oneId:oneId});
        if(res.variant ==="success"){
          snackRef.current.handleSnack(res);
          getBasicData();
        }
      }

      
  return (
    <Fragment>
        {myFeed?.map((f,i)=><Card key={i} sx={{bgcolor: 'background.paper',marginBottom:"20px"}}>
    <CardHeader
        avatar={
          <Avatar alt={f?.title} src={f?.userImg}/>
        }
                  action={ <Stack direction="row"  sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    {f.action === "follow" ? <Grid onClick={()=>handleFollow("follow", f.userId)} sx={{width:"80px",textAlign:"center",border:"1px solid #205179", padding:"0px 16px",borderRadius:"20px",fontSize:"14px",cursor:"pointer",color:"#205179"}}>
            Follow
          </Grid> : f.action === "unfollow" ? <Grid onClick={()=>handleFollow("unfollow", f.userId)} sx={{width:"80px",textAlign:"center",border:"1px solid #e55aed", padding:"0px",borderRadius:"20px",fontSize:"14px",cursor:"pointer",color:"#d3159d"}}>
          Unfollow
          </Grid>  : null} 
          <IconButton aria-label="settings">
            <HiOutlineEllipsisVertical />
          </IconButton>
        </Stack>
         
        }
        title={<Typography variant="subtitle1" color="primary">{f?.title}</Typography> }
        subheader={f?.subtitle ? <div style={{display:"flex"}}><Typography variant='caption' color="textSecondary">{f?.subtitle} &nbsp; | &nbsp;</Typography>  <Typography sx={{fontSize:"12px"}} color="textSecondary"> {f?.subtitle2}</Typography></div> : null}
      />
      <CardContent>
        <Typography variant="body2" gutterBottom color="text.secondary">
          {f.text}
        </Typography>
        
        <ImageList
        sx={{ width: "100%", height: "100%",cursor:"pointer" }}
        variant="quilted"
        cols={f?.itemData.length === 1 ? 1 : 2}
        gap={4}
        rowHeight={550}
        >
        {f?.itemData.map((item,j) => (
        <ImageListItem key={j} onClick={()=>{setImgBox(true);setAllImg(f?.itemData);setImgIndex(j)}} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 221, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
        ))}
        </ImageList>
    
    </CardContent>
        <Grid sx={{borderTop:"1px solid #f7f2f2",borderBottom:"1px solid #f7f2f2", padding:"10px 20px",display:"flex",justifyContent:"space-around"}}>
          {loadingLike ? <CircularProgress size={20} /> : <Stack direction="row" onClick={()=>{handleLike(f, i); getBasicData()}} spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        { f.likedBy ? <FcLike style={{fontSize:"20px"}}/> : <AiOutlineHeart style={{fontSize:"20px"}}/> }  <Typography>{f.likeCount} Likes</Typography>
        </Stack> }
        
        <Stack direction="row" spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        <AiFillWechat style={{fontSize:"20px"}}/> <Typography>{f.commentCount} Comments</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        <AiOutlineShareAlt style={{fontSize:"20px"}}/> <Typography>{f.shareCount} Share</Typography>
        </Stack>
        </Grid>
        <CreatePost placeholder="Write your comment..."/>
    </Card>)}

    <Dialog maxWidth="xl" onClose={()=>{setImgBox(false);setAllImg([]);setImgIndex(null)}} open={openImageBox}>
      <DialogTitle>{allImg[imgIndex]?.title}
      
      </DialogTitle>
      <DialogContent sx={{padding:"0px"}}>
       <img src={allImg[imgIndex]?.img} style={{maxHeight:"100%",maxWidth:"100%"}} alt={allImg[imgIndex]?.title} />
        </DialogContent>
        <DialogActions sx={{justifyContent:"space-between"}}>
          <Button startIcon={<FcPrevious />} disabled={imgIndex===0} onClick={()=>setImgIndex(pre=>pre-1)}>Previous</Button> 
          <Button onClick={()=>{setImgBox(false);setAllImg([]);setImgIndex(null)}}>Close</Button>
          <Button endIcon={<FcNext />} disabled={allImg.length===imgIndex+1} autoFocus onClick={()=>setImgIndex(pre=>pre+1)}>
            Next
          </Button>
        </DialogActions>
    </Dialog>
    <MySnackbar ref={snackRef} />
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