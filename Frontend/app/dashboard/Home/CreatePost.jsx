"use client";
import React, { useState,useRef,useEffect } from 'react'
import { Card, Avatar,Input,Grid, Box,Stack,Menu,Tooltip,IconButton,styled, CircularProgress  } from '@mui/material';
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdOutlineEmojiEmotions,MdOutlineImage  } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { useImgUpload } from '../../hooks/useImgUpload';
import { BsFillSendCheckFill } from "react-icons/bs";
import {authService} from "../../services/index";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";
import { FcCancel } from "react-icons/fc";
import Cookies from "js-cookie";


function CreatePost({placeholder}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [postData,setPostData]=useState("");
  const [images,setImg] = useState([]);
  const [loadingImg, setLoadingImg]= useState(false);
  const [user, setUser] = useState({});
  const snackRef = useRef();

  const onEmojiClick = (event) => {
    setPostData((prevInput) => prevInput + event.emoji);
    setAnchorEl(null);
  };
  
  const imgUpload = async (e) => {
    setLoadingImg(true);
    let url = await useImgUpload(e);
    if (url) {
      setImg((prevAry) => [...prevAry,{url, alt:"postimg"}]);
      setLoadingImg(false);
    } else {
      snackRef.current.handleSnack({
        message: "Image Not Selected",
        variant: "warning",
      });
      setLoadingImg(false);
    }
  };
  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
     
    }
  }, []);

  const handlePost = async()=>{
    try {
        // setLoading(true)
        let post = {text:postData,images}
        let res = await authService.post(`api/v1/post/saveOne`,post);
        if(res.variant === "success"){
          setPostData("");
          setImg([]);
          setLoadingImg(false);
          snackRef.current.handleSnack(res);
        }  
      } catch (error) {
        console.log(error);
        // setLoading(false)
      }
}

const PostImg = styled('div')(({ theme, imgUrl }) => ({
  background:`url(${imgUrl}) no-repeat`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  borderRadius:"10px",
  height:"230px"
  // [theme.breakpoints.down('md')]: {
  //   height: "200px",
  // },
  // [theme.breakpoints.up('md')]: {
  //   height: "230px",
  // },
}));
  const removeImg =(img, i)=>{
      let oldAr = images;
      oldAr.splice(i, 1);
      setImg([...oldAr])
      snackRef.current.handleSnack({
        message: "Image Removed",
        variant: "info",
      });
  }

  return (
    <main>
       <Card sx={{padding:"10px 20px", bgcolor: 'background.paper',minHeight:"60px"}}>
      <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Avatar alt={user?.firstName} src={user?.userImage} />
      <Input fullWidth multiline placeholder={placeholder} value={postData} onChange={(e)=>setPostData(e.target.value)} sx={{paddingLeft:"20px"}} disableUnderline endAdornment={<Stack direction="row" spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",}}><MdOutlineEmojiEmotions id="emoji-box" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={e=>setAnchorEl(e.currentTarget)} style={{fontSize:"20px",cursor:"pointer"}}/>
      <label htmlFor="image">
        <input type="file" id="image" style={{display:"none"}} onChange={(e) => imgUpload(e.target.files[0])}  accept="image/*"  />
        <Tooltip title="Select Image" arrow>
        <MdOutlineImage style={{fontSize:"20px",marginTop:"6px", cursor:"pointer"}}/>
        </Tooltip>
        </label>
        {(postData !== "" || images.length !== 0) && <IconButton color="primary" onClick={handlePost} >
        <BsFillSendCheckFill/>
        </IconButton>}   
     </Stack>}/>
     <Menu
        id="emoji-box"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>setAnchorEl(null)}
        sx={{padding:"0px"}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
    <EmojiPicker lazyLoadEmojis open={open} onEmojiClick={onEmojiClick} />
    </Menu>
      </Box>
      {loadingImg ?  <Box className="center">
        <CircularProgress/>
      </Box> : <Grid container spacing={2}>
        {images.map((img,i)=><Grid item key={i} xs={12} md={6}>
          <PostImg imgUrl={img.url}>
            <Box sx={{display:"flex",justifyContent:"right"}}>
            <IconButton onClick={()=>removeImg(img,i)}>
            <FcCancel/>
            </IconButton>
            </Box>
          </PostImg>
           </Grid>)}
      </Grid> }    
    </Card>
    <MySnackbar ref={snackRef} />
    </main>
   
  )
}

export default CreatePost