"use client";
import React, {useState,Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {AppBar,Box,CssBaseline,Divider,Container,Drawer,IconButton,List,ListItem,ListItemButton,ListItemText,Toolbar,Typography,Button, Icon} from '@mui/material/';
import BackToTop from "./BackToTop";
import { FiMenu } from "react-icons/fi";
import Link from 'next/link';
import TopNavTabs from "./TopNavTabs";
import SearchNav from './SearchNav';
import UserIconNav from "./UserIconNav";
import Notification from './Notification';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import MyTheme from "../../dashboard/layout"
import { createTheme, ThemeProvider } from '@mui/material/styles';


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function Header(props) {
  const { window, children,navTabVal } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [navTabVal, setNavTabVal] = useState('1')
  const [user, setUser] = useState({});

  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  
  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleNav =(e)=>{
    if(e==="1"){
      router.push(`/dashboard`)
    }else if(e==="2"){
      router.push(`/network`)
    }else if(e==="3"){
      console.log("Community")
    }else if(e==="4"){
      console.log("Chat")
    }
  }
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
      <MyTheme>
      <Box sx={{ display: 'flex',flexDirection:"column" }}>
      <CssBaseline />
      <AppBar component="nav" color="primary"> 
        <Container maxWidth="xl">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <FiMenu  />
          </IconButton>
          <Link href="/">
          <img style={{height:"35px"}} src="https://res.cloudinary.com/qualifier/image/upload/v1714030411/applied-logo-white-horiz_s6zkfp.svg" alt="AppliedLogo" id="loginLogo" />
          </Link>
          <div style={{flexGrow:1}}/>
          <TopNavTabs navTabVal={navTabVal} handleNav={e=>handleNav(e)}/>
          <div style={{flexGrow:1}}/>
          <Box sx={{display: { xs: 'none', sm: 'block'}}}>
          <SearchNav/>
          </Box>
            <Notification user={user}/>
        <UserIconNav user={user}/>
        </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3,}}>
        <Toolbar />
       {children}
    
      </Box>
    </Box>
    <BackToTop {...props}/>
      </MyTheme>
    
    </Fragment>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;


const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#205179',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#be59ff',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


export const MyTheme = ({children})=>{
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}