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

    const highlightCell = (cell) => {
        if (cell.classList.contains("active")) {
            cell.classList.remove("active");
        } 
        else {
            const cells = cell.parentElement.querySelectorAll("td");
            cells.forEach(element => {
                element.classList.remove("active")
            });
            cell.classList.toggle("active");
        }
    }

    return (
        <div className="bets">
            {loading ? <div>Yükleniyor...</div> : 
            <table>
                <thead>
                    <tr>
                        <th>Event Count</th>
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
                                <td className='text-left'>{item.C} {item.T} {item.N}</td>
                                <td className='text-left'>Yorumlar</td>
                                <td>{item.OCG[1].MBS}</td>
                                <td onClick={(e)=> {context.actions.add(item, item.OCG[1].OC[0].O); highlightCell(e.target);}}>{item.OCG[1].OC[0].O}</td>
                                <td onClick={(e)=> {context.actions.add(item, item.OCG[1].OC[1].O); highlightCell(e.target);}}>{item.OCG[1].OC[1].O}</td>
                                <td></td>
                                <td onClick={(e)=> {context.actions.add(item, item.OCG[5].OC[25].O); highlightCell(e.target);}}>{item.OCG[5].OC[25].O}</td>
                                <td onClick={(e)=> {context.actions.add(item, item.OCG[5].OC[26].O); highlightCell(e.target);}}>{item.OCG[5].OC[26].O}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td onClick={(e)=> {context.actions.add(item, item.OCG[2].OC[3].O); highlightCell(e.target);}}>{item.OCG[2].OC[3].O}</td>
                                <td onClick={(e)=> {context.actions.add(item, item.OCG[2].OC[4].O); highlightCell(e.target);}}>{item.OCG[2].OC[4].O}</td>
                                <td onClick={(e)=> {context.actions.add(item, item.OCG[2].OC[5].O); highlightCell(e.target);}}>{item.OCG[2].OC[5].O}</td>
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