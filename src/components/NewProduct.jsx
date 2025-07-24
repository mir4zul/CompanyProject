import { useEffect, useState } from "react";
import { InputField } from "./ui/FromField";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";

export default function NewProduct({ products, setProducts, onSave, onCancel, availableProducts, item, subDeliveries }) {
  const [newProduct, setNewProduct] = useState({
    ProductName: '',
    quantity: ''
  });
  const [remainingQuantities, setRemainingQuantities] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Calculate remaining quantities based on allocated products
  useEffect(() => {
    if (!availableProducts) return;

    const calculateRemaining = () => {
      const newRemaining = {};

      availableProducts.forEach((supply) => {
        const allocated = products
            .filter(product => product.ProductName === supply.ProductName)
            .reduce((sum, product) => sum + Number(product.quantity || 0), 0);

        newRemaining[supply.ProductName] = Number(supply.quantity) - allocated;
      });

      return newRemaining;
    };

    setIsCalculating(true);
    try {
      const newRemaining = calculateRemaining();
      setRemainingQuantities(newRemaining);
    } catch (error) {
      console.error("Error calculating remaining quantities:", error);
    } finally {
      setIsCalculating(false);
    }
  }, [products, availableProducts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.ProductName || !newProduct.quantity) return;

    const quantityToAdd = Number(newProduct.quantity);
    const productName = newProduct.ProductName;

    const newProductItem = {
      ...newProduct,
      quantity: quantityToAdd,
      id: Date.now()
    };

    // Optimistically update remaining quantities
    const updatedRemaining = { ...remainingQuantities };
    updatedRemaining[productName] = (updatedRemaining[productName] || 0) - quantityToAdd;
    setRemainingQuantities(updatedRemaining);

    const updatedProducts = [...products, newProductItem];
    setProducts(updatedProducts);
    setNewProduct({ ProductName: '', quantity: '' });
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
              {availableProducts
                  .filter(option => !products.some(product => product.ProductName === option.ProductName))
                  .map(option => {
                    // Find the total supply for this specific product
                    const supply = item.TotalSupply.find(s => s.ProductName === option.ProductName);
                    const total = supply ? Number(supply.quantity) : 0;

                    // Sum all allocated quantities from subDeliveries for this product
                    const allocated = subDeliveries.reduce((sum, subDelar) => {
                      const matchedProduct = subDelar.products?.find(p => p.ProductName === option.ProductName);
                      return sum + (matchedProduct ? Number(matchedProduct.quantity) : 0);
                    }, 0);

                    const remaining = total - allocated;

                    return (
                        <option key={option.ProductName} value={option.ProductName}>
                          {option.ProductName} ({remaining} available)
                        </option>
                    );
                  })}
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
                disabled={isCalculating}
            />
          </div>

          {newProduct.ProductName && remainingQuantities[newProduct.ProductName] !== undefined && (
              <p className={`text-xs ${
                  Number(newProduct.quantity) > remainingQuantities[newProduct.ProductName]
                      ? 'text-red-500'
                      : 'text-green-500'
              }`}>
                {remainingQuantities[newProduct.ProductName]} available (Total supply: {
                availableProducts.find(p => p.ProductName === newProduct.ProductName)?.quantity
              })
              </p>
          )}

          <div className="flex justify-end gap-2">
            <button
                type="button"
                onClick={onCancel}
                className="px-3 py-1 text-sm border rounded flex items-center gap-1"
                disabled={isCalculating}
            >
              <XMarkIcon className="w-4 h-4" />
              Cancel
            </button>
            <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded flex items-center gap-1"
                disabled={
                    isCalculating ||
                    !newProduct.ProductName ||
                    !newProduct.quantity ||
                    (remainingQuantities[newProduct.ProductName] !== undefined &&
                        Number(newProduct.quantity) > remainingQuantities[newProduct.ProductName])
                }
            >
              {isCalculating ? (
                  'Calculating...'
              ) : (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    Add
                  </>
              )}
            </button>
          </div>
        </form>
      </div>
  );
}
