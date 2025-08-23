import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNavbar from '../AppNavbar/AppNavbar'
import AppFooter from '../AppFooter/AppFooter'


export default function Layout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
      <AppFooter />
    </>
  )
}
