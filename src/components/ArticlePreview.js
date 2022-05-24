import moment from "moment";
import styles from "./ArticlePreview.module.scss";
import { useGetArticleAuthor, useFetchNumberOfComments, useFetchImage } from "../utils";
import { useEffect, useState } from "react";

const ArticlePreview = ({ createdAt, title, perex, imageId, articleId }) => {
  const date = moment(new Date(createdAt)).format("MM/DD/YYYY");

  const [author, setAuthor] = useState("");

  // Utils
  const { fetchArticleCommentCount, numberOfComments } = useFetchNumberOfComments();
  const { fetchImage, imageUrl } = useFetchImage();
  const fetchedData = useGetArticleAuthor();
  fetchedData.then((author) => setAuthor(author)).catch((err) => console.log(err));

  useEffect(() => {
    fetchArticleCommentCount(articleId);
    fetchImage(imageId);
  }, []);

  return (
    <div className={styles.article_preview_container}>
      <div className={styles.left_side_preview}>
        <div
          className={styles.preview_image}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
      </div>
      <div className={styles.right_side_preview}>
        <h4>{title}</h4>
        <p className={styles.name_and_date}>
          {author} | {date}
        </p>
        <p className={styles.perex}>{perex}</p>
        <div className={styles.link_and_comments}>
          <a href={`/articles/${articleId}`}>Read whole article</a>
          <p>{numberOfComments} comments</p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
