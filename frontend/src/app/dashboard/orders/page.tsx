"use client";
import { useState } from "react";
import { Package } from "lucide-react";

// ডামি ডাটা (ব্যাকএন্ড রেডি হলে axios.get('/seller/orders') করবেন)
const initialOrders = [
  { id: 101, customer: "Rahim Ahmed", product: "Wireless Headphone", amount: "$45", status: "Pending" },
  { id: 102, customer: "Karim Uddin", product: "Smart Watch", amount: "$120", status: "Shipped" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id: number) => {
    // এখানে axios.patch() কল হবে
    const updated = orders.map(o => o.id === id ? { ...o, status: "Shipped" } : o);
    setOrders(updated);
    alert(`Order #${id} marked as Shipped!`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4">#{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" /> {order.product}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  {order.status === 'Pending' && (
                    <button 
                      onClick={() => updateStatus(order.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                    >
                      Ship Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}