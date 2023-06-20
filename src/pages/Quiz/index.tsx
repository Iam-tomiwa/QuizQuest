import RadioField, {RadioFieldProps} from "components/FormFields/RadioField";
import LinearProgressBar from "components/ProgressBar";
import useFetch from "hooks/useFetch";
import {useMemo, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {parseHtmlString, shuffleArray} from "utils";
import {QuestionType} from "utils/index.types";
import Result from "./Result";

function Quiz() {
  // get params from the url
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "";
  const difficulty = params.get("difficulty") || "";
  const number = params.get("number");

  // fetch questions from api
  const {data, isPending} = useFetch<{
    results: QuestionType[];
  }>(
    `/api.php?category=${category}&difficulty=${difficulty}&amount=${number}&type=multiple`
  );

  const [currentCount, setCurrentCount] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  /**
   * Calculate and update the score based on the selected answers.
   */
  const calculateScore = () => {
    let totalScore = 0;
    answers.forEach((answer, index) => {
      const question = data?.results[index];
      if (question && answer === question.correct_answer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
    setCurrentCount(prev => prev + 1);
  };

  // get questions in a memo to prevent unnecessary rerenders
  const questions = useMemo(
    () =>
      data?.results.map(el => ({
        ...el,
        options: shuffleArray(el.incorrect_answers.concat(el.correct_answer)),
      })) || [],
    [data?.results]
  );
  const currentQuestion = questions[currentCount];

  /**
   * Handle the change of the selected answer.
   * @param selectedAnswer - The selected answer.
   */
  const handleAnswerChange = (selectedAnswer: string) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentCount] = selectedAnswer;
      return updatedAnswers;
    });
  };

  const Option = ({
    label,
    value,
    ...props
  }: {label: string; value: string} & RadioFieldProps) => (
    <label className="group cursor-pointer relative">
      <RadioField
        className="absolute top-[50%] -translate-y-[50%] left-4"
        {...props}
        value={value}
        checked={answers[currentCount] === value}
        onChange={e => handleAnswerChange(e.target.value)}
      />
      <p
        className={`border border-borderClr ${
          answers[currentCount] === value ? "border-primary" : ""
        } flex items-center gap-3 rounded-lg p-5 pl-14 w-full font-medium`}
      >
        {label}
      </p>
    </label>
  );

  // display loader when api is fetching data
  if (isPending)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="relative -mt-20 h-20 w-20">
          <div className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <img
            src="/images/logo.png"
            alt=""
            className="absolute top-1/2 -translate-x-[50%] -translate-y-[50%] left-1/2"
          />
        </div>
      </div>
    );
  return (
    <div className="h-full flex flex-col mx-auto justify-center">
      {currentQuestion && currentCount <= questions.length ? (
        <>
          <div className="md:hidden block">
            <div className="flex justify-between items-center">
              <p className="text-primary text-sm mb-1 font-semibold">
                Question {currentCount + 1} of {questions.length}
              </p>
              <Link
                to="/"
                className="rounded-xl text-sm bg-transparent p-2 hover:bg-primary-100 transition-colors font-semibold text-primary"
              >
                Restart
              </Link>
            </div>

            <LinearProgressBar
              value={((currentCount + 1) / parseInt(number || "10")) * 100}
            />
          </div>
          <div className="my-auto">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-primary hidden md:block text-sm mb-1 font-semibold">
                  Question {currentCount + 1} of {questions.length}
                </p>
                <h4 className="text-xl md:max-w-[85%]">
                  {parseHtmlString(currentQuestion.question)}
                </h4>
              </div>
              <Link
                to="/"
                className="rounded-xl hidden md:block bg-transparent p-2 hover:bg-primary-100 transition-colors font-semibold text-primary"
              >
                Restart
              </Link>
            </div>
            <div className="mt-8">
              <div className="grid gap-3 grid-cols-1">
                {currentQuestion.options.map(el => (
                  <Option
                    key={el}
                    label={parseHtmlString(el) || ""}
                    value={el}
                    id={el}
                    name={currentQuestion.question}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex mt-auto mb-6 items-center justify-between gap-6">
            <button
              onClick={() =>
                setCurrentCount(prevPage => (prevPage > 0 ? prevPage - 1 : 0))
              }
              className="btn btn-outlined"
            >
              Back
            </button>
            <div className="hidden md:block flex-grow">
              <LinearProgressBar
                value={((currentCount + 1) / parseInt(number || "10")) * 100}
              />
            </div>
            {currentCount + 1 < (data?.results.length || 1) && (
              <button
                disabled={!answers[currentCount]}
                onClick={() =>
                  setCurrentCount(prevPage =>
                    (data?.results.length || 1) > prevPage
                      ? prevPage + 1
                      : prevPage
                  )
                }
                className="btn"
              >
                Next
              </button>
            )}
            {currentCount + 1 === (data?.results.length || 1) && (
              <button
                disabled={!answers[currentCount]}
                onClick={calculateScore}
                className="btn"
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <Result score={score} total={questions.length} />
      )}
    </div>
  );
}

export default Quiz;
