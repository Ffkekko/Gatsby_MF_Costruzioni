// Search.js

import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import Title from "./Title"
import algoliasearch from "algoliasearch/lite" /* coming from documentation of angolia for react building search ui */
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectHits,
} from "react-instantsearch-dom" /* to learn how to manipulate these widgets and display things with our style go to InstantSearch.js Widgets on angolia from, docs, buildind search ui (select instantsearch.js) then api reference and look for instantsearch. here you have all the widget. let 's say we are interested in the search box, we select it and then we look for the html where we get the css classes from which we put in the wrapper*/


const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY);


const NewHits = connectHits(({hits}) => {
  return hits.map(item => {
    const {objectID, image, name} = item;
    return <article key={objectID}>
      <Image fluid={image} className='img' />
      <h4>{name}</h4>
    </article>
  })
 }) /* here we are creating a customised hit with connectHits instead of using the standard one given by angolia to display the products. hits is the array with all our objects so each hit is our project with its information and image */

const Search = () => {
  return (
    <Wrapper>
      <Title title="Algolia Search" />
      <InstantSearch searchClient={searchClient} indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>
        <SearchBox />
        {/* < Hits /> */}
        <Container className='section-center'>
          <NewHits />
        </Container>
      </InstantSearch>{/* all this above comes from angolia docs too */}
    </Wrapper>
  )
}


//all this classes come from angolia docs
const Wrapper = styled.section`
  padding: 5rem 0;
  .ais-SearchBox {
    width: 90vw;
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 2rem;
    form {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 3rem 3rem;
      input,
      button {
        border: transparent;
        font-size: 1.1rem;
      }
      input {
        border: transparent;
        padding: 0.5rem 1rem;
        outline-color: var(--clr-grey-9);
      }
      button {
        background: var(--clr-grey-5);
        svg {
          fill: var(--clr-white);
        }
      }
      button.ais-SearchBox-reset {
        background: var(--clr-red-light);
      }
    }
  }
`

const Container = styled.div`
  display: grid;
  gap: 2rem;
  /* safari workaround */
  grid-gap: 2rem;
  article {
    background: var(--clr-white);
    text-align: center;
    border-radius: var(--radius);
    box-shadow: var(--ligth-shadow);
    transition: var(--transition);
    &:hover {
      transform: scale(1.001);
      box-shadow: var(--dark-shadow);
    }
    h4 {
      padding: 1rem;
      margin-bottom: 0;
    }
  }
  .img {
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
    height: 10rem;
  }
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    .img {
      height: 8.5rem;
    }
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export default Search
