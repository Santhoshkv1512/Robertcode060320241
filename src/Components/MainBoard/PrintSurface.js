import { useSnapshot } from "valtio";
import { useState, useEffect } from "react";
import { state } from "../../store";

const PrintSurface = () => {
    const snap = useSnapshot(state);
    const [borderArray, setBorderArray] = useState(['2px solid #888888', 'none']);

    const printSurfaceBtnClick = (index) => {
        state.currentPrintSurface = index;
    }

    useEffect(() => {
        let instance = borderArray;
        instance = ['none', 'none'];
        instance[snap.currentPrintSurface] = '2px solid #888888';
        setBorderArray(instance);

        state.progressArray[4] = 1;
    }, [snap.currentPrintSurface])

    return (
        <div className="tapContainer">
        {state.initialPrintSurface?.map((printSurface, index) => {
            return  <button className="materialChip" onClick={() => printSurfaceBtnClick(index)} style={{border: borderArray[index]}} key={printSurface.ID}>
                        <div className="materialContent">
                            <img src={"/texture/PrintSurface/" + printSurface.Name + '.png'} className="materialIcon"/>
                            <label className="materialLabel">
                                <span style={{maxWidth: '50px'}}>{printSurface.Name}</span>
                                {(index !== 4) && <span className="tooltiptext">{printSurface.Tooltip}</span>}
                            </label>
                        </div>
                    </button>
        })}
        </div>
    )
}

export default PrintSurface;