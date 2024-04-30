"use client";
import React from 'react'
import "./loginStyle.css"
import HandleLogin from "./HandleLogin";
import {Grid, Typography,styled} from '@mui/material/';

function Login() {
    const LoginBg = styled('div')(() => ({
        background:`url(https://res.cloudinary.com/ddcu7vrat/image/upload/v1713325690/LoginImg_owm0kq.svg) no-repeat`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "80%",
        height:"630px"
        // [theme.breakpoints.down('md')]: {
        //   height: "200px",
        // },
        // [theme.breakpoints.up('md')]: {
        //   height: "230px",
        // },
      }));

  return (
    <main id="loginDesRight">
        <div id="loginDesLeft">
            <div id="loginCard">
                <Grid container>
                    <Grid item xs={12} md={7} sx={{display:{xs:"none",md:"block"}}}>
                        <Grid container>
                            <Grid item xs={12} sx={{maxHeight:"600px"}}>
                            <LoginBg>
                            <img src="https://res.cloudinary.com/ddcu7vrat/image/upload/v1713327315/Applied_pm3yid.png" alt="AppliedLogo" id="loginLogo" />
                            </LoginBg>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2} sx={{display:"flex",justifyContent:"center",alignItems:"center", maxHeight:"600px",flexDirection:"column"}}>
                                    <Grid item xs={12} >
                                    <Typography >Available for Android and iOS</Typography>
                                    <Typography variant='caption' color="textSecondary">Download Applied App Now</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <img src="https://res.cloudinary.com/ddcu7vrat/image/upload/v1713373635/playStore_kgpmby.png" style={{maxHeight:"50px",marginRight:"20px"}} alt="GooglePlayStore" />
                                    <img src="https://res.cloudinary.com/ddcu7vrat/image/upload/v1713373635/applyStore_jf6gqe.png" style={{maxHeight:"50px"}} alt="ApplePlayStore" />
                                </Grid>
                                    </Grid>
                                </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <HandleLogin/>
                    </Grid>
                </Grid>
            
            </div>
        </div>       
    </main>
  )
}

export default Login