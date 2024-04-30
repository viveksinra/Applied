"use client";
import React,{useState} from 'react'
import { Card,List,ListItem,ListItemAvatar,Avatar,ListItemText,Stack,IconButton, Divider,Grid, Typography } from '@mui/material';
import { FcOk,FcFullTrash  } from "react-icons/fc";
function Invitation() {
    const [person, setPerson] = useState([{img:"https://pbs.twimg.com/profile_images/1243088393640095745/cB0mYPtq_400x400.jpg",title:"Shandhya Jha",verified:true, subtitle:"@JhaSan44",id:"545sdeww"},{img:"https://media.licdn.com/dms/image/D5603AQEdVjrTnwb9Vw/profile-displayphoto-shrink_800_800/0/1668939665195?e=2147483647&v=beta&t=5ECanC6yVDzzp17UCydoEsq9gMiygWm71_UZ_NK-kkQ",title:"Rohit Kumar",verified:false, subtitle:"@rohit_kr",id:"84514s5d748we"},{img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmLfRY9fQm16euFq3KBvUNwhBIRtCDTwiOCEKEKuzo4VKUcr22Dw7qY_SJcHdUq7AXB4U&usqp=CAU",title:"Vijay Shivankar",verified:true, subtitle:"@vijay_shiva",id:"fdfasdfsdee"},{img:"",title:"Vimal Bhagat",verified:false, subtitle:"@vimal454",id:"5465d4asfsdfae"},{img:"https://media.licdn.com/dms/image/C4D03AQGFtg2MQa5-lg/profile-displayphoto-shrink_800_800/0/1516847454594?e=2147483647&v=beta&t=c1bG_hLv7xvLFG8ASC3IueQhAY-fbddnBIxoqIDjFTc",title:"Surendra Kumar",verified:true, subtitle:"@Surendra",id:"845w5e1w56e154"}])
  return (
    <Card elevation={2} sx={{width:'100%',}}>
         <List disablePadding sx={{ width: '100%', bgcolor: 'background.paper', }} >
        {person?.map((f,i)=><Grid key={i}>
            <ListItem dense disableGutters disablePadding sx={{padding:"0px 10px"}} >
        <ListItemAvatar>
       <Avatar alt={f?.title} src={f?.img} />

        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle2" color="primary">{f?.title}</Typography> } secondary={<Stack direction="row" spacing={1}>{f?.subtitle}  &nbsp; {f?.verified && <SvgVerified/> }</Stack>} />
        <IconButton aria-label="accept" size="small">
  <FcOk />
</IconButton>
<IconButton aria-label="reject" size="small">
  <FcFullTrash/>
</IconButton>
      </ListItem>
    <Divider light/>
        </Grid> 
        
    )}
         </List>
    </Card>
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