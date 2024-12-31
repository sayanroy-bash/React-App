import Photos from "./Photos";
import { Routes,Route } from "react-router-dom";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <Photos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
