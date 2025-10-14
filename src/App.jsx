import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import BrowseCourses from './pages/student/BrowseCourses';
import MyCourses from './pages/student/MyCourses';
import CourseDetails from './pages/student/CourseDetails';
import MyPayments from './pages/student/MyPayments';

// Instructor Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import CreateCourse from './pages/instructor/CreateCourse';
import InstructorMyCourses from './pages/instructor/MyCourses';
import EditCourse from './pages/instructor/EditCourse';
import InstructorCourseDetails from './pages/instructor/CourseDetails';
import UploadContent from './pages/instructor/UploadContent';
import EnrolledStudents from './pages/instructor/EnrolledStudents';
import Checkout from './pages/student/Checkout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PendingCourses from './pages/admin/PendingCourses';
import AllUsers from './pages/admin/AllUsers';
import AllCourses from './pages/admin/AllCourses';
import Reports from './pages/admin/Reports';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>

              {/* Student Routes */}
              <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['Student']}><StudentDashboard/></ProtectedRoute>}/>
              <Route path="/student/browse-courses" element={<ProtectedRoute allowedRoles={['Student']}><BrowseCourses/></ProtectedRoute>}/>
              <Route path="/student/my-courses" element={<ProtectedRoute allowedRoles={['Student']}><MyCourses/></ProtectedRoute>}/>
              <Route path="/student/course/:courseId" element={<ProtectedRoute allowedRoles={['Student']}><CourseDetails/></ProtectedRoute>}/>
              <Route path="/student/checkout/:courseId" element={<ProtectedRoute allowedRoles={['Student']}><Checkout/></ProtectedRoute>}/>
              <Route path="/student/my-payments" element={<ProtectedRoute allowedRoles={['Student']}><MyPayments/></ProtectedRoute>}/>

              {/* Instructor Routes */}
              <Route path="/instructor/dashboard" element={<ProtectedRoute allowedRoles={['Instructor']}> <InstructorDashboard/></ProtectedRoute>}/>
              <Route path="/instructor/create-course" element={<ProtectedRoute allowedRoles={['Instructor']}><CreateCourse/></ProtectedRoute>}/>
              <Route path="/instructor/my-courses" element={<ProtectedRoute allowedRoles={['Instructor']}><InstructorMyCourses/></ProtectedRoute>}/>
              <Route path="/instructor/edit-course/:courseId"  element={<ProtectedRoute allowedRoles={['Instructor']}><EditCourse/></ProtectedRoute>}/>
              <Route path="/instructor/course/:courseId" element={<ProtectedRoute allowedRoles={['Instructor']}><InstructorCourseDetails/></ProtectedRoute>}/>
              <Route path="/instructor/upload-content/:courseId" element={<ProtectedRoute allowedRoles={['Instructor']}><UploadContent/></ProtectedRoute>}/>
              <Route path="/instructor/enrolled-students/:courseId" element={<ProtectedRoute allowedRoles={['Instructor']}><EnrolledStudents/></ProtectedRoute>}/>

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboard/></ProtectedRoute>}/>
              <Route path="/admin/pending-courses"  element={<ProtectedRoute allowedRoles={['Admin']}><PendingCourses/></ProtectedRoute>}/>
              <Route path="/admin/all-users"  element={<ProtectedRoute allowedRoles={['Admin']}><AllUsers/></ProtectedRoute>}/>
              <Route path="/admin/all-courses" element={<ProtectedRoute allowedRoles={['Admin']}><AllCourses /> </ProtectedRoute>}/>
              <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['Admin']}><Reports /> </ProtectedRoute>}/>

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" />} />
              
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;