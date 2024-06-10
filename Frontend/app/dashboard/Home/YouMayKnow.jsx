"use client";
import React,{Fragment, useState,useRef,useEffect} from 'react'
import { Card,List,ListItem,ListItemAvatar,Avatar,ListItemText,Stack,Badge, Divider,Grid, Typography } from '@mui/material';
import { GrMail } from "react-icons/gr";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";
import {authService} from "../../services/index";

function YouMayKnow() {
  const snackRef = useRef();
  const [loading,setLoading] = useState(false);
  const [person,setPerson] = useState([]);
  const getPeopleData = async()=>{
    try {
        setLoading(true)
        let res = await authService.get(`api/v1/network/get/peopleymk`);
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
    getPeopleData();
  }, [])
  const handleInvite= async(i,id)=>{
    try {
        setLoading(true)
        let res = await authService.post(`api/v1/network/send/invitation`, {invitationTo:id});
        if(res.variant === "success"){
          setLoading(false);
          snackRef.current.handleSnack(res)
         const oldArr = inviteCard;
         oldArr[i].pending = true;
         setInviteCard(oldArr)
        }  
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
}
const handleCancelInvite=async(i, id)=>{
  try {
      setLoading(true)
      let res = await authService.delete(`api/v1/network/delete/invitation/${id}`);
      if(res.variant === "success"){
        setLoading(false);
        snackRef.current.handleSnack(res)
       const oldArr = inviteCard;
       oldArr[i].pending = false;
       setInviteCard(oldArr)
      }  
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
}
  return (<Fragment>
        <Card elevation={2} sx={{width:'100%',}}>
        <List disablePadding sx={{ width: '100%', bgcolor: 'background.paper', }} >
        {person?.map((f,i)=><Grid key={i}>
         <ListItem dense disableGutters disablePadding sx={{padding:"0px 10px"}} >
        <ListItemAvatar>
        <Avatar alt={f?.firstName} src={f?.userImage} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle2" color="primary">{`${f.firstName} ${f.lastName}`}</Typography> } secondary={<Stack direction="row" spacing={1}>@{f?.userName}  &nbsp; {f?.verified && <SvgVerified/> }</Stack>} />
        {f.pending ?  <Button variant="outlined" endIcon={<FcCancel />} color="secondary" onClick={()=>handleCancelInvite(i,c?._id)} sx={{borderRadius:"30px",fontSize:"12px",textTransform:"capitalize",padding:"2px 10px"}}>Pending</Button> :  <Grid onClick={()=>handleInvite(i,f?._id)}  sx={{width:"80px",textAlign:"center",border:"1px solid #205179", padding:"0px 16px",borderRadius:"20px",fontSize:"14px",cursor:"pointer",color:"#205179"}}>
        Connect
        </Grid> }
        </ListItem>
        <Divider light/>
        </Grid> 
        )}
          </List>
        </Card>
     <MySnackbar ref={snackRef} />
     </Fragment>
  )
}




import SvgIcon from '@mui/material/SvgIcon';

export function SvgVerified(props) {
  return (
    <SvgIcon {...props}>
    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1t8mnmp" focusable="false" aria-hidden="true" width="16px" viewBox="0 0 24 24" fontSize="10px" data-testid="VerifiedRoundedIcon"><path fill="#2eab61" d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zM9.38 16.01 7 13.61a.9959.9959 0 0 1 0-1.41l.07-.07c.39-.39 1.03-.39 1.42 0l1.61 1.62 5.15-5.16c.39-.39 1.03-.39 1.42 0l.07.07c.39.39.39 1.02 0 1.41l-5.92 5.94c-.41.39-1.04.39-1.44 0"></path></svg>
    </SvgIcon>
  );
}
export default YouMayKnow