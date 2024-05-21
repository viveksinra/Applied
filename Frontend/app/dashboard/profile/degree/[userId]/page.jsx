"use client";
import React, { useState,useRef,useEffect, Fragment } from 'react'
import {Grid, Container, Typography,Card,Box,Badge,TextField,Fab, Stepper,Step,StepLabel, Divider,Table,TableHead,TableRow,TableCell,TableBody,ButtonGroup, IconButton } from '@mui/material/';
import { useRouter } from "next/navigation";
import { FcDeleteRow } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import {authService} from "../../../../services"
import MySnackbar from "../../../../Components/MySnackbar/MySnackbar";
import {MyStepper} from "../../experience/[userId]/page"

function Degree({params}) {
    const {userId} = params;
    const [_id,setId] =useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [allCert, setAllCert] = useState([])
    const snackRef = useRef();
    const router = useRouter();

    const setData = (d)=>{
        setId(d?._id ?? "");
        setName(d?.name ?? "");
        setDescription((d?.description ?? ""));
    }

    const handlePerData = async (e) => {
        e.preventDefault();
        let myData = {_id,userId,name,description}
        setLoading(true);
        try {
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/patent/${_id}`,myData);
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
            setAllCert(res.data.patent)
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
          let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/patent/${row._id}`);
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

  return (
    <main>
        <Container className='vCenter'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
              <Typography variant="h6" gutterBottom align="center" >Setup Your Personal Profile</Typography>
              <MyStepper value={2}/>
              <br/>
              </Box>
              <Grid item xs={12}>
              <Card elevation={3} >
                <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
                  <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>Patent</Typography>
                </Box>
                <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
                <form onSubmit={(e) => handlePerData(e)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                  <TextField value={name} disabled={loading} onChange={(e) => setName(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Patent Name" fullWidth label="Patent Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                  <TextField value={description} disabled={loading} onChange={(e) => setDescription(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Description" fullWidth label="Description" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={4} className='center'>
                    <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
                  {_id ? "Update Patent" : "Add Patent"}
                    </Fab>
                  </Grid>    
                </Grid>
                </form>
                </Box>
                {allCert?.length !== 0 && <Box sx={{marginTop:"10px"}}>
                  <Divider light>My Patent List</Divider>
                  <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Sl No.</TableCell>
                      <TableCell align="left">Patent Name</TableCell>
                      <TableCell align="left">Description</TableCell>
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
                        {row.patent}
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
            <OtherInterest params={params}/> <br/>
            </Grid>
            <Grid item xs={12}>
            <SrSecondary params={params}/>
            <br />
            </Grid>
            <Grid item xs={12}>
            <Grid sx={{display:"flex",justifyContent:"space-evenly"}}>
              <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="inherit" onClick={()=>router.push("/dashboard")}>
                Skip
              </Fab>
              <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} onClick={()=>router.push(`/dashboard/profile/patent/${userId}`)} size='small' color="primary">
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


function OtherInterest({params}) {
    const {userId} = params;
    const [_id,setId] =useState("");
    const [loading, setLoading] = useState(false);
    const [degree, setDegree] = useState("");
    const [university, setUniversity] = useState("");
    const [year, setYear] = useState("");
    const [score, setScore] = useState("");
    
    const [allCert, setAllCert] = useState([])
    const snackRef = useRef();
    const router = useRouter();

    const setData = (d)=>{
        setId(d?._id ?? "");
        setDegree(d?.degree ?? "");
        setUniversity((d?.university ?? ""));
        setYear(d?.year ?? "");
        setScore(d?.score ?? "")
    }

    const handlePerData = async (e) => {
        e.preventDefault();
        let myData = {_id,userId,degree,university,year,score}
        setLoading(true);
        try {
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/graduation/${_id}`,myData);
          snackRef.current.handleSnack(res);
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
            setAllCert(res.data.graduation)
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
          let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/graduation/${row._id}`);
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
        <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>Graduation</Typography>
      </Box>
      <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
      <form onSubmit={(e) => handlePerData(e)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
        <TextField value={degree} disabled={loading} onChange={(e) => setDegree(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Degree Name" fullWidth label="Degree Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField value={university} disabled={loading} onChange={(e) => setUniversity(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="University" fullWidth label="University" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField value={year} type="number" disabled={loading} onChange={(e) => setYear(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Year" fullWidth label="Year" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField value={score} type="number" disabled={loading} onChange={(e) => setScore(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Final Score" fullWidth label="Score" variant="outlined" />
        </Grid>
       
        <Grid item xs={12} md={4} className='center'>
          <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
         {_id ? "Update Graduation" : "Add Graduation"}
          </Fab>
        </Grid>    
      </Grid>
      </form>
      </Box> 
      {allCert.length !==0 &&  <Box sx={{marginTop:"10px"}}>
        <Divider light>My Graduation List</Divider>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sl No.</TableCell>
            <TableCell align="left">Degree</TableCell>
            <TableCell align="left">University</TableCell>
            <TableCell align="left">Year</TableCell>
            <TableCell align="left">Score</TableCell>
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
              {row.degree}
            </TableCell>
            <TableCell align="left">
              {row.university}
            </TableCell>
            <TableCell align="left">
              {row.year}
            </TableCell>
            <TableCell align="left">
              {row.score}
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



function SrSecondary({params}) {
    const {userId} = params;
    const [_id,setId] =useState("");
    const [loading, setLoading] = useState(false);
    const [stream, setStream] = useState("");
    const [board, setBoard] = useState("");
    const [year, setYear] = useState("");
    const [score, setScore] = useState("");
    const [allCert, setAllCert] = useState([])
    const snackRef = useRef();
    const router = useRouter();

    const setData = (d)=>{
        setId(d?._id ?? "");
        setStream(d?.stream ?? "");
        setBoard(d?.board ?? "");
        setYear(d?.year ?? "");
        setScore(d?.score ?? "");
    }

    const handlePerData = async (e) => {
        e.preventDefault();
        let myData = {_id,userId,stream,board,year,score}
        setLoading(true);
        try {                        
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/srSecondary/${_id}`,myData);
          snackRef.current.handleSnack(res);
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
            setAllCert(res.data.srSecondary)
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
          let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/srSecondary/${row._id}`);
          snackRef.current.handleSnack(res);
          if(res.variant === "success"){
            setAllCert(res.data.srSecondary);
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
        <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>Sr Secondary</Typography>
      </Box>
      <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
      <form onSubmit={(e) => handlePerData(e)}>
      <Grid container spacing={2}>
       
        <Grid item xs={12} md={4}>
        <TextField value={stream} required disabled={loading} onChange={(e) => setStream(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Stream" fullWidth label="Stream" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField value={board} required disabled={loading} onChange={(e) => setBoard(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Board" fullWidth label="Board" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField value={year} type="number" disabled={loading} onChange={(e) => setYear(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Year" fullWidth label="Year" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField value={score} type="number" disabled={loading} onChange={(e) => setScore(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Score" fullWidth label="Score" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={4} className='center'>
          <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"20px",paddingRight:"20px"}} size='small' color="primary">
         {_id ? "Update Sr Secondary" : "Add Sr Secondary"}
          </Fab>
        </Grid>    
      </Grid>
      </form>
      </Box> 
      {allCert?.length !==0 &&  <Box sx={{marginTop:"10px"}}>
        <Divider light>My Sr Secondary List</Divider>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sl No.</TableCell>
            <TableCell align="left">Stream</TableCell>
            <TableCell align="left">Board</TableCell>
            <TableCell align="left">Year</TableCell>
            <TableCell align="left">Score</TableCell>
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
              {row.stream}
            </TableCell>
            <TableCell align="left">
              {row.board}
            </TableCell>
            <TableCell align="left">
              {row.year}
            </TableCell>
            <TableCell align="left">
              {row.score}
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

export default Degree