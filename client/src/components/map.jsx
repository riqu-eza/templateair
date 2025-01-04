/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

const Map = ({ isEditable = false, initialPosition, onAddressChange }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Function to load Google Maps API dynamically
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initMap = () => {
      const defaultPosition = initialPosition || { lat: -1.286389, lng: 36.817223 }; // Default to Nairobi

      if (!window.google || !window.google.maps) {
        console.error("Google Maps API is not loaded.");
        return;
      }

      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultPosition,
        zoom: 12,
      });

      const marker = new window.google.maps.Marker({
        position: defaultPosition,
        map: map,
        draggable: isEditable, // Enable dragging only if in "edit" mode
      });

      markerRef.current = marker;

      if (isEditable) {
        marker.addListener("dragend", () => {
          const newLat = marker.getPosition().lat();
          const newLng = marker.getPosition().lng();
          
          reverseGeocode(newLat, newLng);
          onAddressChange?.({ lat: newLat, lng: newLng, address: "" }); // Placeholder
        });
      }
    };

    // Load the Google Maps API script dynamically
    loadGoogleMapsScript()
      .then(() => {
        initMap();
      })
      .catch((error) => {
        console.error("Error loading Google Maps API:", error);
      });

  }, [initialPosition, isEditable, onAddressChange]);

  const reverseGeocode = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        onAddressChange?.({ lat, lng, address });
      } else {
        console.error("Geocode was not successful:", status);
      }
    });
  };

  return (
    <div
      ref={mapRef}
      style={{ height: "300px", width: "100%", marginTop: "20px" }}
      className="border border-gray-300 rounded"
    ></div>
  );
};

export default Map;
