import MultiDelivery from "./MultiDelivery.jsx";
import {useState} from "react";

export default function DistributionDataEdit({item}) {
  // New and old subdeliveries state
  const [SubDeliveries, setSubDeliveries] = useState(item.subDelars || []);

  return (
      <div className="max-w-5xl w-full mx-auto py-10 px-4">
        <div className="p-4 space-y-6">
          {/* Header Section */}
          <div className="text-center border-b pb-4 border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white tracking-wide capitalize">
              {item.dealerName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{item.address}</p>
            {/* day, month year*/}
            <p className="text-xs text-gray-400">{item.date}</p>
          </div>

          {/* Product List */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">Product Items</h2>

            <div className="grid grid-cols-2 gap-2">
              {item.TotalSupply.map((supply, index) => {
                const totalGivenToSubDelars = SubDeliveries.reduce((sum, subDelar) => {
                  const matchedProduct = subDelar.products?.find(
                      (p) => p.productName === supply.productName
                  );
                  return sum + (matchedProduct ? Number(matchedProduct.quantity) : 0);
                }, 0);

                const remainingQty = item.subDelars ? supply.quantity - totalGivenToSubDelars : supply.quantity;

                console.log("remainingQty", remainingQty);

                return (
                    <div key={index} className="bg-gray-100 dark:bg-muted p-3 rounded-lg shadow-sm">
                      <p className="text-xs text-gray-700 dark:text-gray-100 capitalize">
                        {supply.ProductName} — <span className="font-medium">{remainingQty} pcs</span>
                      </p>
                    </div>
                );
              })}
            </div>
          </div>

          {/* Delivery List */}
          <MultiDelivery setDeliveries={setSubDeliveries} deliveries={SubDeliveries} item={item} />
        </div>
      </div>
  );
}