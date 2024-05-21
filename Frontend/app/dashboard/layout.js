"use client";
import React,{Fragment} from 'react'
import Header from "../Components/Header/Header"

function DashboardLayout({ children }) {
  return (
    <Fragment>
        <Header navTabVal="1">
         {children}
    </Header>
    </Fragment>
  )
}

export default DashboardLayout