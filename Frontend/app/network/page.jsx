"use client";
import React,{Fragment,useState,useEffect,useRef} from 'react'
import { Card, Container,Grid, Typography,Avatar,Box, Divider,Button,IconButton } from '@mui/material';
import { ImLocation } from "react-icons/im";
import { FcApproval,FcCancel  } from "react-icons/fc";
import {authService} from "../services/index";
import MySnackbar from "../Components/MySnackbar/MySnackbar";


import Link from 'next/link';

function MyNetwork() {
  return (
    <Fragment>
      <Container maxWidth="xl">
        <Invitations/> <br/>
        <YouMayKnow/> <br/>
        <NetworkCard/>
      </Container>
    </Fragment>
  )
}

function Invitations(){
    const [loading, setLoading] = useState(false);
    const [inviteCard, setInviteCard] = useState([]);
    const snackRef = useRef();
    const getUserData = async()=>{
        try {
            setLoading(true)
            let res = await authService.get(`api/v1/network/get/invitationReceived`);
            if(res.variant === "success"){
              setLoading(false);
              setInviteCard(res.data);
            }  
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
    }
    useEffect(() => {
        getUserData();
    }, [])

    const handleAccept= async(i,id,statusId)=>{
        try {
            setLoading(true)
            let res = await authService.post(`api/v1/network/invitation/changeStatus`,{invitationFrom:id,statusId});
            if(res.variant === "success"){
              setLoading(false);
              setInviteCard(res.data);
              const oldArr = inviteCard;
              oldArr[i].acceped = true;
              setInviteCard(oldArr)
             snackRef.current.handleSnack(res)
            }  
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
    }
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{display:"flex",justifyContent:"space-between"}}>
                <Typography sx={{fontWeight:"600"}}>Invitations</Typography>
                <Link href="/network/invitation" style={{color:"#0180ff"}}>View All</Link>
            </Grid>
            {inviteCard.length !==0 && inviteCard.map((c,i)=><Grid item key={i} xs={12} md={2}>
                <Card sx={{borderRadius:"6px",height:"190px"}}>
                    <Box sx={{padding:"16px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",height:"149px"}}>
                        <Avatar alt={c?.name} src={c?.userImage}  sx={{ width: 56, height: 56 }} />
                        <Typography sx={{fontWeight:"600"}} variant="body2">{`${c?.firstName} ${c?.lastName}`}</Typography>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <Typography variant="caption">{c?.experienceTitle}</Typography> <Typography variant="caption" color="textSecondary" sx={{paddingRight:"6px",paddingLeft:"6px"}}>at</Typography>  <Typography variant="caption">{c?.experienceCompany}</Typography>
                        </Box>
                        <Box sx={{display:"flex"}}>
                        <ImLocation style={{fontSize:"14px",marginTop:"2px",marginRight:"4px"}}/> 
                        <Typography variant='caption' color="textSecondary">{c?.location}</Typography>
                        </Box>
                    </Box>
                     <Divider sx={{marginBottom:"5px"}}/>
                    <Box sx={{display:"flex",padding:"0px 6px",justifyContent:"center", alignItems:"center"}}>
                    <Button variant="outlined" sx={{borderRadius:"30px",fontSize:"12px",textTransform:"capitalize",padding:"2px 10px"}}>View Profile</Button>
                    <Box>
                    {!c?.acceped && <>
                    <IconButton onClick={()=>handleAccept(i,c?._id, "declined")}  aria-label="delete" size="small" sx={{marginRight:"4px",marginLeft:"30px"}}>
                    <FcCancel  fontSize="inherit" />
                    </IconButton>
                    <IconButton onClick={()=>handleAccept(i,c?._id, "accepted")} aria-label="Accept" size="small">
                    <FcApproval fontSize="inherit" />
                    </IconButton>
                        </> }
                    </Box>
                    </Box>
                </Card>
            </Grid>)}
            <MySnackbar ref={snackRef} />
        </Grid>
    )
}

