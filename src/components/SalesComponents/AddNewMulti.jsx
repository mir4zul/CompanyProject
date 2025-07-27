import React, { useState } from 'react';
import { InputField, OptionField, SelectField } from "../ui/FromField.jsx";
import { PlusIcon } from "lucide-react";
import { TrashIcon } from "@heroicons/react/16/solid";

const Address = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function AddNewMulti({ data }) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([{ productId: '', productName: '', quantity: '' }]);
  const [errors, setErrors] = useState({});
  const [productErrors, setProductErrors] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    route: '',
  });

  const validateForm = () => {
    const newErrors = {};
    const newProductErrors = products.map(() => ({}));
    let isValid = true;

    // Validate main form fields
    if (!formData.name.trim()) {
      newErrors.name = 'Subdealer name is required';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    if (!formData.route) {
      newErrors.route = 'Route is required';
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // Validate products
    products.forEach((product, index) => {
      if (!product.productName) {
        newProductErrors[index] = {
          ...newProductErrors[index],
          productName: 'Product is required'
        };
        isValid = false;
      }
      if (!product.quantity) {
        newProductErrors[index] = {
          ...newProductErrors[index],
          quantity: 'Quantity is required'
        };
        isValid = false;
      } else if (isNaN(product.quantity) || Number(product.quantity) <= 0) {
        newProductErrors[index] = {
          ...newProductErrors[index],
          quantity: 'Quantity must be a positive number'
        };
        isValid = false;
      }
    });

    setErrors(newErrors);
    setProductErrors(newProductErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value
    };
    setProducts(updatedProducts);

    // Clear product error when typing
    if (productErrors[index]?.[name]) {
      const updatedErrors = [...productErrors];
      updatedErrors[index] = { ...updatedErrors[index], [name]: '' };
      setProductErrors(updatedErrors);
    }
  };

  const addProduct = () => {
    setProducts([...products, { productId: '', productName: '', quantity: '' }]);
    setProductErrors([...productErrors, {}]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);

      const updatedErrors = [...productErrors];
      updatedErrors.splice(index, 1);
      setProductErrors(updatedErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful form submission
      console.log({ ...formData, products });
      setOpen(false);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        address: '',
        route: '',
      });
      setProducts([{ productId: '', productName: '', quantity: '' }]);
      setErrors({});
      setProductErrors([]);
    }
  };

  return (
      <div className="">
        <h1 className="text-lg font-bold mb-2">Add New Subdealer</h1>
        {
          open ? (
              <div className="flex flex-col gap-2">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputField
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Subdealer Name"
                        required
                        className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <InputField
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                        className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <select
                        name="route"
                        value={formData.route}
                        onChange={handleInputChange}
                        className={`bg-transparent border text-sm p-2 rounded dark:bg-secondary border-gray-200 dark:border-gray-600 focus:outline-none ${errors.route ? 'border-red-500' : ''}`}
                        required
                    >
                      <option value="" disabled>Select Route</option>
                      {Address.map(route => (
                          <option key={route} value={route}>Route {route}</option>
                      ))}
                    </select>
                    {errors.route && <p className="text-red-500 text-xs mt-1">{errors.route}</p>}
                  </div>

                  <div>
                    <InputField
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        required
                        className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                </form>

                <h1 className="text-base font-bold mt-2">Product</h1>

                {products.map((product, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <SelectField
                              className={`text-sm ${productErrors[index]?.productName ? 'border-red-500' : ''}`}
                              name="productName"
                              value={product.productName}
                              onChange={(e) => handleProductChange(index, e)}
                          >
                            <OptionField disabled value="">Select Product</OptionField>
                            {data.map((item, i) => (
                                <OptionField
                                    key={i}
                                    value={item.productName}
                                    disabled={products.some((p, idx) => idx !== index && p.productName === item.productName)}
                                >
                                  {item.productName} ({item.quantity})
                                </OptionField>
                            ))}
                          </SelectField>
                          {productErrors[index]?.productName && (
                              <p className="text-red-500 text-xs mt-1">{productErrors[index].productName}</p>
                          )}
                        </div>

                        <div className="flex-1">
                          <InputField
                              name="quantity"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, e)}
                              placeholder="Quantity"
                              className={`w-full ${productErrors[index]?.quantity ? 'border-red-500' : ''}`}
                              required
                          />
                          {productErrors[index]?.quantity && (
                              <p className="text-red-500 text-xs mt-1">{productErrors[index].quantity}</p>
                          )}
                        </div>

                        <button
                            type="button"
                            onClick={() => removeProduct(index)}
                            disabled={products.length <= 1}
                            className="self-start mt-1"
                        >
                          <TrashIcon className={`w-5 h-5 cursor-pointer ${products.length <= 1 ? 'text-gray-400' : 'text-red-500 hover:text-red-600'}`}/>
                        </button>
                      </div>
                    </div>
                ))}

                <div>
                  <button
                      type="button"
                      onClick={addProduct}
                      className="bg-blue-500/80 text-xs flex items-center hover:bg-blue-500 text-white py-1.5 px-2 rounded mt-4"
                  >
                    <PlusIcon className="w-4 h-4 mr-2"/>
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="flex justify-center flex-row gap-2">
                  <button
                      onClick={() => {
                        setOpen(false);
                        setProducts([{ productId: '', productName: '', quantity: '' }]);
                        setErrors({});
                        setProductErrors([]);
                      }}
                      className="bg-secondary hover:bg-secondary/50 border border-gray-400 dark:border-gray-600 py-1.5 px-4 rounded mt-4"
                  >
                    Cancel
                  </button>

                  <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-green-500/80 hover:bg-green-500 text-white py-1.5 px-8 rounded mt-4"
                  >
                    Save
                  </button>
                </div>
              </div>
          ) : (
              <button
                  onClick={() => setOpen(true)}
                  className="bg-primary text-white py-2 px-6 rounded mt-4"
              >
                Add New Subdealer
              </button>
          )
        }
      </div>
  );
};