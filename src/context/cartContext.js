import { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartContextWrapper = (props) => {

	const [ store, setStore ] = useState({
		cart: [],
        total: 0
	});

    const updateCart = (data, value) => {
        data.value = value;

        setStore((prevStore) => {
            return {
                ...prevStore, 
                cart: prevStore.cart.filter((item) => item.NID !== data.NID).concat(data)
            }
        });

        setStore((prevStore) => (
            { 
                ...prevStore,
                total: prevStore.cart.reduce((total, item) => Math.ceil(total * item.value), 1)
            }
        ));
    }

	return (
		<CartContext.Provider value={{ store, updateCart }}>
			{props.children}
		</CartContext.Provider>
	);
}