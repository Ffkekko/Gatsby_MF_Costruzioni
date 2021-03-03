import React from "react"
import { Link } from "gatsby"
import Title from "./Title"
import styled from "styled-components"
import Image from "gatsby-image"
import SearchButtons from "./SearchButtons"
const Projects = ({ projects: data, title, page }) => {

  const [projects, setProjects] = React.useState(data);
 /*  const [img, setImg] = React.useState(false);
  
  const toggle= () => { 
    setImg(!img)
   } */

  const setBackToAll = () => 
  { 
    setProjects(data)
   } /* yes, we are already passing it in useState above, but remember that this value will change when filtering that's why we need a setProjects function */


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
    { projects.map((item) => { 
      console.log(item)
      const { id } =item; /* we get id from item which is basically each node */
      const { name, type } = item.data; /* we get the name and type from the data within each node */
      const fluid =  item.data.image.localFiles[0].childImageSharp.fluid
      
      
      return (
        
      <article key={ id }>
        <div className='container' /* onClick={ toggle } */>
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

      /*  <Image fluid={ fluid } className={ `Big ${ img? 'Visible':'' }` } /> */
      )
     }
    ) }
  </div>

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

  /*  .Big {
      display:none
    }
    .Visible {
      display:block;
      position:fixed;
      top:50%;
      left:50%;
      width: 40rem;
      height:auto;
      border-radius: var(--radius);
      transition: var(--transition);
    } */
`
export default Projects
