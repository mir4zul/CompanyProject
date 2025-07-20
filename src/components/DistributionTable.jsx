import {CheckIcon, EyeIcon, XMarkIcon} from "@heroicons/react/16/solid/index.js";
import {data} from "../assets/Data.jsx";
import {useState} from "react";
import {FramerModal} from "../utils/framerModel.jsx";
import DistributionDataEdit from "./DistributionDataEdit.jsx";

const tableHeadData = [
  'Delar ID',
  'Delar Name',
  'Address',
  'Total Supply',
  'Multi Delivery',
  'Action'
]

export default function DistributionTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = (e) => {
    setSelectedItem(e);
    setIsOpen(!isOpen);
  };

  console.log(selectedItem)

  return (
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white dark:bg-muted text-gray-300">
          <thead>
            <tr>
              {tableHeadData.map((item, index) => (
                  <th key={index} className="py-2 text-left last:text-right px-4 text-sm font-medium text-gray-900 dark:text-white">{item}</th>
              ))}
            </tr>
          </thead>

          <tbody className="dark:bg-secondary">
            {
              data.map((item, index) => {
                const totalSupply = item.TotalSupply.reduce((total, supply) => total + parseInt(supply.value), 0);

                return(
                  <tr className="border-b border-gray-200 text-muted-foreground dark:text-gray-400 dark:border-gray-600 last:border-0" key={index}>
                    <td className="py-2 px-4 text-sm font-medium">{item.dealerId}</td>
                    <td className="py-2 px-4 text-sm font-medium">{item.dealerName}</td>
                    <td className="py-2 px-4 text-sm font-medium">{item.address}</td>
                    <td className="py-2 px-4 text-sm font-medium">{totalSupply}</td>
                    <td className="py-2 px-4 text-sm font-medium">{item.multiDelivery ? <CheckIcon className="text-green-500 w-5 h-5"/> :
                        <XMarkIcon className="text-red-500 w-5 h-5"/>}</td>
                    <td className="py-2 float-end px-4 text-sm font-medium"><EyeIcon onClick={() => toggleModal(item)} className="w-5 h-5 hover:text-blue-500 cursor-pointer duration-300 ease-in-out"/></td>
                  </tr>
              )})
            }
          </tbody>
        </table>

        {
          isOpen && (
              <FramerModal isOpen={isOpen} onClose={toggleModal}>
                <DistributionDataEdit item={selectedItem}/>
              </FramerModal>
          )
        }
      </div>
  );
};
