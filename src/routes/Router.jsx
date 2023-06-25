import { Route, Routes } from "react-router-dom";
import BrowseVenuesPage from "../pages/BrowseVenuesPage";
import VenueProfilePage from "../pages/VenueProfilePage";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BrowseVenuesPage />} />
        <Route path="/venue/:id" element={<VenueProfilePage />} />
      </Routes>
    </>
  );
}

export default Router;
