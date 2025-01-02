/* eslint-disable react/prop-types */
import { FaWifi, FaTv, FaLeaf, FaSpa, FaSwimmingPool } from 'react-icons/fa'; // Adjust imports as needed

// A mapping of amenity names to their corresponding React icons
const amenityIcons = {
  wifi: <FaWifi />,
  tv: <FaTv />,
  fresh: <FaLeaf />, // Change to an appropriate icon
  wellness: <FaSpa />,
  swimming: <FaSwimmingPool/>,
  // Add more amenities and their icons as needed
};

const Amenity = ({ amenity }) => {
  const icon = amenityIcons[amenity.toLowerCase()];

  return (
    <div className="flex items-center m-1 p-2 border border-gray-300 rounded-full text-sm">
      {icon && (
        <span className="mr-2 text-lg">{icon}</span> // Adjust styling as needed
      )}
      <span>{amenity}</span>
    </div>
  );
};

export default Amenity;
