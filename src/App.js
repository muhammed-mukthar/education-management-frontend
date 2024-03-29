import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import StudentSheet from "./pages/teacher/StudentSheet";
import StudentMarksheet from "./pages/student/StudentMarksheet";
import TeacherTestListing from "./pages/teacher/TeacherTestListing";
import StudentTestListing from "./pages/student/StudentTestListing";
import StudentTestResults from "./pages/teacher/StudentTestResults";
import { useSelector } from "react-redux";
import FileUpload from "./pages/teacher/FileUpload";
import { Toaster } from "react-hot-toast";
import FileListing from "./pages/student/FileListing";
import StudentList from "./pages/dashboard/StudentList";
import TeacherList from "./pages/dashboard/TeacherList";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const userData = useSelector((state) => state.userId.userData);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Toaster
          position="top-center"
          gutter={22}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
        <Routes>
          <Route element={<HomeComponent />} path="/"></Route>
          <Route
            element={<RecommendationsComponent />}
            path="/recommendations"
          ></Route>
          <Route element={<CyberSecurityQuizComponent />} path="/cyber"></Route>
          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
          <Route
            path="/register"
            element={userData ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/login"
            element={userData ? <Navigate to="/dashboard" /> : <Login />}
          />
          {/* Other routes... */}

          <Route path="/dashboard" element={<Homepage />} />
          <Route path="/history" element={<History />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/student" element={<StudentList />} />
          <Route path="/teacher" element={<TeacherList />} />

          <Route path="/quiz/:id" element={<Cybequiz />} />
          <Route path="/add-quiz/:id" element={<AddQuizOptions />} />
          {/* teacher */}
          <Route path="/marks" element={<MarkSheet />} />
          <Route path="/mark/:id" element={<StudentSheet />} />
          <Route path="/teacher-tests" element={<TeacherTestListing />} />
          <Route path="/result/:id" element={<StudentTestResults />} />
          <Route path="/files" element={<FileUpload />} />

          {/* STUDENT */}
          <Route path="/mark-list" element={<StudentMarksheet />} />
          <Route path="/file-listing" element={<FileListing />} />

          <Route path="/student-tests" element={<StudentTestListing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
