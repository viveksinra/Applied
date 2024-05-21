"use client";
import React,{Fragment, useState,useEffect,useRef} from 'react'
import { Card, Container,Grid,styled, Typography,Avatar,Box, Fab,Tab,Table, TableHead, TableRow,TableCell, Divider } from '@mui/material';
import Header from '../../Components/Header/Header';
import { BsPencilSquare } from "react-icons/bs";
import { MdConnectWithoutContact,MdOutlineDataExploration,MdStarRate } from "react-icons/md"; 
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiSolidUserCheck } from "react-icons/bi";
import {TabContext,TabList } from '@mui/lab/';
import MyFeed from "../../dashboard/Home/MyFeed";
import {authService} from "../../services/index";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";

import Link from "next/link";
import Ratings from "./Ratings";
import Review from './Review';
function PersonalProfile({params}) {
    const {profileId} = params;
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({coverImg:"https://res.cloudinary.com/oasismanors/image/upload/v1715601597/wallpaperflare.com_wallpaper_i06liu.jpg",userImage:"",firstName:"",lastName:"",work:"",company:"",skill:"",experience:""})
    const [stats, setStats] = useState([{title:"Posts",number:"0"}, {title:"Connections",number:"0"}, {title:"Followers", number:"0"},{title:"Following", number:"0"}, {title:"Ratings Received",number:"0"}, {title:"Ratings Send", number:"0"}])
    const [tabVal, setTabVal] = useState('1')
    const [experience,setExp] = useState([{company:"",startDate:"",endDate:"",title:"",desc:""}])
    const [education,setEdu] = useState([{degree:"",university:"",year:0,score:""},{degree:"",university:"",year:0,score:""},{degree:"",university:"",year:0,score:""}])
    const [certification,setCer] = useState([{education:"",subTitle:""},{education:"",subTitle:""}])
    const [patent,setPatent] = useState([{title:"",subTitle:""},{title:"",subTitle:""}])
    const [lang, setLang] = useState([{title:"",subTitle:""},{title:"",subTitle:""}])
    const snackRef = useRef();
    const CoverBg = styled('div')(() => ({
        background:`url(${userData.coverImg}) no-repeat`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize:"cover",
        height:"350px",
        width:"100%",
        borderRadius:"16px",
        display:"flex"
        // [theme.breakpoints.down('md')]: {
        //   height: "200px",
        // },
        // [theme.breakpoints.up('md')]: {
        //   height: "230px",
        // },
      }));

      const getBasicData= async()=>{
        try {
            setLoading(true)
            let res = await authService.get(`api/v1/getProfile/get/basicProfile/${profileId}`);
            if(res.variant === "success"){
              setLoading(false);
              setUserData(res.data);
            }  
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
      }
      const getStats = async()=>{
        try {
            setLoading(true)
            let res = await authService.get(`api/v1/getProfile/get/stats/${profileId}`);
            if(res.variant === "success"){
              setLoading(false);
              setStats(res.data);
            }  
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
      }
      const getMoreData= async()=>{
        try {
            setLoading(true)
            let res = await authService.get(`api/v1/getProfile/get/moreProfileData/${profileId}`);
            if(res.variant === "success"){
              setLoading(false);
              setCer(res.data.certification);
              setEdu(res.data.education);
              setExp(res.data.experience);
              setLang(res.data.lang);
              setPatent(res.data.patent);
            }  
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
      }
      useEffect(() => {
        getBasicData();
        getStats();
        getMoreData()
      }, [])
      
  return (
    <Fragment>
        <Header navTabVal="1">
        <Container maxWidth="xl">
            <Grid container spacing={2} >
                <Grid item xs={12} md={9}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <CoverBg>
                        <Avatar
                        alt="Remy Sharp"
                        src={userData?.userImage}
                        sx={{ width: 90, height: 90,marginLeft:"30px",marginTop:"300px"}}
                        />  
                        </CoverBg>
                        </Grid>
                        <Grid item xs={12}>
                        <br/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                <Grid item xs={12} sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <Typography variant="h6">{`${userData?.firstName} ${userData?.lastName}`}</Typography>
                                    <Box sx={{display:"flex",flexDirection:"row",marginLeft:"10px"}}>
                                  {userData.work && <Typography>&bull; {userData.work}</Typography>}  
                                  {userData?.company && <>
                                    <Typography color="textSecondary" sx={{margin:"0 10px"}}>at</Typography>
                                    <Typography>{userData?.company}</Typography> </>}  
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                              {userData.skill && <Typography color="textSecondary" variant='caption'>• {userData.skill}</Typography>}  
                              {userData?.experience &&  <Typography color="textSecondary" variant='caption' sx={{margin:"0 10px"}}>&bull; {userData?.experience}</Typography>} 
                                </Grid>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{display:"flex",justifyContent:"space-evenly"}}>
                                <Fab variant="extended" sx={{textTransform:"capitalize",padding:"0px 12px"}} size="small" color="primary">
                                    Following
                                </Fab>
                                <Fab variant="extended" sx={{textTransform:"capitalize",padding:"0px 12px"}} size="small" color="primary">
                                    Rate
                                </Fab>
                                <Fab variant="extended" sx={{textTransform:"capitalize",padding:"0px 12px"}} size="small" color="primary">
                                    Review
                                </Fab>
                                <Fab variant="extended" sx={{textTransform:"capitalize",padding:"0px 12px"}} size="small" color="primary">
                                    Download Resume
                                </Fab>
                                <Fab variant="extended" sx={{textTransform:"capitalize",padding:"0px 12px"}} size="small" color="primary">
                                    Chat
                                </Fab>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <Box sx={{backgroundColor:"#f1f0f5",height:"190px",width:"100%",padding:"20px", borderRadius:"16px"}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                    <Typography sx={{fontWeight:"600"}}>Stats</Typography>
                                    </Grid>
                                    {stats.map((s,i)=> <Grid item key={i} xs={6} sm={4}>
                                    <Grid container>
                                    <Grid item xs={3} className='center'>
                                    {i === 0 ? <BsPencilSquare style={{fontSize: "20px"}}/> : i === 1 ? <MdConnectWithoutContact style={{fontSize: "20px"}}/> : i===2 ? <AiOutlineUsergroupAdd style={{fontSize: "20px"}}/> : i===3 ? <BiSolidUserCheck style={{fontSize: "20px"}} /> : i===4 ? <MdOutlineDataExploration style={{fontSize: "20px"}}/> : i===5 ? <MdStarRate style={{fontSize: "20px"}} /> : null } 
                                    </Grid>
                                    <Grid item xs={9}>
                                    <Box sx={{display:"block"}}>
                                    <Typography variant="caption" sx={{lineHeight:0.2}} color="primary">{s?.title}</Typography>
                                    <Typography variant="subtitle2" sx={{fontWeight:"600",lineHeight:"1"}} color="primary">{s?.number}</Typography>
                                      </Box>
                                    </Grid>
                                    </Grid>
                                </Grid>)}
                                </Grid>
                                
                                </Box>
                                </Grid>
                                <Grid item xs={6}>
                                <Box sx={{backgroundColor:"#f1f0f5",height:"190px",width:"100%",padding:"20px", borderRadius:"16px",overflow:"hidden"}}>
                                <Typography sx={{fontWeight:"600"}}>About {userData?.firstName}</Typography>
                                <Typography variant="subtitle2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae numquam alias earum atque repudiandae ipsum labore aut, maxime cumque, eum, provident minima saepe! Quasi deserunt officia distinctio, ut fugiat eius.</Typography>
                                <Typography variant="subtitle2">Lorem ipsum dolor sit. </Typography>
                                <Link href="/" style={{color:"#0180ff"}}>Read More</Link>
                                </Box>
                                </Grid>
                            </Grid> 
                        </Grid>
                        <Grid item xs={12} sx={{background:"#dee5eb",width:"100%",margin:"20px 0px",height:"50px",borderRadius:"16px"}}>
                        <TabContext value={tabVal} >
                        <TabList centered sx={{marginTop:"-16px"}} onChange={(e,v)=>setTabVal(v)} textColor="white" indicatorColor="primary" aria-label="Post">
                        <Tab label="Post" value="1" />
                        <Tab label="Rating" value="2" />
                        <Tab label="Review" value="3" />
                        </TabList>
                        </TabContext>
                        </Grid>
                        <Grid item xs={12}>
                        {tabVal ==="1" ? <MyFeed/> : tabVal === "2" ? <Ratings/> : tabVal === "3" ? <Review/> : null}
                        </Grid>
                    </Grid>
              
                </Grid>
                <Grid item xs={12} md={3}>
                <Typography  sx={{fontWeight:"600"}}>Experience</Typography>
                <Card>
                    {experience.map((e,i)=><div key={i}>
                    <Box sx={{padding:"20px"}}>
                    <Typography>{e?.company}</Typography>
                    <Table size="small" aria-label="company">
                    <TableHead>
                    <TableRow hover sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography color="textSecondary" variant="subtitle2">Start Date:</Typography></TableCell>
                    <TableCell align="left">{e?.startDate}</TableCell>
                    </TableRow>
                    <TableRow hover sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography color="textSecondary" variant="subtitle2">End Date:</Typography></TableCell>
                    <TableCell align="left">{e?.endDate}</TableCell>
                    </TableRow>
                    <TableRow hover sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography color="textSecondary" variant="subtitle2">Title</Typography></TableCell>
                    <TableCell align="left">{e?.title}</TableCell>
                    </TableRow>
                    <TableRow hover sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography color="textSecondary" variant="subtitle2">Description</Typography></TableCell>
                    <TableCell align="left">{e?.desc}</TableCell>
                    </TableRow>
                    </TableHead>
                    </Table>
                    </Box>
                     <Divider/>
                     </div> )}
                </Card>
                <br/>
                <Typography  sx={{fontWeight:"600"}}>Education</Typography>
                <Card>
                    {education.map((e,i)=><div key={i}>
                    <Box sx={{padding:"20px"}}>
                    <Typography>{e?.degree}</Typography>
                    <Table size="small" aria-label="company">
                    <TableHead>
                    <TableRow hover sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography color="textSecondary" variant="subtitle2">University</Typography></TableCell>
                    <TableCell align="left">{e?.university}</TableCell>
                    </TableRow>
                    <TableRow hover sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography color="textSecondary" variant="subtitle2">Year</Typography></TableCell>
                    <TableCell align="left">{e?.year}</TableCell>
                    </TableRow>
                    <TableRow hover sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography color="textSecondary" variant="subtitle2">Score</Typography></TableCell>
                    <TableCell align="left">{e?.score}</TableCell>
                    </TableRow>
                    </TableHead>
                    </Table>
                    </Box>
                     <Divider/>
                     </div> )}
                </Card>
                <br/>
                <Typography  sx={{fontWeight:"600"}}>Certification</Typography>
                <Card>
                    {certification.map((c,i)=><div key={i}>
                    <Box sx={{padding:"10px 20px"}}>
                    <Table size="small" aria-label="company">
                    <TableHead>
                    <TableRow sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left">{c?.education}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography color="textSecondary" variant="subtitle2">{c?.subTitle}</Typography></TableCell>
                    </TableRow>
                    </TableHead>
                    </Table>
                    </Box>
                     <Divider/>
                     </div> )}
                </Card>
                <br/>

                <Typography  sx={{fontWeight:"600"}}>Patent</Typography>
                <Card>
                    {patent.map((c,i)=><div key={i}>
                    <Box sx={{padding:"10px 20px"}}>
                    <Table size="small" aria-label="company">
                    <TableHead>
                    <TableRow sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography variant="subtitle2">{c?.title}</Typography></TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none"  align="left"> <Typography variant="subtitle2" color="textSecondary"> {c?.subTitle}</Typography></TableCell>
                    </TableRow>
                    </TableHead>
                    </Table>
                    </Box>
                     <Divider/>
                     </div> )}
                </Card>
                <br/>
                <Typography  sx={{fontWeight:"600"}}>Achievements</Typography>
                <Card>
                    {patent.map((c,i)=><div key={i}>
                    <Box sx={{padding:"10px 20px"}}>
                    <Table size="small" aria-label="company">
                    <TableHead>
                    <TableRow sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography variant="subtitle2">{c?.title}</Typography></TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none"  align="left"> <Typography variant="subtitle2" color="textSecondary"> {c?.subTitle}</Typography></TableCell>
                    </TableRow>
                    </TableHead>
                    </Table>
                    </Box>
                    <Divider/>
                    </div> )}
                </Card>
                <br/>
                <Typography  sx={{fontWeight:"600"}}>Languages</Typography>
                <Card>
                    {lang.map((c,i)=><div key={i}>
                    <Box sx={{padding:"10px 20px"}}>
                    <Table size="small" aria-label="company">
                    <TableHead>
                    <TableRow sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none" align="left"><Typography variant="subtitle2">{c?.title}</Typography></TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, th': { border: 0 } }}>
                    <TableCell padding="none"  align="left"> <Typography variant="subtitle2" color="textSecondary"> {c?.subTitle}</Typography></TableCell>
                    </TableRow>
                    </TableHead>
                    </Table>
                    </Box>
                    <Divider/>
                    </div> )}
                </Card>
                </Grid>
            </Grid>
     
        </Container>
        </Header>
        
<MySnackbar ref={snackRef} />
        </Fragment>
  )
}

export default PersonalProfile