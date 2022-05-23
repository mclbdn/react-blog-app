import moment from "moment";
import axios from "axios";
import styles from "./ArticlePreview.module.scss";
import { useEffect, useState } from "react";

const ArticlePreview = ({ createdAt, title, perex, imageId, articleId }) => {
  const date = moment(new Date(createdAt)).format("MM/DD/YYYY");
  const [numOfComments, setNumOfComments] = useState(0);
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchNumberOfComments = async (articleId) => {
    try {
      const response = await axios.get(`https://fullstack.exercise.applifting.cz/articles/${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      setNumOfComments(response.data.comments.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNumberOfComments(articleId);
  }, []);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`https://fullstack.exercise.applifting.cz/images/${imageId}`, {
        headers: {
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
        responseType: "blob",
      });

      const imageBlob = await response.data;

      const localUrl = URL.createObjectURL(imageBlob);

      setImageUrl(localUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const getTenant = async () => {
    try {
      const response = await axios.get("https://fullstack.exercise.applifting.cz/tenants/bdc84621-2b89-4a98-bc49-867a4fe829d0", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
        },
      });

      const data = await response.data;

      setAuthor(data.name);
    } catch (err) {
      setAuthor("Unknown author");
      console.log(err);
    }
  };

  useEffect(() => {
    getTenant();
    fetchImage();
  }, [imageId]);

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
          <p>{numOfComments} comments</p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
