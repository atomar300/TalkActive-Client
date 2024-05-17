import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from './components/LoginRegister';
import Chats from './components/Chats';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAccount } from "./redux/actions/userAction"
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Requests from './components/Requests';
import Search from './components/Search';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAccount());
  }, [dispatch])


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" element={<LoginRegister />} />

          <Route element={<PrivateRoute />}>
            <Route path="/chats" element={<Chats />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/search" element={<Search />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
