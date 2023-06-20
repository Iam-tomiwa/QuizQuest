import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {ToastContext} from "contexts/ToastContext";
import {showToast} from "utils";
import {API_BASE_URL} from "utils/constants";

/**
 * Custom hook for making API requests and handling fetch states.
 * @param url - The URL to fetch the data from.
 * @param params - Optional parameters to include in the request.
 * @returns An object containing the fetched data, fetch state, and error.
 */
const useFetch = <TResponse>(url: string, params?: unknown) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Accessing the toast dispatch function from the ToastContext.
  const {toastDispatch} = useContext(ToastContext);

  useEffect(() => {
    // Create an abort controller to handle aborting the fetch.
    const abortCont = new AbortController();

    setIsPending(true);
    setData(null);

    axios
      .get<TResponse>(API_BASE_URL + url, {
        params,
      })
      .then(json => {
        // Update the fetch state and store the fetched data.
        setIsPending(false);
        if (json.data) {
          setData(json.data);
          setError(null);
        }
      })
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else if (err.message === "Failed to fetch") {
          // Handle network error and show a toast message.
          setIsPending(false);
          setError(err.message + ", you might want to check your connection");
          showToast(toastDispatch, err.message, "success");
        } else {
          // Handle other errors and show a toast message.
          setIsPending(false);
          setError(err.message);
          showToast(toastDispatch, err.message, "error");
        }
      });

    // Cleanup function to abort the fetch if the component unmounts or the dependency array changes.
    return () => abortCont.abort();
  }, [params, toastDispatch, url]);

  return {data, isPending, error};
};

export default useFetch;
