import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import moment from "moment";
import img from "../assets/img.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./SingleArticle.module.scss";

const SingleArticle = () => {
  const [perex, setPerex] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState();

  let { id } = useParams();

  useEffect(() => {
    const fetchArticleDetails = async () => {
      const response = await fetch(`https://fullstack.exercise.applifting.cz/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const data = await response.json();

      setPerex(data.perex);
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
          <div className={styles.perex_content}>
            <ReactMarkdown children={perex} remarkPlugins={[remarkGfm]} />
          </div>
        </article>

        <aside>
          <div className={styles.verticla_line}></div>
          <div className={styles.sidebar_content}>
            <h4 className={styles.sidebar_header}>Related articles</h4>
            <h6 className={styles.sidebar_subheader}>Some article title</h6>
            <p className={styles.sidebar_paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, fuga eius tempore ad deleniti adipisci nulla quod. Nemo voluptatem
              aspernatur veniam fugit, molestiae inventore, harum deserunt odit, alias distinctio sunt.
            </p>
          </div>
        </aside>
      </main>
    </>
  );
};

export default SingleArticle;
