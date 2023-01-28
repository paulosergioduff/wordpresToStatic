import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
        <header>
            
        </header>
        <Menu />
        <main>
           <article>Conteúdo futuro</article>
        </main>
    </Layout>
  )
}

export default IndexPage
