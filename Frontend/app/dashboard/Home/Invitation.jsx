"use client";
import React,{useState,useEffect,useRef, Fragment} from 'react'
import { Card,List,ListItem,ListItemAvatar,Avatar,ListItemText,Stack,IconButton, Divider,Grid, Typography } from '@mui/material';
import { FcOk,FcFullTrash  } from "react-icons/fc";
import {authService} from "../../services/index";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";

function Invitation() {
  const [loading,setLoading] = useState(false);
  const snackRef = useRef();
  const [person, setPerson] = useState([])
  const getInviteData = async()=>{
    try {
        setLoading(true)
        let res = await authService.get(`api/v1/network/get/invitationReceived`);
        if(res.variant === "success"){
          setLoading(false);
          setPerson(res.data);
        }  
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
}
  useEffect(() => {
      getInviteData();
  }, [])
  const handleAccept = async(i,id,statusId)=>{
    try {
        setLoading(true)
        let res = await authService.post(`api/v1/network/invitation/changeStatus`,{invitationFrom:id,statusId});
        if(res.variant === "success"){
          setLoading(false);
          
         snackRef.current.handleSnack(res)
        }  
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
}

  return (<Fragment>
    <Card elevation={2} sx={{width:'100%'}}>
         <List disablePadding sx={{ width: '100%', bgcolor: 'background.paper', }} >
        {person?.map((f,i)=><Grid key={i}>
            <ListItem dense disableGutters disablePadding sx={{padding:"0px 10px"}} >
        <ListItemAvatar>
       <Avatar alt={f?.firstName} src={f?.userImage} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle2" color="primary">{`${f.firstName} ${f.lastName}`}</Typography> } secondary={<Stack direction="row" spacing={1}>@{f?.userName}  &nbsp; {f?.verified && <SvgVerified/> }</Stack>} />
        <IconButton onClick={()=>handleAccept(i,c?._id, "accepted")} aria-label="accept" size="small">
        <FcOk />
        </IconButton>
      <IconButton onClick={()=>handleAccept(i,c?._id, "declined")} aria-label="reject" size="small">
        <FcFullTrash/>
      </IconButton>
      <Divider light/>
      </ListItem>
        </Grid> 
        
    )}
         </List>
    </Card>
     <MySnackbar ref={snackRef} />
  </Fragment>
    
  )
}




import SvgIcon from '@mui/material/SvgIcon';

export function SvgVerified() {
  return (
    <SvgIcon>
    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1t8mnmp" focusable="false" aria-hidden="true" width="16px" viewBox="0 0 24 24" fontSize="10px" data-testid="VerifiedRoundedIcon"><path fill="#2eab61" d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zM9.38 16.01 7 13.61a.9959.9959 0 0 1 0-1.41l.07-.07c.39-.39 1.03-.39 1.42 0l1.61 1.62 5.15-5.16c.39-.39 1.03-.39 1.42 0l.07.07c.39.39.39 1.02 0 1.41l-5.92 5.94c-.41.39-1.04.39-1.44 0"></path></svg>
    </SvgIcon>
  );
}
export default Invitation