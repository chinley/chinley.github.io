
   
import React from "react"
import Layout from "./layout"
import Bear from './Bear'

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const CustomLayout = ({ element, props }) => (
  <Layout {...props}>
    {element}
    {/* <Bear /> */}
  </Layout>
)

export default CustomLayout