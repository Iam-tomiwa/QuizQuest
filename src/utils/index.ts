import {MessageType, ToastDispatchType} from "contexts/ToastContext";
import {Dispatch} from "react";

// function to generate a unique ID
export const generateId = (): string => Math.random().toString(36).substr(2, 9);

// function to display a toast component
export const showToast = (
  toastDispatch: Dispatch<ToastDispatchType>,
  text: string,
  messageType: MessageType
) => {
  const toastId = generateId();

  // Dispatch an action to add the toast to the context state
  toastDispatch({
    type: "ADD_TOAST",
    payload: {
      text: text,
      messageType: messageType,
      id: toastId,
    },
  });

  // Automatically close the toast after 5 seconds
  setTimeout(() => {
    toastDispatch({type: "CLOSE_TOAST", id: toastId});
  }, 5000);
};

// convert object to query parameters
export const convertObjToParams = <T>(obj: {[x: string]: T}) => {
  return Object.entries({...removeEmpty(obj)})
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
};

// remove empty children from and object i.e properties with empty strings, array, or null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmpty = (obj: {[x: string]: any}) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (typeof v === "number") return true;
      else if (typeof v === "object" && Object.keys(v).length > 0) return true;
      else if (typeof v === "string") return v !== "" && v.length > 0 && v;
      else if (typeof v === "boolean") return true;
    })
  );
};

// shuffle a list
export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// parse html string to a formatted text
export function parseHtmlString(htmlString: string) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(htmlString, "text/html")
    .documentElement.textContent;
  return decodedString;
}
