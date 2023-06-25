import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BrowseVenuesPage = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          "https://holidays.imats.se/digital_engine/get_all_venues"
        );
        console.log("Response data from getVenue", response.data);
        setVenues(response.data);
      } catch (error) {
        console.error("Get venue failed:", error);
      }
    };

    fetchVenues();
  }, []);

    const generateVenueUrl = (venueId) => {
      return `http://localhost:8080/venue/${venueId}`;
      //return `${location.pathname}/venue/${venueId}`;
    };
  
    const truncateTitle = (title, length = 17) => {
      if (title.length > length) {
        return `${title.substring(0, length)}..`;
      }
      return title;
    };

    return (
        <>
      <div className="section-container grid grid-cols-2 gap-x-6 gap-y-12">
        {venues.map((venue, index) => (
            <div
            key={index}
            className="h-fit rounded-b-3xl border-b border-l border-r border-[#9A9A9A] border-opacity-40 px-2 pb-2"
          >
            <NavLink to={generateVenueUrl(venue.id)}>
              <div className="aspect-video max-h-[256px] w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={venue.avatar}
                />
              </div>
            </NavLink>
            <div className="flex flex-col justify-between gap-12 px-4 pb-2.5 pt-[18px]">
              <div className="flex items-start justify-between">
                <div className="w-full">
                  <h3
                    title={venue.title}
                    className="w-3/4 cursor-default text-xl font-bold"
                  >
                    {truncateTitle(venue.title)}
                  </h3>
                  <div className=" flex gap-1.5 text-sm">
                    <p>{venue.beds} beds |</p>
                    <p>{venue.guests} guests</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">{venue.price} sek / night</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
    );
  };
  
  export default BrowseVenuesPage;