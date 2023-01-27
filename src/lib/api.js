// const dotenv = require("dotenv");
import dotenv from "dotenv";
dotenv.config();

import { NUMBER_OF_POSTS } from "../constants";
const API_URL = process.env.VITE_WP_POST_URL;
const BLOG_URL = process.env.VITE_WP_BLOGPOST_URL;

export const fetchPosts = async function () {
  const { headers } = await fetch(API_URL);
  // const totalPages = headers.get("x-wp-totalpages");
  const totalPages = 1;
  let posts = [];

  for (let i = 1; i <= totalPages; i++) {
    const url =
      API_URL + `&order_by=slug` + `&per_page=${NUMBER_OF_POSTS}&page=${i}`;
    const res = await fetch(url);
    const data = await res.json();

    // console.log(
    //   "data",
    //   data[0]["toolset-meta"]["optician-details"]["optician-store"]["raw"]
    // );

    const opticiansInIndia = data.filter(
      (post) =>
        post["toolset-meta"]["optician-details"]["optician-store"]["raw"] ===
        "in"
    );

    posts = [...posts, ...opticiansInIndia];
  }

  return [...posts].sort((a, b) => {
    const slugA = a.slug;
    const slugB = b.slug;

    if (slugA < slugB) return -1;
    if (slugA > slugB) return 1;
    return 0;
  });
};

export const fetchBlogPosts = async function () {
  const res = await fetch(BLOG_URL);
  const posts = await res.json();

  return posts;
};
