import ManageParameter from "./ManageParameter";
import { useState } from "react";

export default function Parameters() {
  const [selectedParameter, setSelectedParameter] = useState("transaction_category");

  const menuItems = [
    { key: "transaction_category", label: "Transactions Category" },
    { key: "transaction_type", label: "Transactions Type" },
    { key: "payment_methods", label: "Payment Methods" },
  ];

  return (
    <div className="flex h-full">
      <div className="w-1/4 h-full p-4 text-white">
        <h2 className="text-lg font-bold mb-4">Parameters</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`cursor-pointer p-2 rounded-lg ${
                selectedParameter === item.key ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedParameter(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {selectedParameter === "transaction_category" && (
          <ManageParameter title="Transactions Category" type="transaction_category" />
        )}
        {selectedParameter === "transaction_type" && (
          <ManageParameter title="Transactions Type" type="transaction_type" />
        )}
        {selectedParameter === "payment_methods" && (
          <ManageParameter title="Payments Method" type="payment_methods" />
        )}
      </div>
    </div>
  );
}
