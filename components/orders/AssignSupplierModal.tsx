"use client";

import { Supplier } from "@/types/dashboard";

type Props = {
  open: boolean;
  suppliers: Supplier[];
  onClose: () => void;
  onAssign: (supplierId: string) => void;
};

export default function AssignSupplierModal({
  open,
  suppliers,
  onClose,
  onAssign,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111827] p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Assign Supplier
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Supplier List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {suppliers.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-[#0B0F14] p-6 text-center">
              <p className="text-gray-400">
                No available suppliers.
              </p>
            </div>
          ) : (
            suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="rounded-2xl border border-white/5 bg-[#0B0F14] p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  {/* Supplier Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {supplier.name}
                    </h3>

                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-gray-400">
                        Availability:
                        <span className="ml-2 text-green-400">
                          {supplier.availability}
                        </span>
                      </p>

                      <p className="text-sm text-gray-400">
                        Territory:
                        <span className="ml-2 text-white">
                          {supplier.territory}
                        </span>
                      </p>

                      <p className="text-sm text-gray-400">
                        Current Workload:
                        <span className="ml-2 text-white">
                          {supplier.currentWorkload}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Assign Button */}
                  <button
                    onClick={() =>
                      onAssign(
                        supplier.id.toString()
                      )
                    }
                    className="bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-3 rounded-xl transition-all"
                  >
                    Assign
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-gray-300 hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}