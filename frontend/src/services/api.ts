const API_URL = "http://localhost:3000";

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Registration failed"
    );
  }

  return data;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed"
    );
  }

  return data;
};
export const getProfile = async () => {
  const response = await fetch(
    `${API_URL}/auth/profile`,
    {
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch profile"
    );
  }

  return data;
};
export const getCart = async () => {
  const response = await fetch(`${API_URL}/cart`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch cart"
    );
  }

  return data;
};

export const addToCart = async (productId: number) => {
  const response = await fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      productId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to add product to cart"
    );
  }

  return data;
};

export const updateCartQuantity = async (
  productId: number,
  quantity: number
) => {
  const response = await fetch(
    `${API_URL}/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        quantity,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update quantity"
    );
  }

  return data;
};

export const removeFromCart = async (
  productId: number
) => {
  const response = await fetch(
    `${API_URL}/cart/${productId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to remove item"
    );
  }

  return data;
};
type AddressInput = {
  fullName: string;
  phone: string;
  house: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
};

export const getAddresses = async () => {
  const response = await fetch(
    `${API_URL}/addresses`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch addresses"
    );
  }

  return data;
};

export const addAddress = async (
  address: AddressInput
) => {
  const response = await fetch(
    `${API_URL}/addresses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(address),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to add address"
    );
  }

  return data;
};

export const updateAddress = async (
  id: number,
  address: AddressInput
) => {
  const response = await fetch(
    `${API_URL}/addresses/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(address),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update address"
    );
  }

  return data;
};

export const deleteAddress = async (id: number) => {
  const response = await fetch(
    `${API_URL}/addresses/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete address"
    );
  }

  return data;
};

export const applyCoupon = async (code: string) => {
  const response = await fetch(
    `${API_URL}/coupons`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        code,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to apply coupon"
    );
  }

  return data;
};

export const checkout = async (
  addressId: number,
  couponCode?: string
) => {
  const response = await fetch(
    `${API_URL}/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        addressId,
        couponCode,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Checkout failed"
    );
  }

  return data;
};

export const getOrders = async () => {
  const response = await fetch(
    `${API_URL}/orders`,
    {
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load orders"
    );
  }

  return data;
};

export const getOrderById = async (
  id: number
) => {
  const response = await fetch(
    `${API_URL}/orders/${id}`,
    {
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load order"
    );
  }

  return data;
};