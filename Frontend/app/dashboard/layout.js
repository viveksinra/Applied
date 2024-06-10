"use client";
import React,{Fragment} from 'react'
import Header from "../Components/Header/Header"



function DashboardLayout({ children }) {
  return (
      <Header navTabVal="1">
         {children}
      </Header>
  )
}

export default DashboardLayout