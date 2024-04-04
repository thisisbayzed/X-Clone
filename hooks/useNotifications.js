"use client";
import useSWR from "swr";
import fetcher from "../lib/fetchers";

const useNotifications = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
