"use client";
import useSWR from "swr";
import fetcher from "../lib/fetchers";

const useSingalPost = (postId) => {
  const url = postId
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/singalTweets?id=${postId}`
    : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSingalPost;
