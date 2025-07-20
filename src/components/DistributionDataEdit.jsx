import {useState} from "react";
import {PencilSquareIcon, PlusCircleIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";

export default function DistributionDataEdit({item}) {
  const [editingItem, setEditingItem] = useState(null);
  const [editedItem, setEditedItem] = useState(item);
  const [newDeliveryName, setNewDeliveryName] = useState("");
  const [addingNewDelivery, setAddingNewDelivery] = useState(false);

  const date = new Date();

  const handleChange = (deliveryIndex, productIndex, field, value) => {
    const updatedMultiDelivery = [...editedItem.multiDelivery];
    updatedMultiDelivery[deliveryIndex].product[productIndex][field] = value;
    setEditedItem({ ...editedItem, multiDelivery: updatedMultiDelivery });
  };

  const handleDelete = (deliveryIndex, productIndex) => {
    const updatedMultiDelivery = [...editedItem.multiDelivery];
    updatedMultiDelivery[deliveryIndex].product.splice(productIndex, 1);
    setEditedItem({ ...editedItem, multiDelivery: updatedMultiDelivery });
    setEditingItem(null);
  };

  const handleAddProduct = (deliveryIndex) => {
    const updatedMultiDelivery = [...editedItem.multiDelivery];
    updatedMultiDelivery[deliveryIndex].product.push({
      ProductName: "",
      value: "",
      quantity: "",
    });
    setEditedItem({ ...editedItem, multiDelivery: updatedMultiDelivery });
    // Set editing mode for the newly added product
    setEditingItem([deliveryIndex, updatedMultiDelivery[deliveryIndex].product.length - 1]);
  };

  const handleAddMultiDelivery = () => {
    if (!newDeliveryName.trim()) return;

    const updatedMultiDelivery = [...editedItem.multiDelivery];
    updatedMultiDelivery.push({
      name: newDeliveryName,
      location: "",
      product: [],
    });
    setEditedItem({ ...editedItem, multiDelivery: updatedMultiDelivery });
    setNewDeliveryName("");
    setAddingNewDelivery(false);
  };

  const startEditing = (deliveryIndex, productIndex) => {
    setEditingItem([deliveryIndex, productIndex]);
  };

  const stopEditing = () => {
    setEditingItem(null);
  };

  return (
      <div className="max-w-4xl w-full mx-auto py-10 px-4">
        <div className="p-4 space-y-6">
          {/* Header Section */}
          <div className="text-center border-b pb-4 border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white tracking-wide capitalize">
              {item.dealerName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{item.address}</p>
            <p className="text-xs text-gray-400">{date.toLocaleDateString()}</p>
          </div>

          {/* Product List */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">Product Items</h2>

            <div className="grid grid-cols-2 gap-2">
              {item?.TotalSupply.map((data, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-muted p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-700 dark:text-gray-100 capitalize">
                      {data.ProductName} —{" "}
                      <span className="font-medium">{data.value}</span> units,{" "}
                      <span className="font-medium">{data.quantity}</span> quality
                    </p>
                  </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-y border-gray-200 dark:border-gray-700 py-4">
            <h2 className="text-xl font-medium text-center text-gray-700 dark:text-gray-200">Multi Delivery</h2>

            <div className="space-y-6">
              {editedItem?.multiDelivery.map((data, deliveryIndex) => (
                  <div key={deliveryIndex}>
                    <div className="flex pb-4 items-center justify-between">
                      <p className="text-gray-700 dark:text-gray-100 capitalize">{data.name}</p>

                      {/* Add Product Button */}
                      <button
                          onClick={() => handleAddProduct(deliveryIndex)}
                          className="text-gray-600 dark:text-gray-400"
                      >
                        <PlusCircleIcon className="w-6 h-6 text-gray-600 dark:text-green-600/50" />
                      </button>
                    </div>

                    {/* Product List */}
                    <div className="space-y-2">
                      {data.product.map((product, productIndex) => (
                          <div key={productIndex} className="bg-gray-100 flex items-center justify-between dark:bg-muted p-3 rounded-lg shadow-sm">
                            {editingItem?.join() === [deliveryIndex, productIndex].join() ? (
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                  <input
                                      type="text"
                                      className="bg-transparent border-b w-full text-sm"
                                      value={product.ProductName}
                                      onChange={(e) =>
                                          handleChange(deliveryIndex, productIndex, "ProductName", e.target.value)
                                      }
                                      placeholder="Product Name"
                                  />
                                  <input
                                      type="text"
                                      className="bg-transparent border-b w-full text-sm"
                                      value={product.value}
                                      onChange={(e) =>
                                          handleChange(deliveryIndex, productIndex, "value", e.target.value)
                                      }
                                      placeholder="Value"
                                  />
                                  <input
                                      type="text"
                                      className="bg-transparent border-b w-full text-sm"
                                      value={product.quantity}
                                      onChange={(e) =>
                                          handleChange(deliveryIndex, productIndex, "quantity", e.target.value)
                                      }
                                      placeholder="Quantity"
                                  />
                                </div>
                            ) : (
                                <p className="text-sm text-gray-700 dark:text-gray-100 capitalize">
                                  {product.ProductName} —{" "}
                                  <span className="font-medium">{product.value}</span> units,{" "}
                                  <span className="font-medium">{product.quantity}</span> quality
                                </p>
                            )}

                            <div className="flex gap-2">
                              {editingItem?.join() === [deliveryIndex, productIndex].join() ? (
                                  <button onClick={stopEditing} className="text-sm text-blue-500">
                                    Save
                                  </button>
                              ) : (
                                  <button onClick={() => startEditing(deliveryIndex, productIndex)}>
                                    <PencilSquareIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                  </button>
                              )}

                              {editingItem?.join() !== [deliveryIndex, productIndex].join() && (
                                  <button onClick={() => handleDelete(deliveryIndex, productIndex)}>
                                    <TrashIcon className="w-4 h-4 text-gray-600 dark:text-red-500/50" />
                                  </button>
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              ))}


              {/* Add New Multi Delivery */}
              <div>
                {
                    addingNewDelivery && (
                        <div className="space-y-2">
                          <input
                              type="text"
                              className="bg-transparent border w-full text-sm text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:outline-none p-2 rounded"
                              value={newDeliveryName}
                              onChange={(e) => setNewDeliveryName(e.target.value)}
                              placeholder="Delivery Name ..."
                          />
                        </div>
                    )
                }
              </div>

              <div>
                {
                  !addingNewDelivery ?  (
                          <button
                              onClick={() => setAddingNewDelivery(true)}
                              className="block mx-auto pt-1"
                          >
                            <PlusCircleIcon className="w-10 h-10 text-gray-600 dark:text-green-600" />
                          </button> ) :
                      (
                          <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => setAddingNewDelivery(false)}
                                className="text-sm cursor-pointer text-gray-600 dark:text-gray-400"
                            >
                              Cancel
                            </button>
                            <button
                                onClick={handleAddMultiDelivery}
                                className="py-0.5 px-2 cursor-pointer text-white bg-green-500 rounded"
                            >
                              save
                            </button>
                          </div>
                      )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}