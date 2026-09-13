import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import CareerCategories from "./components/CareerCategories";
import WhyNextStep from "./components/WhyNextStep";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CareerAssessment from "./pages/CareerAssessment";
import CareerRecommendations from "./pages/CareerRecommendations";
import CareerDetails from "./pages/CareerDetails";
import AIQuestions from "./pages/AIQuestions";
import CareerCategoryDetails from "./pages/CareerCategoryDetails";

function Home() {
return ( <div className="app"> <div className="grid"></div>


  <Navbar />
  <Hero />
  <HowItWorks />
  <CareerCategories />
  <WhyNextStep />
  <FinalCTA />
  <Footer />
</div>


);
}

function App() {
return ( <Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/assessment" element={<CareerAssessment />} />
<Route
  path="/recommendations"
  element={<CareerRecommendations />}
/>
<Route
  path="/career-details"
  element={<CareerDetails />}
/>
<Route
  path="/assessment/questions"
  element={<AIQuestions />}
/>
<Route
  path="/careers/:category"
  element={<CareerCategoryDetails />}
/>
</Routes>
);
}

export default App;
