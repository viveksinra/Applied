"use client";
import React, { useState,useRef,useEffect, Fragment } from 'react'
import {Grid, Container, Typography,Card,Box,Badge,TextField,Fab, Stepper,Step,StepLabel, Divider,Table,TableHead,TableRow,TableCell,TableBody,ButtonGroup, IconButton } from '@mui/material/';
import { useRouter } from "next/navigation";
import { FcDeleteRow } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import {authService} from "../../../../services"
import MySnackbar from "../../../../Components/MySnackbar/MySnackbar";
import {MyStepper} from "../../experience/[userId]/page"

function Certificates({params}) {
    const {userId} = params;
    const [_id,setId] =useState("");
    const [loading, setLoading] = useState(false);
    const [name, setificateName] = useState("");
    const [description, setDesc] = useState("");
    const [allCert, setAllCert] = useState([])
    const snackRef = useRef();
    const router = useRouter();

    const setData = (d)=>{
        setId(d?._id ?? "");
        setificateName(d?.name ?? "");
        setDesc((d?.description ?? ""));
    }

    const handlePerData = async (e) => {
        e.preventDefault();
        let myData = {_id,userId,name,description}
        setLoading(true);
        try {
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/certificate/${_id}`,myData);
          snackRef.current.handleSnack(res);
          console.log(res)
          setLoading(false);
          setData("")
          if(res.variant ==="success"){
            getData();
            setData("");
            router.push(`/dashboard/profile/degree/${userId}`)
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
            setAllCert(res.data.certificate)
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
          let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/certificate/${row._id}`);
          snackRef.current.handleSnack(res);
          if(res.variant === "success"){
            setAllCert(res.data.certificate);
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
              <Typography variant="h6" gutterBottom align="center" >Setup Your Personal Profile</Typography>
              <MyStepper value={1}/>
              <br/>
              </Box>
              <Grid item xs={12}>
              <Card elevation={3} >
                <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
                  <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>My Work Experience</Typography>
                </Box>
                <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
                <form onSubmit={(e) => handlePerData(e)}>
                <Grid container spacing={2}>
                
                  <Grid item xs={12} md={4}>
                  <TextField value={name} disabled={loading} onChange={(e) => setificateName(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Certificate Name" fullWidth label="Certificate Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                  <TextField value={description} disabled={loading} onChange={(e) => setDesc(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Description" fullWidth label="Description" variant="outlined" />
                  </Grid>
                
                  <Grid item xs={12} md={4} className='center'>
                    <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
                  {_id ? "Update Certificate" : "Add Certificate"}
                    </Fab>
                  </Grid>    
                </Grid>
                </form>
                </Box>
                {allCert.length !== 0 && <Box sx={{marginTop:"10px"}}>
                  <Divider light>My Certificates List</Divider>
                  <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Sl No.</TableCell>
                      <TableCell align="left">Certificate</TableCell>
                      <TableCell align="left">Desciption</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {allCert.map((row,i)=> <TableRow
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
                        {row.description}
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
            <Awards params={params}/> <br/>
            </Grid>
            <Grid item xs={12}>
            <Achievements params={params}/>
            <br />
            </Grid>
            <Grid item xs={12}>
            <Grid sx={{display:"flex",justifyContent:"space-evenly"}}>
              <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="inherit" onClick={()=>router.push("/dashboard")}>
                Skip
              </Fab>
              <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} onClick={()=>router.push(`/dashboard/profile/degree/${userId}`)} size='small' color="primary">
              Next
              </Fab>
             </Grid>
            </Grid>
          </Grid>
    </Container>
  <MySnackbar ref={snackRef} />
    </main>
  )
}


function Awards({params}) {
    const {userId} = params;
    const [_id,setId] =useState("");
    const [loading, setLoading] = useState(false);
    const [name, setificateName] = useState("");
    const [description, setDesc] = useState("");
    const [allCert, setAllCert] = useState([])
    const snackRef = useRef();
    const router = useRouter();

    const setData = (d)=>{
        setId(d?._id ?? "");
        setificateName(d?.title ?? "");
        setDesc((d?.description ?? ""));
    }

    const handlePerData = async (e) => {
        e.preventDefault();
        let myData = {_id,userId,title:name,description}
        setLoading(true);
        try {
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/award/${_id}`,myData);
          snackRef.current.handleSnack(res);
          console.log(res)
          setLoading(false);
          setData("")
          if(res.variant ==="success"){
            getData();
            setData("");
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
            setAllCert(res.data.award)
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
          let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/award/${row._id}`);
          snackRef.current.handleSnack(res);
          if(res.variant === "success"){
            setAllCert(res.data.certificate);
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
    <Fragment>
   <Card elevation={3} >
      <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
        <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>Awards & Recognition</Typography>
      </Box>
      <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
      <form onSubmit={(e) => handlePerData(e)}>
      <Grid container spacing={2}>
       
        <Grid item xs={12} md={4}>
        <TextField value={name} disabled={loading} onChange={(e) => setificateName(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Title Name" fullWidth label="Title" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField value={description} disabled={loading} onChange={(e) => setDesc(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Description" fullWidth label="Description" variant="outlined" />
        </Grid>
       
        <Grid item xs={12} md={4} className='center'>
          <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
         {_id ? "Update Awards" : "Add Awards"}
          </Fab>
        </Grid>    
      </Grid>
      </form>
      </Box> 
      {allCert.length !==0 &&  <Box sx={{marginTop:"10px"}}>
        <Divider light>My Awards & Recognition List</Divider>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sl No.</TableCell>
            <TableCell align="left">Awards</TableCell>
            <TableCell align="left">Desciption</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {allCert.map((row,i)=> <TableRow
              key={i}
              hover
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
              {i+1}
            </TableCell>
            <TableCell align="left">
              {row.title}
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
                <FcDeleteRow/>
              </IconButton>
            </ButtonGroup>
            </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </Box>}
    </Card>
  <MySnackbar ref={snackRef} />
    </Fragment>
  )
}



function Achievements({params}) {
    const {userId} = params;
    const [_id,setId] =useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDesc] = useState("");
    const [allCert, setAllCert] = useState([])
    const snackRef = useRef();
    const router = useRouter();

    const setData = (d)=>{
        setId(d?._id ?? "");
        setDesc((d?.description ?? ""));
    }

    const handlePerData = async (e) => {
        e.preventDefault();
        let myData = {_id,userId,description}
        setLoading(true);
        try {                            
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/achievement/${_id}`,myData);
          snackRef.current.handleSnack(res);
          console.log(res)
          setLoading(false);
          setData("")
          if(res.variant ==="success"){
            getData();
            setData("");
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
            setAllCert(res.data.achievement)
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
          let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/achievement/${row._id}`);
          snackRef.current.handleSnack(res);
          if(res.variant === "success"){
            setAllCert(res.data.achievement);
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
    <Fragment>
      <Card elevation={3} sx={{minWidth:{sm:"660px",xs:"100%"}}}>
      <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
        <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>Achievements</Typography>
      </Box>
      <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
      <form onSubmit={(e) => handlePerData(e)}>
      <Grid container spacing={2}>
       
        <Grid item xs={12} md={8}>
        <TextField value={description} multiline rows={4} disabled={loading} onChange={(e) => setDesc(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Description" fullWidth label="Description" variant="outlined" />
        </Grid>
       
        <Grid item xs={12} md={4} className='center'>
          <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"20px",paddingRight:"20px"}} size='small' color="primary">
         {_id ? "Update Achievements" : "Add Achievements"}
          </Fab>
        </Grid>    
      </Grid>
      </form>
      </Box> 
      {allCert?.length !==0 &&  <Box sx={{marginTop:"10px"}}>
        <Divider light>My Achievements List</Divider>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sl No.</TableCell>
            <TableCell align="left">Desciption</TableCell>
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
              {row.description}
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
      </Box>}
    </Card>
         
  <MySnackbar ref={snackRef} />
  </Fragment>
  )
}

export default Certificates