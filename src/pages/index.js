import React from "react"
import { graphql } from "gatsby"
import {
  Layout,
  Hero,
  About,
  Projects,
  Survey,
  Slider,
  GridProjects,
  GoTop
} from "../components"
import SEO from "../components/seo"
import styled from "styled-components"


const HomePage = ({ data }) => {
  console.log(data.allAirtable.nodes)

  const{ allAirtable:{ nodes:projects } } = data

  return (
    <Layout>
      <Hero projects={ projects } /> {/* we pass the projects prop so as to get the multiple images for the carousel */}
      <About />
      {/* <Projects projects={ projects } title='latest projects' /> */}
      <GridProjects projects={ projects } title='latest projects' />
      <Survey />
      <Slider />
      <GoTop scrollStepInPx="100" delayInMs="10.50" />
      <Wrapper>
        <div className='fixedWhatsapp'>
          <a href="https://api.whatsapp.com/send?phone=3388911704" target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/office/38/000000/whatsapp.png" alt="whatsapp-icon azalè bar" /></a>
        </div>
       </Wrapper>
    </Layout>
  )
}

//we write the query here but it is actually passed via the prop projects={ projects } to Projects.js where we destructure nodes
export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "Projects"}}, limit: 4, sort: {fields: data___date, order: DESC}) {
      nodes {
        id
        data {
          date
          name
          type
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

export default HomePage


const Wrapper = styled.section`

.fixedWhatsapp {
  position:fixed;
  bottom: 1rem;
  right:1.1rem;
}

.fixedWhatsapp img {
  width:2rem
}


@media only screen and (min-width: 768px) {
  .fixedWhatsapp {
    right:1.3rem;
}
.fixedWhatsapp img {
  width:2.5rem
}
}
`