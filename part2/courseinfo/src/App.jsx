import { useState } from "react";
import Course from "./Components/Course";
import courses from "./Data/Courses";
const App = () => {
  return courses.map((course) => <Course key={course.id} course={course} />);
};

export default App;
