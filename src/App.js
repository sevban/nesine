import './App.css';
import { CartContextWrapper } from './context/cartContext';
import Bets from './components/bets';
import Cart from './components/cart';

function App() {

    return (
        <div className="app">
            <CartContextWrapper>
                <Bets />
                <Cart />
            </CartContextWrapper>
        </div>
    );
}

export default App;
