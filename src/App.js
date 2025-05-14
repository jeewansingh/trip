import "./App.css";
import Destination from "./pages/Destination";
import DestinationTrip from "./pages/DestinationTrip";
import Home from "./pages/Home";

import Trip from "./pages/Trip";
import RouteComponent from "./routes/Route";

function App() {
  return (
    <div className="App">
      <RouteComponent />
      {/* <header className="App-header">
        <Home />
        <Destination />
        <Trip />
        <DestinationTrip />
      </header> */}
    </div>
  );
}

export default App;
