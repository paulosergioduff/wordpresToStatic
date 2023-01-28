import React, { useEffect, useState } from "react";
import WpPostBySlug from "../components/WpPostBySlug";
import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"


function Post() {
  const [myParam, setMyParam] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setMyParam(urlParams.get("page"));
}, []);

  return (
    <Layout>
      <SEO title="Home" />
        <header>
            
        </header>
        <Menu />
        <main>
          <div><WpPostBySlug key={myParam} postSlug={myParam} /></div>        
        </main>
    </Layout>
    
  );

}

export default Post;
