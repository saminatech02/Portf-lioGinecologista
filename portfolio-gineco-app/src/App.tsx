import React from "react";
import Home from "./pages/Home";
import "./styles/global.css";
import { Analytics } from "@vercel/analytics/next"

const App: React.FC = () => {
  return <Home />;
};

export default App;