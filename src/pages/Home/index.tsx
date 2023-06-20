import InputField from "components/FormFields/InputField";
import SelectField from "components/FormFields/SelectField";
import useFetch from "hooks/useFetch";
import {CategoryType} from "utils/index.types";
import {FormEvent, useState} from "react";
import {convertObjToParams} from "utils";
import {useNavigate} from "react-router-dom";

function HomePage() {
  const {data: categories, isPending} = useFetch<{
    trivia_categories: CategoryType[];
  }>("/api_category.php");

  const navigate = useNavigate();
  const [quizForm, setquizForm] = useState({
    category: "",
    number: 10,
    difficulty: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/quiz?${convertObjToParams(quizForm)}`);
  };
  return (
    <div className="h-full flex items-center mx-auto justify-center">
      <form onSubmit={onSubmit} className="text-center -mt-10">
        <h2 className="font-bold text-4xl lg:text-5xl mb-3">
          Let's Play Quiz!
        </h2>
        <p>Fill the form below to get started on your favorite trivia.</p>
        <div className="mt-10 space-y-10">
          <InputField
            placeholder="Enter number of questions (max of 10)"
            type="number"
            max={10}
            min={3}
            required
            value={quizForm.number}
            onChange={e => {
              const {value} = e.target;
              setquizForm({
                ...quizForm,
                number: parseInt(value),
              });
            }}
            name="question count"
            label={"No. Of Question"}
          />
          <SelectField
            name="category"
            value={quizForm.category}
            onChange={e => {
              const {value} = e.target;
              setquizForm({
                ...quizForm,
                category: value,
              });
            }}
            required
            loading={isPending}
            label={"Category"}
            placeholder="Select category"
            options={
              categories
                ? categories?.trivia_categories.map(el => ({
                    label: el.name,
                    value: el.id.toString(),
                  }))
                : [""]
            }
          />
          <SelectField
            name="Difficulty"
            value={quizForm.difficulty}
            required
            onChange={e => {
              const {value} = e.target;
              setquizForm({
                ...quizForm,
                difficulty: value,
              });
            }}
            label={"Difficulty level"}
            placeholder="Select difficulty"
            options={["Easy", "Medium", "Hard"].map(el => ({
              label: el,
              value: el.toLowerCase(),
            }))}
          />
          <button type="submit" className="w-full btn">
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default HomePage;
