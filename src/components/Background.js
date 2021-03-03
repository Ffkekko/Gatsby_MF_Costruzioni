import React from "react"
import BackgroundImage from "gatsby-background-image"
import styled, { keyframes } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"


const query = graphql`
  {
    file(relativePath: {eq: "mainBcg.png"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`


const Background = ({ children, image }) => { /* now we are passing the prop image coming from Hero and instead of using the image hardcoded above with graphql we use.... */
  const { file:{ childImageSharp:{ fluid } } } = useStaticQuery(query)
  /* console.log(fluid) */
 
  return <Wrapper> {/* this is the styled component below wrapping everything */}
    <BackgroundImage
      Tag='div' /* this is the html element i want to return */
      fluid={ image || fluid }  /* .....this. saying if the image is not there then show the hardcoded one */
      className='bcg'
      preserveStackingContext={ true } /* Starting with v0.7.5 an extra option is available preserving the CSS stacking context by deactivating the “opacity hack (opacity: 0.99;)” used on <BackgroundImage /> to allow its usage within stacking context changing element styled with e.g. grid or flex per default. Activating preserveStackingContext prevents this behavior - but allows you to use any stacking context changing elements (like elements styled with position: fixed;) yourself as children. This way we can use our background style. So with this we control the stacking content like what we want to show on top of the background*/
    > 
      { children }
    </BackgroundImage>{/* this is the component from the plugin */}
  </Wrapper>
}

const fadeIn = keyframes`
      from{
         background-color:rgb(0,0,0,0.8);
      }
      to{
        background-color:rgba(0,0,0,0.4);
      }
      `

const Wrapper = styled.section`
  .bcg {
    /* MUST!!!!!! */
    min-height: 100vh; /* when you use this backgorung component make sure you always have a height  */
    margin-top: -5rem;
    display: grid;
    place-items: center;
    animation: ${fadeIn} 2s ease-in-out 1 forwards;
  }
  .bcg::before {
    opacity: 1;
  }
`
export default Background
