import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Amenity from "../utility/amenity";
import BookingForm from "../utility/BookingForm";
import Footer from "../components/footer";
import Viewall from "../utility/images_commect";
// import Map from "../components/map";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(true);
  const [error, setError] = useState(null);

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const propertyDescriptionRef = useRef(null);
  const bookingFormRef = useRef(null);
  const [availability, setAvailability] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/listing/getlisting");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        console.log("result", result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [id]: value, // Dynamically update the field based on input ID
    }));
  };
  const checkAvailability = async () => {
    try {
      const response = await fetch("/api/booking/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to check availability. Please try again.");
      }

      const result = await response.json();

      // Update availability based on result
      if (result.available === true) {
        setAvailability(true);
        bookingFormRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (result.available === false) {
        setAvailability(false);
        setMessage("The selected dates are not available.");
        setTimeout(() => {
          setMessage("");
          setBookingData(""); // Clear the message
        }, 10000);
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setMessage("An error occurred while checking availability.");
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const property = data.length > 0 ? data[0] : null;
  const rules = property.rules;
  // Safely access amenities and rules, defaulting to an empty array if `property` is `null`
  const amenitiesArray =
    property?.amenities?.[0]?.split(",").map((amenity) => amenity.trim()) || [];
  // const rules = property?.rules
  //   ? property.rules.split(",").map((rule) => rule.trim())
  //   : [];
  const mapIframe = property.location.mapurl[0];

  const srcUrl = mapIframe.match(/src="([^"]*)"/)?.[1];

  return (
    <>
      <div className="flex flex-wrap w-full gap-4 m-2 p-4 items-center justify-between">
        {/* Property Name */}
        <div className="flex items-center w-full md:w-auto">
          {property ? (
            <h2 className="text-center font-[Mathitalic] text-2xl md:text-3xl font-bold">
              {property.name}
            </h2>
          ) : (
            <p className="text-center text-lg text-gray-600">
              No property data available.
            </p>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 md:gap-12 w-full md:w-auto justify-center md:justify-end">
          <Link
            to="/"
            className="px-4 py-2 hover:underline text-lg font-medium"
          >
            Home
          </Link>
          <Link
            onClick={() =>
              propertyDescriptionRef.current.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="px-4 py-2 hover:underline text-lg font-medium"
          >
            About
          </Link>
          <Link
            onClick={() =>
              bookingFormRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className="px-4 py-2 hover:underline text-lg font-medium"
          >
            Book Now
          </Link>
        </nav>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[600px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        {property && property.imageUrls?.length > 0 && (
          <img
            src={property.imageUrls[0]}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-6 items-center justify-center p-4 sm:p-6">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center animate-slide-in">
            Great Experiences Are Just Around the Corner
          </h1>
          <p className="text-center text-base sm:text-lg md:text-xl text-white max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
            Welcome to your serene escape! Enjoy the tranquility and comfort of
            this beautiful property, where every moment is an invitation to
            unwind and rejuvenate.
          </p>
        </div>
      </div>

      {/* Booking Form Overlay */}
      <div className="relative flex justify-center -mt-16 p-4">
        <div className="w-full max-w-4xl bg-white bg-opacity-90 p-6 rounded-lg shadow-lg flex flex-wrap items-center gap-4 border border-gray-300">
          {/* Check-in Input */}
          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="checkIn" className="text-sm text-gray-700">
              Check-in
            </label>
            <input
              type="date"
              id="checkIn"
              value={bookingData.checkIn}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Check-out Input */}
          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="checkOut" className="text-sm text-gray-700">
              Check-out
            </label>
            <input
              type="date"
              id="checkOut"
              value={bookingData.checkOut}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Guests Input */}
          <div className="flex flex-col w-full sm:w-1/4">
            <label htmlFor="guests" className="text-sm text-gray-700">
              Guests
            </label>
            <input
              type="number"
              id="guests"
              value={bookingData.guests}
              min="1"
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Check Now Button */}
          <div className="w-full sm:w-auto flex justify-center">
            <button
              onClick={checkAvailability}
              className="p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-200 w-full sm:w-auto"
            >
              Check Now
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="w-full text-center mt-4 text-gray-700">{message}</p>
          )}
        </div>

        {/* Availability Message */}
        {availability !== null && (
          <div className="w-full mt-4 text-center">
            {availability ? (
              <p className="text-green-500">Availability Confirmed</p>
            ) : (
              <p className="text-red-500">Not Available</p>
            )}
          </div>
        )}
      </div>

      {/* Property Description */}
      <div
        ref={propertyDescriptionRef}
        className="p-1 m-1 mt-12 flex flex-col md:flex-row  gap-2 items-center justify-center"
      >
        {property ? (
          <>
            {/* Description Section */}
            <div className="w-full md:w-1/2 md:h-[450px] p-4 text-center text-stone-500 flex flex-col justify-center items-center">
              <p className="first-letter:font-thin first-letter:text-5xl md:first-letter:text-7xl">
                {property.description}
              </p>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
              <div className="w-full max-w-[400px] md:h-[450px] overflow-hidden rounded-xl shadow-lg">
                <img
                  src={property.imageUrls[1]}
                  alt={property.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-stone-500">
            No property data available.
          </p>
        )}
      </div>

      {/* Propert amenities and rules */}
      <div className="p-4 mt-12 flex flex-col md:flex-row gap-4">
  {property ? (
    <>
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-[400px] md:h-[450px] overflow-hidden p-2">
          <img
            src={property.imageUrls[3]}
            alt={property.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Amenities and Rules Section */}
      <div className="w-full md:w-1/2 md:h-[450px] p-2 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 h-1/2">
          {/* Amenities */}
          <div className="w-full md:w-1/2">
            <p className="text-center font-bold">Amenities You Will Find</p>
            <div className="flex flex-wrap justify-center mt-2">
              {amenitiesArray.map((amenity, index) => (
                <Amenity key={index} amenity={amenity} />
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="w-full md:w-1/2">
            <p className="text-left text-base">
              ✔️ We always welcome our visitors @{property.checkInTime}{" "}
              and say a warm goodbye @{property.checkOutTime}
            </p>
            <div className="mt-4">
              {rules.length > 0 && (
                <ul className="list-none space-y-2">
                  {rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✔️</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="border-t p-2 flex items-center justify-center h-1/2">
          <iframe
            src={srcUrl}
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  ) : (
    <p className="text-center w-full text-stone-500">
      No property data available.
    </p>
  )}
</div>


      {/*booking section  */}
      <div
        ref={bookingFormRef}
        className="p-4 mt-8 flex justify-center items-center w-full bg-gray-100 rounded-lg shadow-md"
      >
        <BookingForm
          price={property.pricePerNight}
          initialData={{
            checkInDate: bookingData.checkIn,
            checkOutDate: bookingData.checkOut,
            guestNumber: bookingData.guests,
          }}
          manageremail={property.email}
        />
      </div>

      <div>
        <Viewall property={property} />
      </div>
      <Footer data={property} />
    </>
  );
};

export default Home;
