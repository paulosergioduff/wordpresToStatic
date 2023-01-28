/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  // Um exemplo de array de objetos que representam as páginas
  const pages = [
    {
      slug: "page1",
      title: "Page 1"
    },
    {
      slug: "page2",
      title: "Page 2"
    },
    {
      slug: "page3",
      title: "Page 3"
    },
  ]

  // Itera sobre cada página e cria uma página para ela
  pages.forEach(page => {
    actions.createPage({
      path: `/post/${page.slug}`,
      component: require.resolve(`./src/templates/post-template.js`),
      context: {
        title: page.title,
      },
    })
  })
}
