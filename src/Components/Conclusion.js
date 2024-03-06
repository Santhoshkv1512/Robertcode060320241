import { state } from "../store";
import { useSnapshot } from "valtio";
import { useState, useEffect } from "react";
import Modal from "react-modal";

const PopupContent = () => {
  return <>
    <div>
      <div style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
        <h2>THANKS FOR YOUR ENQUIRY!</h2>
      </div>
      <br />
      <div style={{ color: 'white' }}>
        <p>OUR TEAM ARE WORKING NOW ON YOUR BRIEF AND WILL BE IN CONTACT WITH IN NEXT 24 HOURS. FOR URGENT ENQUIRIES OR TO DISCUSS YOUR PROJECT PLEASE CALL <strong>+441707387799</strong></p>
      </div>
    </div>
  </>
}

function Conclusion() {
  const snap = useSnapshot(state);
  const [isOpen, setIsOpen] = useState(false);

  const onRequestClose = () => {
    state.showConclusion = false;
  }

  useEffect(() => {
    setIsOpen(state.showConclusion);
  }, [snap.showConclusion])

  const clickNewProjectBtn = async () => {
    resetStore();
    onRequestClose();
  }

  const resetStore = () => {
    // state.isSignIn = false;
    // state.intro = true;
    state.disableControl = false;
    state.currentTab = 'style';
    state.currentStyleIndex = 0;
    state.currentDimension = { length: 180, width: 180, height: 60 };
    state.currentMaterialIndex = 0;
    state.currentPrintSpec = 0;
    state.currentPrintSurface = 0;
    state.currentCoating = 0;
    state.currentFinishingArray = [0, 0, 0, 0, 0];
    // state.initialFinishing = ['none', 'spot-uv', 'foil', 'emboss-deboss', 'other'];
    state.additionalLights = false;
    state.currentBackground = false;
    state.currentAutoRotate = 0;
    state.currentAnimation = 0;
    state.hasRedLight = false;
    state.progressArray = [0, 0, 0, 0, 0, 0, 0, 0];
    state.currentQuantity = 0;
    state.showPopup = false;
    state.showConclusion = false;
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
      <div className='container row conclusion-content'>
        <PopupContent />
        <button onClick={clickNewProjectBtn} className='popup-button' style={{ backgroundColor: 'rgb(33, 191, 223)', color: 'white' }}>New Project</button>
        <button onClick={onRequestClose} className='ml-3 popup-button' style={{ backgroundColor: 'rgb(192, 33, 33)', color: 'white' }}>Close</button>
      </div>

    </Modal>
  )
}

export default Conclusion;