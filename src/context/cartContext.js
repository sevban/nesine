import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartContextWrapper = (props) => {

	const [ store, setStore ] = useState({
		cart: [],
        total: 0
	});

	const [ actions, setActions ] = useState({});
    useEffect(() => {
        setActions({
            add: (data, value) => { 
                data.value = value;


                store.cart.some(item => {
                    return item.NID === data.NID && item.value === data.value;
                });

                // delete if id and value is  same
                if (store.cart.some(item => item.NID === data.NID && item.value === data.value)) {
                    setStore((store) => (
                        { 
                            ...store, 
                            cart: store.cart.filter((item) => item.NID !== data.NID)
                        }
                    ));
                }

                // delete old and add new if id is same but value is different
                if (store.cart.some(item => item.NID === data.NID && item.value !== value)) {
                    setStore((store) => (
                        { 
                            ...store, 
                            cart: store.cart.filter((item) => item.NID !== data.NID).concat(data)
                        }
                    ));
                } 
                
                // add if id is unique
                if (!store.cart.some(item => item.NID === data.NID)) {
                    setStore((store) => (
                        { 
                            ...store, 
                            cart: store.cart.concat(data)
                        }
                    ));
                }

                setStore((store) => (
                    { 
                        ...store, 
                        total: store.cart.reduce((total, item) => Math.ceil(total * item.value), 1)
                    }
                ));
                
            }
        });
    }, [store]);

    /*const actions = {
        add: (data, value) => { 
            data.value = value;
            if (!store.cart.some(item => item.NID === data.NID && item.value === data.value)) {
                store.cart.filter((item) => item.NID !== data.NID);
                setStore((store) => ({ ...store, cart: store.cart.concat(data)}));
            }
            else {
                setStore((store) => (
                    { ...store, cart: !store.cart.some(item => item.NID === data.NID) ? store.cart.concat(data) :  store.cart }
                ));
            }
        }
    }*/


	return (
		<CartContext.Provider value={{ store, actions }}>
			{props.children}
		</CartContext.Provider>
	);
}