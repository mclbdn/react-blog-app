import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export async function useGetArticleAuthor() {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return author;
}

export function useFetchNumberOfComments() {
  const [numberOfComments, setNumbeOfComments] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticleCommentCount = useCallback(async (articleId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://fullstack.exercise.applifting.cz/articles/${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const data = await response.data;

      setNumbeOfComments(data.comments.length);
      setError(null);

      return data;
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchArticleCommentCount,
    numberOfComments,
    loading,
    error,
  };
}

export function useFetchImage() {
  const [imageUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = useCallback(async (imageId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://fullstack.exercise.applifting.cz/images/${imageId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
        responseType: "blob",
      });

      const imageBlob = await response.data;

      const localUrl = URL.createObjectURL(imageBlob);

      setImgUrl(localUrl);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchImage,
    setImgUrl,
    imageUrl,
    loading,
    error,
  };
}

export function useFetchArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fullstack.exercise.applifting.cz/articles", {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const fetchedArticles = await response.data.items;

      // Sort feched articles by date from newest to oldest
      fetchedArticles.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setArticles(fetchedArticles);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchArticles,
    articles,
    loading,
    error,
  };
}
