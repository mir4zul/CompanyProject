import { useEffect, useState } from "react";
import { InputField } from "./ui/FromField";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";

export default function NewProduct({ products, setProducts, onSave, onCancel, availableProducts }) {
  const [newProduct, setNewProduct] = useState({
    ProductName: '',
    quantity: ''
  });
  const [remainingQuantities, setRemainingQuantities] = useState({});
  const [availableOptions, setAvailableOptions] = useState([]);

  // Calculate remaining quantities and available products
  useEffect(() => {
    if (!availableProducts?.TotalSupply) return;

    const newRemaining = {};
    const newAvailableOptions = [];

    // Calculate allocated quantities from current products
    const allocated = {};
    products?.forEach(product => {
      if (product.ProductName) {
        allocated[product.ProductName] = (allocated[product.ProductName] || 0) + Number(product.quantity || 0);
      }
    });

    // Calculate remaining quantities and available options
    availableProducts.TotalSupply.forEach(supply => {
      const totalAllocated = allocated[supply.ProductName] || 0;
      const remaining = Number(supply.quantity) - totalAllocated;
      newRemaining[supply.ProductName] = remaining;

      // Include all products regardless of remaining quantity
      newAvailableOptions.push({
        ...supply,
        remaining
      });
    });

    setRemainingQuantities(newRemaining);
    setAvailableOptions(newAvailableOptions);
  }, [availableProducts, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.ProductName || !newProduct.quantity) return;

    const updatedProducts = [...products, {
      ...newProduct,
      quantity: Number(newProduct.quantity),
      id: Date.now()
    }];

    setProducts(updatedProducts);
    onSave(updatedProducts);
  };

  return (
      <div className="mt-3 p-3 bg-gray-50 dark:bg-accent rounded-lg">
        <h4 className="text-sm font-medium mb-2">Add New Product</h4>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2 items-start">
            <select
                name="ProductName"
                value={newProduct.ProductName}
                onChange={handleChange}
                className="flex-1 bg-secondary border border-gray-200 dark:border-gray-600 rounded p-2 text-sm"
                required
            >
              <option value="">Select Product</option>
              {availableOptions.map(product => (
                  <option
                      key={product.id}
                      value={product.ProductName}
                      disabled={product.remaining <= 0}
                  >
                    {product.ProductName} ({product.remaining} remaining)
                  </option>
              ))}
            </select>

            <InputField
                name="quantity"
                type="number"
                value={newProduct.quantity}
                onChange={handleChange}
                placeholder="Qty"
                min="1"
                max={newProduct.ProductName ? remainingQuantities[newProduct.ProductName] : undefined}
                className="w-24"
                required
            />
          </div>

          {newProduct.ProductName && remainingQuantities[newProduct.ProductName] !== undefined && (
              <p className={`text-xs ${
                  Number(newProduct.quantity) > remainingQuantities[newProduct.ProductName]
                      ? 'text-red-500'
                      : 'text-green-500'
              }`}>
                {remainingQuantities[newProduct.ProductName]} available
              </p>
          )}

          <div className="flex justify-end gap-2">
            <button
                type="button"
                onClick={onCancel}
                className="px-3 py-1 text-sm border rounded flex items-center gap-1"
            >
              <XMarkIcon className="w-4 h-4"/>
              Cancel
            </button>
            <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded flex items-center gap-1"
                disabled={!newProduct.ProductName || !newProduct.quantity}
            >
              <CheckIcon className="w-4 h-4"/>
              Add
            </button>
          </div>
        </form>
      </div>
  );
}