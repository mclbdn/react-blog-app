import { useEffect } from "react";
import ArticlePreview from "../components/ArticlePreview";
import { useFetchArticles } from "../utils";
import Nav from "../components/Nav";
import styles from "./ArticleList.module.scss";

const ArticleList = () => {
  // Utils
  const { fetchArticles, articles } = useFetchArticles();

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <Nav />
      <main data-testid="articleListMainElement" className={styles.article_list_content}>
        <h1 className={styles.article_list_title}>Recent articles</h1>
        {articles.length >= 1
          ? articles.map((article) => {
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
            })
          : null}
      </main>
    </>
  );
};

export default ArticleList;
