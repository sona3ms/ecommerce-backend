import { test, expect } from "../fixtures/apiFixture";

test("should add, update and delete an address", async ({
  addressClient,
}) => {
  // Add
  const addResponse = await addressClient.addAddress({
    fullName: "Test User",
    phone: "9876543210",
    house: "12A",
    street: "MG Road",
    city: "Kottayam",
    state: "Kerala",
    pincode: "686001",
  });

  expect(addResponse.status()).toBe(201);

  const addBody = await addResponse.json();

  const addressId = addBody.address.id;

  expect(addressId).toBeTruthy();

  // Update
  const updateResponse = await addressClient.updateAddress(
    addressId,
    {
      city: "Kochi",
      pincode: "682001",
    }
  );

  expect(updateResponse.status()).toBe(200);

  const updateBody = await updateResponse.json();

  expect(updateBody.address.city).toBe("Kochi");
  expect(updateBody.address.pincode).toBe("682001");

  // Delete
  const deleteResponse =
    await addressClient.deleteAddress(addressId);

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  expect(deleteBody.message).toBe("Address deleted successfully");
});