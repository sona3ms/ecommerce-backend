import type { CartItem } from "./cart.js";
import type { Address } from "./address.js";

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  address: Address;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: string;
  createdAt: Date;
}