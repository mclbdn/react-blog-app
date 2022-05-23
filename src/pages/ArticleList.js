import { useState, useEffect } from "react";
import axios from "axios";
import ArticlePreview from "../components/ArticlePreview";
import Nav from "../components/Nav";
import styles from "./ArticleList.module.scss";

const ArticleList = () => {
  const [articles, setArticles] = useState([1, 2]);

  useEffect(() => {
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

    fetchArticles();
  }, []);

  return (
    <>
      <Nav />
      <main className={styles.article_list_content}>
        <h1 className={styles.article_list_title}>Recent articles</h1>
        {articles &&
          articles.map((article) => {
            return (
              <ArticlePreview
                key={article.articleId}
                articleId={article.articleId}
                title={article.title}
                createdAt={article.createdAt}
                perex={article.perex}
                imageId={article.imageId}
              />
            );
          })}
      </main>
    </>
  );
};

export default ArticleList;
