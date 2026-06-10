export type OrderStatus =
  | "Pending"
  | "Supplier Assigned"
  | "Driver Assigned"
  | "Picked Up"
  | "En Route"
  | "Delivered"
  | "Cancelled";

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  pickupAddress: string;
  deliveryAddress: string;
  itemDescription: string;

  zone: string;

  status: OrderStatus;

  supplierId?: string;
  driverId?: string;

  supplierName?: string;
  driverName?: string;
};

export interface Driver {
  id: number;

  fullName: string;

  vehicleType: string;

  status: string;
}

export interface Supplier {
  id: number;
  businessName?: string;
  name?: string;
  status: string;
}

export interface DashboardStats {
  liveOrders: number;

  driversOnline: number;

  suppliersActive: number;

  deliveredToday: number;
}