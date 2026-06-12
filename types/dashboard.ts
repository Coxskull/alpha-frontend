export type OrderStatus =
  | "pending"
  | "supplier_assigned"
  | "driver_assigned"
  | "picked_up"
  | "en_route"
  | "delivered";

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
  id: string;

  fullName: string;

  vehicleType?: string;

  phoneNumber?: string;

  status?: string;

  availability?: string;

  territory?: string;

  activeJobs?: number;
}

export interface Supplier {
  id: string;

  name: string;

  availability: string;

  territory: string;

  currentWorkload: number;
}

export interface DashboardStats {
  liveOrders: number;

  driversOnline: number;

  suppliersActive: number;

  deliveredToday: number;
}