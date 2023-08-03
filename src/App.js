import React from "react";
import AllRoutes from "./routes";
import { Provider, connect } from "react-redux";
import Store from "./redux/Store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={Store}>
        <AllRoutes />
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
