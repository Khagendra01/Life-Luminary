import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "../pages/About";

const Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routes;
