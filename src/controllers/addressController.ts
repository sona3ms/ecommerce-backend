import type { Request, Response } from "express";
import * as addressService from "../services/addressService.js";

export const getAddresses = (
  req: Request,
  res: Response
) => {
  res.json(addressService.getAddresses());
};

export const addAddress = (
  req: Request,
  res: Response
) => {
  const address = addressService.addAddress(req.body);

  res.status(201).json({
    message: "Address added successfully",
    address,
  });
};

export const updateAddress = (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const address = addressService.updateAddress(
    id,
    req.body
  );

  if (!address) {
    return res.status(404).json({
      message: "Address not found",
    });
  }

  res.json({
    message: "Address updated successfully",
    address,
  });
};

export const deleteAddress = (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const deleted = addressService.deleteAddress(id);

  if (!deleted) {
    return res.status(404).json({
      message: "Address not found",
    });
  }

  res.json({
    message: "Address deleted successfully",
  });
};