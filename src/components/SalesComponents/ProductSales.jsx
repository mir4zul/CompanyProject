import React from 'react';
import {ProductSalesData} from "../../assets/Data.jsx";
import {EyeIcon} from "@heroicons/react/16/solid";
import {AnimatedInputField, SelectField} from "../ui/FromField.jsx";
import AddNewMulti from "./AddNewMulti.jsx";
import DistributionItem from "../DistributionItem.jsx";
import {FramerModal} from "../../utils/framerModel.jsx";

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

const handleAddMultiDelivery = (newItem) => {
  console.log("Adding sub-dealer:", newItem);
};

export default function ProductSales() {
  const [isModelOpen, setIsModelOpen] = React.useState(false);

  return (
      <div className="bg-accent p-4 shadow rounded-md">
        <h1 className="text-lg font-bold mb-4 text-center">Add Product to Sales</h1>

        <div className="max-h-52 overflow-y-auto scrollbar-thin">
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
            {ProductSalesData?.TotalSupply?.length > 0 ? (
                ProductSalesData.TotalSupply.map((product) => (
                    <tr
                        key={product.id}
                        className={
                          product.id % 2 === 0
                              ? "bg-white dark:bg-secondary/80"
                              : "bg-gray-50 dark:bg-secondary/50"
                        }
                    >
                      <td className="p-2 text-xs">{product.productName}</td>
                      <td className="p-2 text-xs">{product.unit}</td>
                      <td className="p-2 text-xs">{product.stock}</td>
                      <td className="p-2 text-xs">{product.trPrice}</td>
                      <td className="p-2 text-xs">{product.sellingPrice}</td>
                      <td className="p-2 text-xs">{product.quantity}</td>
                      <td className="p-2 text-xs">{product.ubNo}</td>
                      <td className="p-2 text-xs">{product.tiPrice}</td>
                      <td className="p-2 text-xs">
                        <EyeIcon className="h-4 w-4 text-primary"/>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-sm text-gray-500">
                    No products available
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="relative h-5 mb-4">
              <AnimatedInputField label="Amount..." name="total" id="total" type="number"/>
            </div>

            <div className="relative h-5 mb-4">
              <AnimatedInputField label="vat (%)..." name="total" id="total" type="number"/>
            </div>

            <div>
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

            <div className="flex justify-between gap-4 mt-4">
              <button
                  className="bg-gray-500 dark:bg-secondary text-white border border-gray-400 dark:border-gray-600 py-2 px-4 rounded-md"
                  onClick={() => setIsModelOpen(true)}
              >
                Add Multiple Delivery
              </button>

              <button className="bg-green-500 dark:bg-green-600/50 text-white py-2 px-4 rounded-md">Check Out</button>
            </div>
          </div>
        </div>

        <FramerModal
            isOpen={isModelOpen}
            onClose={() => setIsModelOpen(false)}
            maxWidth="max-w-5xl" // Smaller max-width for better mobile viewing
        >
          <DistributionItem item={ProductSalesData} />
        </FramerModal>
      </div>
  );
};
