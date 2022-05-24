import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFetchNumberOfComments } from "../utils";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyArticlesTR.module.scss";
import { useEffect } from "react";

const MyArticlesTr = ({ title, perex, author, articleId, fetchArticles }) => {
  const { numberOfComments, fetchArticleCommentCount } = useFetchNumberOfComments();

  let shortPerex = perex.slice(0, 27);
  shortPerex += "...";

  let shortTitle = title.slice(0, 27);
  shortTitle += "...";

  const handleDeleteArticle = async (articleId) => {
    try {
      await axios.delete(`https://fullstack.exercise.applifting.cz/articles/${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      fetchArticles();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticleCommentCount(articleId);
  }, [articleId]);

  return (
    <>
      <tr key={articleId} className={styles.article_tr}>
        <td>{shortTitle}</td>
        <td>{shortPerex}</td>
        <td>{author}</td>
        <td>{numberOfComments}</td>
        <td>
          <div className={styles.action_icons}>
            <a href={`/editarticle/${articleId}`}>
              <FontAwesomeIcon id="edit_article_btn" className={`${styles.fa_icon} ${styles.fa_icon_edit}`} icon={faPencil} />
            </a>
            <FontAwesomeIcon className={`${styles.fa_icon} ${styles.fa_icon_delete}`} onClick={() => handleDeleteArticle(articleId)} icon={faTrash} />
          </div>
        </td>
      </tr>
    </>
  );
};

export default MyArticlesTr;
