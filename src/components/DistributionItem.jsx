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
      <div className="max-w-5xl w-full mx-auto py-10 px-4">
        <div className="p-4 space-y-6">
          <div className="text-center border-b pb-4 border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-semibold dark:text-white">{item.dealerName}</h1>
            <p className="text-gray-500 dark:text-gray-400">{item.address}</p>
            <p className="text-gray-500 dark:text-gray-400">{date.toDateString()}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl pb-2 text-center font-medium dark:text-gray-200">Products</h2>

            {/* Delivery Table */}
            <div className="grid grid-cols-2 gap-4">
              {item.TotalSupply.map((supply) => {
                const allocated = subDeliveries.reduce((sum, subDelar) => {
                  const matchedProduct = subDelar.products?.find(p => p.ProductName === supply.ProductName);
                  return sum + (matchedProduct ? Number(matchedProduct.quantity) : 0);
                }, 0);
                const remaining = Number(supply.quantity) - allocated;

                return (
                    <div key={supply.id} className="bg-gray-100 grid grid-cols-3 dark:bg-muted p-6 shadow-xl rounded-lg">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm dark:text-gray-100">Product Name</p>
                        <p className="text-sm dark:text-gray-400">{supply.ProductName}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-sm dark:text-gray-100">Available</p>
                        <p className="text-sm text-left dark:text-green-400">{remaining}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-sm dark:text-gray-100">Total supply</p>
                        <p className="text-sm text-left dark:text-amber-600">{supply.quantity}</p>
                      </div>
                    </div>
                );
              })}
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