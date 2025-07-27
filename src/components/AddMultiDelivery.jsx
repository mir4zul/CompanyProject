import { useState } from 'react';
import { PlusCircleIcon } from "@heroicons/react/16/solid/index.js";
import { InputField } from "./ui/FromField.jsx";
import AddProduct from "./AddProduct.jsx";

const Address = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function AddMultiDelivery({ data, handleAddMultiDelivery, newMulti }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    route: '',
  });

  const [products, setProducts] = useState([{productId: '', ProductName: '', ProductQuantity: '' }]);
  const [addingNewDelivery, setAddingNewDelivery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remainingQuantities, setRemainingQuantities] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateDelivery = () => {
    // Check basic form fields
    if (!formData.name || !formData.phone || !formData.address || formData.route === 'default') {
      setError("Please fill all subdealer information");
      return false;
    }

    // Check product fields
    for (const product of products) {
      if (!product.ProductName || !product.ProductQuantity) {
        setError("Please fill all product fields");
        return false;
      }

      const remaining = remainingQuantities[product.ProductName];
      if (remaining !== undefined && Number(product.ProductQuantity) > remaining) {
        setError(`Quantity exceeds remaining stock for ${data.TotalSupply.find(p => p.productId === product.ProductName)?.ProductName}`);
        return false;
      }

      if (Number(product.ProductQuantity) <= 0) {
        setError("Quantity must be greater than 0");
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateDelivery()) return;

    setIsLoading(true);
    try {
      // Prepare payload
      const payload = {
        ...formData,
        products: products.map(p => ({
          productId: p.ProductName,
          ProductName: p.ProductName,
          quantity: Number(p.ProductQuantity)
        }))
      };

      // ____________________________________Your API call would go here_______________________________________________
      // Your API call would go here
      // await api.post('/deliveries', payload);
      console.log("Submitting:", payload);
      handleAddMultiDelivery(payload);

      // Reset form on success
      setFormData({ name: '', phone: '', address: '', route: '' });
      setProducts([{productId: '', ProductName: '', ProductQuantity: '' }]);
      setAddingNewDelivery(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save delivery");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="space-y-4">
        {addingNewDelivery && (
            <div className="space-y-4">
              {/* Subdealer Information */}
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Subdealer Name"
                    required
                />
                <InputField
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                />
                <select
                    name="route"
                    value={formData.route}
                    onChange={handleInputChange}
                    className="bg-transparent border text-sm p-2 rounded dark:bg-secondary border-gray-200 dark:border-gray-600 focus:outline-none"
                    required
                >
                  <option value="" disabled>Select Route</option>
                  {Address.map(route => (
                      <option key={route} value={route}>Route {route}</option>
                  ))}
                </select>
                <InputField
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                />
              </form>

              {/* Products Section */}
              <AddProduct
                  data={data}
                  products={products}
                  setProducts={setProducts}
                  newMulti={newMulti}
              />
            </div>
        )}

        {/* Error Message */}
        {error && (
            <div className="text-red-500 text-center text-sm py-2">
              {error}
            </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center">
          {!addingNewDelivery ? (
              <button
                  onClick={() => setAddingNewDelivery(true)}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Add New Delivery
              </button>
          ) : (
              <div className="flex gap-4">
                <button
                    onClick={() => {
                      setAddingNewDelivery(false);
                      setError(null);
                    }}
                    className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
                >
                  {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                  ) : 'Save Delivery'}
                </button>
              </div>
          )}
        </div>
      </div>
  );
}