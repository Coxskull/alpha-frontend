"use client";

import { useEffect, useState } from "react";
import OrderDetailsModal from "../orders/OrderDetailsModal";
import api from "@/services/api";
import AddOrderModal from "../orders/AddOrderModal";
import { Order } from "@/types/dashboard";

import StatusChip, { OrderStatus } from "../StatusChip";
import OrderTimeline from "../orders/OrderTimeline";
import {
  assignDriver,
  assignSupplier,
  markPickedUp,
  markEnRoute,
  markDelivered,
} from "@/services/orderActions";
export default function ActiveOrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [popupMessage, setPopupMessage] =
  useState<string | null>(null);
const [actionLoading, setActionLoading] =
  useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] =
  useState<Order | null>(null);
  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/Orders");

      setOrders(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch orders",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadOrders = async () => {
    await fetchOrders();
  };

  loadOrders();

  const interval = setInterval(() => {
    loadOrders();
  }, 15000);

  return () => clearInterval(interval);
}, []);

  if (loading) {
    return (
      <div className="text-gray-400">
        Loading orders...
      </div>
    );
  }
const handleAction = async (
  action: () => Promise<unknown>,
  orderId: string
) => {
  try {
    setActionLoading(orderId);

    await action();

    await fetchOrders();
  } catch (error: unknown) {
    console.error(error);

    const axiosError = error as {
      response?: {
        data?: string | { message?: string };
      };
      message?: string;
    };

    const errorMessage =
      typeof axiosError.response?.data === "string"
        ? axiosError.response.data
        : axiosError.response?.data?.message ||
          axiosError.message ||
          "Action failed";

    if (
      errorMessage.includes(
        "No available drivers"
      )
    ) {
      setPopupMessage(
        "🚚 No drivers are currently available."
      );
    } else if (
      errorMessage.includes(
        "No available suppliers"
      )
    ) {
      setPopupMessage(
        "🏭 No suppliers are currently available."
      );
    } else {
      setPopupMessage(errorMessage);
    }
  } finally {
    setActionLoading(null);
  }
};
    return (
  <div className="space-y-5">
    <div className="
flex
flex-col
sm:flex-row
sm:items-center
sm:justify-between
gap-4
">
      <h2 className="text-2xl font-bold text-white">
        Active Orders
      </h2>

      <button
        onClick={() => setShowAddModal(true)}
        className="
          w-full
          xl:w-auto
          bg-green-500
          hover:bg-green-400
          text-black
          font-semibold
          px-5
          py-3
          rounded-xl
        "
      >
        + Add Order
      </button>
    </div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-3xl border border-white/5 bg-[#0B0F14] p-6 hover:border-green-500/20 transition-all"
        >
          {/* Header */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="
text-lg
sm:text-xl
font-bold
text-white
break-all
">
                  {order.orderNumber}
                </h3>

                <StatusChip
                  status={order.status as OrderStatus}
                />
              </div>

              <p className="text-gray-400 text-sm mt-2">
                Customer:{" "}
                {order.customerName}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-[#111827] px-4 py-2 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500">
                  Status
                </p>

               <p className="text-sm font-semibold text-white mt-1">
  {order.status}
</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1
sm:grid-cols-2
xl:grid-cols-4 gap-5 mt-6">
            <div className="rounded-2xl bg-[#111827] p-4 border border-white/5">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Supplier
              </p>

              <p className="text-white font-semibold mt-2">
                {order.supplierName ||
                  "Not Assigned"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#111827] p-4 border border-white/5">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Driver
              </p>

              <p className="text-white font-semibold mt-2">
                {order.driverName ||
                  "Not Assigned"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#111827] p-4 border border-white/5">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Pickup
              </p>

              <p className="text-white font-semibold mt-2">
                {order.pickupAddress}
              </p>
            </div>

            <div className="rounded-2xl bg-[#111827] p-4 border border-white/5">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Delivery
              </p>

              <p className="text-white font-semibold mt-2">
                {order.deliveryAddress}
              </p>
            </div>
          </div>

          {/* Timeline */}
<div className="mt-8">

  {(() => {
    const currentStep =
      {
        pending: 0,
        supplier_assigned: 1,
        driver_assigned: 2,
        picked_up: 3,
        en_route: 4,
        delivered: 5,
      }[order.status] ?? 0;

    console.log(
      "ORDER STATUS:",
      order.orderNumber,
      order.status,
      "CURRENT STEP:",
      currentStep
    );

    return (
      <OrderTimeline
        steps={[
          {
            label: "Pending",
            completed: currentStep >= 0,
          },
          {
            label: "Supplier",
            completed: currentStep >= 1,
          },
          {
            label: "Driver",
            completed: currentStep >= 2,
          },
          {
            label: "Pickup",
            completed: currentStep >= 3,
          },
          {
            label: "En Route",
            completed: currentStep >= 4,
          },
          {
            label: "Delivered",
            completed: currentStep >= 5,
          },
        ]}
      />
    );
  })()}
</div>
          {/* Actions */}
<div className="
  grid
  grid-cols-2
  md:grid-cols-3
  xl:flex
  gap-3
  mt-8
">
  {/* View */}
  <button
  onClick={() =>
    setSelectedOrder(order)
  }
  className="
    w-full
    xl:w-auto
    bg-green-500
    hover:bg-green-400
    text-black
    font-semibold
    px-5
    py-2.5
    rounded-xl
  "
>
  View Details
</button>

  {/* Assign Driver */}
  <button
    onClick={() =>
      handleAction(
        () => assignDriver(order.id),
        order.id
      )
    }
    disabled={
  actionLoading === order.id ||
  order.status !== "supplier_assigned"
}
    className={`
px-5 py-2.5 rounded-xl transition-all
${
  order.status !== "supplier_assigned"
    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
    : "bg-[#111827] hover:bg-[#1F2937] border border-white/5 text-white"
}
`}
  >
    {actionLoading === order.id
      ? "Assigning..."
      : "Assign Driver"}
  </button>

  {/* Assign Supplier */}
  <button
    onClick={() =>
      handleAction(
        () =>
          assignSupplier(order.id),
        order.id
      )
    }
    disabled={
  actionLoading === order.id ||
  order.status !== "pending"
}
    className={`
px-5 py-2.5 rounded-xl transition-all
${
  order.status !== "pending"
    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
    : "bg-[#111827] hover:bg-[#1F2937] border border-white/5 text-white"
}
`}
  >
    {actionLoading === order.id
      ? "Assigning..."
      : "Assign Supplier"}
  </button>

  {/* picked_up */}
  <button
    onClick={() =>
      handleAction(
        () => markPickedUp(order.id),
        order.id
      )
    }
    disabled={
  actionLoading === order.id ||
  order.status !== "driver_assigned"
}
    className={`
px-5 py-2.5 rounded-xl transition-all
${
  order.status !== "driver_assigned"
    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
    : "bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400"
}
`}
  >
    picked_up
  </button>

  {/* en_route */}
  <button
    onClick={() =>
      handleAction(
        () => markEnRoute(order.id),
        order.id
      )
    }
    disabled={
  actionLoading === order.id ||
  order.status !== "picked_up"
}
    className={`
px-5 py-2.5 rounded-xl transition-all
${
  order.status !== "picked_up"
    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
    : "bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400"
}
`}
  >
    en_route
  </button>

  {/* delivered */}
  <button
    onClick={() =>
      handleAction(
        () => markDelivered(order.id),
        order.id
      )
    }
    disabled={
  actionLoading === order.id ||
  order.status !== "en_route"
}
    className={`
px-5 py-2.5 rounded-xl transition-all
${
  order.status !== "en_route"
    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
    : "bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400"
}
`}
  >
    delivered
  </button>
</div>
        </div>
      ))}
      <OrderDetailsModal
  open={selectedOrder !== null}
  order={selectedOrder}
  onClose={() =>
    setSelectedOrder(null)
  }
/>
<AddOrderModal
  open={showAddModal}
  onClose={() => setShowAddModal(false)}
  onCreated={fetchOrders}
/>
{popupMessage && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div
  className="
    bg-[#111827]
    border
    border-white/10
    rounded-2xl
    p-6
    w-full
    max-w-md
    mx-4
  "
>
      <h3 className="text-xl font-bold text-white mb-3">
        Assignment Failed
      </h3>

      <p className="text-gray-300">
        {popupMessage}
      </p>

      <div className="flex justify-end mt-6">
        <button
          onClick={() =>
            setPopupMessage(null)
          }
          className="
w-full
xl:w-auto
bg-green-500
hover:bg-green-400
text-black
font-semibold
px-5
py-2.5
rounded-xl"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}