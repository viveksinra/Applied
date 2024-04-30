"use client";
import styles from "./page.module.css";
import Link from "next/link";
import {Typography } from '@mui/material/';

export default function Home() {
  return (
      <main>

      <Typography color="primary">I am Home page</Typography>
        <Typography color="secondary">I am Make me</Typography>
      <Link href="/login">Login Page</Link>
      </main>
  
   
    
  );
}
