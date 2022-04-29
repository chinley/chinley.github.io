import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Clock from "../components/clock"
import Bear from "../components/Bear";

const Category = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const { totalPage, currentPage, category, categories } = pageContext;
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <Clock />
      <ol style={{ listStyle: `none` }}>
          <blockquote>
            <p>标签：{category}</p>
          </blockquote>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      <div 
        style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `space-between`,
        listStyle: `none`,
        padding: 0,
      }}>
        {currentPage - 1 > 0 && (
          <Link
            to={'/' + (currentPage - 1 === 1 ? '' : currentPage - 1)}
            rel="prev"
          >
            ← 上一页
          </Link>
        )}
        {currentPage + 1 <= totalPage && (
          <Link to={'/' + (currentPage + 1)} rel="next">
            下一页 →
          </Link>
        )}
      </div>
      <Bear />
      <div className="cate-box" style={{
          position: 'absolute',
          right: '10rem',
          top: '17rem',
          borderLeft: '1px solid #d94e67',
          padding: '5px 0 5px 20px'
      }}>
        { categories && categories.map(item => <div style={{ marginBottom: '20px', textDecoration: 'none'}}>
          <Link to={`/categories/${item}`} itemProp="url" style={{ textDecoration: 'none', color: '#4f5969'}}>
            <span itemProp="headline">{item}</span>
          </Link>
        </div>) }
      </div>
    </Layout>
  )
}

export default Category

export const pageQuery = graphql`
  query CategoryQuery($category: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {category: {eq: $category}}}
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
        }
      }
    }
  }
`
