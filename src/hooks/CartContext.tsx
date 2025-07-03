import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";

type Product = {
    id: number;
    title: string;
    price: string;
    images: { id: string; image: string }[];
};

type CartItem = {
    id: number;
    product: Product;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (productId: number, quantity?: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await api.get("cart/");
                setCart(response.data.items);
            } catch (err) {
                console.log("Erro ao buscar carrinho", err);
            }
        };
        fetchCart();
    }, []);

    const addToCart = async (productId: number, quantity = 1) => {
        try {
            const response = await api.post("cart/", {
                product_id: productId,
                quantity,
            });

            const updatedItem = response.data;

            setCart((prevCart) => {
                const index = prevCart.findIndex((item) => item.product.id === productId);
                if (index >= 0) {
                    const updated = [...prevCart];
                    updated[index] = updatedItem;
                    return updated;
                }
                return [...prevCart, updatedItem];
            });
        } catch (err) {
            console.log("Erro ao adicionar ao carrinho", err);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
