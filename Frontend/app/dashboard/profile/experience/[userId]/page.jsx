"use client";
import React, { useState,useRef, useEffect } from 'react'
import MySnackbar from "../../../../Components/MySnackbar/MySnackbar";
import {Grid, Container, Typography,Card,Box,Badge,TextField,Fab, Stepper,Step,StepLabel, Divider,Table,TableHead,TableRow,TableCell,TableBody,ButtonGroup, IconButton } from '@mui/material/';
import {authService} from "../../../../services"
import { useRouter } from "next/navigation";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const steps = ['Experience', 'Certificates', 'Degree', 'Patent','Reference'];

export function MyStepper({value}){
return    <Stepper activeStep={value}>
{steps.map((label, index) => {
  return (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  );
})}
</Stepper>
}
function Experience({params}) {
  const {userId} = params;
  const [_id,setId] =useState("");
  const [loading, setLoading] = useState(false);
  const [company,setCompany]= useState("");
  const [title,setTitle] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description,setDesc] = useState("");
  const [allExp, setAllExp] = useState([])
  const snackRef = useRef();
  const router = useRouter();

  const setData = (d)=>{
    setId(d?._id ?? "");
    setCompany(d?.company ?? "");
    setTitle((d?.title ?? ""));
    setStartDate(d?.startDate ?? "");
    setEndDate(d?.endDate ?? "");
    setDesc(d?.description ?? "");
  }
  const handlePerData = async (e) => {
    e.preventDefault();
    let myData = {_id,userId,company,title,startDate,endDate,description}
    setLoading(true);
    try {
      let res = await authService.post(`api/v1/auth/profile/add/additionalData/experience/${_id}`,myData);
      snackRef.current.handleSnack(res);
      setLoading(false);
      setData("")
      if(res.variant ==="success"){
        getData();
        router.push(`/dashboard/profile/certificates/${userId}`)
      }  
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  const getData = async()=>{
    try {
      setLoading(true)
      let res = await authService.get(`api/v1/auth/profile/get/oneProfile`);
      snackRef.current.handleSnack(res);
      if(res.variant === "success"){
        setLoading(false)
        setAllExp(res.data.experience)
      }  
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  useEffect(() => {
    if(userId){
      getData()
    }
  }, [userId,_id])
  
  const handleDelete = async(row)=>{
    try {
      setLoading(true)
      let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/experience/${row._id}`);
      snackRef.current.handleSnack(res);
      if(res.variant === "success"){
        setLoading(false);
        setData("");
        getData();
      }  
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  return (
    <main>
    <Container className='vCenter'>
      <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom align="center" >Setup Your Personal Profile</Typography>
        <MyStepper value={0}/>
      <br/>
      </Box>
    
    <Card elevation={3} >
      <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
        <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>My Work Experience</Typography>
      </Box>
      <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
      <form onSubmit={(e) => handlePerData(e)}>
      <Grid container spacing={2}>
       
        <Grid item xs={12} md={6}>
        <TextField value={company} disabled={loading} onChange={(e) => setCompany(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Company" fullWidth label="Company" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField value={title} disabled={loading} onChange={(e) => setTitle(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Title" fullWidth label="Title" variant="outlined" />
        </Grid>
       
        <Grid item xs={12} md={6}>
        <TextField value={startDate} focused type="date" onChange={(e) => setStartDate(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Start Date" fullWidth label="Start Date" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField value={endDate} focused type="date" onChange={(e) => setEndDate(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="End Date" fullWidth label="End Date" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField value={description}  onChange={(e) => setDesc(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Description" fullWidth label="Description" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={6} className='center'>
          <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
         {_id ? "Update Experience" : "Add Experience"}
          </Fab>
        </Grid>
  
        <Grid item xs={12}>
          <br />
          </Grid>
        <Grid item xs={12} sx={{display:"flex",justifyContent:"space-evenly"}}>
        <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="inherit" onClick={()=>router.push("/dashboard")}>
          Skip
          </Fab>
            <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} onClick={()=>router.push(`/dashboard/profile/certificates/${userId}`)} size='small' color="primary">
          Next
          </Fab>
        </Grid>
      </Grid>
      </form>
     
      </Box>
      <Box sx={{marginTop:"30px"}}>
        <Divider light>My Experience List</Divider>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sl No.</TableCell>
            <TableCell align="left">Company</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Start Date</TableCell>
            <TableCell align="left">End Date</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {allExp.map((row,i)=> <TableRow
              key={i}
              hover
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
              {i+1}
            </TableCell>
            <TableCell align="left">
              {row.company}
            </TableCell>
            <TableCell align="left">
              {row.title}
            </TableCell>
            <TableCell align="left">
              {row.startDate}
            </TableCell>
            <TableCell align="left">
              {row.endDate}
            </TableCell>
            <TableCell align="left">
              {row.description}
            </TableCell>
            <TableCell align="center">
              <ButtonGroup variant="text" aria-label="Basic button group">
              <IconButton onClick={()=>setData(row)}>
                <FaEdit />
              </IconButton>
              <IconButton onClick={()=>handleDelete(row)}>
                <IoTrashBin style={{color:"crimson"}}/>
              </IconButton>
            </ButtonGroup>
            </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </Box>
    </Card>
    </Container>
        
  <MySnackbar ref={snackRef} />
  </main>
  )
}

export default Experience