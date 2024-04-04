"use client";
import useSWR from "swr";
import fetcher from "../lib/fetchers";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/currentUsers`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
