"use client";
import React from 'react'
import {Box,Tab,} from '@mui/material/';
import {TabContext,TabList } from '@mui/lab/';
import { AiFillHome } from "react-icons/ai";
import { BiSolidNetworkChart } from "react-icons/bi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsChatText } from "react-icons/bs";
function TopNavTabs({navTabVal,handleNav}) {
  return (
    <Box sx={{ typography: 'body1',display: { xs: 'none', sm: 'block'} }}>
    <TabContext value={navTabVal} >
      {/* <Box sx={{ borderColor: 'divider' }}> */}
        <TabList onChange={(e,v)=>handleNav(v)} textColor="white" indicatorColor="secondary" aria-label="lab API tabs example">
          <Tab label="Home" icon={<AiFillHome />} iconPosition="start" value="1" />
          <Tab label="My Network" icon={<BiSolidNetworkChart/>} iconPosition="start" value="2" />
          <Tab label="Community" icon={<HiMiniUserGroup/>} iconPosition="start" value="3" />
          <Tab label="Chat" icon={<BsChatText/>} iconPosition="start" value="4" />
        </TabList>
      {/* </Box> */}
    </TabContext>
  </Box>
  )
}

export default TopNavTabs