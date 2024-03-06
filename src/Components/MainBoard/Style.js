import { useEffect, useState } from "react";
import { state } from "../../store";
import { useSnapshot } from "valtio";

const Style = () => {
    const snap = useSnapshot(state);
    const [showTextField, setShowTextField] = useState(false);
    const [borderArray, setBorderArray] = useState(['2px solid #888888', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none','none']);
    const placeholderText = "describe the style you are looking for. Don't know the style? Explain what goes in the box and our expert will get in touch and guide you.";

    const styleBtnClick = (index) => {
        state.currentStyleIndex = index;

        // When use click the other style
        if (index === 9) setShowTextField(true);
        else setShowTextField(false);
    }

    useEffect(() => {
        let instance = borderArray;
        instance = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none','none'];
        instance[snap.currentStyleIndex] = '2px solid #888888';
        setBorderArray(instance);

        state.progressArray[0] = 1;
    }, [snap.currentStyleIndex])
    
    return (
        <div className="tapContainer">
        {state.style?.map((style, index) => {
            return <button className="styleChip" onClick={() => styleBtnClick(index)} style={{border: borderArray[index]}} key={style.ID}>
                        <div className="styleContent">
                            <img src={"/texture/style/" + style.ImageSlug + '.png'}/>
                            <label className="styleLabel">
                                {style.Name}
                                {(index !== 4) && <span className="tooltiptext">{style.Tooltip}</span>}
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

export default Style;