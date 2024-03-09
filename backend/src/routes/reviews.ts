import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/:hotelId",
  verifyToken,
  async (req: Request, res: Response) => {
    const { text } = req.body;
    const hotelId = req.params.hotelId;
    const userId = req.userId;

    try {
      // Check if the user has a booking for the hotel
      const hotel = await Hotel.findOne({
        _id: hotelId,
        "bookings.userId": userId,
      });

      if (!hotel) {
        return res.status(403).json({ message: "You haven't booked this hotel" });
      }

      // Find the user's name from the booking
      const booking = hotel.bookings.find((b) => b.userId === userId);
      const userName = `${booking?.firstName} ${booking?.lastName}`;

      // Add the review to the hotel
      hotel.reviews.push({ userId, userName, text, createdAt: new Date() });
      await hotel.save();

      res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;