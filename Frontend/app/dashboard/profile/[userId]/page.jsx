"use client";
import React, { useState,useRef,useEffect } from 'react'
import {Grid, Container, Typography,Card,Avatar,Badge,TextField,Fab, MenuItem,Autocomplete,Tooltip, CircularProgress } from '@mui/material/';
import { FaUser,FaPlusCircle  } from "react-icons/fa";
import { useImgUpload } from '../../../hooks/useImgUpload'
import {authService} from "../../../services"
import MySnackbar from "../../../Components/MySnackbar/MySnackbar";
import { useRouter } from "next/navigation";

function PersonalProfile({params}) {
  const {userId} = params;
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg]= useState(false);
  const [userImage, setImgUrl] = useState("")
  const [firstName,setFN] = useState("");
  const [lastName,setLN] = useState("");
  const [primaryEmail, setPEmail] = useState("");
  const [secondaryEmail, setSEmail] = useState("");
  const [domainSkills, setDomains] = useState([]);
  const [employmentType, setEmpType] = useState("");
  const [personalSkills, setPSkill] = useState([]); 
  const [dob, setDOB] = useState("")   
  const [allEmpType] = useState(["Full Time", "Part Time", "Contract", "Student"])
  const [allDomain] = useState([{label:"Accounting",value:"Accounting"},{label:"Data Analytics",value:"Data Analytics"}, {label:"Graphic Design",value:"Graphic Design"},{label:"Business Analytics",value:"Business Analytics"},{label:"Other",value:"Other"}])
  const [allSkill] = useState([{label:"Public Speaking",value:"Public Speaking"},{label:"Editing",value:"Editing"}, {label:"Blogging",value:"Blogging"},{label:"Other",value:"Other"}])
  const snackRef = useRef();
  const router = useRouter();

  const fillData = (d) =>{
    setImgUrl(d?.userImage ?? "");
    setFN(d?.firstName ?? "");
    setLN(d?.lastName ?? "");
    setPEmail(d?.primaryEmail ?? "");
    setSEmail(d?.secondaryEmail ?? "");
    setDomains(d?.domainSkills ?? []);
    setEmpType(d?.employmentType ?? "");
    setPSkill(d?.personalSkills ?? []);
    setDOB(d?.dob ?? "");
  }
  useEffect(() => {
    const getData = async () =>{
      setLoading(true)
      try {
        let res = await authService.get(`api/v1/auth/profile/getOne/${userId}`);
        setLoading(false)

        if(res.variant === "success"){
          fillData(res.data)
        }  
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    if(userId){
      getData()
    }
  }, [userId])
  
  const handlePerData = async (e) => {
    e.preventDefault();
    let myData = {userImage,firstName,lastName,employmentType,primaryEmail,secondaryEmail,domainSkills,personalSkills,dob}
    setLoading(true);
    try {
      let res = await authService.post(`api/v1/auth/createAccount/add/additionalData`,myData);
      snackRef.current.handleSnack(res);
      setLoading(false)
      if(res.variant ==="success"){
        router.push(`/dashboard/profile/experience/${userId}`)
      }  
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const imgUpload = async (e) => {
    setLoadingImg(true);
    let url = await useImgUpload(e);
    if (url) {
      setImgUrl(url);
      setLoadingImg(false);
    } else {
      snackRef.current.handleSnack({
        message: "Image Not Selected",
        info: "warning",
      });
      setLoadingImg(false);
    }
  };
  return (
    <main>
      <Container className='vCenter'>
      <Typography variant="h6" gutterBottom align="center" >Setup Your Personal Profile</Typography>
      <Card elevation={3} sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
      <form onSubmit={(e) => handlePerData(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12} className='center'>
            {loadingImg ? <CircularProgress /> :    <label htmlFor="personalImg">
        <input type="file" id="personalImg" style={{display:"none"}} onChange={(e) => imgUpload(e.target.files[0])}  accept="image/*"  />
        <Tooltip title="Upload Your Photo" arrow>
        <Badge badgeContent={<FaPlusCircle style={{fontSize:"16px",marginLeft:"-25px",marginTop:"-20px",color:"#0180ff"}} />} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
           <Avatar alt={firstName} sx={{cursor: "pointer",width: 112, height: 112, border:"4px solid #d9fdd3"}} src={userImage}><FaUser style={{fontSize:"40px"}}/> </Avatar>
           </Badge>
        </Tooltip>
        </label>}
       
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={firstName} disabled={loading} onChange={(e) => setFN(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="First Name" fullWidth label="First Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={lastName} disabled={loading} onChange={(e) => setLN(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Last Name" fullWidth label="Last Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={employmentType} select onChange={(e) => setEmpType(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Employment Type" fullWidth label="Employment Type" variant="outlined" >
              {allEmpType.map((e,i)=><MenuItem key={i} value={e}>{e}</MenuItem>)}
            </TextField>
          
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={primaryEmail} type="email" disabled onChange={(e) => setPEmail(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Primary Email" fullWidth label="Primary Email" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={secondaryEmail} type="email" onChange={(e) => setSEmail(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Secondary Email" fullWidth label="Secondary Email" variant="outlined" />
          </Grid>
         
          <Grid item xs={12} md={6}>
          <Autocomplete
            multiple
            options={allDomain}
            disabled ={allDomain.length === 0 || loading}
            // isOptionEqualToValue={(option) => option.label}
            // isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(e, v) => {
              setDomains(v);
            }}
            value={domainSkills}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Domain Skill"
                placeholder="Domain Skill"
                
              />
            )}
          />
          </Grid>
          <Grid item xs={12} md={6}>
          <Autocomplete
            multiple
            options={allSkill}
            // isOptionEqualToValue={(option) => option.label}
            // isOptionEqualToValue={(option, value) => option.value === value.value}
            disabled ={allSkill.length === 0 || loading}
            onChange={(e, v) => {
              setPSkill(v);
            }}
            value={personalSkills}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                // select
                // InputProps={{style:{borderRadius:"35px"}}}
                label="Personal Skills"
                placeholder="Personal Skills"
                
              />
            )}
          />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={dob} type='date' focused onChange={(e) => setDOB(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Date of Birth" fullWidth label="Date of Birth" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <br />
            </Grid>
          <Grid item xs={12} className='center'>
              <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
            Next
            </Fab>
          </Grid>
        </Grid>
        </form>
       
    
      </Card>
      </Container>
          
    <MySnackbar ref={snackRef} />
    </main>
  )
}

export default PersonalProfile