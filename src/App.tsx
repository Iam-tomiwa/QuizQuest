import ToastWidget from "components/ToastWidget";
import HomePage from "pages/Home";
import Quiz from "pages/Quiz";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ToastWidget />
      <div className="page-layout">
        <nav className="w-full flex items-center justify-between py-4 pt-8 border-b">
          <div className="flex gap-x-3">
            <img src="/images/logo.png" alt="quiz logo" />
            <h3 className="font-bold text-xl">QuizQuest</h3>
          </div>
        </nav>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
