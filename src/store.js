import { proxy } from 'valtio'

const state = proxy({
  name: "",
  email: "",
  phone: "",
  company: "",
  isSignIn: false,
  intro: true,
  disableControl: false,
  currentTab: 'style',
  currentStyleIndex: 0,
  currentDimension: { length: 180, width: 180, height: 60 },
  currentMaterialIndex: 0,
  currentPrintSpec: 0,
  currentPrintSurface: 0,
  currentCoating: 0,
  currentFinishingArray: [0, 0, 0, 0, 0],
  style: [],
  initialMaterial: [],
  initialPrintSpec: [],
  initialPrintSurface: [],
  initialCoating: [],
  initialDimension: [
    { style: 'mailer', length: 180, width: 180, height: 60 },
    { style: 'sleeve', length: 120, width: 40, height: 120 },
    { style: 'RTE', length: 120, width: 40, height: 120 },
    { style: 'lidandbase', length: 120, width: 40, height: 120 },
    { style: 'Bufferliddark', length: 120, width: 40, height: 120 },
    { style: 'CLB', length: 120, width: 40, height: 120 },
    { style: 'skillet', length: 120, width: 40, height: 120 },
    { style: 'sltray', length: 120, width: 40, height: 120 },
    { style: 'headercard', length: 120, width: 40, height: 120 },
  ],
  initialFinishing: [
    'none',
    'spot-uv',
    'foil',
    'emboss-deboss',
    'other'
  ], // DP_SpotGloss, DP_foil, DP_emboss, leave this for now.

  additionalLights: false,
  currentBackground: false,
  currentAutoRotate: 0,
  currentAnimation: 0,
  hasRedLight: false,
  progressArray: [0, 0, 0, 0, 0, 0, 0, 0],
  currentQuantity: 0,
  showPopup: false,
  showConclusion: false,
})

export { state }
