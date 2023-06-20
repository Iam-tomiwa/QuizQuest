import {createContext, useReducer, ReactNode, Dispatch} from "react";

export type MessageType = "success" | "error" | "warning";
export type ActionType = "ADD_TOAST" | "HIDE_TOAST" | "CLOSE_TOAST";

type ToastType = {
  id: string;
  text: string | null;
  messageType: MessageType;
  isOpen: boolean;
  icon?: ReactNode;
};
type ToastPayloadType = {
  text: string;
  messageType: MessageType;
  id: string;
  icon?: ReactNode;
};
type ToastContextType = {
  toasts: ToastType[];
  toastDispatch: Dispatch<ToastDispatchType>;
};
export type ToastDispatchType = {
  type: ActionType;
  payload?: ToastPayloadType;
  id?: string;
};

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  toastDispatch: () => {
    throw new Error("toastDispatch function not implemented");
  },
});

const initialToasts: ToastType[] = [];

const toastReducer = (
  state: ToastType[],
  action: ToastDispatchType
): ToastType[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return action.payload
        ? [...state, {...action.payload, isOpen: true}]
        : state;

    case "HIDE_TOAST":
      return state.map(toast =>
        toast.id === action.id ? {...toast, isOpen: false} : toast
      );
    case "CLOSE_TOAST":
      return state.filter(toast => toast.id !== action.id);
    default:
      return state;
  }
};

const ToastContextWrap = ({children}: {children: ReactNode}) => {
  const [toasts, toastDispatch] = useReducer(toastReducer, initialToasts);

  return (
    <ToastContext.Provider value={{toasts, toastDispatch}}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextWrap;
