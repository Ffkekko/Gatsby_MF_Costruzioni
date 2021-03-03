import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Title from "./Title"
import styled from "styled-components"
import Image from "gatsby-image"
import { FaQuoteRight } from "react-icons/fa"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"


const query = graphql`
  {
    allAirtable(filter: {table: {eq: "Costumers"}}) {
      nodes {
        data {
          name
          quote
          title
          image {
            localFiles {
              childImageSharp {
                fixed (width:150, height:150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`


const Slider = () => {

  const { allAirtable:{ nodes:costumers } } = useStaticQuery(query);
  const [index, setIndex] = React.useState(0)
  

  React.useEffect(() => { 
    const lastIndex = costumers.length - 1
    if(index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
      }

    }, [index, costumers]) /* with use effect we are trying to mak the slider go back to 0 once we got to the end of the array with the last costumer */


  return <Wrapper>
    <Title title='reviews' />
    <div className='section-center'>
      { costumers.map((costumer, costumerIndex) => {  /* don't confuse this index that i named costumerIndex and  reflects the item index in the arrey where costumers are. Index above is just hardcoded to be 0 initially */

        const{ data:{ image,name,title, quote } } =costumer;
        const costumerImg = image.localFiles[0].childImageSharp.fixed;
       

        //setting logic for slide
        let position = 'nextSlide';

        if (costumerIndex === index) { 
          position = 'activeSlide'
         }

        if(costumerIndex === index - 1 || (index === 0 && costumerIndex === costumer.length -1)) { /* we are adding this condition because we don't want to get to the end of the array, clicking nexrt and not having anything to display because all the previosu costumers have been pushed out of the screen on the left */
         
          position = 'lastSlide'
         }

         //end logic for slide
        
       return <article className={ position } key={ costumerIndex }>
          <Image fixed={ costumerImg } className='img' />
          <h4>{ name }</h4>
          <p className='title'>{ title }</p>
          <p className='text'>{ quote }</p>
          <FaQuoteRight class='icon' />
          </article>
     } ) }

      <button class='prev' onClick={ () => setIndex(index-1) }>
        <FiChevronLeft />
      </button>

      <button class='next' onClick={ () => setIndex(index+1) }>
        <FiChevronRight />
      </button>

    </div>

    </Wrapper>
}


const Wrapper = styled.div`
  background: var(--clr-grey-10);
  .section-center {
    margin-top: 4rem;
    width: 80vw;
    height: 450px;
    max-width: 800px;
    text-align: center;
    position: relative;
    display: flex;
    overflow: hidden;
    .img {
      border-radius: 50%;
      margin-bottom: 1rem;
    }
    h4 {
      text-transform: uppercase;
      color: var(--clr-primary-5);
      margin-bottom: 0.25rem;
    }
    .title {
      text-transform: capitalize;
      margin-bottom: 0.75rem;
    }
    .text {
      max-width: 45em;
      margin: 0 auto;
      line-height: 2;
      color: var(--clr-grey-5);
    }
    .icon {
      font-size: 3rem;
      margin-top: 1rem;
      color: var(--clr-primary-5);
    }
    .prev,
    .next {
      position: absolute;
      top: 200px;
      transform: translateY(-50%);
      background: var(--clr-grey-5);
      color: var(--clr-white);
      width: 1.25rem;
      height: 1.25rem;
      display: grid;
      place-items: center;
      border-color: transparent;
      font-size: 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      transition: var(--transition);
    }
    .prev:hover,
    .next:hover {
      background: var(--clr-primary-5);
    }
    .prev {
      left: 0;
    }
    .next {
      right: 0;
    }
    @media (min-width: 800px) {
      .prev,
      .next {
        width: 2rem;
        height: 2rem;
        font-size: 1.5rem;
      }
    }
    article {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: var(--transition);
    }
    article.activeSlide {
      opacity: 1;
      transform: translateX(0);
    }
    article.lastSlide {
      transform: translateX(-100%);
    }
    article.nextSlide {
      transform: translateX(100%);
    }
  }
`
export default Slider
