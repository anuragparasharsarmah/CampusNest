import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useState } from "react";

interface ReviewInputs {
  [hotelId: string]: string | undefined;
}

const MyBookings = () => {
  const { data: hotels } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

  // Maintain separate state for each booking's review input
  const [reviews, setReviews] = useState<ReviewInputs>({});

  const handleReviewChange = (hotelId: string, value: string) => {
    setReviews({ ...reviews, [hotelId]: value });
  };

  const handleReviewSubmit = async (hotelId: string) => {
    const newReview = reviews[hotelId] || ""; // Get review for this specific hotel

    try {
      await apiClient.submitReview(hotelId, newReview);
      setReviews({ ...reviews, [hotelId]: "" }); // Clear review input after submission
      // You may want to refetch the hotel data after submitting a review
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div key={hotel._id} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            {hotel.bookings.map((booking) => (
              <div key={booking._id}>
                <div>
                  <span className="font-bold mr-2">Dates: </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -{" "}
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">
                    Guests: 1 Student ({booking.childCount} sharing)
                  </span>
                </div>
                <div>
                  <input
                    type="text"
                    className="border rounded py-1 px-2 font-normal review-input"
                    placeholder="Leave a review"
                    value={reviews[hotel._id] || ""} // Use specific review value for this hotel
                    onChange={(e) => handleReviewChange(hotel._id, e.target.value)}
                  />
                  <button onClick={() => handleReviewSubmit(hotel._id)} className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-sm ml-2 disabled:bg-gray-500 rounded-lg boxs">
                    Submit Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
