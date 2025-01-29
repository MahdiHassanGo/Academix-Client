import { useState, useEffect } from "react";

const useCart = () => {
    const [cart, setCart] = useState([]); 

    useEffect(() => {

        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    return [cart]; 
}
export default useCart;
