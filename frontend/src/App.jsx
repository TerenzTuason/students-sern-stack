import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NewStudent from './pages/NewStudent';
import UpdateStudent from './pages/UpdateStudent';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/new_student" element={<NewStudent/>}></Route>
          <Route path="/update/:id" element={<UpdateStudent/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
