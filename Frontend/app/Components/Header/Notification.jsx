"use client";
import React from 'react'
import { MdNotifications } from "react-icons/md";
import {Badge,Grid,IconButton,styled,Tooltip,tooltipClasses, Typography  } from '@mui/material/';
import { MdNotificationsActive } from "react-icons/md";
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

function Notification({user}) {
  return (
    <LightTooltip title={<Grid sx={{width:"250px",height:"300px",borderRadius:"16px", display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <MdNotificationsActive style={{fontSize:"40px",color:"textSecondary",}}/>
        <Typography align='center' variant="body2">No notification yet!</Typography>
        <Typography align='center' variant="caption" color="textSecondary">You will be notified when something new arrives.</Typography>
        </Grid>} arrow enterDelay={0} >
        <IconButton sx={{marginLeft:"20px",marginRight:"20px"}}>
        <Badge badgeContent={4} color="success">
        <MdNotifications style={{color:"#fff"}} />
        </Badge>
      </IconButton>
    </LightTooltip>
  )
}

export default Notification