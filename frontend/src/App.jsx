import style from "./App.module.css";

import MainPage from "./pages/MainPage/MainPage";
import Error from "./components/error/Error";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "./components/loader/Loader";
import { ViewsNames } from "./features/constants";
import DetailPage from "./pages/DetailPage/DetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  // const [currentComponent,setComponent] = useState(<MainPage />);
  const view = useSelector((state) => state.view.value);

  const errorMessage = useSelector((state) => state.error.value);
  const loading = useSelector((state) => state.loading.value);

  const returnView = (view) => {
    switch (view) {
      case ViewsNames.Login:
        return <LoginPage></LoginPage>;
      case ViewsNames.Main:
        return <MainPage></MainPage>;
      case ViewsNames.Detail:
        return <DetailPage></DetailPage>;
    }
  };

  return (
    <div className={style.main}>
      {returnView(view)}
      {loading ? <Loader></Loader> : ""}
      {errorMessage != "" ? <Error message={errorMessage} /> : ""}
    </div>
  );
}

export default App;
