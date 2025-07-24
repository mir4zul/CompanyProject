import { useState } from "react";
import { EllipsisVerticalIcon, TrashIcon, PlusCircleIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import AddMultiDelivery from "./AddMultiDelivery";
import { FramerDropdown } from "./ui/framerDropdown";
import EditMultiDelivery from "./EditMultiDelivery";
import NewProduct from "./NewProduct.jsx";

export default function MultiDelivery({ item, deliveries, setDeliveries, onAddSubDealer, subDeliveries }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [addProductIndex, setAddProductIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [expandedDeliveries, setExpandedDeliveries] = useState({});

  // Function to handle adding a new sub-dealer
  const handleAddMultiDelivery = (newItem) => {
    const maxId = deliveries.length > 0 ? Math.max(...deliveries.map(d => d.id)) : 0;
    const newDelivery = {
      ...newItem,
      id: maxId + 1,
      products: newItem.products || []
    };

    if (onAddSubDealer(newDelivery)) {
      setIsDropdownOpen(null);
    }
  };

  // Function to handle editing a sub-dealer
  const handleEditDelivery = (index, updatedDelivery) => {
    const updatedDeliveries = [...deliveries];
    updatedDeliveries[index] = updatedDelivery;
    setDeliveries(updatedDeliveries);
    setEditingIndex(null);
  };

  // Function to handle removing a sub-dealer
  const removeMultiDelivery = (index) => {
    setDeliveries(prev => prev.filter((_, i) => i !== index));
    setIsDropdownOpen(null);
  };

  // Function to handle adding a new product
  const handleAddProductSave = (index, updatedProducts) => {
    const updatedDeliveries = [...deliveries];
    updatedDeliveries[index].products = updatedProducts;
    setDeliveries(updatedDeliveries);
    setAddProductIndex(null);
  };

  // Function to toggle product expansion
  const toggleExpansion = (index) => {
    setExpandedDeliveries(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
      <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h2 className="text-xl font-medium text-center dark:text-gray-200">Sub-dealers</h2>

        <div className="space-y-4">
          {deliveries.map((delivery, index) => {
            const isExpanded = expandedDeliveries[index];
            const showAll = isExpanded || delivery.products?.length <= 3;
            const visibleProducts = showAll ? delivery.products : delivery.products?.slice(0, 3);

            return (
                <div key={delivery.id} className="bg-gray-100 dark:bg-muted shadow-xl p-3 rounded-lg">
                  {editingIndex === index ? (
                      <EditMultiDelivery
                          delivery={delivery}
                          onSave={(updated) => handleEditDelivery(index, updated)}
                          onCancel={() => setEditingIndex(null)}
                          products={item.TotalSupply}
                          item={item}
                          subDeliveries={subDeliveries}
                          availableProducts={item.TotalSupply}
                      />
                  ) : (
                      <>
                        <div className="flex justify-between items-center border-b pb-2 border-gray-200 shadow-md dark:border-gray-700">
                          <div className="flex flex-col">
                            <h3 className="font-medium dark:text-gray-200">{delivery.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{delivery.address}</p>
                          </div>

                          <div className="relative">
                            <button onClick={() => setIsDropdownOpen(isDropdownOpen === index ? null : index)}>
                              <EllipsisVerticalIcon className="w-5 h-5 text-gray-500"/>
                            </button>

                            {/* Dropdown menu */}
                            {isDropdownOpen === index && editingIndex !== index && (
                                <FramerDropdown isOpen onClose={() => setIsDropdownOpen(null)}>
                                  <div className="flex flex-col gap-2 py-2">
                                    <button
                                        onClick={() => {
                                          setEditingIndex(index);
                                          setIsDropdownOpen(null);
                                        }}
                                        className="hover:bg-secondary px-4 py-1 flex text-sm items-center gap-2"
                                    >
                                      <PencilSquareIcon className="w-4 h-4"/>
                                      Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                          setAddProductIndex(index);
                                          setIsDropdownOpen(null);
                                        }}
                                        className="hover:bg-secondary px-4 py-1 flex text-sm items-center gap-2"
                                    >
                                      <PlusCircleIcon className="w-4 h-4"/>
                                      Add Product
                                    </button>
                                    <button
                                        onClick={() => removeMultiDelivery(index)}
                                        className="text-red-500 px-4 py-1 hover:bg-red-500/10 flex text-sm items-center gap-2"
                                    >
                                      <TrashIcon className="w-4 h-4"/>
                                      Remove
                                    </button>
                                  </div>
                                </FramerDropdown>
                            )}
                          </div>
                        </div>

                        {/* Product list */}
                        <div className="mt-2 space-y-2">
                          {visibleProducts?.map(product => (
                              <div key={product.id} className="flex justify-between text-sm">
                                <span>{product.ProductName}</span>
                                <span>{product.quantity} pcs</span>
                              </div>
                          ))}
                          {delivery.products?.length > 3 && (
                              <button
                                  onClick={() => toggleExpansion(index)}
                                  className="text-sm text-blue-500/50 hover:text-blue-500"
                              >
                                {isExpanded ? 'Show less' : `Show all ${delivery.products.length} products`}
                              </button>
                          )}

                          {/* Add new product */}
                          {addProductIndex === index && (
                              <NewProduct
                                  products={delivery.products || []}
                                  setProducts={(updated) => {
                                    const newDeliveries = [...deliveries];
                                    newDeliveries[index].products = updated;
                                    setDeliveries(newDeliveries);
                                  }}
                                  onSave={(updatedProducts) => handleAddProductSave(index, updatedProducts)}
                                  onCancel={() => setAddProductIndex(null)}
                                  availableProducts={item.TotalSupply}
                                  item={item}
                                  subDeliveries={subDeliveries}
                              />
                          )}
                        </div>
                      </>
                  )}
                </div>
            );
          })}

          {/* Add new delivery */}
          <AddMultiDelivery
              handleAddMultiDelivery={handleAddMultiDelivery}
              data={item}
          />
        </div>
      </div>
  );
}