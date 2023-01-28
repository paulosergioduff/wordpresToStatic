import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import WPConfigAPI from "./WPConfigAPI";

const WpPostBySlug = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`${WPConfigAPI.API_URL}/wp-json/wp/v2/posts?slug=${props.postSlug}`)
      .then(res => res.json())
      .then(data => setPost(data[0]))
  }, [props.postSlug]);
/*console.log("Conteudo investigado: "+post.title)*/
  return (
    <>
      <h2>{post.title && post.title.rendered}</h2>
      {post.content && ReactHtmlParser(post.content.rendered)}
    </>
  );
}

export default WpPostBySlug;
