/* eslint-disable react/prop-types */
// BookingForm.js
import { useState, useEffect } from "react";

const BookingForm = ({ price, initialData, manageremail }) => {
  const [checkInDate, setCheckInDate] = useState(
    initialData?.checkInDate || ""
  );
  const [checkOutDate, setCheckOutDate] = useState(
    initialData?.checkOutDate || ""
  );

  const [totalNights, setTotalNights] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [guestNumber, setGuestNumber] = useState(initialData?.guestNumber || 1);

  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false); // State for loading

  // Calculate total nights and cost
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalNights(nights);
      setTotalCost(nights * price);
    }
  }, [checkInDate, checkOutDate, price]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    // Validate form details
    const { firstName, lastName, email, phone } = formDetails;
    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all personal details.");
      setLoading(false); // Stop loading
      return;
    }

    // Form data to send to the API
    const bookingData = {
      checkInDate,
      checkOutDate,
      guestNumber,
      totalNights,
      totalCost,
      manageremail,
      formDetails,
    };

    console.log("bookingData", bookingData); // Log for debugging

    try {
      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.message || "Error submitting booking");
      }

      const data = await response.json();
      console.log("Booking successful:", data);
      alert("Booking submitted successfully!");

      // Optionally reset form fields
      setCheckInDate("");
      setCheckOutDate("");
      setGuestNumber(1);
      setTotalNights(0);
      setTotalCost(0);
      setFormDetails({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting the booking: " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="border-black border-2 rounded-md p-4 w-full max-w-5xl mx-auto bg-white shadow-lg">
      <h4 className="text-lg font-semibold mb-4">
        Book Now{" "}
        <span className="italic text-green-500">Ksh {price} per night</span>
      </h4>

      {/* Booking Details */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {/* Check-In and Check-Out Details */}
        <div className="border border-gray-300 p-4 w-full sm:w-[350px] md:w-[350px] rounded-lg">
          <label className="block mb-2">
            Check-In Date:
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Check-Out Date:
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Number of Guests:
            <input
              type="number"
              value={guestNumber}
              onChange={(e) => setGuestNumber(e.target.value)}
              min="1"
              className="p-2 border border-gray-300 rounded w-full mt-1"
              required
            />
          </label>
          <p className="text-gray-600 mt-2">Total Nights: {totalNights}</p>
        </div>

        {/* Personal Details */}
        <div className="border border-gray-300 p-4 w-full sm:w-[350px] md:w-[350px] rounded-lg">
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              name="firstName"
              value={formDetails.firstName}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formDetails.lastName}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formDetails.email}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Phone:
            <input
              type="tel"
              name="phone"
              value={formDetails.phone}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full mt-1"
              required
            />
          </label>
        </div>

        {/* Confirmation Section */}
        <div className="border border-gray-300 p-4 w-full sm:w-[350px] md:w-[350px] rounded-lg flex flex-col justify-between">
          <p className="text-gray-600">
            Stay From: {checkInDate || "N/A"} to {checkOutDate || "N/A"}
          </p>
          <p className="text-gray-600">Total Cost: Ksh {totalCost}</p>
          <button
            type="button"
            className={`py-2 px-4 rounded mt-4 transition duration-200 ${
              loading
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
