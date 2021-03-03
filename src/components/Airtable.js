/* so far we have been working in build time with gatsby-config but
in this file we work at run-time and therefore we have to make sure to use the GATSBY at beginning of the api key and secret
otherwise here gatsby wouldn't be able to access those keys   */

/* here we have the so called 'base'. see in airtable, help-apidocumentation-authentication(with javascript, not curl) */
import Airtable from "airtable"
export default new Airtable({apiKey:process.env.GATSBY_AIRTABLE_API}).base(process.env.GATSBY_AIRTABLE_BASE_ID)

/* we use this in Survey.js to allow user to change frontend on run time */