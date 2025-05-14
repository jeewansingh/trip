import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import back from "../icons/chevron-left-black.svg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./css/TripForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TripForm() {
  const navigate = useNavigate();
  const [interestsList, setInterestsList] = useState([]);
  const [destinationsList, setDestinationsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost/trippartner/other/get_destination_interest.php")
      .then((res) => res.json())
      .then((data) => {
        setDestinationsList(data.destinations);
        setInterestsList(data.interests);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const { destination_id } = useParams();

  const [tripData, setTripData] = useState({
    title: "",
    destination_id: "",
    startDate: "",
    endDate: "",
    budget: "",
    gender: "",
    interests: [],
    description: "",
  });

  useEffect(() => {
    fetch("http://localhost/trippartner/other/get_destination_interest.php")
      .then((res) => res.json())
      .then((data) => {
        setDestinationsList(data.destinations);
        setInterestsList(data.interests);

        // Set destination if param exists
        if (destination_id) {
          const matched = data.destinations.find(
            (d) => d.id.toString() === destination_id
          );
          if (matched) {
            setTripData((prev) => ({
              ...prev,
              destination_id: matched.id,
            }));
          }
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [destination_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const toggleInterest = (interest) => {
    setTripData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      title,
      destination_id,
      startDate,
      endDate,
      budget,
      gender,
      interests,
      description,
    } = tripData;

    console.log(tripData);

    if (
      !title ||
      !destination_id ||
      !startDate ||
      !endDate ||
      !gender ||
      !description
    ) {
      toast.error("Please fill out all required fields!");
      return;
    }

    if (interests.length === 0) {
      toast.error("Please select at least one interest!");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      toast.error("End Date cannot be before Start Date!");
      return;
    }

    // Additional validations (optional)
    if (budget && isNaN(parseInt(budget))) {
      toast.warning("Budget should be a number!");
      return;
    }

    // Prepare the data to be sent
    const data = {
      token: localStorage.getItem("token"),
      name: title,
      description: description,
      budget: budget || 0,
      location: destination_id,
      start_date: startDate,
      interests: JSON.stringify(interests),
      end_date: endDate,
      p_gender: gender,
      is_active: 1, // or set as needed
    };

    // Send the data to the backend
    fetch("http://localhost/trippartner/other/create_trip.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/trips");
        }, 2000);
      })
      .catch((err) => {
        console.error("Error submitting data:", err);
        toast.error("Something went wrong!");
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submitted Trip:", tripData);
  //   // Send tripData to backend or state manager
  // };

  return (
    <div>
      <NavBarLoggedIn />
      <div className="form-container">
        <div className="form-go-back" onClick={() => window.history.back()}>
          <img src={back} alt="back" /> Back to all tips
        </div>
        <div className="form-title">Create a New Trip</div>
        <div className="form-subtitle">
          Share your travel plans and find companions for your next adventure
        </div>
        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="form-section-header">Trip Details</div>
          <div className="form-section">
            <label className="form-section-label">Trip Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Trip Title"
              value={tripData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <label>Destination</label>
            <select
              name="destination_id"
              value={tripData.destination_id}
              onChange={handleChange}
            >
              <option value="">Select Destination</option>
              {destinationsList.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={tripData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={tripData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label>Budget</label>
              <input
                type="number"
                name="budget"
                placeholder="Enter Budget"
                value={tripData.budget}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label>Preferred Gender</label>
              <select
                name="gender"
                value={tripData.gender}
                onChange={handleChange}
              >
                <option value="">Select Preferred Gender</option>
                <option value="other">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <label>Trip Activities & Interests</label>
            <div className="interest-tags">
              {interestsList.map((interest) => (
                <span
                  key={interest.id}
                  className={`tag ${
                    tripData.interests.includes(interest.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  {interest.name}
                </span>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label>Trip Description</label>
            <textarea
              name="description"
              placeholder="Describe your trip plans or other any important details."
              value={tripData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="create-trip-button">
            Create Trip
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
}

export default TripForm;

// import React, { useState, useEffect } from "react";
// import Footer from "../components/Footer";
// import NavBarLoggedIn from "../components/NavBarLoggedIn";
// import back from "../icons/chevron-left-black.svg";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import "./css/TripForm.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function TripForm() {
//   const navigate = useNavigate();
//   const [interestsList, setInterestsList] = useState([]);
//   const [destinationsList, setDestinationsList] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost/trippartner/other/get_destination_interest.php")
//       .then((res) => res.json())
//       .then((data) => {
//         setDestinationsList(data.destinations);
//         setInterestsList(data.interests);
//       })
//       .catch((err) => console.error("Error fetching data:", err));
//   }, []);

//   const { destination_id } = useParams();

//   const matchedDestination = destination_id
//     ? destinationsList.find((d) => d.id.toString() === destination_id)
//     : null;

//   const [tripData, setTripData] = useState({
//     title: "",
//     destination_id: matchedDestination ? matchedDestination.name : "",
//     startDate: "",
//     endDate: "",
//     budget: "",
//     gender: "",
//     interests: [],
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTripData({ ...tripData, [name]: value });
//   };

//   const toggleInterest = (interest) => {
//     setTripData((prev) => ({
//       ...prev,
//       interests: prev.interests.includes(interest)
//         ? prev.interests.filter((i) => i !== interest)
//         : [...prev.interests, interest],
//     }));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const {
//       title,
//       destination_id,
//       startDate,
//       endDate,
//       budget,
//       gender,
//       interests,
//       description,
//     } = tripData;

//     if (
//       !title ||
//       !destination_id ||
//       !startDate ||
//       !endDate ||
//       !gender ||
//       !description
//     ) {
//       toast.error("Please fill out all required fields!");
//       return;
//     }

//     if (interests.length === 0) {
//       toast.error("Please select at least one interest!");
//       return;
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     if (end < start) {
//       toast.error("End Date cannot be before Start Date!");
//       return;
//     }

//     // Additional validations (optional)
//     if (budget && isNaN(parseInt(budget))) {
//       toast.warning("Budget should be a number!");
//       return;
//     }

//     // Prepare the data to be sent
//     const data = {
//       token: localStorage.getItem("token"),
//       name: title,
//       description: description,
//       budget: budget || 0,
//       location: destination_id,
//       start_date: startDate,
//       end_date: endDate,
//       p_gender: gender,
//       is_active: 1, // or set as needed
//     };

//     // Send the data to the backend
//     fetch("http://localhost/trippartner/other/create_trip.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams(data),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         toast.success(data.message);
//         setTimeout(() => {
//           navigate("/trips");
//         }, 2000);
//       })
//       .catch((err) => {
//         console.error("Error submitting data:", err);
//         toast.error("Something went wrong!");
//       });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log("Submitted Trip:", tripData);
//   //   // Send tripData to backend or state manager
//   // };

//   return (
//     <div>
//       <NavBarLoggedIn />
//       <div className="form-container">
//         <div className="form-go-back" onClick={() => window.history.back()}>
//           <img src={back} alt="back" /> Back to all tips
//         </div>
//         <div className="form-title">Create a New Trip</div>
//         <div className="form-subtitle">
//           Share your travel plans and find companions for your next adventure
//         </div>
//         <form className="trip-form" onSubmit={handleSubmit}>
//           <div className="form-section-header">Trip Details</div>
//           <div className="form-section">
//             <label className="form-section-label">Trip Title</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Enter Trip Title"
//               value={tripData.title}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-section">
//             <label>Destination</label>
//             <select
//               name="destination_id"
//               value={tripData.destination_id}
//               onChange={handleChange}
//             >
//               <option value="">Select Destination</option>
//               {destinationsList.map((dest) => (
//                 <option key={dest.id} value={dest.id}>
//                   {dest.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-row">
//             <div className="form-section">
//               <label>Start Date</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={tripData.startDate}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-section">
//               <label>End Date</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={tripData.endDate}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-section">
//               <label>Budget</label>
//               <input
//                 type="number"
//                 name="budget"
//                 placeholder="Enter Budget"
//                 value={tripData.budget}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-section">
//               <label>Preferred Gender</label>
//               <select
//                 name="gender"
//                 value={tripData.gender}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Preferred Gender</option>
//                 <option value="other">Any</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-section">
//             <label>Trip Activities & Interests</label>
//             <div className="interest-tags">
//               {interestsList.map((interest) => (
//                 <span
//                   key={interest.id}
//                   className={`tag ${
//                     tripData.interests.includes(interest.id) ? "selected" : ""
//                   }`}
//                   onClick={() => toggleInterest(interest.id)}
//                 >
//                   {interest.name}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="form-section">
//             <label>Trip Description</label>
//             <textarea
//               name="description"
//               placeholder="Describe your trip plans or other any important details."
//               value={tripData.description}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="create-trip-button">
//             Create Trip
//           </button>
//         </form>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Footer />
//     </div>
//   );
// }

// export default TripForm;
