"use client";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

const CART_KEY = ["cart"];

export const useCart = () => {
  const queryClient = useQueryClient();

  const cartFromStorage =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];

  const { data: cart = [] } = useQuery({
    queryKey: CART_KEY,
    queryFn: () => cartFromStorage,
    initialData: cartFromStorage,
  });

  const updateCart = (newCart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    queryClient.setQueryData(CART_KEY, newCart);
  };

  const addToCart = useMutation({
    mutationFn: async (product: any) => {
      const exists = cart.find((item: any) => item.id === product.id);
      if (exists) {
        return cart.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...cart, { ...product, quantity: 1 }];
    },
    onSuccess: updateCart,
  });

  const removeFromCart = useMutation({
    mutationFn: async (id: number) => {
      return cart.filter((item: any) => item.id !== id);
    },
    onSuccess: updateCart,
  });

  const increment = (id: number) => {
    const newCart = cart.map((item: any) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decrement = (id: number) => {
    const newCart = cart
      .map((item: any) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
      .filter((item: any) => item.quantity > 0);
    updateCart(newCart);
  };

  return {
    cart,
    addToCart: (product: any) => addToCart.mutate(product),
    removeFromCart: (id: number) => removeFromCart.mutate(id),
    increment,
    decrement,
  };
};
