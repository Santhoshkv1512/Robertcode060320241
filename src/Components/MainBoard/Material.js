import { useSnapshot } from "valtio";
import { state } from "../../store";
import { useState, useEffect } from "react";

const Material = () => {
    const snap = useSnapshot(state);
    const [showTextField, setShowTextField] = useState(false);
    const [borderArray, setBorderArray] = useState(['2px solid #888888', 'none', 'none', 'none', 'none', 'none']);
    const placeholderText = "Describe Material you are looking for. Don't know the Material? Leave it blank, our expert will get in touch and guide you.";
    
    const materialBtnClick = (index) => {
        state.currentMaterialIndex = index;

        // When the use clicks the other option, the text field should be shown
        if (index === 5) setShowTextField(true);
        else setShowTextField(false);
    }

    useEffect(() => {
        let instance = borderArray;
        instance = ['none', 'none', 'none', 'none', 'none', 'none'];
        instance[snap.currentMaterialIndex] = '2px solid #888888';
        setBorderArray(instance);

        state.progressArray[2] = 1;
    }, [snap.currentMaterialIndex])
    

    return (
        <div className="tapContainer">
        {state.initialMaterial?.map((material, index) => {
            return index !== 6 && <button className="materialChip" onClick={() => materialBtnClick(index)} style={{border: borderArray[index]}} key={material.ID}>
                        <div className="materialContent">
                            <img src={"/texture/material/" + material.Name + '.png'} className="materialIcon" width={'120px'} height={'120px'}/>
                            <label className="materialLabel">
                                {material.Name}
                                <span className="tooltiptext">{material.Tooltip}</span>
                            </label>
                        </div>
                   </button>
        })}
        {showTextField && 
            <textarea type="text" className="customStyleInput" placeholder={placeholderText} rows={4} cols={20}/>
        }
        </div>
    )
}

export default Material;