import { useEffect, useState } from "react";

export function usePost() {
  const [post, setPost] = useState({});

  async function getPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const json = await res.json();
    setPost(json);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return post;
}

export function useFetch(url, retryTime) {
  const [finalData, setFinalData] = useState({});
    const [loading, setLoading] = useState(false);

  async function getDetails() {
    setLoading(true);
    const res = await fetch(url);
    const json = await res.json();
    setFinalData(json);
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, [url]);

  useEffect(() => {
    setInterval(getDetails, retryTime * 1000)
  }, [])

  return {
    finalData,
    loading
  };
}
