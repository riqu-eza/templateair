import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <Link
          to="/create"
          className="bg-green-500 text-white px-6 py-4 rounded-lg text-center font-medium hover:bg-green-600 transition duration-200 shadow-md"
        >
          Create Listing
        </Link>
        <Link
          to="/book-date"
          className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-medium hover:bg-blue-600 transition duration-200 shadow-md"
        >
          Add Book Date
        </Link>
        <Link
          to="/viewbookings"
          className="bg-purple-500 text-white px-6 py-4 rounded-lg text-center font-medium hover:bg-purple-600 transition duration-200 shadow-md"
        >
          View Bookings
        </Link>
        <Link
          to="/managelisting"
          className="bg-red-500 text-white px-6 py-4 rounded-lg text-center font-medium hover:bg-red-600 transition duration-200 shadow-md"
        >
          Manage Listings
        </Link>
      </div>
    </div>
  );
};

export default Admin;