function YouMayKnow(){
    const [loading, setLoading] = useState(false);
    const [inviteCard, setInviteCard] = useState([]);
    const snackRef = useRef();
    const getUserData = async()=>{
        try {
            setLoading(true)
            let res = await authService.get(`api/v1/network/get/peopleymk`);
            if(res.variant === "success"){
              setLoading(false);
              setInviteCard(res.data)
            }  
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
    }
    useEffect(() => {
        getUserData();
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
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{display:"flex",justifyContent:"space-between"}}>
                <Typography sx={{fontWeight:"600"}}>People You May Know</Typography>
                <Link href="/network/invitation" style={{color:"#0180ff"}}>View All</Link>
            </Grid>
            {inviteCard.length !==0 && inviteCard.map((c,i)=><Grid item key={i} xs={12} md={2}>
                <Card sx={{borderRadius:"6px",height:"190px"}}>
                    <Box sx={{padding:"16px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",height:"149px"}}>
                        <Avatar alt={c?.name} src={c?.userImg}  sx={{ width: 56, height: 56 }} />
                        <Typography sx={{fontWeight:"600"}} variant="body2">{`${c?.firstName} ${c?.lastName}`}</Typography>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <Typography variant="caption">{c?.work}</Typography> <Typography variant="caption" color="textSecondary" sx={{paddingRight:"6px",paddingLeft:"6px"}}>at</Typography>  <Typography variant="caption">{c?.company}</Typography>
                        </Box>
                        <Typography variant="caption">{c?.experience}</Typography>
                        <Box sx={{display:"flex"}}>
                        <ImLocation style={{fontSize:"14px",marginTop:"2px",marginRight:"4px"}}/> 
                        <Typography variant='caption' color="textSecondary">{c?.location}</Typography>
                        </Box>
                    </Box>
                     <Divider sx={{marginBottom:"5px"}}/>
                    <Box sx={{display:"flex",padding:"0px 6px",justifyContent:"space-evenly",alignItems:"center"}}>
                    <Button variant="outlined" sx={{borderRadius:"30px",fontSize:"12px",textTransform:"capitalize",padding:"2px 10px"}}>View Profile</Button>
                    {c.pending ?  <Button variant="outlined" endIcon={<FcCancel />} color="secondary" onClick={()=>handleCancelInvite(i,c?._id)} sx={{borderRadius:"30px",fontSize:"12px",textTransform:"capitalize",padding:"2px 10px"}}>Pending</Button> :  <Button variant="outlined" onClick={()=>handleInvite(i,c?._id)} sx={{borderRadius:"30px",fontSize:"12px",textTransform:"capitalize",padding:"2px 10px"}}>Invite</Button> }
                   
                    </Box>
                </Card>
            </Grid>)}
            <MySnackbar ref={snackRef} />
        </Grid>
    )
}


function NetworkCard(){
    const [loading, setLoading] = useState(false);
    const [inviteCard, setInviteCard] = useState([]);
    
    const getUserData = async()=>{
        try {
            setLoading(true)
            let res = await authService.get(`api/v1/network/get/yourConnection`);
            if(res.variant === "success"){
              setLoading(false);
              setInviteCard(res.data)
            }  
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
    }
    useEffect(() => {
        getUserData();
    }, [])
   
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{display:"flex",justifyContent:"space-between"}}>
                <Typography sx={{fontWeight:"600"}}>My Network</Typography>
                <Link href="/network/invitation" style={{color:"#0180ff"}}>View All</Link>
            </Grid>
            {inviteCard.length !==0 && inviteCard.map((c,i)=><Grid item key={i} xs={12} md={2}>
                <Card sx={{borderRadius:"6px",height:"190px"}}>
                    <Box sx={{padding:"16px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",height:"149px"}}>
                        <Avatar alt={c?.name} src={c?.userImage}  sx={{ width: 56, height: 56 }} />
                        <Typography sx={{fontWeight:"600"}} variant="body2">{`${c?.firstName} ${c?.lastName}`}</Typography>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <Typography variant="caption">{c?.work}</Typography> <Typography variant="caption" color="textSecondary" sx={{paddingRight:"6px",paddingLeft:"6px"}}>at</Typography>  <Typography variant="caption">{c?.company}</Typography>
                        </Box>
                        <Typography variant="caption">{c?.experience}</Typography>
                        <Box sx={{display:"flex"}}>
                        <ImLocation style={{fontSize:"14px",marginTop:"2px",marginRight:"4px"}}/> 
                        <Typography variant='caption' color="textSecondary">{c?.location}</Typography>
                        </Box>
                    </Box>
                     <Divider sx={{marginBottom:"5px"}}/>
                    <Box sx={{display:"flex",padding:"0px 6px",justifyContent:"space-evenly",alignItems:"center"}}>
                    <Button variant="outlined" sx={{borderRadius:"30px",fontSize:"12px",textTransform:"capitalize",padding:"2px 10px"}}>View Profile</Button>
                   <Button variant="outlined" sx={{borderRadius:"30px",fontSize:"12px",textTransform:"capitalize",padding:"2px 10px"}}>Chat</Button>
                    </Box>
                </Card>
            </Grid>)}
        </Grid>
    )
}
export default MyNetwork