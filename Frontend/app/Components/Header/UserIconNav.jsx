"use client";
import React,{Fragment, useState} from 'react';
import {styled, Avatar,Badge,Stack,Menu,MenuItem,ListItemIcon,ListItemText } from '@mui/material/';
import { FaCaretDown,FaUser  } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { IoMdLogOut } from "react-icons/io";
import { useLogout } from "../../hooks/auth/useLogout";
import { useRouter } from "next/navigation";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


export default function UserIconNav({user}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useLogout();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  return (
    <Fragment>
    <Stack direction="row" spacing={1} onClick={handleClick} sx={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        >
        <Avatar alt="User" src={user?.userImage} />
      </StyledBadge>
      <FaCaretDown/>
      </Stack>
      <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={()=>{handleClose();router.push(`/dashboard/profile/${user?.userName}`)}}>
        <ListItemIcon>
            <FaUser/>
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
           <ListItemIcon>
            <FcSettings/>
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
      </MenuItem>
      <MenuItem onClick={()=>{logout();handleClose(); router.push("/login");}}>
        <ListItemIcon>
        <IoMdLogOut/>
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
    </Fragment>
   
  );
}