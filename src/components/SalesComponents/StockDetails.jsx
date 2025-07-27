import {StockDetailsData} from "../../assets/Data.jsx";

const headName = [
  'Product ID',
  'Product Name',
  'Quantity',
];

export default function StockDetails() {
  return (
      <div className="bg-accent p-4 shadow rounded-md">
        <h1 className="text-lg font-bold mb-4 text-center">Stock Details</h1>

        <div className="overflow-x-auto h-[38.7rem] scrollbar-thin rounded">
          <table className="w-full table-auto">
            <thead>
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
            {StockDetailsData.map((stock, index) => (
                <tr
                    key={index}
                    className={
                      index % 2 === 0
                          ? "bg-white dark:bg-secondary/80"  // Even rows
                          : "bg-gray-50 dark:bg-secondary/50" // Odd rows
                    }
                >
                  <td className="p-2 text-xs">{stock.productId}</td>
                  <td className="p-2 text-xs">{stock.productName}</td>
                  <td className="p-2 text-xs">{stock.quantity}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}