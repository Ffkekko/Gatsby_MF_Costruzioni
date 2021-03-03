/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react" /* in a previous project, when setting up the layout we set up a functionality to show and hide sidebar in here. but when the functionality gets bigger it is better to do it in a seperate file by using useContext (see context.js in context folder) */
import Navbar from "./Navbar"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { GatsbyContext } from '../context/context'

const Layout = ({ children }) => {
  //const data = useContext(GatsbyContext); /* we are passing in data whatever we put in GatsbyContext from context.js */
  
  /* now we are not gonnna sget anymore the hello context but we are gonna get the links plus isSidebarOpen. so instead of data(which containes both links and isSidebarOpen because that's how we pass it from context) we destructure directly the individual object: isSidebarOpen here, and links in Sidebar*/
  const { isSidebarOpen }= useContext(GatsbyContext);
  
  return (
    <>
      <Navbar />
      { isSidebarOpen && <Sidebar /> }
      {children}
      <Footer />
    </>
  )
}

export default Layout
