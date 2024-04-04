"use client";
import useSWR from "swr";
import fetcher from "../lib/fetchers";

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/fetchingUsers`,
    fetcher
  );
  return {
    data,
    isLoading: isLoading,
    isError: error,
  };
};

export default useUsers;
