import { useSnapshot } from "valtio";
import { state } from "../../store";
import { useState, useEffect } from "react";

const PrintSpec = () => {
    const snap = useSnapshot(state);
    const [showTextField, setShowTextField] = useState(false);
    const [borderArray, setBorderArray] = useState(['2px solid #888888', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none','none', 'none', 'none']);

    const placeholderText = "Describe Spec you are looking for. Don't know the Spec? Leave it blank, our expert will get in touch and guide you.";
    const printSpecBtnClick = (index) => {
        state.currentPrintSpec = index;

        // When user clicks "Other" option, show text field.
        if (index === 11) setShowTextField(true);
        else setShowTextField(false);
    }

    useEffect(() => {
        let instance = borderArray;
        instance = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
        instance[snap.currentPrintSpec] = '2px solid #888888';
        setBorderArray(instance);

        if (snap.currentPrintSpec === 0) state.progressArray[3] = 0;
        else state.progressArray[3] = 1;
    }, [snap.currentPrintSpec])

    return (
        <div className="tapContainer">
        {state.initialPrintSpec?.map((printSepc, index) => {
            return  <button className="printSpecChip" onClick={() => printSpecBtnClick(index)} style={{border: borderArray[index]}} key={printSepc.ID}>
                        <div className="printSpecContent">
                            <img src={"/texture/PrintSpec/Thumb/" + printSepc.ImageSlug + '.png'} className="printSpecIcon"/>
                            <label className="printSpecLabel">
                                <span style={{maxWidth: '50px'}}>{printSepc.Name}</span>
                                <span className="tooltiptext">{printSepc.Tooltip}</span>
                                {/* {(index !== 4) && <span className="tooltiptext">{toolTip[index]}</span>} */}
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

export default PrintSpec;