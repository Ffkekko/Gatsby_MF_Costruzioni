import React, { useContext, useState} from "react"
import { Link } from "gatsby"
import Title from "./Title"
import styled from "styled-components"
import Image from "gatsby-image"
import SearchButtons from "./SearchButtons"
/* import { GatsbyContext } from '../context/context' */


const Projects = ({ projects: data, title, page }) => {

  const [projects, setProjects] = React.useState(data);
     const [index, setIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false)
     /* const [img, setImg] = React.useState(false); */

  /* const {  isModalOpen, showLightbox,  hideLightbox }= useContext(GatsbyContext); */
  
  /* const toggle= () => { 
    setImg(!img)
   } */


  const setBackToAll = () => 
  { 
    setProjects(data)
   } /* yes, we are already passing it in useState above, but remember that this value will change when filtering that's why we need a setProjects function */


const showLightbox = (e, index)  => { 
        e.preventDefault()
        setIsModalOpen(true);
        setIndex(index)
        /*  { projects.map((item, projectIndex) => {
              console.log(item.id)
               const fluid =  item.data.image.localFiles[0].childImageSharp.fluid
          
            if (projectIndex === index) { 
            position = 'show'
         } else  { 
            position = 'hide'
         }
            })
         } */
     }
   
   
 const hideLightbox = ()  => { 
        setIsModalOpen(false)
     }

  return <Wrapper className='section'>

    <Title title={ title || 'projects'} />

    { page && ( 
      <SearchButtons 
        projects={ data }   /* this is an array */
        setProjects={ setProjects } /* this and the below are function */
        setBackToAll={ setBackToAll }
      /> 
    )}


  <div className='section-center'> {/* we are gonna have 3 projects here because that's what we filtered in index.js with graphql */}
    { projects.map((item, projectIndex) => {
    
      /* console.log(item) */
      const { id } =item; /* we get id from item which is basically each node */
      const { name, type } = item.data; /* we get the name and type from the data within each node */
      const fluid =  item.data.image.localFiles[0].childImageSharp.fluid
      
      /* const idProp = ()  => { 
        console.log(item.id)
     } */

      return (
      <article key={ id } /* onClick={ idProp } */>
        <div className='container' onClick={ e => showLightbox(e,projectIndex) }  /* onClick={ toggle } */>
          <Image fluid={ fluid } className='img' />
          <div className='info'>
            <p>
              - { type } -
            </p>
            <h3>
              { name }
            </h3>
          </div>

            

        </div>
      
      </article>

      
      
      )
     }
    ) }
  </div>

<>
{ isModalOpen  &&
<div>
  { projects.map((item, lightboxIndex) => {

      const fluid =  item.data.image.localFiles[0].childImageSharp.fluid
      
      let position = 'hide';
     if (lightboxIndex === index) { 
            position = 'show'
         } else  { 
            position = 'hide'
         }
      /* const idProp = ()  => { 
        console.log(item.id)
     } */

      return (

      <Wrapper1>

        <div className={ position } onClick={ hideLightbox } /* key={ projectIndex } */> 

          <div className='lightboxModal'>

            <Image fluid={ fluid } className='Visible' /> 

          </div>

        </div>


      </Wrapper1>
       
      )
     
      }
  )}
  </div>
   }
       
       </>

  { !page && (
  <Link to='/projects' className='btn'>
    all projects
  </Link>
  ) } {/* we are displaying the button only where the prop 'page' its not passed and we add it only in the all projects page and not in the index.js so that in the home page we do see the button*/}

  </Wrapper>
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .section-center {
    margin-top: 4rem;
    max-width: var(--max-width);
    display: grid;
    gap: 2rem;
    /* safari workaround */
    grid-gap: 2rem;
    .img {
      height: 20rem;
      border-radius: var(--radius);
      transition: var(--transition);
    }
  
    article {
      box-shadow: var(--light-shadow);
      border-radius: var(--radius);
      transition: var(--transition);
    }
    article:hover {
      box-shadow: var(--dark-shadow);
      cursor: pointer;
    }
    .container {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius);
      background: var(--clr-primary-7);
      &:hover .img {
        opacity: 0.2;
      }
      .info {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* don't forget this */
        width: 100%;
        opacity: 0;
        transition: var(--transition);
        color: var(--clr-white);
        text-align: center;
        p {
          margin-bottom: 0.5rem;
          color: var(--clr-white);
          text-transform: uppercase;
        }
      }
      &:hover .info {
        opacity: 1;
      }
    }
    @media (min-width: 768px) {
      .img {
        height: 15rem;
      }
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      .img {
        height: 12.5rem;
      }
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 1200px) {
      .img {
        height: 15rem;
      }
    }
  }
  a {
    display: block;
    width: 9rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 3rem;
  }
`

const Wrapper1 = styled.section`

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
    .lightboxModal {
      background-color:rgba(0, 0, 0, 0.5);
       backdrop-filter:blur(0.2rem) grayscale(60%)
    }

  .show {
      display:block;
  }

   .hide {
      display:none;
  }
`

export default Projects


/* export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "Projects"}}) {
      nodes {
        id
        data {
          image {
            localFiles {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
 */