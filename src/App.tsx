import "./styles/_global.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./pages/Main";
import NotFoundPage from "./pages/NotFound";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  //Basic router for handling non-existent routs
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
