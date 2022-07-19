import { BrowserRouter as Router } from "react-router-dom"
import MainRoute from "./routes/MainRoute";
import { UserProvider } from "./UserContext";

function App() {
  return (
      <>
      <UserProvider>
        <Router>
          <MainRoute />
        </Router>
      </UserProvider>
      </>
  );
}

export default App;
