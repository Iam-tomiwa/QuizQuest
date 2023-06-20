import CloseIcon from "components/Vectors/CloseIcon";
import SuccessCheck from "components/Vectors/SuccessCheck";
import ErrorAlert from "components/Vectors/ErrorAlert";
import {ToastContext} from "contexts/ToastContext";
import {useContext} from "react";

const ToastWidget = () => {
  const {toasts, toastDispatch} = useContext(ToastContext);

  return (
    <div className="fixed text-black right-4 top-0 grid gap-y-4 pr-5 pt-5 z-[2000]">
      {toasts.map(toast => (
        <div
          style={{boxShadow: "0px 20px 20px rgb(0 0 0 / 10%)"}}
          className={`md:min-w-[27rem] max-w-[20rem] rounded-lg md:p-4 p-[0.8125rem]  bg-white flex space-x-4 ${
            toast.isOpen ? "animate-slide" : "translate-x-[150vw]"
          } transition-transform duration-700`}
          key={`toast-${toast.id}`}
        >
          <div className="min-w-[40px]">
            {toast.messageType === "success" ? (
              <SuccessCheck />
            ) : (
              <ErrorAlert />
            )}
          </div>
          <div className="flex-grow flex flex-col">
            <span className="text-[0.875rem] md:text-lg font-semibold">
              {toast.messageType === "success"
                ? "Success!"
                : "Something went wrong!"}
            </span>
            <p className="text-gray-500 text-[0.8125rem] md:text-base">
              {toast.text}
            </p>
          </div>
          <div
            onClick={() => toastDispatch({type: "CLOSE_TOAST", id: toast.id})}
            className="cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastWidget;
