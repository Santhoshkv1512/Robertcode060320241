import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useSnapshot } from "valtio";
import { state } from "../store";

const PopupContent = (props) => {
    const snap = useSnapshot(state);
    const [finishingStr, setFinishingStr] = useState("None");

    useEffect(() => {
        const finishArray = [];
        const labelName = ['None', 'Spot Gloss UV', 'Metallic Foiling', 'Emboss / Deboss', 'Others'];
        snap.currentFinishingArray.forEach((val, idx) => {
            val && finishArray.push(labelName[idx]);
        });
        if (finishArray.length)
            setFinishingStr(finishArray.join(", "));
        else
            setFinishingStr("None");
    }, [snap.currentFinishingArray]);

    return <>
        <div className="popup-form">
            <div className="container-fluid" style={{ padding: '30px' }}>
                <h4 style={{ color: 'lightblue' }}>Packaging Summary</h4>
                <br />
                <div className="row popup-packaging_summary">
                    <div className="row">
                        <div className="row col-4">
                            <div className="col-3">
                                <p>STYLE</p>
                            </div>
                            <div className="col-9">
                                <input type="text" style={{ width: '100%' }} value={state.style[state.currentStyleIndex].Name} disabled></input>
                            </div>
                        </div>
                        <div className="row col-4">
                            <div className="col-3">
                                <p>DIMENSION</p>
                            </div>
                            <div className="col-9">
                                <input type="text" style={{ width: '100%' }} value={`L: ${state.currentDimension.length}, W: ${state.currentDimension.width}, H: ${state.currentDimension.height}`} disabled></input>
                            </div>
                        </div>
                        <div className="row col-4">
                            <div className="col-3">
                                <p>MATERIALS</p>
                            </div>
                            <div className="col-9">
                                <input type="text" style={{ width: '100%' }} value={state.initialMaterial && state.initialMaterial[state.currentMaterialIndex].Name} disabled></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row col-4">
                            <div className="col-3">
                                <p>PRINT SPEC</p>
                            </div>
                            <div className="col-9">
                                <input type="text" style={{ width: '100%' }} value={state.initialPrintSpec[state.currentPrintSpec].Name} disabled></input>
                            </div>
                        </div>
                        <div className="row col-4">
                            <div className="col-3">
                                <p>PRINT SURFACE</p>
                            </div>
                            <div className="col-9">
                                <input type="text" style={{ width: '100%' }} value={state.initialPrintSurface[state.currentPrintSurface].Name} disabled></input>
                            </div>
                        </div>
                        <div className="row col-4">
                            <div className="col-3">
                                <p>COATING</p>
                            </div>
                            <div className="col-9">
                                <input type="text" style={{ width: '100%' }} value={state.initialCoating[state.currentCoating].Name} disabled></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row col-4">
                            <div className="col-3">
                                <p>FINISHING</p>
                            </div>
                            <div className="col-9">
                                <input type="text" style={{ width: '100%' }} value={finishingStr} disabled></input>
                            </div>
                        </div>
                        <div className="row col-4">
                            <div className="col-3">
                                <p>QUANTITY</p>
                            </div>
                            <div className="col-9">
                                <input type="text" style={{ width: '100%' }} value={state.currentQuantity} disabled></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="container-fluid" style={{ paddingLeft: '30px' }}>
                <h2>Submit Packaging Brief</h2>
                <br />
                <div className="row popup-packaging_Brief">
                    <div className="row">
                        <div className="col-6">
                            <p>PROJECT TITLE*</p>
                            <textarea type="text" placeholder={'placeholderText'} cols={1} style={{ width: '100%' }} defaultValue={props.projectTitle} onChange={(e) => props.getProjectTitle(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <p>Name*</p>
                            <textarea type="text" placeholder={'placeholderText'} cols={1} style={{ width: '100%' }} defaultValue={props.name} onChange={(e) => props.getName(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p>DATE REQUIRED*</p>
                            <textarea type="text" placeholder={'placeholderText'} cols={1} style={{ width: '100%' }} defaultValue={props.dateRequired} onChange={(e) => props.getDateRequired(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <p>EMAIL*</p>
                            <textarea type="text" placeholder={'placeholderText'} cols={1} style={{ width: '100%' }} defaultValue={props.email} onChange={(e) => props.getEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p>PRODUCT INFORMATION</p>
                            <textarea type="text" placeholder={'placeholderText'} cols={1} rows={10} style={{ width: '100%' }} defaultValue={props.productInformation} onChange={(e) => { props.getProductInformation(e.target.value) }} />
                        </div>
                        <div className="row col-6">
                            <div className="col-12" style={{ paddingRight: 0 }}>
                                <p>TELEPHONE NUMBER*</p>
                                <textarea type="text" placeholder={'placeholderText'} cols={1} style={{ width: '100%' }} defaultValue={props.phone} onChange={(e) => props.getPhone(e.target.value)} />
                            </div>
                            <div className="col-12" style={{ paddingRight: 0 }}>
                                <p>COMPANY*</p>
                                <textarea type="text" placeholder={'placeholderText'} cols={1} style={{ width: '100%' }} defaultValue={props.company} onChange={(e) => props.getCompany(e.target.value)} />
                            </div>
                            <div className="col-12" style={{ paddingRight: 0 }}>
                                <p>WHERE DID YOU HEAR ABOUT US*</p>
                                <textarea type="text" placeholder={'placeholderText'} cols={1} style={{ width: '100%' }} defaultValue={props.where} onChange={(e) => props.getWhere(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="popup_policy">
                    <p><span><input type="checkbox" style={{ marginRight: '5px' }}></input></span>Please tick to confirm you have read our <a href="#">Privacy Policy</a> which outlines our commitment to protecting your data.</p>
                </div>
            </div>
        </div>
    </>
}

function Popup() {
    const snap = useSnapshot(state);
    const [isOpen, setIsOpen] = useState(false);

    const [projectTitle, setProjectTitle] = useState('');
    const [dateRequired, setDateRequired] = useState('');
    const [productInformation, setProductInformation] = useState('');

    const [name, setName] = useState(state.name);
    const [email, setEmail] = useState(state.email);
    const [phone, setPhone] = useState(state.phone);
    const [company, setCompany] = useState(state.company);
    const [where, setWhere] = useState('');

    useEffect(() => {
        setIsOpen(state.showPopup);
    }, [snap.showPopup])

    const clickSubmitBtn = async () => {
        const { data } = await axios.post("api/store_box", {
            style: state.style[state.currentStyleIndex].ID,
            dimension: state.currentDimension,
            material: state.initialMaterial[state.currentMaterialIndex].ID,
            printSpec: state.initialPrintSpec[state.currentPrintSpec].ID,
            printSurface: state.initialPrintSurface[state.currentPrintSurface].ID,
            coating: state.initialCoating[state.currentCoating].ID,
            spotGlossUV: state.currentFinishingArray[1],
            foiling: state.currentFinishingArray[2],
            embossing: state.currentFinishingArray[3],
            quantity: state.currentQuantity,
            name,
            email,
            phone,
            company,
            where,
            projectTitle,
            dateRequired,
            productInformation,
        });

        if (data.result) {
            state.showConclusion = true;
            onRequestClose();
        }
    }

    const onRequestClose = () => {
        state.showPopup = false;
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            className={{
                base: "popup-base",
                afterOpen: "popup-base_after-open",
                beforeClose: "popup-base_before-close"
            }}
            overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-base_after-open",
                beforeClose: "overlay-base_before-close"
            }}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={2000}
        >
            <div className='row popup-content'>
                <PopupContent
                    projectTitle={projectTitle}
                    getProjectTitle={setProjectTitle}
                    dateRequired={dateRequired}
                    getDateRequired={setDateRequired}
                    productInformation={productInformation}
                    getProductInformation={setProductInformation}
                    name={name}
                    getName={setName}
                    email={email}
                    getEmail={setEmail}
                    phone={phone}
                    getPhone={setPhone}
                    company={company}
                    getCompany={setCompany}
                    where={where}
                    getWhere={setWhere}
                />
                <button onClick={clickSubmitBtn} className='popup-button' style={{ backgroundColor: 'rgb(33, 191, 223)', color: 'white' }}>SUBMIT NOW</button>
                <button onClick={onRequestClose} className='ml-3 popup-button' style={{ backgroundColor: 'rgb(192, 33, 33)', color: 'white' }}>Close</button>
            </div>

        </Modal>
    )
}

export default Popup;