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
} from "../components"
import SEO from "../components/seo"
const HomePage = ({ data }) => {

  const{ allAirtable:{ nodes:projects } } = data

  return (
    <Layout>
      <Hero projects={ projects } /> {/* we pass the projects prop so as to get the multiple images for the carousel */}
      <About />
      {/* <Projects projects={ projects } title='latest projects' /> */}
      <GridProjects projects={ projects } title='latest projects' />
      <Survey />
      <Slider />
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
