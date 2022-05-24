import { useEffect, useState } from "react";
import { useGetArticleAuthor, useFetchArticles } from "../utils";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import styles from "./MyArticles.module.scss";
import MyArticlesTr from "../components/MyArticlesTR";

const MyArticles = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");

  // Utils
  const fetchedData = useGetArticleAuthor();
  fetchedData.then((author) => setAuthor(author)).catch((err) => console.log(err));
  const { fetchArticles, articles } = useFetchArticles();

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
          <a id="createNewArticleFromMyArticles" className={styles.create_new_article_btn} href="/newarticle">
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
            {articles.length >= 1
              ? articles.map((article) => {
                  return (
                    <MyArticlesTr
                      key={article.articleId}
                      title={article.title}
                      perex={article.perex}
                      author={author}
                      articleId={article.articleId}
                      fetchArticles={fetchArticles}
                    />
                  );
                })
              : null}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default MyArticles;
