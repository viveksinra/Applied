"use client";
import React,{Fragment, useState} from 'react'
import { Card,List,ListItem,ListItemAvatar,Avatar,ListItemText,Stack,Badge, Divider,Grid, Typography } from '@mui/material';
import { GrMail } from "react-icons/gr";

function YouMayKnow() {
    const [person,setPerson] = useState([{img:"https://nettv4u.com/imagine/27-03-2020/kunal-kamra.png",title:"Kunal Kamra",verified:true, subtitle:"@kk_fun",id:"ssdsdefd1255454"},{img:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Sachin-Tendulkar_%28cropped%29.jpg/220px-Sachin-Tendulkar_%28cropped%29.jpg",title:"Sachin Tendulkar",verified:false, subtitle:"@sachin_125",id:"545411sd4f5"},{img:"https://media.andhrajyothy.com/media/2024/20240413/Annamalai_ea46614d93_V_jpg--799x414-4g.webp",title:"K. Annamalie",verified:true, subtitle:"@annamalie",id:"fdfasdfsdee"},{img:"https://m.economictimes.com/thumb/msid-66571054,width-1200,height-900,resizemode-4,imgsize-666529/mohan-bhagwat-pti-1200.jpg",title:"Mohan Bhagwat",verified:true, subtitle:"@RSS_Chief",id:"5465d4asfsdfae"},{img:"https://www.scrolldroll.com/wp-content/uploads/2021/09/Dhanush-best-south-indian-actors-scaled.jpg",title:"Dhanush",verified:true, subtitle:"@Dhanush",id:"654587484sdswe"}])
  return (
    <Card elevation={2} sx={{width:'100%',}}>
         <List disablePadding sx={{ width: '100%', bgcolor: 'background.paper', }} >
        {person?.map((f,i)=><Grid key={i}>
            <ListItem dense disableGutters disablePadding sx={{padding:"0px 10px"}} >
        <ListItemAvatar>
       <Avatar alt={f?.title} src={f?.img} />

        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle2" color="primary">{f?.title}</Typography> } secondary={<Stack direction="row" spacing={1}>{f?.subtitle}  &nbsp; {f?.verified && <SvgVerified/> }</Stack>} />
        <Grid sx={{width:"80px",textAlign:"center",border:"1px solid #a9c8e7", padding:"0px 16px",borderRadius:"20px",fontSize:"14px",cursor:"pointer",color:"#65abf2"}}>
  Follow
</Grid>
      </ListItem>
    <Divider light/>
        </Grid> 
        
    )}
         </List>
    </Card>
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