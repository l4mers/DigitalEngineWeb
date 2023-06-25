import amenityImages from "../utils/amenityImages";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ComputerCarousel from "./ComputerCarousel";

const VenueProfilePage = () => {
  const googleMapsApiKey = "AIzaSyDuikIx3Dkn_XEYxDzq0JoYz-hp3_fZSsM";
  const [venueData, setVenue] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    const fetchVenue = async () => {
      try {
        const response = await axios.get(
          `https://holidays.imats.se/digital_engine/venue/${id}`
        );
        console.log(response.data);
        setVenue(response.data);
      } catch (error) {
        console.error("Get venue failed:", error);
      }
    };

    fetchVenue();
  }, [id]);

  if (Object.keys(venueData).length === 0) {
    return null;
  }

  return (
    <>
        <>
          <div className="mx-auto w-full overflow-hidden sm:max-w-[1440px]">
          <ComputerCarousel venueData={venueData} />
          </div>
          <main className=" mt-4 sm:mt-10">
            <div className="section-container flex items-baseline gap-4">
              <h2 className="mb-2">{venueData.title}</h2>
            </div>
            <div className="mb-4 h-0.5 w-full bg-primaryRed sm:mb-10"></div>
            <div className="section-container">
              <div className="mb-4 flex flex-wrap justify-between gap-2 text-sm font-bold sm:mb-10 md:text-xl lg:font-semibold">
                <div className="mr-10">
                </div>
                <div className="mr-10">{venueData.venueInfo.squareMeter} m²</div>
                <div className="mr-10">{venueData.venueInfo.price} sek / night</div>
                <div className="mr-10">{venueData.venueInfo.beds} beds</div>
                <div className="mr-10">{venueData.venueInfo.guests} guests</div>
              </div>
              <div>{venueData.description}</div>
              <div className="mb-4 mt-4 flex gap-10 sm:mb-10 sm:mt-10"></div>
              <div className="mb-4 h-0.5 w-full bg-primaryRed sm:mb-10"></div>
              <p className="font-semibold">Owner</p>
              <img className="max-h-[200px] max-w-[125px]" src={venueData.venueOwner.avatar} ></img>
              <p >{venueData.venueOwner.firstName}</p>
              <p >{venueData.venueOwner.lastName}</p>              
              <section className="mt-10 sm:mt-20">
                <p className="font-semibold">
                  {venueData.venueLocation.street + ","}{" "}
                  {venueData.venueLocation.city}
                </p>
                <div className="w-full">
                  <img
                    className="min-h-[200px] w-full rounded object-cover"
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${venueData.venueLocation.street},${venueData.venueLocation.city}&zoom="13"
                    }&size=700x250&scale=2&maptype=roadmap
                  &markers=color:0xFD7E40%7Clabel:%7C59.4334664,17.8277448
                  &key=${googleMapsApiKey}`}
                    alt=""
                  />
                </div>
              </section>
              <section className="mt-4 sm:mt-10">
                <h3 className="mb-4 text-xl leading-[44px] sm:text-[32px]">
                  Amenities
                </h3>
                <div className="flex flex-wrap">
                {
            venueData.amenities.map((amenity, index) => {
              if (amenityImages[amenity]) {
                return (
                        <div
                          key={index}
                          className="mb-4 flex w-1/2 flex-col items-center gap-1 smallScreen:flex-row smallScreen:gap-4 md:w-1/3"
                        >
                          <img
                            className="w-8"
                            src={amenityImages[amenity]}
                            alt={amenity}
                            key={amenity}
                          />
                          <p className="text-center font-semibold smallScreen:text-start">
                            {amenity}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </section>
            </div>
          </main>
        </>
    </>
  );
  };
  
  export default VenueProfilePage;