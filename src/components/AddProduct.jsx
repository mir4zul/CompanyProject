import {useEffect, useState} from "react";
import {InputField} from "./ui/FromField.jsx";
import {PlusCircleIcon, TrashIcon} from "@heroicons/react/16/solid";
import clsx from "clsx";

export default function AddProduct({data, products, setProducts}) {
  const [remainingQuantities, setRemainingQuantities] = useState({});
  const [errors, setErrors] = useState({});

  // Calculate remaining quantities
  useEffect(() => {
    const newRemaining = {};
    data?.TotalSupply?.forEach(supply => {
      const totalGiven = data?.subDelars?.reduce((sum, subDelar) => {
        const product = subDelar.products?.find(p => p.ProductName === supply.ProductName);
        return sum + (product ? Number(product.quantity) : 0);
      }, 0);
      newRemaining[supply.ProductName] = Number(supply.quantity) - (totalGiven || 0);
    });
    setRemainingQuantities(newRemaining);
  }, [data, products]);

  // Handle form input changes
  const handleProductChange = (index, e) => {
    const {name, value} = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {...updatedProducts[index], [name]: value};
    setProducts(updatedProducts);

    // Validate quantity when changed
    if (name === "ProductQuantity") {
      validateQuantity(index, value);
    }
  };

  // Handle product selection
  const handleSelectChange = (index, e) => {
    const selectedProductName = e.target.value;
    const selectedProduct = data.TotalSupply.find(p => p.ProductName === selectedProductName);

    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      ProductName: selectedProductName,
      productId: selectedProduct?.productId || '',
    };
    setProducts(updatedProducts);

    // Clear any previous errors for this product
    const newErrors = {...errors};
    delete newErrors[`${index}-name`];
    setErrors(newErrors);
  };

  // Validate quantity
  const validateQuantity = (index, value) => {
    const product = products[index];
    const remaining = remainingQuantities[product.ProductName] || 0;
    const newErrors = {...errors};

    if (!value || isNaN(value)) {
      newErrors[`${index}-qty`] = "Please enter a valid quantity";
    } else if (Number(value) <= 0) {
      newErrors[`${index}-qty`] = "Quantity must be greater than 0";
    } else if (Number(value) > remaining) {
      newErrors[`${index}-qty`] = `Only ${remaining} available`;
    } else {
      delete newErrors[`${index}-qty`];
    }

    setErrors(newErrors);
  };

  // Add more product
  const addMoreProduct = () => {
    setProducts([...products, {ProductName: '', productId: '', ProductQuantity: ''}]);
  };

  // Remove product
  const removeProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);

    // Remove related errors
    const newErrors = {...errors};
    delete newErrors[`${index}-name`];
    delete newErrors[`${index}-qty`];
    setErrors(newErrors);
  };

  return (
      <div>
        <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Products</h3>
        {products.map((product, index) => {
          const remaining = remainingQuantities[product.ProductName] || 0;
          const nameError = errors[`${index}-name`];
          const qtyError = errors[`${index}-qty`];

          return (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <select
                      value={product.ProductName}
                      onChange={(e) => handleSelectChange(index, e)}
                      className={`flex-1 bg-transparent border ${
                          Number(product.ProductQuantity) > remaining ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                      } text-sm p-2 rounded dark:bg-secondary`}
                      required
                  >
                    <option selected value="" disabled>Select Product</option>
                    {
                      data.TotalSupply?.map((supply) => {
                        const isSelected = products.some(
                            (p, i) => p.ProductName === supply.ProductName && i !== index
                        );

                        return (
                            <option
                                key={supply.ProductName}
                                value={supply.ProductName}
                                disabled={isSelected || remainingQuantities[supply.ProductName] <= 0}
                            >
                              {supply.ProductName}
                              {isSelected ? " (Already selected)" : ` (${remainingQuantities[supply.ProductName] || 0} remaining)`}
                            </option>
                        );
                      })
                    }
                  </select>

                  <InputField
                      name="ProductQuantity"
                      type="number"
                      value={product.ProductQuantity}
                      onChange={(e) => handleProductChange(index, e)}
                      placeholder="Qty"
                      min="1"
                      max={remaining}
                      className={`max-w-xs ${qtyError ? 'border-red-500' : ''}`}
                      required
                  />

                  <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeProduct(index);
                      }}
                      className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-5 h-5"/>
                  </button>
                </div>

                {/* Error messages */}
                {nameError && (
                    <p className="text-red-500 text-xs ml-1">{nameError}</p>
                )}

                {qtyError && (
                    <p className="text-red-500 text-xs ml-1">{qtyError}</p>
                )}

                {/* Remaining quantity */}
                {product.ProductName && !nameError && !qtyError && (
                    <p className={`text-xs ml-1 ${
                        Number(product.ProductQuantity) > remaining ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {remaining} available
                    </p>
                )}
              </div>
          );
        })}

        {/* Add more product button */}
        <button
            onClick={addMoreProduct}
            className={clsx(
                "flex items-center gap-1 text-sm text-blue-500 mt-2",
                data.TotalSupply?.length === products.length && "hidden"
            )}
        >
          <PlusCircleIcon className="w-5 h-5"/>
          Add Product
        </button>
      </div>
  );
}