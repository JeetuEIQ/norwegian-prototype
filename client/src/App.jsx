import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeCourse } from './pages/Home/HomeCourse';
import { Course } from './pages/Course/Course';
import { ViewCourse } from './pages/ViewCourse/ViewCourse';
import { CoursePage } from './pages/CoursePage/CoursePage';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { Form } from './components/Form/Form';
import { FormContextProvider } from "./context/FormContext";
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';
import { Library } from './components/Library/Library';
import { Revision } from './components/Revision/Revision';

function App() {
  return (
    <BrowserRouter>
      <FormContextProvider>
        <Routes>
          <Route path='/form' element={<Form />} />
          <Route path='/library' element={<Library />} />
          <Route path='/revision' element={<Revision />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Login />} />
          <Route path="/home-course" element={<HomeCourse />} />
          <Route path="/course-builder" element={<Course />} />
          <Route path="/view-course" element={<ViewCourse />} />
          <Route path="/course-page" element={<CoursePage />} />
          <Route path="/admin-page" element={<AdminPage />} />
        </Routes>
      </FormContextProvider>
      {/* <Routes>
        <Route path="/home-course" element={<HomeCourse />} />
        <Route path="/course-builder" element={<Course />} />
        <Route path="/view-course" element={<ViewCourse />} />
        <Route path="/course-page" element={<CoursePage />} />
        <Route path="/admin-page" element={<AdminPage />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
