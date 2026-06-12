"use client";

import { Driver } from "@/types/dashboard";

type Props = {
  open: boolean;
  drivers: Driver[];
  onClose: () => void;
  onAssign: (driverId: string) => void;
};

export default function AssignDriverModal({
  open,
  drivers,
  onAssign,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111827] rounded-2xl p-6 w-full max-w-2xl mx-4">

        <h2 className="text-xl font-bold text-white mb-6">
          Available Drivers
        </h2>

        <div className="space-y-3">
          {drivers.map(driver => (
            <div
              key={driver.id}
              className="border border-white/10 rounded-xl p-4"
            >
              <p className="text-white font-semibold">
                {driver.fullName}
              </p>

              <p className="text-gray-400 text-sm">
                Availability:
                {driver.availability}
              </p>

              <p className="text-gray-400 text-sm">
                Territory:
                {driver.territory}
              </p>

              <p className="text-gray-400 text-sm">
                Active Jobs:
                {driver.activeJobs}
              </p>

              <button
                onClick={() =>
                  onAssign(driver.id)
                }
                className="mt-3 bg-green-500 text-black px-4 py-2 rounded-lg"
              >
                Assign
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}