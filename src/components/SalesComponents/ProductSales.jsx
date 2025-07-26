import React from 'react';
import {ProductSalesData} from "../../assets/Data.jsx";
import {EyeIcon} from "@heroicons/react/16/solid";
import {AnimatedInputField, InputField, LabelField, SelectField} from "../ui/FromField.jsx";

const headName = [
  'Product Name',
  'Unit',
  'Stock',
  'Tr Price',
  'S Price',
  'Qty',
  'UB No',
  'Ti Price',
  'Action',
];

export default function ProductSales() {
  return (
      <div className="bg-accent p-4 shadow rounded-md">
        <h1 className="text-lg font-bold mb-4 text-center">Add Product to Sales</h1>

        <div className="h-52 overflow-y-auto scrollbar-thin">
          <table className="w-full table-auto">
            <thead className="sticky top-0 bg-accent z-10">
            <tr className="bg-gray-200 dark:bg-gray-900/60"> {/* Header background */}
              {headName.map((head, index) => (
                  <th
                      key={index}
                      className="p-2 text-left text-sm font-semibold"
                  >
                    {head}
                  </th>
              ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
            {ProductSalesData.map((product, index) => (
                <tr
                    key={index}
                    className={
                      index % 2 === 0
                          ? "bg-white dark:bg-secondary/80"  // Even rows
                          : "bg-gray-50 dark:bg-secondary/50" // Odd rows
                    }
                >
                  <td className="p-2 text-xs">{product.productName}</td>
                  <td className="p-2 text-xs">{product.unit}</td>
                  <td className="p-2 text-xs">{product.stock}</td>
                  <td className="p-2 text-xs">{product.trPrice}</td>
                  <td className="p-2 text-xs">{product.sellingPrice}</td>
                  <td className="p-2 text-xs">{product.quantity}</td>
                  <td className="p-2 text-xs">{product.ubNo}</td>
                  <td className="p-2 text-xs ">{product.tiPrice}</td>
                  <td className="p-2 text-xs"><EyeIcon className="h-4 w-4 text-primary"/></td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="col-span-3">

          </div>
          <div className="col-span-2 flex flex-col gap-4">
            <div className="relative h-5 mb-4">
              <AnimatedInputField label="Amount..." name="total" id="total" type="number"/>
            </div>

            <div className="relative h-5 mb-4">
              <AnimatedInputField label="vat (%)..." name="total" id="total" type="number"/>
            </div>

            <div className="">
              <SelectField defaultValue="none" className="text-sm w-full dark:bg-accent text-gray-400 dark:border-gray-500" name="discountType" id="discountType">
                <option className="text-gray-400" value="none" disabled>Discount Type</option>
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
              </SelectField>
            </div>

            <div className="relative h-5 mb-4">
              <AnimatedInputField label="Discount..." name="discount" id="discount" type="number"/>
            </div>

            {/* --------Fixed Discount---------*/}
            <div className="relative h-5 mb-4">
               <AnimatedInputField label="Fixed Discount..." name="fixedDiscount" id="fixedDiscount" type="number"/>
            </div>

            {/* --------Total Amount---------*/}
            <div className="relative h-5 mb-4">
              <AnimatedInputField label="Total Amount..." name="totalAmount" id="totalAmount" type="number"/>
            </div>
          </div>
        </div>
      </div>
  );
};
