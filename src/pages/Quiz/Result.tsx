import Rings from "components/Vectors/Rings";
import {Link} from "react-router-dom";

// Object that maps grades to corresponding phrases
const GRADE: {[key: string]: string} = {
  75: "You're the ruler of the quest, reigning supreme!",
  50: "You're the commander of the quest, leading with authority!",
  0: "You're still on your quest, keep pushing forward!",
};

function Result({score, total}: {score: number; total: number}) {
  // Find the grade threshold based on the score and total
  const gradePercent = (score / total) * 100;
  const gradeThreshold =
    gradePercent >= 75 ? 75 : gradePercent > 50 && gradePercent < 75 ? 50 : 0;

  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <div className="relative">
        <Rings />
        <img
          src="/images/trophy.png"
          alt="trophy"
          className="absolute w-[60%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <h2 className="font-bold text-4xl lg:text-5xl mb-3">
        {score} out of {total}
      </h2>
      <h4 className="text-xl font-semibold">Congratulations!</h4>
      <p>{GRADE[gradeThreshold]}</p>

      <Link to={"/"} className="btn my-4 min-w-[200px]">
        Go Again
      </Link>
    </div>
  );
}

export default Result;
