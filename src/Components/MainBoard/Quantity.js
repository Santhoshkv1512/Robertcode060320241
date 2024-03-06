import { useEffect, useState } from "react";
import { state } from "../../store";
import { useSnapshot } from "valtio";

const Quantity = () => {
    const snap = useSnapshot(state);
    const [quantity, setQuantity] = useState(0);

    const clickQuantityBtn = () => {
        state.showPopup = true;
    }

    const changeQuantity = (e) => {
        state.currentQuantity = e.target.value;
    }

    const handleFocus = () => {
        state.disableControl = true;
    }

    const handleBlur = () => {
        state.disableControl = false;
    }

    useEffect(() => {
        setQuantity(snap.currentQuantity);
        if (snap.currentQuantity === 0) state.progressArray[7] = 0;
        else state.progressArray[7] = 1;
    }, [snap.currentQuantity])
    return (
        <div className="tapContainer">
            <div className="dimensionContainer" style={{ marginRight: '30px' }}>
                <label className="dimensionLabel">{'Quantity'}</label>
                <input type="number" id="length" className="dimensionInput" onFocus={handleFocus} onBlur={handleBlur} onChange={changeQuantity} value={quantity}/>
            </div>
            <button onClick={clickQuantityBtn} style={{ height: '60px', marginTop: '20px', backgroundColor: '#35b3a8', color: "white", borderRadius: '30px', border: 'none' }}>SUBMIT BRIEF</button>
        </div>
    )
}

export default Quantity;