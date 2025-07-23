import React, {useState} from 'react';
import {InputField} from "./ui/FromField.jsx";
import {PlusCircleIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";

export default function EditMultiDelivery({data, setOpenEdit}) {
  const [formData, setFormData] = useState(
      {
        name: data.name,
        phone: data.phone,
        address: data.address,
        route: data.route,
      }
  );

  console.log("formData", formData);

  const [products, setProducts] = useState(data.products);

  const Address = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...products];
    updated[index][name] = value;
    setProducts(updated);
  };

  const addMoreProduct = () => {
    setProducts([...products, { ProductName: '', ProductQuantity: '' }]);
  };

  return (
      <>
        <div className="">
              <div>
                <div className="flex justify-end mb-4 text-sm">
                  <button onClick={() => setOpenEdit(false)} className="text-red-600/60 cursor-pointer">Cancel</button>
                </div>
                {/* Subdealer Info */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <InputField
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Subdealer Phone Number"
                      required
                  />

                  <InputField
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Subdealer Name"
                      required
                  />

                  <select
                      name="route"
                      value={formData.route}
                      onChange={handleInputChange}
                      className="bg-transparent border w-full text-sm text-gray-700 dark:text-gray-100 dark:bg-secondary border-gray-200 dark:border-gray-600 focus:outline-none p-2 rounded"
                  >
                    <option value="default" disabled>
                      Select Route
                    </option>
                    {Address.map((address) => (
                        <option key={address} value={address}>
                          {address}
                        </option>
                    ))}
                  </select>

                  <InputField
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Subdealer Address"
                      required
                  />
                </form>

                {/* Product List */}
                <div>
                  {products.map((product, index) => (
                      <form
                          key={index}
                          className="flex items-center space-x-2 mb-2"
                      >
                        <InputField
                            name="ProductName"
                            type="text"
                            value={product.ProductName}
                            onChange={(e) => handleProductChange(index, e)}
                            placeholder="Product Name..."
                            required
                        />
                        <InputField
                            name="ProductQuantity"
                            type="number"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, e)}
                            placeholder="Product Quantity..."
                            required
                        />
                      </form>
                  ))}
                </div>
              </div>
        </div>
      </>
  );
};
