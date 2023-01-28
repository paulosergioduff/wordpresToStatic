import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import WPConfigAPI from "./WPConfigAPI";

const WpInDevelopment = ({constant, url, body}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${WPConfigAPI[constant]}${url}`)
      .then(res => res.json())
      .then(data => setData(data))
  }, []);

  return (
    <>
      {body}
    </>
  );
}

export default WpInDevelopment;
