"use client";
import useSWR from "swr";
import fetcher from "../lib/fetchers";

const useSingalUsers = (UserId) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/indivisualUsers?id=${UserId}`,
    fetcher
  );
  return {
    users: data,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  };
};

export default useSingalUsers;
