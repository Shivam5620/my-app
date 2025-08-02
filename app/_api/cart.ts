import Ax from "@/lib/axios";

// Add to cart
export async function addCartItem({
  session_id,
  quantity,
  productId,
}: {
  session_id: string;
  quantity: number;
  productId: number;
}) {
  const res = await Ax.post("/api/carts", {
    data: {
      session_id,
      quantity,
      product: productId,
    },
  });
  return res.data;
}

// get all cart items
export async function fetchCartItems() {
  const session_id = localStorage.getItem("session_id");
  if (!session_id) return [];

  const res = await Ax.get("/api/carts", {
    params: {
      filters: {
        session_id: session_id,
      },
      populate: ["product", "product.Image"],
    },
  });

  console.log("✅ Cart items fetched:", res.data);
  return res.data?.data || [];
}
// update cart item quantity
export async function updateCartItem(documentId: number, quantity: number) {
  const res = await Ax.put(`/api/carts/${documentId}`, {
    data: {
      quantity,
    },
  });
  return res.data;
}

// remove cart item
export async function removeCartItem(documentId: number) {
  const res = await Ax.delete(`/api/carts/${documentId}`);
  return res.data;
}
