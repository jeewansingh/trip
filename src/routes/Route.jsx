import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // Import this component
import PublicRoute from "./PublicRoute";
import Destination from "../pages/Destination";
import DestinationTrip from "../pages/DestinationTrip";
import Home from "../pages/Home";
import Trip from "../pages/Trip";
import TripDetails from "../pages/TripDetails";
import TripForm from "../pages/TripForm";
import DestinationForm from "../pages/DestinationForm";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import HeroHome from "../pages/HeroHome";

function RouteComponent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HeroHome />} />
      <Route path="/signin" element={<PublicRoute element={Login} />} />
      <Route path="/signup" element={<PublicRoute element={SignUp} />} />

      {/* Protected Routes */}
      <Route path="/home" element={<ProtectedRoute element={Home} />} />
      <Route
        path="/destinations"
        element={<ProtectedRoute element={Destination} />}
      />
      <Route path="/trips" element={<ProtectedRoute element={Trip} />} />
      <Route
        path="/destination-trip/"
        element={<ProtectedRoute element={Destination} />}
      />
      <Route
        path="/destination-trip/:id"
        element={<ProtectedRoute element={DestinationTrip} />}
      />
      <Route
        path="/trip-details/"
        element={<ProtectedRoute element={Trip} />}
      />
      <Route
        path="/trip-details/:id"
        element={<ProtectedRoute element={TripDetails} />}
      />
      <Route
        path="/create-trip"
        element={<ProtectedRoute element={TripForm} />}
      />
      <Route
        path="/create-destination"
        element={<ProtectedRoute element={DestinationForm} />}
      />
      <Route
        path="/destination-trip/:destination_id/create-trip"
        element={<ProtectedRoute element={TripForm} />}
      />
    </Routes>
  );
}

export default RouteComponent;
