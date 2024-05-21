"use client";
import React, { useState,useRef, useEffect } from 'react'
import MySnackbar from "../../../../Components/MySnackbar/MySnackbar";
import {Grid, Container, Typography,Card,Box,Rating,TextField,Fab, Stepper,Step,StepLabel, Divider,Table,TableHead,TableRow,TableCell,TableBody,ButtonGroup, IconButton,Autocomplete } from '@mui/material/';
import {authService} from "../../../../services"
import { useRouter } from "next/navigation";
import { FcDeleteRow } from "react-icons/fc";
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

function Patent({params}) {
  const {userId} = params;
  const [_id,setId] =useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description,setDesc] = useState("");
  const [allExp, setAllExp] = useState([])
  const snackRef = useRef();
  const router = useRouter();

  const setData = (d)=>{
    setId(d?._id ?? "");
    setName(d?.name ?? "");
    setDesc(d?.description ?? "");
  }
  const handlePerData = async (e) => {
    e.preventDefault();
    let myData = {_id,userId,name,description}
    setLoading(true);
    try {
      let res = await authService.post(`api/v1/auth/profile/add/additionalData/patent/${_id}`,myData);
      snackRef.current.handleSnack(res);
      setLoading(false);
      setData("")
      if(res.variant ==="success"){
        getData();
        // router.push(`/dashboard/profile/certificates/${userId}`)
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
        setAllExp(res.data.patent)
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
      let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/patent/${row._id}`);
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
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom align="center" >Setup Your Personal Profile</Typography>
            <MyStepper value={3}/>
            <br/>
            </Box>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={3} >
                <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
                    <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>Patent</Typography>
                </Box>
                <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
                <form onSubmit={(e) => handlePerData(e)}>
                <Grid container spacing={2}>
                
                    <Grid item xs={12} md={4}>
                    <TextField value={name} disabled={loading} onChange={(e) => setName(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Name" fullWidth label="Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <TextField value={description}  onChange={(e) => setDesc(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Description" fullWidth label="Description" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={4} className='center'>
                    <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
                    {_id ? "Update Patent" : "Add Patent"}
                    </Fab>
                    </Grid>
            
                </Grid>
                </form>
                </Box>
                {allExp?.length !==0 &&  <Box sx={{marginTop:"10px"}}>
                    <Divider light>My Patent List</Divider>
                    <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Sl No.</TableCell>
                        <TableCell align="left">Patent</TableCell>
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
            <Grid item xs={12}>
            <OtherInterest params={params}/>
            </Grid>
            <Grid item xs={12}>
            <Languages params={params} />
            </Grid>
            <Grid item xs={12}>
                    <br />
                    </Grid>
                    <Grid item xs={12} sx={{display:"flex",justifyContent:"space-evenly"}}>
                    <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="inherit" onClick={()=>router.push("/dashboard")}>
                    Skip
                    </Fab>
                    <Fab variant="extended" sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} onClick={()=>router.push(`/dashboard/profile/reference/${userId}`)} size='small' color="primary">
                    Next
                    </Fab>
                    </Grid>
        </Grid>
    </Container>
        
  <MySnackbar ref={snackRef} />
  </main>
  )
}

function OtherInterest({params}){
    const [_id, setId] = useState("");
    const {userId} = params;
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [allInst, setAllInst] = useState([]);
    const snackRef = useRef();

    const setData = (d)=>{
        setId(d?._id ?? "");
        setTitle(d?.title ?? "");
      }

    const getData = async()=>{
    try {
        setLoading(true)
        let res = await authService.get(`api/v1/auth/profile/get/oneProfile`);
        // snackRef.current.handleSnack(res);
        if(res.variant === "success"){
        setLoading(false)
        setAllInst(res.data.interest)
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

    const handlePerData = async (e) => {
        e.preventDefault();
        let myData = {_id,userId,title}
        setLoading(true);
        try {
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/interest/${_id}`,myData);
          snackRef.current.handleSnack(res);
          setLoading(false);
          setData("")
          if(res.variant ==="success"){
            getData();
            // router.push(`/dashboard/profile/certificates/${userId}`)
          }  
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      };
      const handleDelete = async(row)=>{
        try {
          setLoading(true)
          let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/interest/${row._id}`);
        //   snackRef.current.handleSnack(res);
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

    return   <Card elevation={3}>
         <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
        <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>Other Interests</Typography>
        </Box>
        <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
        <form onSubmit={(e) => handlePerData(e)}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
            <TextField value={title} disabled={loading} onChange={(e) => setTitle(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Title" fullWidth label="Title" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4} className='center'>
            <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
            {_id ? "Update Interest" : "Add Interest"}
            </Fab>
            </Grid>
        </Grid>
        </form>
        </Box>
        {allInst?.length !==0 &&  <Box sx={{marginTop:"10px"}}>
                    <Divider light>My Interest List</Divider>
                    <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Sl No.</TableCell>
                        <TableCell align="left">Interest</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {allInst?.map((row,i)=> <TableRow
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
        <MySnackbar ref={snackRef} />
    </Card>

}



function Languages({params}){
    const [_id, setId] = useState("");
    const {userId} = params;
    const [loading, setLoading] = useState(false);
    const [allInst, setAllInst] = useState([]);
    const [language,setLang] = useState([]);
    const snackRef = useRef();
    const [allLang,setAllLang]= useState([{_id:"dadsf515",label:"English",value:"english",rating:0},{_id:"4654asdfasdf",label:"Hindi",value:"hindi",rating:0},{_id:"asdfe545",label:"Bangala",value:"bangala",rating:0},{_id:"15sdaf54",label:"Urdu",value:"Urdu",rating:0}]);

    const setData = (d)=>{
        setId(d?._id ?? "");
        setAllInst(d?.allInst ?? []);
      }

    const getData = async()=>{
    try {
        setLoading(true)
        let res = await authService.get(`api/v1/auth/profile/get/oneProfile`);
        // snackRef.current.handleSnack(res);
        if(res.variant === "success"){
        setLoading(false)
        setAllInst(res.data.interest)
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

    const handlePerData = async (i) => {
        let myData = {_id,userId, ...language[i]}
        setLoading(true);
        try {
          let res = await authService.post(`api/v1/auth/profile/add/additionalData/language/${_id}`,myData);
          snackRef.current.handleSnack(res);
          setLoading(false);
          setData("")
          if(res.variant ==="success"){
            getData();
            // router.push(`/dashboard/profile/certificates/${userId}`)
          }  
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      };
      const handleDelete = async(row)=>{
        try {
          setLoading(true)
          let res = await authService.delete(`api/v1/auth/profile/delete/additionalData/language/${row._id}`);
        //   snackRef.current.handleSnack(res);
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

    const handleRating=(e,i)=>{
      let newArr = [...language]; // copying the old datas array
      if(e){
        newArr[i].rating = e;
        }
        setLang(newArr);
        
    if(e){
        handlePerData(i)
    }
  }
    return   <Card elevation={3}>
         <Box sx={{height:"50px",background:"#eff8fe",display:"flex",alignItems:"center"}}>
        <Typography variant="subtitle1" color="#205179" sx={{marginLeft:"20px"}}>Languages</Typography>
        </Box>
        <Box sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Autocomplete
                multiple
                options={allLang}
                disabled={allLang.length === 0 || loading}
                // isOptionEqualToValue={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(e, v) => {
                setLang(v);
                }}
                value={language}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Add Languages"
                    placeholder="Add Languages"
                    
                />
                )}
            />
            </Grid>
        </Grid>
        </Box>
                <br/>
                <Box sx={{padding:"0px 20px 20px"}}>
                <Grid container spacing={2} sx={{display:"flex"}}>
                    {language.map((l,i)=><Grid item xs={12} sm={4} key={i} sx={{display:"block"}}>
                    <Box sx={{height:"60px",width:"360px", background:"#eff8fe",paddingLeft:"10px",paddingRight:"10px",paddingTop:"6px", display:"flex",flexDirection:"column", borderRadius:"16px"}}> 
                                <Typography>{l?.label}</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={l.rating}
                                    max={10}
                                    onChange={(event, newValue) => {
                                        handleRating(newValue,i);
                                    }}
                                    />
                            </Box>
                         </Grid>)}
                </Grid>

                </Box>
            
        <MySnackbar ref={snackRef} />
    </Card>

}



export default Patent