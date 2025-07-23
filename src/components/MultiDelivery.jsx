import React, { useState } from "react";
import {
  EllipsisVerticalIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/16/solid/index.js";
import AddMultiDelivery from "./AddMultiDelivery.jsx";
import { FramerDropdown } from "./ui/framerDropdown.jsx";
import EditMultiDelivery from "./EditMultiDelivery.jsx";
import clsx from "clsx";

export default function MultiDelivery({ item, deliveries, setDeliveries }) {
  const [editingItem, setEditingItem] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [expandedDeliveries, setExpandedDeliveries] = useState({});

  console.log("deliveries", deliveries);
  // Toggle expanded state for a delivery
  const toggleDeliveryExpansion = (deliveryIndex) => {
    setExpandedDeliveries(prev => ({
      ...prev,
      [deliveryIndex]: !prev[deliveryIndex]
    }));
  };

  // Handle multi delivery remove
  const removeMultiDelivery = (deliveryIndex) => {
    setDeliveries(prev => prev.filter((_, index) => index !== deliveryIndex));
    setIsDropdownOpen(null);
  };

  // Handle add product
  const handleAddProduct = (deliveryIndex) => {
    const updatedDeliveries = [...deliveries];
    updatedDeliveries[deliveryIndex].products = [
      ...(updatedDeliveries[deliveryIndex].products || []),
      { ProductName: '', quantity: 0, id: Date.now() }
    ];
    setDeliveries(updatedDeliveries);
    setIsDropdownOpen(null);
  };

  // Handle Add Multi Delivery
  const handleAddMultiDelivery = (newItem) => {
    // Generate new ID (max existing ID + 1 or 1 if empty)
    const maxId = deliveries.length > 0
        ? Math.max(...deliveries.map(d => d.id))
        : 0;
    const newId = maxId + 1;

    // Create new delivery object
    const newDelivery = {
      ...newItem,
      id: newId,
      products: newItem.products || []
    };

    // Update state
    setDeliveries(prev => [...prev, newDelivery]);
    setIsDropdownOpen(null);
    setOpenEdit(false);
  };

  // Handle Edit Multi Delivery
  const handleEditMultiDelivery = (deliveryIndex) => {
    setEditingItem(deliveryIndex);
    setIsDropdownOpen(null);
    setOpenEdit(true);
  };

  return (
      <div className="space-y-3 border-y border-gray-200 dark:border-gray-700 py-4">
        <h2 className="text-xl font-medium text-center text-gray-700 dark:text-gray-200">
          Multi Delivery
        </h2>

        {error && <div className="text-red-500 text-center p-2">{error}</div>}
        {isLoading && <div className="text-center p-2">Processing...</div>}

        <div className="space-y-6">
          {deliveries.map((data, deliveryIndex) => {
            const isExpanded = expandedDeliveries[deliveryIndex];
            const showAllProducts = isExpanded || data.products?.length <= 3;
            const visibleProducts = showAllProducts
                ? data.products
                : data.products?.slice(0, 3);

            return (
                <div
                    className="bg-gray-100 dark:bg-muted p-3 rounded-lg shadow-sm"
                    key={data.id || deliveryIndex}
                >
                  <div className={clsx(!openEdit && "flex justify-between relative")}>
                    <div>
                      {openEdit && editingItem === deliveryIndex ? (
                          <EditMultiDelivery
                              data={data}
                              openEdit={openEdit}
                              setOpenEdit={setOpenEdit}
                              setEditingItem={setEditingItem}
                          />
                      ) : (
                          <div className="flex flex-col pb-4 justify-between">
                            <div className="flex items-center flex-wrap gap-2">
                              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                {data.name}
                              </h3>
                              <p className="text-gray-500 text-xs dark:text-gray-400">
                                {data.address}
                              </p>
                            </div>

                            <div className="space-y-2 mt-2">
                              {visibleProducts?.map((product) => (
                                  <div key={product.id}>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                          {product.ProductName}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                          {product.quantity} pcs
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                              ))}
                            </div>
                          </div>
                      )}
                    </div>

                    <div>
                      {!openEdit && (
                          <button
                              onClick={() => setIsDropdownOpen(isDropdownOpen === deliveryIndex ? null : deliveryIndex)}
                              disabled={isLoading}
                          >
                            <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
                          </button>
                      )}

                      {isDropdownOpen === deliveryIndex && (
                          <FramerDropdown isOpen={true} onClose={() => setIsDropdownOpen(null)}>
                            <button
                                onClick={() => handleAddProduct(deliveryIndex)}
                                className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-200 transition hover:bg-[#2a2a2a]"
                                disabled={isLoading}
                            >
                              Add Product
                            </button>
                            <button
                                onClick={() => handleEditMultiDelivery(deliveryIndex)}
                                className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-200 transition hover:bg-[#2a2a2a]"
                                disabled={isLoading}
                            >
                              Edit
                            </button>
                            <button
                                onClick={() => removeMultiDelivery(deliveryIndex)}
                                className="w-full cursor-pointer px-4 py-2 text-left text-sm text-red-500 transition hover:bg-red-500/30 hover:text-white"
                                disabled={isLoading}
                            >
                              Delete
                            </button>
                          </FramerDropdown>
                      )}
                    </div>
                  </div>
                </div>
            );
          })}

           {/*Add Multi Delivery*/}
          <AddMultiDelivery
              handleAddMultiDelivery={handleAddMultiDelivery}
              data={item}
          />
        </div>
      </div>
  );
}