const BASE_URL = "http://localhost/trippartner";

const API = {
  VERIFY: `${BASE_URL}/auth/verify.php`,
  GET_TRIPS: `${BASE_URL}/other/get_trips.php`,
  GET_DESTINATION: `${BASE_URL}/other/get_destination.php`,
  CREATE_TRIP: `${BASE_URL}/other/create_trip.php`,
  CREATE_DESTINATION: `${BASE_URL}/other/create_destination.php`,
  JOIN_REQUEST: `${BASE_URL}/other/join_request.php`,
  LOGIN: `${BASE_URL}/auth/login.php`,
  SIGNUP: `${BASE_URL}/auth/signup.php`,
  GET_DESTINATION_BY_ID: `${BASE_URL}/other/get_destination_by_id.php`,
  GET_DESTINATION_INTEREST: `${BASE_URL}/other/get_destination_interest.php`,
  DESTINATION_SECTION: `${BASE_URL}/other/destination_section.php`,
  TRIP_SECTION: `${BASE_URL}/other/trip_section.php`,
  GET_TRIP_DETAILS: `${BASE_URL}/other/get_trip_details.php`,
};

export default API;
