import React, { useEffect, useState } from "react"
import Title from "./Title"
import styled from "styled-components"
import base from "./Airtable"
import { FaVoteYea } from "react-icons/fa"
import { useStaticQuery } from "gatsby"

/* console.log(base) */


const Survey = () => {

  const [items, setItems]=useState([]);
  const [loading, setLoading] = useState(false);


  //fetching data dynamically with airtable. don't forget to pass in useeffect
  const getRecords = async () => {

    const records = await base('Survey')
      .select({})
      .firstPage()
      .catch(err => console.log(err)
      ) /* Survey is the name of the table on Airtable and base is basically the key set in Airtable.js. this means we are connecting to airtable server to fetch data. then, other than select you have other options like distroy create etc. by doing this select({}) not passing anything, we are requesting all the records. */
  

    /* console.log(records) */
    const newItems = records.map((record) => {
      const {id, fields} = record /* if you look at the console.log of the records, you'll see there are many paramateres but we are niterested in id and fields which is where our data is */
      return {id, fields}
    })

    setItems(newItems) /* now items is not empty array anymore but it has beebn populated with the data coming from airtable. check the console.log below */
    setLoading(false)/* because now we fetched the data */

  }

  useEffect(() => {
    getRecords()
  }, [])

  console.log(items)


  const giveVote = async id => { /* id is the parameter we are pasisng */
    setLoading(true)
    const tempItems = [...items].map((item) => { /* we are spreading all the items from the state and mapping over them. then we are checking whether the item id is matching the one that i am passing by clicking on it */
      if (item.id === id) {
        let {id, fields} = item; /* we first destructure and then re write it */
        fields ={...fields, votes:fields.votes + 1} /* we spread because in fields we have both name and votes but then we only update votes*/
        return {id, fields} /* then we return the id with the new value of the fields */

      }else {
          return item /* if they don't match we don't do anything */
        }
    })


    const records = await base('Survey').update(tempItems).catch(
      err => console.log(err)
    ) /* check docs https://airtable.com/apphpSdjRObpee3QV/api/docs#javascript/table:costumers:update */

    //all this is now the same as the thing we did above
    const newItems = records.map((record) => {
      const {id, fields} = record 
      return {id, fields}
    })

    setItems(newItems) 
    setLoading(false)


  }


  return ( 
    <Wrapper className='section'>
      <div className='container'>
        <Title title='survey'></Title>
        <h3>
          most important room in the house?
        </h3>

        {loading?<h3>loading...</h3> : <ul>
          {items.map((item) => {
            const {id, fields:{name, votes}} = item
            return <li key={id}>
              <div className='key'>
                {name.toUpperCase().substring(0,2)}{/* instead of css you can also use javascript to make uppercase. then with substrings we get only the first 2 values*/}
              </div>

              <div>
                <h4>{name}</h4>
                <p>{votes} votes</p>
              </div>

              <button onClick={() => giveVote(id) }>
                <FaVoteYea />
              </button>
              
            </li>
          })}
          </ul>}

      </div>

    </Wrapper>
  )
  }




const Wrapper = styled.section`
  .container {
    width: 90vw;
    max-width: var(--max-width);

    margin: 0 auto;
    h3 {
      text-align: center;
      color: var(--clr-grey-5);
      margin-bottom: 4rem;
    }
    ul {
      margin-top: 2rem;
      display: grid;
      gap: 2rem;
      grid-gap: 2rem;
      @media (min-width: 992px) {
        & {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (min-width: 1200px) {
        & {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    }
    li {
      background: var(--clr-grey-10);
      border-radius: var(--radius);
      padding: 0.75rem 1rem;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 0 3rem;
      grid-gap: 0 3rem;
      align-items: center;
      .key {
        color: var(--clr-white);
        font-size: 1.5rem;
        background: var(--clr-primary-7);
        padding: 0.5rem 1rem;
        border-radius: var(--radius);
      }
      p {
        margin-bottom: 0;
        color: var(--clr-grey-5);
        letter-spacing: var(--spacing);
      }
      h4 {
        margin-bottom: 0;
      }
      button {
        background: transparent;
        border-color: transparent;
        font-size: 2rem;
        cursor: pointer;
        color: var(--clr-black);
      }
    }
  }
`
export default Survey
