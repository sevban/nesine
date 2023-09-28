import { CartContext } from '../context/cartContext';
import { Fragment, useState, useEffect, useContext } from 'react';

function Bets() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const context = useContext(CartContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://nesine-case-study.onrender.com/bets`);
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                let actualData = await response.json();
                setData(actualData);
                setError(null);
            }
            catch (err) {
                setError(err.message);
                setData(null);
            }
            finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    const highlightCell = (id, value) => {
        return context.store.cart.some((ci) => ci.NID === id && ci.value === value) ? "active" : "";
    }

    return (
        <div className="bets">
            <div className={`loading ${!loading && "done"}`}>Yükleniyor...</div>
            {!loading && 
            <table>
                <thead>
                    <tr>
                        <th>Event Count: {data.length}</th>
                        <th>Yorumlar</th>
                        <th></th>
                        <th>1</th>
                        <th>x</th>
                        <th>2</th>
                        <th>Alt</th>
                        <th>Üst</th>
                        <th>H1</th>
                        <th>1</th>
                        <th>x</th>
                        <th>2</th>
                        <th>H2</th>
                        <th>1-X</th>
                        <th>1-2</th>
                        <th>X-2</th>
                        <th>Var</th>
                        <th>Yok</th>
                        <th>+99</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, i) => (
                        <Fragment key={item.NID}>
                            <tr>
                                <td className='text-left'>{item.D} {item.DAY} {item.LN} </td>
                                <td className='text-left'>Yorumlar</td>
                                <td></td>
                                <td>1</td>
                                <td>x</td>
                                <td>2</td>
                                <td>Alt</td>
                                <td>Üst</td>
                                <td>H1</td>
                                <td>1</td>
                                <td>x</td>
                                <td>2</td>
                                <td>H2</td>
                                <td>1-X</td>
                                <td>1-2</td>
                                <td>X-2</td>
                                <td>Var</td>
                                <td>Yok</td>
                                <td>+99</td>
                            </tr>
                            <tr>
                                <td className='text-left'><b>{item.C}</b> {item.T} {item.N}</td>
                                <td className='text-left'>Yorumlar</td>
                                <td>{item.OCG[1].MBS}</td>
                                <td className={ highlightCell(item.NID, item.OCG[1].OC[0].O) } onClick={(e)=> {context.updateCart(item, item.OCG[1].OC[0].O); }}>{item.OCG[1].OC[0].O}</td>
                                <td className={ highlightCell(item.NID, item.OCG[1].OC[1].O) } onClick={(e)=> {context.updateCart(item, item.OCG[1].OC[1].O); }}>{item.OCG[1].OC[1].O}</td>
                                <td></td>
                                <td className={ highlightCell(item.NID, item.OCG[5].OC[25].O) } onClick={(e)=> {context.updateCart(item, item.OCG[5].OC[25].O); }}>{item.OCG[5].OC[25].O}</td>
                                <td className={ highlightCell(item.NID, item.OCG[5].OC[26].O) } onClick={(e)=> {context.updateCart(item, item.OCG[5].OC[26].O); }}>{item.OCG[5].OC[26].O}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className={ highlightCell(item.NID, item.OCG[2].OC[3].O) } onClick={(e)=> {context.updateCart(item, item.OCG[2].OC[3].O); }}>{item.OCG[2].OC[3].O}</td>
                                <td className={ highlightCell(item.NID, item.OCG[2].OC[4].O) } onClick={(e)=> {context.updateCart(item, item.OCG[2].OC[4].O); }}>{item.OCG[2].OC[4].O}</td>
                                <td className={ highlightCell(item.NID, item.OCG[2].OC[5].O) } onClick={(e)=> {context.updateCart(item, item.OCG[2].OC[5].O); }}>{item.OCG[2].OC[5].O}</td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
            }
            {error && <div>{`Fetch işleminde problem oluştu - ${error}`}</div> }
        </div>
    );
}

export default Bets;