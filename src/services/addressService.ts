import * as addressRepository from "../repositories/addressRepository.js";

export const getAddresses = () => {
  return addressRepository.getAddresses();
};

export const addAddress = (data: any) => {
  const address = {
    id: Date.now(),
    ...data,
  };

  addressRepository.addAddress(address);

  return address;
};

export const updateAddress = (
  id: number,
  data: any
) => {
  return addressRepository.updateAddress(id, data);
};

export const deleteAddress = (id: number) => {
  return addressRepository.deleteAddress(id);
};