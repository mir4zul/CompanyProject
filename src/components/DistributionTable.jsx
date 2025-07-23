import { useState } from "react";
import { CheckIcon, EyeIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { FramerModal } from "../utils/framerModel";
import DistributionItem from "./DistributionItem.jsx";

const tableHeadData = [
  'Dealer ID',
  'Dealer Name',
  'Address',
  'Total Supply',
  'Allocated',
  'Remaining',
  'Multi Delivery',
  'Action'
];

export default function DistributionTable({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const calculateStock = (item) => {
    const totalSupply = item.TotalSupply.reduce((sum, { quantity }) => sum + Number(quantity), 0);
    const allocated = item.subDelars?.reduce((sum, subDelar) => {
      return sum + (subDelar.products?.reduce((pSum, product) => pSum + Number(product.quantity), 0) || 0);
    }, 0) || 0;
    const remaining = totalSupply - allocated;

    return { totalSupply, allocated, remaining };
  };

  return (
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white dark:bg-muted">
          <thead>
          <tr>
            {tableHeadData.map((item, index) => (
                <th key={index} className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                  {item}
                </th>
            ))}
          </tr>
          </thead>
          <tbody className="dark:bg-secondary">
          {data.map((item) => {
            const { totalSupply, allocated, remaining } = calculateStock(item);

            return (
                <tr key={item.id} className="border-b border-gray-200 dark:border-gray-600">
                  <td className="py-2 px-4 text-sm">{item.id}</td>
                  <td className="py-2 px-4 text-sm">{item.dealerName}</td>
                  <td className="py-2 px-4 text-sm">{item.address}</td>
                  <td className="py-2 px-4 text-sm">{totalSupply}</td>
                  <td className="py-2 px-4 text-sm">{allocated}</td>
                  <td className={`py-2 px-4 text-sm ${
                      remaining < 0 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {remaining}
                  </td>
                  <td className="py-2 px-4 text-sm">
                    {item.subDelars?.length ? (
                        <CheckIcon className="text-green-500 w-5 h-5"/>
                    ) : (
                        <XMarkIcon className="text-red-500 w-5 h-5"/>
                    )}
                  </td>
                  <td className="py-2 px-4  text-sm">
                    <EyeIcon
                        onClick={() => {
                          setSelectedItem(item);
                          setIsOpen(true);
                        }}
                        className="w-5 h-5 hover:text-blue-500 cursor-pointer"
                    />
                  </td>
                </tr>
            );
          })}
          </tbody>
        </table>

        <FramerModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DistributionItem item={selectedItem} />
        </FramerModal>
      </div>
  );
}