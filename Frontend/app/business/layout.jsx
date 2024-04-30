"use client";
import React,{Fragment} from 'react'
import Header from "../Components/Header/Header"

function BusinessLayout({ children }) {
  return (
    <Fragment>
        <Header>
         {children}
    </Header>
    </Fragment>
  )
}

export default BusinessLayout