import { useSnapshot } from "valtio";
import { state } from "../../store";
import { useState, useEffect } from "react";

const Coating = () => {
    const snap = useSnapshot(state);
    const [showTextField, setShowTextField] = useState(false);
    const labelName = ['None', 'Gloss', 'Silk', 'Matt', 'Other'];
    const [borderArray, setBorderArray] = useState(['2px solid #888888', 'none', 'none', 'none', 'none']);
    const toolTip = [
        'No coating will be added to the printed surface. This option is best used for uncoated material options to keep the textured appearance.',
        'All over gkiss coating gives your packaging a shiny finish. This is often used to enhance packaging with vibrant colours or images.',
        'All over Silk coating provides a neutral finish between gloss and matt. Commonly used to provide the protection to the print from the coating with a neutral finish.',
        'All over Matt coating can provide a strong contrast to some of the finishing options. Matt coatings are not required on uncoated materials.',
        'If you cannot see the option you would like, please choose this option and add your comments at the end of the form.'
    ]

    const placeholderText = "Describe the coating / varnish you are looking for. Don't know the coating / varnish? Leave it blank and one of our experts will be in touch to guide you.";
    
    const coatingBtnClick = (index) => {
        state.currentCoating = index;

        // When the use clicks the other option, the text field should be shown
        if (index === 4) setShowTextField(true);
        else setShowTextField(false);
    }

    useEffect(() => {
        let instance = borderArray;
        instance = ['none', 'none', 'none', 'none', 'none'];
        instance[snap.currentCoating] = '2px solid #888888';
        setBorderArray(instance);

        if (snap.currentCoating === 0) state.progressArray[5] = 0;
        else state.progressArray[5] = 1;
    }, [snap.currentCoating])

    return (
        <div className="tapContainer">
        {state.initialCoating?.map((coating, index) => {
            return  <button className="materialChip" onClick={() => coatingBtnClick(index)} style={{border: borderArray[index]}} key={coating.ID}>
                        <div className="materialContent">
                            <img src={"/texture/Coating/" + coating.Name + '.png'} className="materialIcon"/>
                            <label className="materialLabel">
                                <span style={{maxWidth: '50px'}}>{coating.Name}</span>
                                {(index !== 4) && <span className="tooltiptext">{coating.Tooltip}</span>}
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

export default Coating;