import React from "react";

function PageTable({ data }) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Category
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {item.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {item.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PageTable;