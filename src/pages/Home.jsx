import CTAsection from "../components/CTAsection";
import DestinationSection from "../components/DestinationSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import TripSection from "../components/TripSection";

function Home() {
  const loginStatus = 1; // 0 for not logged in, 1 for logged in

  return (
    <div>
      <NavBarLoggedIn />
      {/* <NavBar />
      <NavBarLoggedIn /> */}
      {/* <Hero /> */}
      <TripSection />
      <DestinationSection />

      {/* <CTAsection /> */}
      <Footer />
    </div>
  );
}

export default Home;
