import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Layout } from "./components/Layout";
import Edit from "./pages/Edit";
import Trash from "./pages/Trash";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4e6899",
    },
    secondary: {
      main: "#7f4e99",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"],
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function App() {


  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route exact path="/trash">
              <Trash />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/notes/*">
              <Edit />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
