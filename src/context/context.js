import React, { useState } from "react"
import sublinks from "../constants/links" /* remember,these a resublinks coming from the constants  that i want to access from anywhere in my project. so to recap, whatever folder i create in pages that gives me a SUBPAGE. And of course to acces this page i will have a Link somewhere wich points to "mama page* which is products folder for example and then whatever nested page whitin it. then to make all this dynamic, we put all the links in one file so that in the future we don't have to change the url in each Link we had created */

const GatsbyContext = React.createContext();

//Provider, Consumer (this is what's within createContext. Context provides a way to pass data through the component tree without having to pass props down manually at every level. In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.)


const GatsbyProvider = ({ children }) => { //this is a component that will have to be imported globally in root-wrapper. NOTE, THIS DOESN-T HAVE ALWAYS TO BE IMPORTED GLOBALLY I CAN ALSO DECIDE TO PASS SOMETHING THROUGH CONTEXT ONLY TO CERTAIN PAGES FOR EXAMPLEI DO WHAT I DID IN ROOT WRAPPER WITH GATSBYpROVIDER, IN LAYOUT.JS
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [links, setLinks] = useState(sublinks)

    const showSidebar = ()  => { 
        setIsSidebarOpen(true)
     }

     const hideSidebar = ()  => { 
        setIsSidebarOpen(false)
     }
    
    return <GatsbyContext.Provider 
                /* value='hello' */
                value= {{isSidebarOpen, links, showSidebar, hideSidebar}}
            > {/* this is a second component */}
                    { children }
            </GatsbyContext.Provider>
 }

 export { GatsbyContext, GatsbyProvider }