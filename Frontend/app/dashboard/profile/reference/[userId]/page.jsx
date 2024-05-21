"use client";
import React, { useState,useRef,useEffect, Fragment } from 'react'
import {Grid, Container, Typography,Card,Box,Badge,TextField,Fab, Stepper,Step,StepLabel, Divider,Table,TableHead,TableRow,TableCell,TableBody,ButtonGroup, IconButton } from '@mui/material/';
import { useRouter } from "next/navigation";
import { FcDeleteRow } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import {authService} from "../../../../services"
import MySnackbar from "../../../../Components/MySnackbar/MySnackbar";
import {MyStepper} from "../../experience/[userId]/page"

function Reference({params}) {
    const {userId} = params;
    const [_id,setId] =useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [generalInformation, setGenInfo] = useState("");
    const [allCert, setAllCert] = useState([])
    const snackRef = useRef();
    const router = useRouter();

    const setData = (d)=>{
        setId(d?._id ?? "");
        setName(d?.name ?? "");
        setContact((d?.contact ?? ""));
    }

    const handlePerData = async (e) => {
        e.preventDefault();
        let myData = {_id,userId,name,contact}
        setLoading(true);
        try {
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/reference/${_id}`,myData);
          snackRef.current.handleSnack(res);
          console.log(res)
          setLoading(false);
          setData("")
          if(res.variant ==="success"){
            getData();
            setData("");
            // router.push(`/dashboard/profile/degree/${userId}`)
          }  
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      };
      const getData = async ()=>{
        try {
          setLoading(true)
          let res = await authService.get(`api/v1/auth/profile/get/oneProfile`);
          setLoading(false)
        //   snackRef.current.handleSnack(res);
          if(res.variant === "success"){
            setAllCert(res.data.reference)
          }  
        } catch (error) {
          setLoading(false)
          console.log(error);
        
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
          let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/reference/${row._id}`);
          snackRef.current.handleSnack(res);
          if(res.variant === "success"){
            setAllCert(res.data.patent);
            setLoading(false);
            setData("");
            getData();
          }  
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      }

      const handleFinish = async () => {
        let myData = {_id,userId,generalInformation}
        setLoading(true);
        try {
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/generalInformation/${_id}`,myData);
          snackRef.current.handleSnack(res);
          setLoading(false);
          setData("")
          if(res.variant ==="success"){
            getData();
            setData("");
            router.push(`/dashboard`)
          }  
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      };

  return (
    <main>
        <Container className='vCenter'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
              <Typography variant="h6" gutterBottom align="center" >Setup Your Personal Profile</Typography>
              <MyStepper value={5}/>
              <br/>
              </Box>
              <Grid item xs={12}>
              <Card elevation={3} >
                <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
                  <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>Reference</Typography>
                </Box>
                <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
                <form onSubmit={(e) => handlePerData(e)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                  <TextField value={name} disabled={loading} onChange={(e) => setName(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Reference Name" fullWidth label="Reference Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                  <TextField value={contact} disabled={loading} type='number' onChange={(e) => setContact(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Contact" fullWidth label="Contact" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={4} className='center'>
                    <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
                  {_id ? "Update Contact" : "Add Contact"}
                    </Fab>
                  </Grid>    
                </Grid>
                </form>
                </Box>
                {allCert?.length !== 0 && <Box sx={{marginTop:"10px"}}>
                  <Divider light>My Contact List</Divider>
                  <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Sl No.</TableCell>
                      <TableCell align="left">Reference Name</TableCell>
                      <TableCell align="left">Contact No.</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {allCert?.map((row,i)=> <TableRow
                        key={i}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">
                        {i+1}
                      </TableCell>
                      <TableCell align="left">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        {row.contact}
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="text" aria-label="Basic button group">
                        <IconButton onClick={()=>setData(row)}>
                          <FaEdit />
                        </IconButton>
                        <IconButton onClick={()=>handleDelete(row)}>
                          <FcDeleteRow/>
                        </IconButton>
                      </ButtonGroup>
                      </TableCell>
                      </TableRow>)}
                    </TableBody>
                  </Table>
                </Box> }
              </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
            <br/>
            <GeneralInfo generalInformation={generalInformation} setGenInfo={e=>setGenInfo(e)} params={params}/> <br/>
            </Grid>
            <Grid item xs={12}>
            <Grid sx={{display:"flex",justifyContent:"space-evenly"}}>
              <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="inherit" onClick={()=>router.push("/dashboard")}>
                Skip
              </Fab>
              <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} onClick={()=>router.push(`/dashboard/profile/patent/${userId}`)} size='small' color="info">
              Back
              </Fab>
              <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} onClick={()=> handleFinish()} size='small' color="primary">
              Finish
              </Fab>
             </Grid>
            </Grid>
          </Grid>
    </Container>
  <MySnackbar ref={snackRef} />
    </main>
  )
}


function GeneralInfo({params,generalInformation,setGenInfo}) {
    const {userId} = params;
    const [_id,setId] =useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDesc] = useState("");
    const snackRef = useRef();
    const router = useRouter();

      const getData = async ()=>{
        try {
          setLoading(true)
          let res = await authService.get(`api/v1/auth/profile/get/oneProfile`);
          setLoading(false)
        //   snackRef.current.handleSnack(res);
          if(res.variant === "success"){
            setGenInfo(res.data.generalInformation)
          }  
        } catch (error) {
          setLoading(false)
          console.log(error);
        
        }
      }

      useEffect(() => {
        if(userId){
          getData()
        }
      }, [userId,_id])

  return (
    <Fragment>
   <Card elevation={3} >
      <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
        <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>General Information</Typography>
      </Box>
      <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
      <form onSubmit={(e) => handlePerData(e)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <TextField value={generalInformation} multiline rows={2} disabled={loading} onChange={(e) => setGenInfo(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Description" fullWidth label="Description" variant="outlined" />
        </Grid>
      </Grid>
      </form>
      </Box> 
      </Card>
  <MySnackbar ref={snackRef} />
    </Fragment>
  )
}


export default Reference