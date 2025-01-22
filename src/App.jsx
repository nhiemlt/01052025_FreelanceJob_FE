import React from "react";

import "./App.css";
import Layout from "./components/Layout";
import AppRouter from "./routers/AppRouter";

function App() {
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <Router>
    //   <Routes>Đây là cái lồn gì</Routes>
    // </Router>
    // <Layout />
    <AppRouter />
  );
}

export default App;
