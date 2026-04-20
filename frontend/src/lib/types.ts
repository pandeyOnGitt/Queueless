export type Service = {
  id: string;
  name: string;
  description: string;
  location: string;
  avgServiceTime: number;
  currentQueueLength: number;
  currentToken: number;
  status: "OPEN" | "BUSY" | "CLOSED";
  slotDuration: number;
  slotCapacity: number;
  openingTime: string;
  closingTime: string;
};

export type Slot = {
  id: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  status: "AVAILABLE" | "FULL" | "CLOSED";
};

export type QueueStatus = {
  serviceId: string;
  currentQueueLength: number;
  currentToken: number;
  avgServiceTime: number;
  estimatedWaitingTime: number;
  status: "OPEN" | "BUSY" | "CLOSED";
};

export type Booking = {
  id: string;
  bookingToken: number;
  estimatedWaitTime: number;
  status: string;
  service: { name: string };
  slot: { startTime: string };
};

export type DashboardStats = {
  totalServices: number;
  totalBookings: number;
  activeBookings: number;
  availableSlots: number;
};
