import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Createproperty from "./Admin/Createproperty";
import AdminAddBooking from "./Admin/Adminadddate";
import Admin from "./Admin/Admin";
import BookingForm from "./utility/BookingForm";
import Viewbookings from "./Admin/Viewbookings";
import Managelisting from "./Admin/ManageListing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/create" element={<Createproperty />}></Route>
        <Route path="/book-date" element={<AdminAddBooking />}></Route>
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/viewbookings" element={<Viewbookings />}></Route>
        <Route path="/managelisting" element={<Managelisting/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}
