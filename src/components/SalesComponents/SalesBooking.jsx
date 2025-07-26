import React from 'react';
import {LabelField, OptionField, SelectField} from "../ui/FromField.jsx";

const SalesBookingData = [
  'Sales Point 1',
  'Sales Point 2',
  'Sales Point 3',


]
export default function SalesBooking() {
  return (
      <div className="bg-accent p-4 shadow rounded-md">
        <h1 className="text-2xl font-bold mb-4">Sales Booking</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <LabelField htmlFor="salesPoint">Sales Point</LabelField>

            <SelectField defaultValue="default">
              <OptionField disabled value="default">Select Delar</OptionField>
              {
                SalesBookingData.map((salesPoint, index) => (
                    <OptionField
                        key={index}
                        value={index + 1}
                    >
                      {salesPoint}
                    </OptionField>
                ))
              }
            </SelectField>
          </div>

          <div className="flex flex-col">
           <LabelField htmlFor="salesPoint">Sales Point</LabelField>
            <SelectField defaultValue="default">
              <OptionField disabled value="default">Select Seller</OptionField>
              {
                SalesBookingData.map((salesPoint, index) => (
                    <OptionField
                        key={index}
                        value={index + 1}
                    >
                      {salesPoint}
                    </OptionField>
                ))
              }
            </SelectField>
          </div>

          <div className="flex flex-col">
            <LabelField htmlFor="salesPoint">Sales Point</LabelField>
            <SelectField defaultValue="default">
              <OptionField disabled value="default">Select Delar</OptionField>
              {
                SalesBookingData.map((salesPoint, index) => (
                    <OptionField
                        key={index}
                        value={index + 1}
                    >
                      {salesPoint}
                    </OptionField>
                ))
              }
            </SelectField>
          </div>
        </div>
      </div>
  );
};
