import React from "react"
import styled from "styled-components"

const SearchButtons = ({ projects, setProjects, setBackToAll } ) => { /* first paramater is an array and the other 2 are funcitons */
  
  const [index , setIndex] = React.useState(0);

  const types = [
    'all', 
    ...new Set ( /* i am spreading out Set in order to get its contenuto in an array. new Set just get rids of the duplicates of the element in its () */
      projects.map(project => {
      return project.data.type
      })/* this is to create the button for filterin 'all', 'bathroom' etc. but we are mapping all the types except for all that is hardcoded. Also, set gives us only unique values gettin rid of the duplicates*/
    )
  ]

  const showProjects = (type, typeIndex) =>{
    setIndex(typeIndex) /* this is a local function set above that contorl the index. we are setting it as typeIndex */
    if(type === 'all') {
      setBackToAll() /* that's why we passed this function in projects.js, because it will help us to go back to default filtering by clicking on 'all' */
    } else {
      const tempProjects = projects.filter(project => project.data.type === type) /* from the filter method i only want to return the project if the type matches my type */
      setProjects(tempProjects)
    }
  } /* with this we are setting the style to the button on click. so if i click on kitchen, then that's the one highlighted */

  return <Wrapper>
    {types.map((type,typeIndex) => {
        return (
          <button 
            key={typeIndex} 
            className={index === typeIndex ? 'active' : undefined}
            onClick={() => showProjects(type, typeIndex)}
          >
            {type}
          </button>
        )
    })}
  </Wrapper>
}


const Wrapper = styled.section`
  display: flex;
  margin-bottom: 0;
  justify-content: center;
  flex-wrap: wrap;
  button {
    margin: 0.5rem;
    text-transform: capitalize;
    background: transparent;
    border: transparent;
    color: var(--clr-grey-6);
    letter-spacing: var(--spacing);
    font-size: 1rem;
    padding: 0.25rem;
    cursor: pointer;
    outline: none;
    transition: var(--transition);
  }
  button:hover,
  button.active {
    box-shadow: 0px 1.5px 0 var(--clr-grey-6);
  }
`
export default SearchButtons
