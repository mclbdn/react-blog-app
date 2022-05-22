import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MyArticles.module.scss";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import MyArticlesTr from "../components/MyArticlesTR";

const MyArticles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("https://fullstack.exercise.applifting.cz/articles", {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const articles = await response.data.items;

      // Sort articles by date from newest to oldest
      articles.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setArticles(articles);
    } catch (err) {
      console.log(err);
    }
  };

  // const fetchNumberOfComments = async (articleId) => {
  //   try {
  //     const response = await axios.get(`https://fullstack.exercise.applifting.cz/articles/${articleId}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
  //         Authorization: localStorage.getItem("access_token"),
  //       },
  //     });

  //     return response.data.comments.length;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  useEffect(() => {
    const hasAccessToken = localStorage.getItem("access_token") ? true : false;

    if (!hasAccessToken) {
      navigate("/");
    } else {
      fetchArticles();
    }
  }, []);

  return (
    <>
      <Nav />
      <main className={styles.my_articles_main}>
        <div className={styles.heading_and_create_new_article_container}>
          <h1 className={styles.h1}>My articles</h1>
          <a className={styles.create_new_article_btn} href="/newarticle">
            Create new article
          </a>
        </div>
        <table className={styles.my_articles_table}>
          <thead>
            <tr className={styles.column_names_tr}>
              <th>Article title</th>
              <th>Perex</th>
              <th>Author</th>
              <th># of comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {articles ? articles.map(article=>{
                return <MyArticlesTr key={article.articleId} title={article.title} perex={article.perex} articleId={article.articleId} fetchArticles={fetchArticles} />
              }): null}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default MyArticles;
