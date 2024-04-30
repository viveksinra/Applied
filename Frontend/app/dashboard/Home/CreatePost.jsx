"use client";
import React from 'react'
import { Card, Avatar,Input,Grid, Typography,Stack } from '@mui/material';
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdOutlineEmojiEmotions,MdOutlineImage  } from "react-icons/md";
function CreatePost({placeholder}) {
  return (
    <Card sx={{padding:"10px 20px", bgcolor: 'background.paper',display:"flex",justifyContent:"space-between"}}>
        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/3.jpg" />
    <Input fullWidth placeholder={placeholder} sx={{paddingLeft:"20px"}} disableUnderline endAdornment={<Stack direction="row" spacing={1} sx={{display:"flex",justifyContent:"center",alignItems:"center",}}><AiOutlinePaperClip style={{fontSize:"20px",cursor:"pointer"}}/><MdOutlineEmojiEmotions style={{fontSize:"20px",cursor:"pointer"}}/><MdOutlineImage style={{fontSize:"20px",cursor:"pointer"}}/></Stack>}/>
    </Card>
  )
}

export default CreatePost