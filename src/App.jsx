// import React from "react";
// import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
// import AdminRoutes from "./admin/routes/AdminRoutes";
// import GovtRoutes from "./Govt/routes/Govtroutes";
// import Hotelroutes from "./hotelQr/routes/Hotelroutes";
// import OnlyHotelRoutes from "./hotel/rotues/onlyHotelRoutes";
// import AboutHotelroutes from "./abouthotel/routes/AboutHotelroutes";
// import PrivacyPolicy from "./abouthotel/checkin/PrivacyPolicy";




// const App = () => {
//   return (
//     <HashRouter>

//       <AdminRoutes />
//       <GovtRoutes />
//       <Hotelroutes />
//       <OnlyHotelRoutes />
//       <AboutHotelroutes />
//       <Routes>
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//       </Routes>
//     </HashRouter>
//   );
// };

// export default App;
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AboutHotelroutes from "./abouthotel/routes/AboutHotelroutes";
import AdminRoutes from "./admin/routes/AdminRoutes";
import GovtRoutes from "./Govt/routes/Govtroutes";
import Hotelroutes from "./hotelQr/routes/Hotelroutes";
// import OnlyHotelRoutes from "./hotel/rotues/onlyHotelRoutes";
import OnlyHotelRoutes from "./hotel/rotues/OnlyHotelRoutes";
import All from "./abouthotel/checkin/All"; // 👈 This is your main single-page content
import PrivacyPolicy from "./abouthotel/checkin/PrivacyPolicy";

const App = () => {
  return (
      <HashRouter>
        {/* Global Routes from other modules */}
        <AdminRoutes />
        <GovtRoutes />
        <Hotelroutes />
        <OnlyHotelRoutes />
        {/* <AboutHotelroutes /> */}
        {/* Main Page + Privacy Page Routing */}
        <Routes>
    {/* Home Route */}
    <Route path="/" element={<AboutHotelroutes />} />    
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* 👈 Separate Page */}
        
        </Routes>
      </HashRouter>
  );
};

export default App;
