"use client";
import useSWR from "swr";
import fetcher from "../lib/fetchers";

const usePosts = (UserId) => {
  const url = UserId
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/indivisualCreates?id=${UserId}`
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/fetchallCreates`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
