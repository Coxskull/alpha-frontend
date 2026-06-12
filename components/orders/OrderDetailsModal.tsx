"use client";

import { Order } from "@/types/dashboard";

type Props = {
  open: boolean;
  onClose: () => void;
  order: Order | null;
};

export default function OrderDetailsModal({
  open,
  onClose,
  order,
}: Props) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="
          w-full
          max-w-4xl
          max-h-[90vh]
          overflow-y-auto
          bg-[#111827]
          rounded-3xl
          border
          border-white/10
          p-6
          md:p-8
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Request Details
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              {order.orderNumber}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Customer */}
          <InfoCard
            label="Customer Information"
            value={order.customerName}
          />

          {/* Status */}
          <InfoCard
            label="Current Status"
            value={order.status}
          />

          {/* Supplier */}
          <InfoCard
            label="Assigned Supplier"
            value={
              order.supplierName ||
              "Not Assigned"
            }
          />

          {/* Driver */}
          <InfoCard
            label="Assigned Driver"
            value={
              order.driverName ||
              "Not Assigned"
            }
          />

          {/* Pickup */}
          <InfoCard
            label="Pickup Address"
            value={order.pickupAddress}
          />

          {/* Delivery */}
          <InfoCard
            label="Delivery Address"
            value={order.deliveryAddress}
          />

          {/* Request Type */}
          <InfoCard
            label="Request Type"
            value={order.itemDescription}
          />

          {/* Zone */}
          <InfoCard
            label="Territory / Zone"
            value={order.zone}
          />

          {/* Created */}
          <InfoCard
            label="Created Time"
            value={
              order.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleString()
                : "N/A"
            }
          />

          {/* Updated */}
          <InfoCard
            label="Last Updated"
            value={
              order.updatedAt
                ? new Date(
                    order.updatedAt
                  ).toLocaleString()
                : "N/A"
            }
          />
        </div>

        {/* Notes / Description */}
        <div className="mt-6 rounded-2xl bg-[#0B0F14] border border-white/5 p-5">
          <p className="text-gray-400 text-sm mb-2">
            Request Description
          </p>

          <p className="text-white">
            {order.itemDescription}
          </p>
        </div>

       <div>
  <p className="text-gray-500">Created</p>
  <p className="text-white">
    {new Date(order.createdAt ?? "").toLocaleString()}
  </p>
</div>

<div>
  <p className="text-gray-500">Updated</p>
  <p className="text-white">
    {new Date(order.updatedAt ?? "").toLocaleString()}
  </p>
</div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-2xl bg-[#0B0F14] border border-white/5 p-4">
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p className="text-white font-medium mt-2 break-words">
        {value || "N/A"}
      </p>
    </div>
  );
}