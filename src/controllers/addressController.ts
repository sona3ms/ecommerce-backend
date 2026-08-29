import type { Request, Response } from "express";

import * as addressService from "../services/addressService.js";

export const getAddresses = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user.id;

  const addresses =
    await addressService.getAddresses(userId);

  res.json(addresses);
};

export const addAddress = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user.id;

  const address =
    await addressService.addAddress(
      userId,
      req.body
    );

  res.status(201).json({
    message: "Address added successfully",
    address,
  });
};

export const updateAddress = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);

  const address =
    await addressService.updateAddress(
      id,
      userId,
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

export const deleteAddress = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);

  const deleted =
    await addressService.deleteAddress(
      id,
      userId
    );

  if (!deleted) {
    return res.status(404).json({
      message: "Address not found",
    });
  }

  res.json({
    message: "Address deleted successfully",
  });
};