import { AiFillCamera } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { useEffect, useState } from 'react';
import Modal from "react-modal";
import { state } from '../store';
import MainBoard from './MainBoard';
import ProgressBar from './ProgressBar/ProgressBar';
import Popup from './Popup';
import Conclusion from './Conclusion';

export function Overlay(props) {
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ModalReport />
        <MainBoard />
        <Customizer setIsControl={props.setIsControl} />
        <Popup />
        <Conclusion />
      </div>
    </>
  )
}

function ModalReport() {
  const [isOpen, setIsOpen] = useState(true);
  const onRequestClose = () => {
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className={{
        base: "modal-base",
        afterOpen: "modal-base_after-open",
        beforeClose: "modal-base_before-close"
      }}
      overlayClassName={{
        base: "overlay-base",
        afterOpen: "overlay-base_after-open",
        beforeClose: "overlay-base_before-close"
      }}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={2000}
    >
      <div className='modal-content'>
        <img src='home-header.png' onClick={onRequestClose} className='modal-image' />
        {/* <button onClick={onRequestClose} className='modal-button'>Okay</button> */}
      </div>

    </Modal>
  )
}

function Customizer(props) {
  const snap = useSnapshot(state)

  const clickContactUs = (e) => {
    state.showPopup = true;
  }
  const clickLightBtn = (e) => {
    state.additionalLights = !state.additionalLights;
  }

  const clickBackgroundBtn = () => {
    state.currentBackground = !state.currentBackground;
  }

  const clickToogleAnimation = () => {
    if (state.currentAnimation === 0) state.currentAnimation = 1;
    else state.currentAnimation = 0;
  }

  const clickToogleRedLight = () => {
    state.hasRedLight = !state.hasRedLight;
  }
  return (
    <>
      <div className="customizer">
        <button
          className="share"
          style={{ background: snap.color }}
          onClick={() => {
            const link = document.createElement('a')
            link.setAttribute('download', 'photo.png')
            link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
            link.click()
          }}>
          Take a Photo
          <AiFillCamera size="1.3em" />
        </button>
        <div className='progreebar'>
          <ProgressBar />
        </div>
        <button className="contactus" style={{ background: snap.color }} onClick={() => clickContactUs()}>
          {'CONTACT US'}
        </button>
        <button className="addLight" style={{ background: snap.color }} onClick={() => clickLightBtn()}>
          {!snap.additionalLights ? 'Turn On Lights' : 'Turn Off Lights'}
        </button>
        <button className="background" style={{ background: snap.color }} onClick={() => clickBackgroundBtn()}>
          {!snap.currentBackground ? 'White Theme' : 'Dark Theme'}
        </button>
        <button className="redLight" style={{ background: snap.color }} onClick={() => clickToogleRedLight()}>
          {!snap.hasRedLight ? 'Add Red Light' : 'Ignore Red Light'}
        </button>
        <button className="animation" style={{ background: snap.color }} onClick={() => clickToogleAnimation()}>
          {!snap.currentAnimation ? 'Close Lid' : 'Open Lid'}
        </button>
      </div>
    </>
  )
}
