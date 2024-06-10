"use client";
import React, {useState,useRef, useEffect} from 'react'
import {Grid,TextField,Typography,Fab,InputAdornment,IconButton,CircularProgress, Divider,Box,FormControlLabel,Checkbox } from '@mui/material/';
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { FcKey,FcManager,FcShop,FcOk  } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/auth/useLogin";
import {authService} from "../services/index"
import countries from './countryCode.js'
import MySnackbar from "../Components/MySnackbar/MySnackbar";
import StyledAutocomplete from "../hooks/AutoComplete";
import Link from 'next/link';


function HandleLogin() {
    const [showPassword, setShowPass] = useState(false);
    const [showAc, setShowAc]= useState(false);
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useLogin();
    const [error,setErr] = useState(false);
    const snackRef = useRef();
    const router = useRouter();

    const hitLogin = async () => {
        // e.preventDefault();
        if(email && password){
          setLoading(true);
          try {
            const res = await login(email, password);
            if (res.variant==="success" && res.token) {
              setErr(false)
              // dispatch({ type: LOGIN_USER, payload: res });
              snackRef.current.handleSnack({
                message: "Login Successful! redirecting to dashboard.",
                variant: "success",
              });
              setLoading(false);
              router.push("/dashboard");
              // window.location.reload();
            } else {
              setErr(true)
              snackRef.current.handleSnack({
                message:
                  "Invalid Login Credentials. Please enter correct credentials.",
                variant: "error",
              });
            }
          } catch (error) {
            console.log(error);
            snackRef.current.handleSnack({
              message: "Something went wrong. Please try again.",
              variant: "error",
            });
          } finally {
            setLoading(false);
          }
        }else{
          snackRef.current.handleSnack({
                  message: "Please enter your Email / Phone Number and Password.",
                  variant: "error",
                });
        }
      };
  return (
    <main>
      {showAc ? 
      <CreateNewAc setShowAc={()=>setShowAc(!showAc)}/>
      :
       <Grid container spacing={2} sx={{maxWidth:"440px"}}>
    <Grid item xs={12} sx={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
        <Typography variant="h6" align='center' color="primary">Welcome to Applied</Typography>
        <Typography variant="caption" color="textSecondary">Please login to your account to continue.</Typography><br/>
    </Grid>
    <Grid item xs={12}>
    <TextField id="email" value={email} error={error} helperText={error ? "Invalid credentials." : ""} disabled={loading} onChange={(e) => setEmail(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Email / Phone Number" fullWidth label="Email / Phone Number" variant="outlined" />
    </Grid>
    <Grid item xs={12}>
    <TextField id="pass" error={error} required disabled={loading} type={showPassword ? "text" : "password"} InputProps={{style:{borderRadius:"35px"},endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPass(!showPassword)}
                            edge="start"
                          >
                            {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                          </IconButton>
                        </InputAdornment>
                      ),}} placeholder="Password" value={password} onChange={(e) => setPass(e.target.value)} fullWidth label="Password" variant="outlined" />
    </Grid>
    <Grid item xs={12} sx={{display:"flex",justifyContent:"right"}}>
      <Typography variant="caption">Forgot Password ?</Typography>
    </Grid>
    <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
    <Fab variant="extended" disabled={loading} onClick={()=>hitLogin()} size="small" sx={{padding:"0px 40px"}} color="primary">
    {loading ? (
                      <CircularProgress color="secondary" size={24} />
                    ) : (
                      <>
                        <FcKey style={{ fontSize: 25, marginRight: 10 }} />
                        Login
                      </>
                    )}
    </Fab>
    </Grid>
    <Grid item xs={12}>
        <br/>
        <Divider>Or</Divider>
        <br/>
    </Grid>
    <Grid item xs={12} sx={{display:"flex",justifyContent:"space-around"}}>
    <Typography color="textSecondary">Don't have an Account ?</Typography> 
       <Typography color="primary" sx={{cursor:"pointer"}} onClick={()=>setShowAc(!showAc)}>Create an Account </Typography> 
    </Grid>
</Grid>}
    
<MySnackbar ref={snackRef} />
    </main>
  )
}



function CreateNewAc({setShowAc}) {
  const [busAcc,setBusAcc] = useState(false)
  const [primaryEmail,setEmail] = useState("");
  const [mobileNumber,setMobile] = useState("");
  const [code, setCode] = useState({id: 'IN', label: 'India', code: '91'});
  const [password, setPass]= useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPass] = useState(false);
  const [showConfimPassword,setShowConfirmPass] = useState(false);
  const router = useRouter();
  
  const snackRef = useRef();
    
  const handleNewAcc = async (e) => {
    e.preventDefault();
   
    if(password !== confirmPass){
      snackRef.current.handleSnack({
        message: "Password Mismatch. Please enter same password.",
        variant: "error",
      });
    }else if(agree === false){
      snackRef.current.handleSnack({
        message: "Please select Terms & Conditions and Privacy Policy to use our portal.",
        variant: "error",
      });
    }else{
      setLoading(true);
      try {
        let res = await authService.publicPost(`api/v1/auth/createAccount/createOne`,{primaryEmail,code,mobileNumber,password,profileType:busAcc?"business":"personal"});
        snackRef.current.handleSnack(res);
        setLoading(false)
        if(res.variant ==="success"){
          // Do after creating new account. Like move to Login Page.
          setEmail("");
          setMobile("");
          setPass("");
          setConfirmPass("");
          router.push("/login")
        }  
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    // try {
    //   const res = await login(primaryEmail, password);
    //   console.log(res);
    //   if (res.success && res.token) {
    //     dispatch({ type: LOGIN_USER, payload: res });
    //     snackRef.current.handleSnack({
    //       message: "Login Successful! redirecting to dashboard.",
    //       variant: "success",
    //     });
    //     setLoading(false);
    //     router.push("/dashboard");
    //   } else {
    //     snackRef.current.handleSnack({
    //       message:
    //         "Invalid Login Credentials. Please enter correct credentials.",
    //       variant: "error",
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   snackRef.current.handleSnack({
    //     message: "Something went wrong. Please try again.",
    //     variant: "error",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <form onSubmit={(e) => handleNewAcc(e)}>
      <Grid container spacing={4}> 
      <Grid item xs={12} sx={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
        <Typography variant="h6" align='center' color="primary">Create a New Account in Applied</Typography>
        <Typography variant="caption" color="textSecondary">Please fill the form to create your new account.</Typography>
      </Grid>
      <Grid item xs={12}>
      <center><Typography variant="caption" color="textSecondary"> Create a login account for </Typography></center><br/>
      <div style={{display:"flex", justifyContent:"space-around"}}>
      <Fab onClick={()=>setBusAcc(!busAcc)}  variant="extended" color={ busAcc? "inherit" : "primary"}  size="small">
      <FcManager style={{fontSize:"20px",marginRight:"10px"}} />
        Personal 
      </Fab>
      <Fab variant="extended" onClick={()=>setBusAcc(!busAcc)} color={ busAcc?"primary" : "inherit"} size="small" >
      <FcShop style={{fontSize:"20px",marginRight:"10px"}} />
        Business 
      </Fab>
      </div>
      </Grid>
      <Grid item xs={12}>
      <TextField id="email" required value={primaryEmail} type='email' disabled={loading} onChange={(e) => setEmail(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Email" fullWidth label="Email Address" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
          <StyledAutocomplete
            id="country-select-demo"
            options={countries}
            disabled ={countries.length === 0 || loading}
            getOptionLabel={(option) => `${option.id} | +${option.code}`}
            isOptionEqualToValue={(option, value) => option.id === code.id}
            renderOption={(props, option) => (
              <Box component="li" key={option.id} sx={{ fontSize:"12px" }} {...props}>         
              {option?.id} | {option?.label} | +{option?.code}
              </Box>
            )}
            onChange={(e, v) => {
              setCode(v);
            }}
            value={code}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Code"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
          </Grid>
          <Grid item xs={8}>
          <TextField id="phone" value={mobileNumber} disabled={loading} onChange={(e) => setMobile(e.target.value)} type='number' required InputProps={{style:{borderRadius:"35px"}}} placeholder="Phone / Mobile Number" fullWidth label="Phone / Mobile Number" variant="outlined" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
      <TextField id="pass" required disabled={loading} type={showPassword ? "text" : "password"} InputProps={{style:{borderRadius:"35px"},endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPass(!showPassword)}
                edge="start"
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </IconButton>
            </InputAdornment>
          ),}} placeholder="Password" value={password} onChange={(e) => setPass(e.target.value)} fullWidth label="Password" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
      <TextField id="confirmPass" required disabled={loading} type={showConfimPassword ? "text" : "password"} InputProps={{style:{borderRadius:"35px"}, endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPass(!showConfimPassword)}
                edge="start"
              >
                {showConfimPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </IconButton>
            </InputAdornment>
          ),}} placeholder="Password" value={confirmPass}  onChange={(e) => setConfirmPass(e.target.value)} fullWidth label="Confirm Password" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
      <FormControlLabel control={<Checkbox checked={agree} disabled={loading} onChange={() => setAgree(!agree)} />} label={<div><Typography variant='caption' color="textSecondary">I agree to </Typography> <Link href="/terms" style={{fontSize:"14px"}}>Terms & Conditions</Link> <Typography variant='caption' color="textSecondary">and</Typography>  <Link style={{fontSize:"14px"}} href="/privacy">Privacy Policy</Link> </div>} />
      </Grid>
      <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
    <Fab variant="extended" disabled={loading || !agree} type='submit' size="small" sx={{padding:"0px 40px"}} color="primary">
    {loading ? (
          <CircularProgress color="secondary" size={24} />
        ) : (
          <>
            <FcOk style={{ fontSize: 25, marginRight: 10}} />
            Create New Account
          </>
        )}
    </Fab>
    </Grid>
    <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
    <Typography color="textSecondary">Already have an account ?</Typography> 
       <Typography color="primary" sx={{cursor:"pointer",marginLeft:"20px"}} onClick={()=>setShowAc(false)}>Log In </Typography> 
    </Grid>
      
    <MySnackbar ref={snackRef} />
      </Grid> 

    </form>
    
  )
}

export default HandleLogin