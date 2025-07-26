import { useState } from "react";
import MultiDelivery from "./MultiDelivery";

export default function DistributionItem({ item }) {
  const [subDeliveries, setSubDeliveries] = useState(item.subDelars || []);

  // ✅ Calculate remaining quantities
  const calculateRemaining = (productName) => {
    const product = item.TotalSupply.find(p => p.ProductName === productName);
    if (!product) return 0;

    const allocated = subDeliveries.reduce((sum, subDelar) => {
      const matchedProduct = subDelar.products?.find(p => p.ProductName === productName);
      return sum + (matchedProduct ? Number(matchedProduct.quantity) : 0);
    }, 0);

    return Number(product.quantity) - allocated;
  };

  // ✅ Add subdealer
  const handleAddSubDealer = (newSubDealer) => {
    const invalidProducts = newSubDealer.products.filter(product => {
      const remaining = calculateRemaining(product.ProductName);
      return Number(product.quantity) > remaining;
    });

    if (invalidProducts.length > 0) {
      alert(`Cannot add: Exceeds available stock for ${invalidProducts.map(p => p.ProductName).join(', ')}`);
      return false;
    }

    setSubDeliveries(prev => [...prev, newSubDealer]);
    return true;
  };

  // Temporary date for testing
  const date = new Date();

  return (
      <div className="max-w-5xl w-full mx-auto py-10">
        <div className="space-y-6">
          <div className="text-center pb-4">
            <h1 className="text-xl md:text-2xl font-semibold dark:text-white">{item.dealerName}</h1>
            <p className="text-gray-500 dark:text-gray-400">{item.address}</p>
            <p className="text-gray-500 dark:text-gray-400">{date.toDateString()}</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl pb-2 text-center font-medium dark:text-gray-200">Products</h2>

            {/* Delivery Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-muted rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    Product Name
                  </th>
                  <th className="py-3 px-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    Available
                  </th>
                  <th className="py-3 px-3 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    Supply
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-muted">
                  {item.TotalSupply.map((supply) => {
                    const allocated = subDeliveries.reduce((sum, subDelar) => {
                      const matchedProduct = subDelar.products?.find(p => p.ProductName === supply.ProductName);
                      return sum + (matchedProduct ? Number(matchedProduct.quantity) : 0);
                    }, 0);
                    const remaining = Number(supply.quantity) - allocated;

                    return (
                        <tr key={supply.id} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-3 px-3 text-sm dark:text-gray-400">{supply.ProductName}</td>
                          <td className="py-3 px-3 text-sm dark:text-green-400">{remaining}</td>
                          <td className="py-3 px-3 text-sm dark:text-amber-600">{supply.quantity}</td>
                        </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Multi Delivery */}
          <MultiDelivery
              item={item}
              deliveries={subDeliveries}
              setDeliveries={setSubDeliveries}
              onAddSubDealer={handleAddSubDealer}
              subDeliveries={subDeliveries}
          />
        </div>
      </div>
  );
}