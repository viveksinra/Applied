"use client";
import React from 'react'
import Header from "../Components/Header/Header"

function MyNetworkLayout({ children }) {
  return (
       <Header navTabVal="2">
         {children}
       </Header>
  )
}

export default MyNetworkLayout