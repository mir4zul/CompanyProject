import React from 'react';
import SalesBooking from "./SalesComponents/SalesBooking.jsx";
import CreateOrder from "./SalesComponents/CreateOrder.jsx";
import RoadDetails from "./SalesComponents/RoadDetails.jsx";
import BookingDetails from "./SalesComponents/BookingDetails.jsx";
import Category from "./SalesComponents/Category.jsx";
import StockDetails from "./SalesComponents/StockDetails.jsx";
import ProductSales from "./SalesComponents/ProductSales.jsx";
import SlideInModal from "./ui/SlideInModal.jsx";

export default function SalesPage() {
  return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-4 md:col-span-2">
            {/* ------- Sales Booking ---------*/}
            <SalesBooking/>

            {/* ------- Create Order -------  */}
            <CreateOrder/>
          </div>

          <div className="col-span-1 space-y-4">
            {/* ------- Road Details ------- */}
            <RoadDetails/>

            {/* ------- Booking Details ------- */}
            <BookingDetails/>
          </div>

        </div>

        {/* ------- Category -------*/}
        <Category/>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ------- Stock Details ------- */}
          <div className="col-span-1">
            <StockDetails/>
          </div>

          <div className="col-span-2">
            {/* ------- Product Sales ------- */}
            <ProductSales/>
          </div>
        </div>

        <SlideInModal/>
      </div>
  );
};
