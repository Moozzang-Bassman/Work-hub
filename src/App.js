import './App.css';

import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
// import Workspace from './pages/Workspace';
// import Main from './pages/Main';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Workspace from './pages/Workspace';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Main></Main>
            </>
          }
        ></Route>
        <Route
          path="/workspace"
          element={
            <>
              <Nav />
              <Workspace></Workspace>
            </>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
