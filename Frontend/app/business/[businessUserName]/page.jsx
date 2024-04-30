"use client";
import React,{useEffect,Fragment, useState} from 'react'
import  '../businessStyle.css';
import { Container,Grid,styled,Avatar, Typography,Fab,Card,Tabs,Tab, Table, TableHead,TableRow,TableCell,List,ListSubheader,ListItem,ListItemText,Rating} from '@mui/material';
import { ImLocation } from "react-icons/im";
import {SvgVerified} from "../../dashboard/Home/YouMayKnow";
import { BsPencilSquare } from "react-icons/bs";
import { MdConnectWithoutContact,MdOutlineDataExploration,MdStarRate } from "react-icons/md"; 
import { IoLocationSharp } from "react-icons/io5";
import { FcPhone,FcFeedback,FcGlobe   } from "react-icons/fc";
import { BiSolidUserCheck } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Gauge, gaugeClasses  } from '@mui/x-charts/Gauge';
import { LineChart } from '@mui/x-charts/LineChart';
import MyFeed from '../../dashboard/Home/MyFeed';


function BusinessProfile({params}) {
    const [busData, setBusData]= useState({coverPic:"https://i.pinimg.com/originals/3b/fd/a4/3bfda4e90ff082e956fc651d22a52b3a.jpg",profileImg:"https://www.dhanuka.com/content/images/logos/dhanukaLogoHome.png",name:"Dhanuka Agrotech Ltd",industry:"Agriculture",location:"New Delhi, Jam Nagar Road, IN",verified:true,locationVerified:true,phone:"1800 451 130",phoneVerified:true,email:"care@dhanuka.com",emailVerified:true,website:"dhanukaagro.com",websiteVerified:true})
    const [stats, setStats] = useState([{title:"Posts",number:"85"}, {title:"Connections",number:"700"}, {title:"Followers", number:"2K"},{title:"Following", number:"1100"}, {title:"Get Rating",number:"2K"}, {title:"Rating Sent", number:"1150"}])
    const [tabVal, setTabVal] = useState(0);
    const {businessUserName} = params;
    useEffect(() => {
     console.log(businessUserName)
    }, [])

    
    const CoverImg = styled('div')(({ theme }) => ({
        background:`linear-gradient(to left, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.65) 100%),\n   url(${busData?.coverPic}) no-repeat`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius:"10px",
        [theme.breakpoints.down('md')]: {
          height: "200px",
        },
        [theme.breakpoints.up('md')]: {
          height: "230px",
        },
      }));

  return (
    <Fragment>
    <Container maxWidth="xl">
    <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
           <CoverImg>
           <Avatar
            alt="profileImg"
            src={busData?.profileImg}
            sx={{ width: 100, height: 100, position:"relative", top:"180px",left:"20px",border:"2px solid white",cursor:"pointer" }}
            />
            </CoverImg>
            <br/> <br/>
            <Grid sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Grid sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Typography variant="subtitle1" sx={{fontWeight:"600"}} color="primary">{busData?.name}  </Typography>
                 {busData?.verified && <>&nbsp;&nbsp; <SvgVerified/> </>} 
                 <Typography variant="subtitle1"> &nbsp; &nbsp;• {busData?.industry}</Typography>
                 <Typography variant="caption" color="textSecondary"> &nbsp; &nbsp;<ImLocation/> &nbsp;{busData?.location}</Typography>
                </Grid>
                <Grid sx={{display:"flex",justifyContent:"right"}}>
                <Fab variant="extended" sx={{padding:"0px 14px",height:"28px", textTransform:"capitalize"}} size="small" color="primary">
                Following
                </Fab>
                <Fab variant="extended" sx={{padding:"0px 14px",height:"28px",margin:"0px 10px", textTransform:"capitalize"}} size="small" color="primary">
                Rate & Review
                </Fab>
                <Fab variant="extended" sx={{padding:"0px 14px",height:"28px", textTransform:"capitalize"}} size="small" color="primary">
                Chat
                </Fab>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{marginTop:"30px"}}>
                <Grid item xs={12} md={6}>
                    <Grid container id="statBg" >
                        <Grid item xs={12}>
                        <Typography variant="body2" color="darkblue" align='center'>Statistics at a glance</Typography></Grid>
                        {stats.map((s,i)=> <Grid item key={i} xs={4}>
                            <Grid sx={{display:"flex",alignItems:"center"}}> 
                                    {i === 0 ? <BsPencilSquare className='statsIcons'/> : i === 1 ? <MdConnectWithoutContact className='statsIcons'/> : i===2 ? <AiOutlineUsergroupAdd className='statsIcons'/> : i===3 ? <BiSolidUserCheck className='statsIcons' /> : i===4 ? <MdOutlineDataExploration className='statsIcons'/> : i===5 ? <MdStarRate className='statsIcons' /> : null } 
                                <div  style={{display:"block"}}>
                                    <Typography variant="caption" sx={{lineHeight:0.2}} color="primary">{s?.title}</Typography>
                                    <Typography variant="subtitle2" sx={{fontWeight:"600",lineHeight:"1"}} color="primary">{s?.number}</Typography>
                                </div>
                            </Grid>
                        </Grid>)}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Card id="aboutCard">
                        <Typography variant="subtitle2" align='center'> About {busData?.name}</Typography>
                        <Typography variant="caption" sx={{lineHeight:0}}>Dhanuka Agritech Limited is one of India's leading agro-chemical Company and is listed by Forbes Magazine in the category of “200 Best under A Billion Companies in Asia Pacific”. We are listed with Bombay Stock Exchange and National Stock Exchange of India.</Typography>
                        <Typography variant="subtitle2" align='right' sx={{cursor:"pointer"}} color="primary">Learn More</Typography>
                    </Card>
                </Grid>
            </Grid>

            <Grid sx={{ borderBottom: 1, borderColor: 'divider',marginBottom:"25px" }}>
                <Tabs value={tabVal} onChange={(e,v)=>setTabVal(v)} aria-label="basic tabs example">
                <Tab label="Post"  />
                <Tab label="Rating" />
                <Tab label="Reviews" />
                </Tabs>
            </Grid>
            {tabVal ===0 && <MyFeed/>}
           
        </Grid>
        <Grid item xs={12} md={3}>
      
        <Card>
        <Typography variant='subtitle2' sx={{fontWeight:600,marginLeft:"10px"}} color="textSecondary">Contact Details</Typography>
        <Table size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell padding="none" sx={{color:"green", paddingLeft:"6px",paddingRight:"6px"}} align="left"><span style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"16px",}}> <IoLocationSharp/></span></TableCell>
            <TableCell padding="none" align="left">{busData?.location}</TableCell>
            <TableCell padding="none" sx={{paddingLeft:"6px",paddingRight:"6px"}} align="right">{busData?.locationVerified && <SvgVerified style={{fontSize:"16px"}}/>} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="none" sx={{paddingLeft:"6px",paddingRight:"6px"}} align="left"><span style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"16px",}}> <FcPhone/></span></TableCell>
            <TableCell padding="none" align="left">{busData?.phone}</TableCell>
            <TableCell padding="none" sx={{paddingLeft:"6px",paddingRight:"6px"}} align="right">{busData?.phoneVerified && <SvgVerified style={{fontSize:"16px"}}/>} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="none" sx={{color:"green", paddingLeft:"6px",paddingRight:"6px"}} align="left"><span style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"16px",}}> <FcFeedback /></span></TableCell>
            <TableCell padding="none" align="left">{busData?.email}</TableCell>
            <TableCell padding="none" sx={{paddingLeft:"6px",paddingRight:"6px"}} align="right">{busData?.emailVerified && <SvgVerified style={{fontSize:"16px"}}/>} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="none" sx={{color:"green", paddingLeft:"6px",paddingRight:"6px"}} align="left"><span style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"16px",}}> <FcGlobe  /></span></TableCell>
            <TableCell padding="none" align="left">{busData?.website}</TableCell>
            <TableCell padding="none" sx={{paddingLeft:"6px",paddingRight:"6px"}} align="right">{busData?.websiteVerified && <SvgVerified style={{fontSize:"16px"}}/>} </TableCell>
          </TableRow>
        </TableHead>
        </Table>
        </Card>
        <br/>
        <Card>
        <Typography variant='subtitle2' sx={{fontWeight:600,marginLeft:"10px"}} color="textSecondary">NPS Score</Typography>
            <Gauge
            value={75}
            startAngle={-110}
            endAngle={110}
            height={110}
            sx={{
                [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
                transform: 'translate(0px, 0px)',
                
                },
              
            }}

            text={
                ({ value, valueMax }) => `${value} / ${valueMax}`
            }
            />
         <center><Rating name="rating"  defaultValue={4.5} readOnly precision={0.5} /></center>   
        </Card>
        <br/>
        <Card>
        <List
            sx={{ width: '100%',bgcolor: 'background.paper' }}
            dense
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader  component="div" sx={{padding:"0px 16px"}} id="nested-list-subheader">
                Basic Information
                </ListSubheader>
            }
            >
        <ListItem divider dense sx={{padding:"0px 16px"}} >
        <ListItemText primary="Business" secondary={busData?.industry} />
        </ListItem>
        <ListItem divider dense sx={{padding:"0px 16px"}}>
        <ListItemText primary="Business Industry / Category" secondary="Internet, Data Storage" />
        </ListItem>
        <ListItem divider dense sx={{padding:"0px 16px"}}>
        <ListItemText primary="Ownership" secondary="Public" />
        </ListItem>
        <ListItem divider dense sx={{padding:"0px 16px"}}>
        <ListItemText primary="Founder" secondary="Ram Gopal Agarwal" />
        </ListItem>
        <ListItem divider dense sx={{padding:"0px 16px"}}>
        <ListItemText primary="Current MD / CEO" secondary="Dinesh Prashad Agarwal" />
        </ListItem>
        <ListItem dense sx={{padding:"0px 16px"}}>
        <ListItemText primary="No. of Employees" secondary="10,000 - 100,000" />
        </ListItem>
    </List>
        </Card>
        </Grid>
    </Grid>
    <Card>
    <LineChart
      xAxis={[{ data: [1, 2, 3,4, 5,6,7, 8,9, 10] }]}
      series={[
        {
          data: [2,4, 5, 3, 4, 5, 4,3,2,1],
        },
      ]}
      height={300}
    />
    <Typography variant='subtitle2' sx={{fontWeight:600,marginLeft:"10px"}} textAlign="center" color="textSecondary">Rating in Past 10 days.</Typography>
    </Card>
     
    </Container>
    </Fragment>
  )
}

export default BusinessProfile