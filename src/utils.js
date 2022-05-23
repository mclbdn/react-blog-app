import axios from "axios";
import { useEffect, useState } from "react";

export async function useGetArticleAuthor() {
  const [author, setAuthor] = useState([]);

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
