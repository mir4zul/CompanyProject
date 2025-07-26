import {RoadDetailsData} from "../../assets/Data.jsx";

const headName = [
  "Road No",
  "Road Name",
  "Quantity",
  "Sector",
];

export default function RoadDetails() {
  return (
      <div className="bg-accent p-4 shadow rounded-md flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center">Road Details</h1>

        <div className="border border-gray-400 dark:border-gray-600 rounded overflow-hidden flex-1">
          <div className="overflow-y-auto h-[21.3rem] scrollbar-thin">
            <table className="w-full table-auto">
              <thead className="sticky top-0 bg-accent z-10">
              <tr>
                {headName.map((head, index) => (
                    <th
                        key={index}
                        className="p-2 text-left text-sm font-semibold"
                    >
                      {head}
                    </th>
                ))}
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-400 dark:divide-gray-600">
              {RoadDetailsData.map((road, index) => (
                  <tr key={index}>
                    <td className="p-2 text-xs">{road.roadNo}</td>
                    <td className="p-2 text-xs">{road.roadName}</td>
                    <td className="p-2 text-xs">{road.quantity}</td>
                    <td className="p-2 text-xs">{road.sector}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}