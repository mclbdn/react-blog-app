import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import styles from "./SingleArticle.module.scss";

const SingleArticle = () => {
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
      console.log(data);
    };

    fetchArticleDetails();
  }, [id]);

  return (
    <>
      <Nav />
      <main>
        <h1 className={styles.h1}>asd</h1>
        {id}
      </main>
    </>
  );
};

export default SingleArticle;
