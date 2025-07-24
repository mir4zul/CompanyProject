import { useState } from "react";
import { InputField } from "./ui/FromField";
import { TrashIcon} from "@heroicons/react/16/solid";

export default function EditMultiDelivery({ delivery, onSave, onCancel, products }) {
  const [formData, setFormData] = useState({
    name: delivery.name || '',
    address: delivery.address || '',
    phone: delivery.phone || '',
    route: delivery.route || ''
  });
  const [deliveryProducts, setDeliveryProducts] = useState(delivery.products || []);

  // Function to handle product changes
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...deliveryProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    setDeliveryProducts(updatedProducts);
  };

  // Function handle remove product
  const handleRemoveProduct = (index) => {
    const updatedProducts = [...deliveryProducts];
    updatedProducts.splice(index, 1);
    setDeliveryProducts(updatedProducts);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...delivery,
      ...formData,
      products: deliveryProducts.filter(p => p.ProductName && p.quantity)
    });
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
          />
          <InputField
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <InputField
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
          />
          <InputField
              label="Route"
              value={formData.route}
              onChange={(e) => setFormData({...formData, route: e.target.value})}
          />
        </div>

        {/* Products section */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Products</h4>
          {deliveryProducts.map((product, index) => (
              <div key={index} className="flex gap-2 items-center">
                <select
                    value={product.ProductName}
                    onChange={(e) => handleProductChange(index, 'ProductName', e.target.value)}
                    className="flex-1 border bg-secondary rounded p-2 text-sm"
                    required
                >
                  <option value="">Select Product</option>
                  {products.map(p => (
                      <option key={p.id} value={p.ProductName}>
                        {p.ProductName}
                      </option>
                  ))}
                </select>
                <InputField
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                    placeholder="Qty"
                    min="1"
                    required
                />
                <button
                    type="button"
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-500"
                >
                  <TrashIcon className="w-5 h-5"/>
                </button>
              </div>
          ))}
        </div>

        {/* Save and Cancel buttons */}
        <div className="flex justify-end gap-2">
          <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
  );
}