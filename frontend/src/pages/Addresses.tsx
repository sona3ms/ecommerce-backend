import { useEffect, useState } from "react";
import {
  getAddresses,
  addAddress,
  deleteAddress,
} from "../services/api";

type Address = {
  id: number;
  fullName: string;
  phone: string;
  house: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
};

function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // =========================
  // LOAD ADDRESSES
  // =========================

  const loadAddresses = async () => {
    try {
      const data = await getAddresses();

      console.log("Addresses response:", data);

      setAddresses(data);
    } catch (error) {
      console.error(
        "Failed to load addresses:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // =========================
  // ADD ADDRESS
  // =========================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      const data = await addAddress(form);

      console.log("Address added:", data);

      setAddresses((current) => [
        ...current,
        data.address,
      ]);

      // Reset form
      setForm({
        fullName: "",
        phone: "",
        house: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error(
        "Failed to add address:",
        error
      );
    }
  };

  // =========================
  // DELETE ADDRESS
  // =========================

  const handleDelete = async (id: number) => {
    try {
      await deleteAddress(id);

      setAddresses((current) =>
        current.filter(
          (address) => address.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete address:",
        error
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="addresses-page">
        <h1>My Addresses</h1>

        <p>Loading addresses...</p>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="addresses-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="addresses-header">
        <div>
          <p className="section-label">
            DELIVERY
          </p>

          <h1>My Addresses</h1>

          <p>
            Manage your saved delivery addresses.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          {showForm
            ? "Cancel"
            : "+ Add Address"}
        </button>
      </div>

      {/* =========================
          ADD ADDRESS FORM
      ========================= */}

      {showForm && (
        <form
          className="address-form"
          onSubmit={handleSubmit}
        >
          <h2>Add a new address</h2>

          <div className="address-form-grid">

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">
                Full name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(event) =>
                  setForm({
                    ...form,
                    fullName:
                      event.target.value,
                  })
                }
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">
                Phone
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(event) =>
                  setForm({
                    ...form,
                    phone:
                      event.target.value,
                  })
                }
                required
              />
            </div>

            {/* House */}
            <div className="form-group">
              <label htmlFor="house">
                House / Flat
              </label>

              <input
                id="house"
                type="text"
                placeholder="House / Flat number"
                value={form.house}
                onChange={(event) =>
                  setForm({
                    ...form,
                    house:
                      event.target.value,
                  })
                }
                required
              />
            </div>

            {/* Street */}
            <div className="form-group">
              <label htmlFor="street">
                Street
              </label>

              <input
                id="street"
                type="text"
                placeholder="Street name"
                value={form.street}
                onChange={(event) =>
                  setForm({
                    ...form,
                    street:
                      event.target.value,
                  })
                }
                required
              />
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city">
                City
              </label>

              <input
                id="city"
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(event) =>
                  setForm({
                    ...form,
                    city:
                      event.target.value,
                  })
                }
                required
              />
            </div>

            {/* State */}
            <div className="form-group">
              <label htmlFor="state">
                State
              </label>

              <input
                id="state"
                type="text"
                placeholder="State"
                value={form.state}
                onChange={(event) =>
                  setForm({
                    ...form,
                    state:
                      event.target.value,
                  })
                }
                required
              />
            </div>

            {/* PIN Code */}
            <div className="form-group">
              <label htmlFor="pincode">
                PIN code
              </label>

              <input
                id="pincode"
                type="text"
                placeholder="PIN code"
                value={form.pincode}
                onChange={(event) =>
                  setForm({
                    ...form,
                    pincode:
                      event.target.value,
                  })
                }
                required
              />
            </div>

          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Save Address
          </button>
        </form>
      )}

      {/* =========================
          NO ADDRESSES
      ========================= */}

      {addresses.length === 0 ? (
        <div className="empty-addresses">

          <h2>No saved addresses</h2>

          <p>
            Add an address to make checkout
            faster.
          </p>

        </div>
      ) : (

        /* =========================
           ADDRESS CARDS
        ========================= */

        <div className="address-grid">

          {addresses.map((address) => (

            <article
              className="address-card"
              key={address.id}
            >

              <div className="address-card-header">

                <h2>
                  {address.fullName}
                </h2>

                <span>
                  Home
                </span>

              </div>

              <p>
                {address.house}
              </p>

              <p>
                {address.street}
              </p>

              <p>
                {address.city},{" "}
                {address.state}
              </p>

              <p>
                {address.pincode}
              </p>

              <p>
                📞 {address.phone}
              </p>

              <button
                type="button"
                className="remove-button"
                onClick={() =>
                  handleDelete(address.id)
                }
              >
                Remove
              </button>

            </article>

          ))}

        </div>
      )}

    </main>
  );
}

export default Addresses;