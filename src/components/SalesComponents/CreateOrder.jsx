import {InputField, LabelField, OptionField, SelectField} from "../ui/FromField.jsx";
import {useState} from "react";

const delarData = ['Delar 1', 'Delar 2', 'Delar 3', 'Delar 4', 'Delar 5', 'Delar 6', 'Delar 7', 'Delar 8', 'Delar 9', 'Delar 10'];

export default function CreateOrder() {
  const [openOwner, setOpenOwner] = useState(false);

  return (
      <div className="bg-accent p-4 shadow rounded-md">
        <h1 className="text-2xl font-bold mb-4">Create Order</h1>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sales Delar Name*/}
            <div className="flex flex-col">
              <LabelField className="text-sm" htmlFor="salesPoint">Sales Delar</LabelField>
              <SelectField id="salesPoint" name="salesPoint" className="w-full" defaultValue="default">
                <OptionField disabled value="default">Select Delar</OptionField>
                {
                  delarData.map((delar, index) => (
                      <OptionField
                          key={index}
                          value={index + 1}
                      >
                        {delar}
                      </OptionField>
                  ))
                }
              </SelectField>
            </div>
            <div className="">
              <p className="text-sm mb-2">Delar Balance: </p>
              <p className="bg-secondary text-green-500 p-2">2000 TK</p>
            </div>
          </div>

          {/* ------- Sales Team & Payment Terms ------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sales Team */}
            <div className="flex flex-col">
              <LabelField className="text-sm" htmlFor="salesPoint">Sales Types</LabelField>
              <SelectField id="salesPoint" name="salesPoint" className="w-full" defaultValue="default">
                <OptionField disabled value="default">Select Delar</OptionField>
                {
                  delarData.map((delar, index) => (
                      <OptionField
                          key={index}
                          value={index + 1}
                      >
                        {delar}
                      </OptionField>
                  ))
                }
              </SelectField>
            </div>

            {/* Pyment Terms*/}
            <div className="flex flex-col">
              <LabelField className="text-sm" htmlFor="salesPoint">Payment Types</LabelField>
              <SelectField id="salesPoint" name="salesPoint" className="w-full" defaultValue="default">
                <OptionField disabled value="default">Select Delar</OptionField>
                {
                  delarData.map((delar, index) => (
                      <OptionField
                          key={index}
                          value={index + 1}
                      >
                        {delar}
                      </OptionField>
                  ))
                }
              </SelectField>
            </div>
          </div>

          {/* ------- Invoice & Due Date ------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Invoice Date */}
            <div className="flex flex-col">
              <LabelField htmlFor="invoiceDate">Invoice Date</LabelField>
              <InputField id="invoiceDate" name="invoiceDate" className="w-full dark:bg-secondary" defaultValue="default"
                          type="date"/>
            </div>

            {/* Delivery Date */}
            <div className="flex flex-col">
              <LabelField htmlFor="dueDate">Due Date</LabelField>
              <InputField id="dueDate" name="dueDate" className="w-full dark:bg-secondary"
                          defaultValue="default" type="date"/>
            </div>
          </div>

          {/* ------- Zone & Price Owner ------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Zone name */}
            <div className="flex flex-col">
              <LabelField htmlFor="zone">Zone Name</LabelField>
              <SelectField id="zone" name="zone" className="w-full" defaultValue="default">
                <OptionField disabled value="default">Select Zone</OptionField>
                {
                  delarData.map((delar, index) => (
                      <OptionField
                          key={index}
                          value={index + 1}
                      >
                        {delar}
                      </OptionField>
                  ))
                }
              </SelectField>
            </div>

              {/* Price owner */}
              <div className="flex items-end pb-2">
                <input onChange={() => setOpenOwner(!openOwner)} type="checkbox"
                       className="checkbox border border-gray-400"/>
                <label className="label">
                  {/* Price owner */}
                  {
                    openOwner ? (
                        <select
                            className="focus:outline-none ml-2 pb-1 w-full rounded"
                            defaultValue="default"
                        >
                        <OptionField disabled value="default">Select Owner</OptionField>
                          {
                            delarData.map((delar, index) => (
                                <OptionField
                                    key={index}
                                    value={index + 1}
                                >
                                  {delar}
                                </OptionField>
                            ))
                          }
                        </select>
                    ) : (
                        <span className="label-text ml-2">Authorized</span>
                    )
                  }
                </label>
              </div>
          </div>
        </div>
      </div>
  );
}