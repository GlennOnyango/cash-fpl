import { main_url } from "../../constants";
import { useQuery } from "react-query";
import axios from "axios";

export const useFetchQuery = (
  url: string,
  queryKey: string | any[],
  fetchOnLoad: boolean,
  refetchInterval: number | false,
  token?: string,
  formData?: any
) => {
  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isIdle,
    isLoading,
    isLoadingError,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
  } = useQuery(
    queryKey,
    async () => {
      //check if token is available
      if (!token) {
        return axios
          .get(`${main_url}${url}${formData ? formData : ""}`, {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 30000,
          })
          .then((res) => res.data);
      }

      return axios
        .get(`${main_url}${url}${formData ? formData : ""}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000,
        })
        .then((res) => res.data);
    },
    {
      onError: (err) => {
        console.log(err);
      },
      enabled: fetchOnLoad,
      refetchInterval: refetchInterval,
    }
  );

  return {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isIdle,
    isLoading,
    isLoadingError,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
  };
};
