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
    const totalSupply = item.TotalSupply?.reduce((sum, { quantity }) => sum + Number(quantity), 0) || 0;
    const allocated = item.subDelars?.reduce((sum, subDelar) => {
      return sum + (subDelar.products?.reduce((pSum, product) => pSum + Number(product.quantity), 0) || 0);
    }, 0) || 0;
    const remaining = totalSupply - allocated;

    return { totalSupply, allocated, remaining };
  };

  return (
      <div className="container mx-auto p-2 sm:p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-muted rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {tableHeadData.map((item, index) => (
                  <th
                      key={index}
                      className="py-3 px-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
                  >
                    {item}
                  </th>
              ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {data.map((item) => {
              const { totalSupply, allocated, remaining } = calculateStock(item);

              return (
                  <tr
                      key={item.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-3 px-3 text-xs sm:text-sm whitespace-nowrap">{item.id}</td>
                    <td className="py-3 px-3 text-xs sm:text-sm whitespace-nowrap">{item.dealerName}</td>
                    <td className="py-3 px-3 text-xs sm:text-sm max-w-[120px] sm:max-w-none truncate">
                      {item.address}
                    </td>
                    <td className="py-3 px-3 text-xs sm:text-sm whitespace-nowrap">{totalSupply}</td>
                    <td className="py-3 px-3 text-xs sm:text-sm whitespace-nowrap">{allocated}</td>
                    <td className={`py-3 px-3 text-xs sm:text-sm whitespace-nowrap ${
                        remaining < 0 ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {remaining}
                    </td>
                    <td className="py-3 px-3 text-xs sm:text-sm whitespace-nowrap">
                      {item.subDelars?.length ? (
                          <CheckIcon className="text-green-500 w-4 h-4 sm:w-5 sm:h-5"/>
                      ) : (
                          <XMarkIcon className="text-red-500 w-4 h-4 sm:w-5 sm:h-5"/>
                      )}
                    </td>
                    <td className="py-3 px-3 text-xs sm:text-sm whitespace-nowrap">
                      <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsOpen(true);
                          }}
                          className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                          aria-label="View details"
                      >
                        <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5"/>
                      </button>
                    </td>
                  </tr>
              );
            })}
            </tbody>
          </table>
        </div>

        {/* Modal - Made smaller on mobile */}
        <FramerModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            maxWidth="max-w-5xl" // Smaller max-width for better mobile viewing
        >
          <DistributionItem item={selectedItem} />
        </FramerModal>
      </div>
  );
}