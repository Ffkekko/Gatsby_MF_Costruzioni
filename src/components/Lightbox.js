import React, { useContext } from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { GatsbyContext } from '../context/context'



const Lightbox = ({ fluid }) => {

const { hideLightbox }= useContext(GatsbyContext);

  return <Wrapper>

  <div> {/* we are gonna have 3 projects here because that's what we filtered in index.js with graphql */}
        
   
   <div className='lightboxModal' onClick={ hideLightbox }>

      <Image fluid={ fluid } className='Visible' /> 

   </div>
       
      
      </div>


  </Wrapper>
}

const Wrapper = styled.section`

.lightboxModal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

    .Visible {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      height: 60%; // or whatever
      width: 50%;

  }
`
export default Lightbox
