import { addresses } from "../data/addresses.js";
import type { Address } from "../types/address.js";

export const getAddresses = () => addresses;

export const getAddressById = (id: number) =>
  addresses.find((a) => a.id === id);

export const addAddress = (address: Address) => {
  addresses.push(address);
};

export const updateAddress = (
  id: number,
  updated: Partial<Address>
) => {
  const address = getAddressById(id);

  if (!address) return null;

  Object.assign(address, updated);

  return address;
};

export const deleteAddress = (id: number) => {
  const index = addresses.findIndex((a) => a.id === id);

  if (index === -1) return false;

  addresses.splice(index, 1);

  return true;
};