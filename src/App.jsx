import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home";
import Navbar from "./components/navbar/navbar";
import Coin from "./routes/home/coin/coin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin" element={<Coin />}>
          <Route path=":coinId" element={<Coin />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
