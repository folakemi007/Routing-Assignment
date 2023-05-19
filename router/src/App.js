import { Route, Routes } from "react-router-dom";
import StarWars from "./components/StarWars";
import './App.css';
import MovieDetail from "./components/movieDetail";

function App() {
  return (
    <div className="App">
      {/* <StarWars /> */}
  
      <Routes>
        <Route path="/movie/:id" element={<MovieDetail/>}/>
        <Route path="/" element={<StarWars/>}/>
      </Routes>
    </div>
  );
}

export default App;
