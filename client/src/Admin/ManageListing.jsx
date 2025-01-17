import { useState, useEffect } from "react";

const Managelisting = () => {
  const [listings, setListings] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch listings
  const fetchListings = async () => {
    try {
      const response = await fetch("/api/listing/getlisting");
      if (!response.ok) throw new Error("Failed to fetch listings");
      const data = await response.json();
      setListings(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching listings:", error.message);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle updating a listing
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingItem) {
      console.error("No item selected for updating");
      return;
    }

    const url = `/api/listing/update/${editingItem._id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update listing");
      await fetchListings(); // Refresh listings after updating
      setEditingItem(null);
      setFormData({}); // Reset form
    } catch (error) {
      console.error("Error updating listing:", error.message);
    }
  };

  // Delete a listing
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const response = await fetch(`/api/listing/delete/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete listing");
      await fetchListings(); // Refresh listings after deletion
    } catch (error) {
      console.error("Error deleting listing:", error.message);
    }
  };

  // Fetch listings on component mount
  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Listings</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Price/Night</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id} className="border-t">
                <td className="py-3 px-4">{listing.name}</td>
                <td className="py-3 px-4">{listing.type}</td>
                <td className="py-3 px-4">${listing.pricePerNight}</td>
                <td className="py-3 px-4">
                  {listing.location.country}, {listing.location.county}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingItem(listing);
                      setFormData(listing);
                    }}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {editingItem && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Edit Listing</h2>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price/Night
                  </label>
                  <input
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={`${formData.location?.country || ""}, ${
                      formData.location?.county || ""
                    }`}
                    className="mt-1 p-2 block w-full border rounded"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Check-In Time
                  </label>
                  <input
                    type="text"
                    name="checkInTime"
                    value={formData.checkInTime || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Check-Out Time
                  </label>
                  <input
                    type="text"
                    name="checkOutTime"
                    value={formData.checkOutTime || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amenities
                  </label>
                  <input
                    type="text"
                    name="amenities"
                    value={formData.amenities || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border rounded"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border rounded"
                  required
                />
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setFormData({});
                  }}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Managelisting;
