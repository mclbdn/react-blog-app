import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import moment from "moment";
import img from "../assets/img.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import styles from "./SingleArticle.module.scss";

const SingleArticle = () => {
  const [content, setContent] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState();

  let { id } = useParams();

  useEffect(() => {
    const fetchArticleDetails = async () => {
      const response = await axios.get(`https://fullstack.exercise.applifting.cz/articles/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const data = await response.data;

      setContent(data.content);
      setCreatedAt(moment(new Date(data.createdAt)).format("MM/DD/YYYY"));
    };

    fetchArticleDetails();
  }, [id]);

  return (
    <>
      <Nav />
      <main className={styles.single_article_main_content}>
        <article>
          <h1 className={styles.article_title}>lorem</h1>
          <p className={styles.name_and_date}>
            Elon <span className={styles.circle_span}>&#9679;</span> {createdAt}
          </p>
          <div
            className={styles.thumbnail_image}
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
          <div className={styles.content}>
            <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
          </div>
        </article>
        <section className={styles.comment_section}>
          <form>
            <div className={styles.heading_and_publish_container}>
              <h4 className={styles.h1}>Comments()</h4>
              <button type="submit" className={styles.publish_comment_btn}>
                Publish comment
              </button>
            </div>
            <label htmlFor="commentAuthor" className={styles.label}>
              Your name
            </label>
            <input
              type="text"
              name="commentAuthor"
              // value={commentAuthor}
              // onChange={(e) => setCommentAuthor(e.target.value)}
              id="commentAuthor"
              placeholder="Kimbal Musk"
              maxLength={20}
            />
            <label htmlFor="commentContent" className={styles.label}>
              Your comment
            </label>
            <input
              type="text"
              name="commentContent"
              // value={commentAuthor}
              // onChange={(e) => setCommentAuthor(e.target.value)}
              id="commentContent"
              placeholder="This article is awesome!"
              maxLength={1000}
            />
          </form>
        </section>
      </main>
    </>
  );
};

export default SingleArticle;
