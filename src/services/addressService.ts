import * as addressRepository from "../repositories/addressRepository.js";

export const getAddresses = async (
  userId: number
) => {
  return await addressRepository.getAddresses(
    userId
  );
};

export const addAddress = async (
  userId: number,
  data: Omit<
    Parameters<typeof addressRepository.addAddress>[0],
    "id" | "userId"
  >
) => {
  const address = {
    id: Date.now(),
    userId,
    ...data,
  };

  return await addressRepository.addAddress(
    address
  );
};

export const updateAddress = async (
  id: number,
  userId: number,
  data: any
) => {
  return await addressRepository.updateAddress(
    id,
    userId,
    data
  );
};

export const deleteAddress = async (
  id: number,
  userId: number
) => {
  return await addressRepository.deleteAddress(
    id,
    userId
  );
};