import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import WPConfigAPI from "./WPConfigAPI";

const WpPostById = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`${WPConfigAPI.API_URL}/wp-json/wp/v2/posts/${props.postId}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, []);

  return (
    <>
      <h2>{post.title && post.title.rendered}</h2>
      {post.content && ReactHtmlParser(post.content.rendered)}
    </>
  );
}

export default WpPostById;
