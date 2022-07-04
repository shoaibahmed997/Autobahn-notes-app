import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Layout from './Helper/Layout';
import Dashboard from './Pages/Dashboard';
import AddPost from './Pages/AddPost';
import SinglePost from './Pages/SinglePost';
import UpdatePost from './Components/UpdatePost';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>

              <Route index element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='add' element={<AddPost />} />
              <Route path='posts/:id' element={<SinglePost />} />
              <Route path='update/:id' element={<UpdatePost />} />
          </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
