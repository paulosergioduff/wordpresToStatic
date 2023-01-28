import React, { useState, useEffect } from "react"
import WPConfigAPI from "./WPConfigAPI";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch categories and posts from WordPress API
    fetch(`${WPConfigAPI.API_URL}/wp-json/wp/v2/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch(`${WPConfigAPI.API_URL}/wp-json/wp/v2/posts`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <nav>
        <li><a href="/">Início</a></li>
        {categories.map(category => (
            <React.Fragment key={category.id}>
            <a href={`/post/?page=${category.slug}`}>{category.name}</a>
            <ul>
                {posts
                .filter(post => post.categories.includes(category.id))
                .map(post => (
                    <li key={post.id}>
                    <a href={`/post/?page=${post.slug}`}>{post.title.rendered}</a>
                    </li>
                ))}
            </ul>
            </React.Fragment>
        ))}
    </nav>
  )
}

export default Menu
