/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          description
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author;
  const description = data.site.siteMetadata?.description

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/chinley.jpeg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      <div>        
        <p>
          {description || null}
          {` `}
        </p>
        <p>
          {author?.summary || null}
          {` `}
        </p>

      </div>
    </div>
  )
}

export default Bio
