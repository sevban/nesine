import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

function Cart() {
    const context = useContext(CartContext);
    return (
        <div className="cart">

            {context.store ? context.store.cart.map((item) => (
                <div className='cart-item' key={item.NID}>
                    <span><b>Kod:</b> {item.C}</span>
                    <span><b>Maç:</b> {item.N}</span>
                    <span><b>Oran:</b> {item.value}</span>
                </div>
            )) : ""}
            <div className="cart-total"><b>Toplam Tutar:</b> { context.store.total } TL</div>
        </div>
    )
}

export default Cart;
