import React from 'react';
import {LabelField, OptionField, SelectField} from "../ui/FromField.jsx";

const CategoryData = [
  'Category 1',
  'Category 2',
  'Category 3',
]
export default function Category() {
  return (
    <div className="p-4 my-4 shadow rounded-md bg-accent grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* ------- Category -------*/}
      <div className="flex flex-col">
        <LabelField className="text-sm" htmlFor="category">Category</LabelField>
        <SelectField id="category" name="category" className="w-full" defaultValue="default">
          <OptionField disabled value="default">Category</OptionField>
          {
            CategoryData.map((category, index) => (
                <OptionField
                    key={index}
                    value={index + 1}
                >
                  {category}
                </OptionField>
            ))
          }
        </SelectField>
      </div>

    {/*  ------- Sub Category -------*/}
      <div className="flex flex-col">
        <LabelField className="text-sm" htmlFor="subCategory">Sub Category</LabelField>
        <SelectField id="subCategory" name="subCategory" className="w-full" defaultValue="default">
          <OptionField disabled value="default">Sub Category</OptionField>
          {
            CategoryData.map((category, index) => (
                <OptionField
                    key={index}
                    value={index + 1}
                >
                  {category}
                </OptionField>
            ))
          }
        </SelectField>
      </div>

    {/* ------- Child Category -------*/}
      <div className="flex flex-col">
        <LabelField className="text-sm" htmlFor="childCategory">Child Category</LabelField>
        <SelectField id="childCategory" name="childCategory" className="w-full" defaultValue="default">
          <OptionField disabled value="default">Child Category</OptionField>
          {
            CategoryData.map((category, index) => (
                <OptionField
                    key={index}
                    value={index + 1}
                >
                  {category}
                </OptionField>
            ))
          }
        </SelectField>
      </div>
    </div>
  );
};
