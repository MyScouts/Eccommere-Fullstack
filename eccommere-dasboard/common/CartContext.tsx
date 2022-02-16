import React, { useEffect } from "react";
import { IProductInfo } from "../interface/products";
import { cartItems, getCart } from "../utils/storageUtil";

interface ICartContext {
}

interface ICartInfo {
    productId: string,
    quantity: number
    avatar: string
    name: string
    price: number
}

export const CartContext = React.createContext({} as any);

export const CartStoreProvider = (props: any) => {
    const [cart, setCart] = React.useState<ICartInfo[]>([]);
    const [total, setTotal] = React.useState(0);

    const addToCart = (product: IProductInfo) => {
        console.log("🚀 ~ file: CartContext.tsx ~ line 23 ~ addToCart ~ product", product)

        if (cart.length <= 0) {
            const newCart = [{
                productId: product.productId,
                quantity: 1,
                avatar: product.avatar,
                name: product.productName,
                price: product.price
            }]
            setCart(newCart);
        } else {
            const newCart = [...cart];
            const index = newCart.findIndex(item => item.productId === product.productId);
            console.log("🚀 ~ file: CartContext.tsx ~ line 37 ~ addToCart ~ index", index)
            if (index > -1) {
                newCart[index].quantity += 1;
            } else {
                newCart.push({
                    productId: product.productId,
                    quantity: 1,
                    avatar: product.avatar,
                    name: product.productName,
                    price: product.price
                })
            }
            setCart(newCart);
        }

        const total = cart.reduce((total, item) => total + item.quantity * item.price, 0);
        setTotal(total);
        // if (cartItem) {
        //     cartItem.quantity += 1;
        // } else {
        //     product.quantity = 1;
        //     cart[product.id] = product;
        // }
        // cartItem.productName = product.productName;
        // setCart({ ...cart });
        // setTotal(total + product.price);
    };

    const removeCart = (productID: string) => {
        const newCart = cart.filter(item => item.productId !== productID);
        setCart(newCart);
        const total = newCart.reduce((total, item) => total + item.quantity * item.price, 0);
        setTotal(total);
    };  

    const updateCart = (productID: string, quantity: number) => {
        const newCart = cart.map(item => {
            if (item.productId === productID) {
                item.quantity = quantity;
            }
            return item;
        });
        setCart(newCart);
        const total = newCart.reduce((total, item) => total + item.quantity * item.price, 0);
        setTotal(total);
    };

    const removeFromCart = (product: any) => {
        // const cartItem = cart[product.id] ;
        // if (cartItem) {
        //     if (cartItem.quantity === 1) {
        //         delete cart[product.id];
        //     } else {
        //         cartItem.quantity -= 1;
        //     }
        // }
        // setCart({ ...cart });
        // setTotal(total - product.price);
    };

    // useEffect(() => {
    //     const cartItems = getCart();
    //     if (cartItems && cartItems.length > 0) {
    //         setCart(cartItems)
    //     }
    // }, [cart]);

    const clearCart = () => {
        setCart([]);
        setTotal(0);
    }
    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, removeCart, clearCart,updateCart }}>
            {props.children}
        </CartContext.Provider>
    );
}