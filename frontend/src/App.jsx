import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components /Layout";



const App = () => {
  return (
    <Router> {/* Ensure Routes is inside Router */}
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/study-plans" element={<StudyPlans />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
