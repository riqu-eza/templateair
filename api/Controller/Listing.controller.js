import Listing from "../Model/Listing.model.js";

export const CreateListing = async (req, res, next) => {
    console.log(req.body);
    try {
      const listing = await Listing.create(req.body);
      console.log("saved", listing);
      return res.status(200).json(listing);
    } catch (e) {
      next(e);
    }
  };
  
  export const GetListing = async (req, res, next) => {
    try {
      const listing = await Listing.find();
      res.status(200).json(listing);
    } catch (e) {
      next(e);
    }
  };


  export const updateListing = async (req, res, next) => {
    const { id } = req.params;
    try {
      const updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedListing) return res.status(404).json({ message: "Listing not found" });
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };

  export const deleteListing = async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedListing = await Listing.findByIdAndDelete(id);
      if (!deletedListing) return res.status(404).json({ message: "Listing not found" });
      res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

