import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "@/app/_api/cart";

export const useCartItems = () =>
  useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
  });

// add to cart function

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      session_id,
      quantity,
      productId,
    }: {
      session_id: string;
      quantity: number;
      productId: number;
    }) => {
      const cartItems = await fetchCartItems();
      const existingItem = cartItems.find(
        (item: any) =>
          item.session_id === session_id && item.product?.id === productId
      );

      if (existingItem) {
        return updateCartItem(
          existingItem.documentId,
          existingItem.quantity + quantity
        );
      } else {
        // 👇 add new item if not in cart
        return addCartItem({ session_id, quantity, productId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// update function
export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      documentId,
      quantity,
    }: {
      documentId: number;
      quantity: number;
    }) => updateCartItem(documentId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
};

// remove cart function
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
};
