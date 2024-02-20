import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiArea, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <span>No Hostels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between pb-4">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "Segoe UI" }}>My Hostel(s)</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-lg boxs" style={{ fontFamily: "Segoe UI" }}
        >
          Add Hostel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8 ">
        {hotelData.map((hotel) => (
          <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold" style={{ fontFamily: "Segoe UI" }}>{hotel.name}</h2>
            <div className="whitespace-pre-line" style={{ fontFamily: "Segoe UI" }}>{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2" style={{ fontFamily: "Segoe UI" }}>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center rounded-lg" style={{ fontFamily: "Segoe UI" }}>
                <BsMap className="mr-4" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center" style={{ fontFamily: "Segoe UI" }}>
                <BsBuilding className="mr-4" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center" style={{ fontFamily: "Segoe UI" }}>
                <BiMoney className="mr-4" />₹{hotel.pricePerNight}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center" style={{ fontFamily: "Segoe UI" }}>
                <BiArea className="mr-4" />
                {hotel.adultCount} km distance, <br></br>{hotel.childCount} bed(s)
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center" style={{ fontFamily: "Segoe UI" }}>
                <BiStar className="mr-4" />
                {hotel.starRating} Hostel Review
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-lg boxs" style={{ fontFamily: "Segoe UI" }}
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
