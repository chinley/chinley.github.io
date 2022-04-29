const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const categories = new Set();

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const home = path.resolve(`./src/templates/index.js`);
  const category = path.resolve(`./src/templates/category.js`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              category
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
      if(post.frontmatter.category) {
        categories.add(post.frontmatter.category);
      }
    });
  }

  const postsPerpage = 8;
  const numsPages = Math.ceil(posts.length / postsPerpage);
  Array.from({ length: numsPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: home,
      context: {
        currentPage: i+1,
        totalPage: numsPages,
        limit: postsPerpage,
        skip: i * postsPerpage,
        categories: Array.from(categories)
      },
    })
  });

  categories.forEach(item => {
    const postsPerpage = 8;
    const curCatePosts = [];
    posts.forEach(post => {
      if(post.frontmatter.category && post.frontmatter.category === item) {
        curCatePosts.push(post);
      }
    });
    const numsPages = Math.ceil(curCatePosts.length / postsPerpage);
    Array.from({ length: numsPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/categories/${item}` : `/categories/${item}/${i + 1}`,
        component: category,
        context: {
          currentPage: i+1,
          totalPage: numsPages,
          category: item,
          limit: postsPerpage,
          skip: i * postsPerpage,
          categories: Array.from(categories)
         }
      })
    });
  });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      category: String
    }

    type Fields {
      slug: String
    }
  `)
}
