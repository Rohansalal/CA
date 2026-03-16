import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface CartItem {
    id?: number | string;
    name: string;
    price: number;
    serviceSlug: string;
    serviceId?: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (index: number) => void;
    clearCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('ca_cart');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('ca_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find(i => i.serviceSlug === item.serviceSlug && i.name === item.name);
            if (existing) {
                toast.error('This plan is already in your cart!');
                return prev;
            }
            toast.success(`${item.name} added to cart!`);
            return [...prev, item];
        });
    };

    const removeFromCart = (index: number) => {
        setCart(prev => prev.filter((_, i) => i !== index));
        toast.info('Item removed from cart');
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
