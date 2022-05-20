import { useState, useEffect } from "react";
import ArticlePreview from "../components/ArticlePreview";
import Nav from "../components/Nav";
import styles from "./ArticleList.module.scss";

const ArticleList = () => {
  const [articles, setArticles] = useState([1, 2]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("https://fullstack.exercise.applifting.cz/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
        },
      });

      const data = await response.json();
      console.log(data.items);
      setArticles(data.items);
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.h1}>Recent articles</h1>
        {articles &&
          articles.map((article) => {
            return <ArticlePreview />;
          })}
      </main>
    </>
  );
};

export default ArticleList;
