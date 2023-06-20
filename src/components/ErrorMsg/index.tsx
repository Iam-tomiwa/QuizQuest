import ErrorAlert from "components/Vectors/ErrorAlert";
import "./style.scss";

function ErrorMsg({error}: {error: string}) {
  return (
    <div className="error-msg" style={{margin: "2rem auto", minHeight: "50vh"}}>
      <ErrorAlert />
      <h2 className="text-xl font-semibold">Oops, Error</h2>
      <p>{error}</p>
    </div>
  );
}

export default ErrorMsg;
