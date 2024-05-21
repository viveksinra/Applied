"use client";
import React,{Fragment} from 'react'
import Header from "../Components/Header/Header"

function MyNetworkLayout({ children }) {
  return (
    <Fragment>
        <Header navTabVal="2">
         {children}
    </Header>
    </Fragment>
  )
}

export default MyNetworkLayout