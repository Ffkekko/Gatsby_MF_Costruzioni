require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// const queries = require("./src/constants/algolia")

module.exports = {
  siteMetadata: {
    title: `Design Shop`,
    description: `Gatsby Airtable Example. Built using Airtable, Algolia Search, Gatsby Background Image plugin and  React Context API. Containts two sliders, real-time Airtable updates and submenus. Styled using Styled-Components. `,
    author: `@johnsmilga`,
    titleTemplate: `%s | Gatsby - Airtable`,
    url: `https://gatsby-airtable-design-project.netlify.app/`,
    image: `mainBcg.png`,
    twitterUsername: `@john_smilga`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },/* this is necesssary to be able to set up the query with graphql and say grab me this particular picture (it will automatically go into images folder to do so). i think we use this for bnackgorund as we store the other images in airtable*/
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto",
              variants: ["400", "700"],
            },
            { family: "Open Sans" },
          ],
        },
      },
    },
    {
      resolve:`gatsby-source-airtable`, /* this is to get the data from airtable. have a look at this plugin on gatsby but we modified it a bit */
      options:{
        apiKey:process.env.GATSBY_AIRTABLE_API,
        concurrency:5, /* When using the Attachment type field, this plugin governs requests to download the associated files from Airtable to 5 concurrent requests to prevent excessive requests on Airtable’s servers - which can result in refused/hanging connections. You can adjust this limit with the concurrency option in your gatsby-config.js file. Set the option with an integer value for your desired limit on attempted concurrent requests. A value of 0 will allow requests to be made without any limit */
        tables:[
          {
            baseId:process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName:`Projects`, /* this is the how we named one of the tables in airtable */
            mapping:{
              image:`fileNode`
            } /* so image is the "fileNode, which is the name of the column where we get the object for the project. If you are using the Attachment type field in Airtable, you may specify a column name with fileNode and the plugin will bring in these files. Using this method, it will create “nodes” for each of the files and expose this to all of the transformer plugins. A good use case for this would be attaching images in Airtable, and being able to make these available for use with the sharp plugins and gatsby-image. Specifying a fileNode does require a peer dependency of gatsby-source-filesystem otherwise it will fall back as a non-mapped field.  */
          },
          {
            baseId:process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName:`Costumers`, 
            mapping:{
              image:`fileNode`
            }
          }
        ]

      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries: require("./src/constants/algolia"),
        chunkSize:10000,
      },
    }, /* t where rerquire is, it is where get the data from */
  ],
}
