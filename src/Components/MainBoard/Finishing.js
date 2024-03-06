import { useSnapshot } from "valtio";
import { state } from "../../store";
import { useState, useEffect } from "react";

const Finishing = () => {
    const snap = useSnapshot(state);
    const [showTextField, setShowTextField] = useState(false);
    const [borderArray, setBorderArray] = useState(['2px solid #888888', 'none', 'none', 'none', 'none']);
    const labelName = ['None', 'Spot Gloss UV', 'Metallic Foiling', 'Emboss / Deboss', 'Others'];
    const toolTip = [
        'No Finish option be aded to the material.',
        'Gloss is applied to specific areas of the artwork to create a contrast that stands out. Drawing attention to a specific area or feature.Gloss is applied to specific areas of the artwork to create a contrast that stands out. Drawing attention to a specific area or feature.',
        'Hot foil stamping provides a luxuary finish which can be combined with embossing to enhance. There is a range of foils available in terms of colour and patterns.',
        'Embossing or debossing can be used to provide a tactile element to the packaging. Embossing can be combined with the other finishes.',
        'If you cannot see the option you would like, please choose this option and add your notes at the end of the form.'
    ]

    const placeholderText = "Describe the finish / effects you are looking for. Don't know the finish / effect? Leave it blank and one of our experts will be in touch to guide you.";

    const finishingBtnClick = (index) => {
        state.currentFinishingArray[index] = !state.currentFinishingArray[index];
        if ((index !== 0) && (index !== 4)) {
            if ((state.currentFinishingArray[index])) {
                state.currentAutoRotate++;
            } else {
                state.currentAutoRotate--;
            }
        }

        // When user select "None", canceal all finishes applied before.
        if (index === 0) state.currentFinishingArray = [0, 0, 0, 0, 0];

        // When the use clicks the other option, the text field should be shown
        if (index === 4) setShowTextField(true);
        else setShowTextField(false);

        if (index === 0) state.progressArray[6] = 0;
        else state.progressArray[6] = 1;
    }

    useEffect(() => {
        let instance = borderArray;
        instance = snap.currentFinishingArray
        setBorderArray(instance);
    }, [snap.currentFinishingArray])

    return (
        <div className="tapContainer">
        {state.initialFinishing?.map((finishing, index) => {
            return  <button className="materialChip" onClick={() => finishingBtnClick(index)} style={{border: borderArray[index]?'2px solid #888888': 'none'}} key={finishing}>
                        <div className="materialContent">
                            <img src={"/texture/Finish/thumb/" + finishing + '.png'} className="materialIcon"/>
                            <label className="materialLabel">
                                <span style={{maxWidth: '50px'}}>{labelName[index]}</span>
                                {(index !== 4) && <span className="tooltiptext">{toolTip[index]}</span>}
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

export default Finishing;