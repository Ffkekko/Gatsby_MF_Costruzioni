

const airtableQuery = `
    {
    allAirtable(filter: {table: {eq: "Projects"}}) {
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
                  src
                  aspectRatio
                  base64
                  sizes
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`
/* these in fluid are just parameters of the fragment, usually we use the fragment because it is quicker, but we are still targetting these parameters, but because now angolia cannot read the fragment we pass the parameters manually */

function pageToAngoliaRecord({id, data:{name,type,date,image}}){

    return {
        objectID:id,
        name,
        type,
        date,
        image:{...image.localFiles[0].childImageSharp.fluid},
    }
}

const queries = [
    {
        query: airtableQuery,  /* we have 2 properties here query and the funciton transformer  */
        transformer: ({data}) => data.allAirtable.nodes.map(pageToAngoliaRecord), /* so basically with query we access the data and with transformer we make the data suitable for angolia to read. obviously the function pageToAngoliaRecord has all the data that's why we map over it (All data from nodes, thats why here we map frm nodes and in the function we put all the parameters within the node, such us id, name etc...*/
    }
]

/* NOTE, ALL THIS IS NOT GONNA WORK IN DEVELOPMENT, WE NEED TO RUN GATSBY BUILD so that all the data gets transferred to angolia

note, in angolia we pass an object as image and not an url because we want to use Gatsby image

note also, that you have to go to docs, build search ui and react instantsearch to get how to install aloglia for react*/


module.exports = queries  /* this is a node syntax */