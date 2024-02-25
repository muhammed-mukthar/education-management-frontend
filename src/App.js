import { BrowserRouter, Route, Routes } from "react-router-dom";
import Result from "./pages/Result";
import Main from "./pages/Main";
import Quiz from "./pages/Quiz";
import Heading from "./components/Heading";
import HomeComponent from "./pages/home/Home";
import FactsComponent from "./pages/home/FactsComponent";
import LearnMoreComponent from "./pages/home/LearnMoreComonent";
import SolutionsComponent from "./pages/home/SolutionComponent";
import ThreatsComponent from "./pages/home/ThreatsComponent";
import RecommendationsComponent from "./pages/home/RecommendationsComponent";
import CyberSecurityQuizComponent from "./pages/quiz/CyberSecurityQuizComponet";
import Homepage from "./pages/dashboard/Homepage";
import Register from "./pages/dashboard/Register";
import Login from "./pages/dashboard/Login";
import Summary from "./pages/dashboard/Summary";
import Paragraph from "./pages/dashboard/Paragraph";
import ChatBot from "./pages/dashboard/ChatBot";
import JsConverter from "./pages/dashboard/JsConverter";
import ImageGeneration from "./pages/dashboard/ImageGeneration";
import Email from "./pages/dashboard/Email";
import History from "./pages/dashboard/History";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import UserList from "./pages/dashboard/UserList";
import Cybequiz from "./pages/dashboard/Cyberquiz";
import AddQuizOptions from "./pages/dashboard/AddQuizOption";
import MarkSheet from "./pages/teacher/MarkSheet";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<HomeComponent />} path="/"></Route>

          <Route
            element={<RecommendationsComponent />}
            path="/recommendations"
          ></Route>
          <Route element={<CyberSecurityQuizComponent />} path="/cyber"></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Homepage />} />
          <Route path="/history" element={<History />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/quiz" element={<Cybequiz />} />
          <Route path="/add-quiz" element={<AddQuizOptions />} />

          {/* teacher */}
          <Route path="/marks" element={<MarkSheet />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
