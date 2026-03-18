import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface CartItem {
    id?: number | string;
    name: string;
    price: number;
    serviceSlug: string;
    serviceId?: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (index: number) => void;
    updateQuantity: (index: number, quantity: number) => void;
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
            const existingIndex = prev.findIndex(i => i.serviceSlug === item.serviceSlug && i.name === item.name);
            if (existingIndex !== -1) {
                const updatedCart = [...prev];
                updatedCart[existingIndex].quantity += (item.quantity || 1);
                toast.success(`Updated ${item.name} quantity in cart!`);
                return updatedCart;
            }
            toast.success(`${item.name} added to cart!`);
            return [...prev, { ...item, quantity: item.quantity || 1 }];
        });
    };

    const updateQuantity = (index: number, quantity: number) => {
        setCart(prev => {
            if (quantity <= 0) {
                return prev.filter((_, i) => i !== index);
            }
            const updatedCart = [...prev];
            updatedCart[index] = { ...updatedCart[index], quantity };
            return updatedCart;
        });
    };

    const removeFromCart = (index: number) => {
        setCart(prev => prev.filter((_, i) => i !== index));
        toast.info('Item removed from cart');
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
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








