"use client";
import React, {useState,Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {AppBar,Badge,Box,CssBaseline,Divider,Container,Drawer,IconButton,List,ListItem,ListItemButton,ListItemText,Toolbar,Typography,Button, Icon} from '@mui/material/';
import BackToTop from "./BackToTop";
import { FiMenu } from "react-icons/fi";
import Link from 'next/link';
import TopNavTabs from "./TopNavTabs";
import SearchNav from './SearchNav';
import UserIconNav from "./UserIconNav";
import Notification from './Notification';
import Cookies from "js-cookie";

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function Header(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navTabVal, setNavTabVal] = useState('1')
  const [user, setUser] = useState({});


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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
    <Box sx={{ display: 'flex',flexDirection:"column" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor:"#205179"}}>
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
          <TopNavTabs navTabVal={navTabVal} setNavTabVal={e=>setNavTabVal(e)}/>
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