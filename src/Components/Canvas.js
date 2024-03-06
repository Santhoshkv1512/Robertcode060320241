import { useState, useRef } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Environment, OrbitControls, Lightformer, Float } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import { LayerMaterial, Color, Depth } from 'lamina'
import Model from './Model';

export const App = ({isControl, position = [-0.58, 0.65, 0.9], fov = 25 }) => {
  const snap = useSnapshot(state);
  const [degraded, degrade] = useState(false);
  let autoRotateValue = snap.currentPrintSurface && snap.currentAutoRotate;
  return (
    <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true, antialias: true }} eventSource={document.getElementById('root')} eventPrefix="client">
      {snap.currentBackground? <>
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.6} position={[10, 6, -10]} castShadow/>
        </> : <>
        <ambientLight intensity={0.05}/>
        <Environment frames={degraded ? 1 : Infinity} resolution={256} background blur={1}>
          <Lightformers />
        </Environment>
        </>
      }
      {
        snap.additionalLights && 
        <AdditionalLight />
      }
        <Backdrop />
        <Prints isControl={isControl}/>
        <OrbitControls target={[0, 0, 0.06]} enableRotate={!snap.disableControl} minDistance={snap.currentPrintSurface?0.25:0.5} maxDistance={1.4} autoRotate={autoRotateValue}/>
    </Canvas>
  )
}

function Backdrop() {
  const shadows = useRef();
  const initialHeight = -0.042
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[0, 0, 0]} position={[0, initialHeight, 0]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function AdditionalLight() {
  const additionalLightRef = useRef();
  const {camera, scene} = useThree();
  const boxGeometry = new THREE.BoxGeometry(0,0,0);
  const boxMaterial = new THREE.MeshBasicMaterial({visible: false});
  const Box = new THREE.Mesh(boxGeometry, boxMaterial);
  Box.position.set(0, 0.1, 0.06);

  useFrame(() => {
    additionalLightRef.current.position.copy(camera.position);
    additionalLightRef.current.target = Box;
    scene.add(additionalLightRef.current.target)
  });

  return (
    <>
      <directionalLight 
        ref={additionalLightRef}
        intensity={0.3} 
        castShadow
      />
    </>
  );
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0] }) {
  const snap = useSnapshot(state);
  const group = useRef()
  useFrame((state, delta) => (group.current.position.z += delta * 1) > 20 && (group.current.position.z = -10))
  return (
    <>
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer key={i} form="circle" intensity={0.5} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
          ))}
        </group>
      </group>
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer form="ring" color={snap.hasRedLight?"red":"white"} intensity={0.7} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth colorA="#777" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>
    </>
  )
}

function Prints(props) {
  const {materials, animations, scene} = useGLTF('/model/mailerbox.glb');

  return (
    <Model materials={materials} animations={animations} scene={scene}/>
  )
}

useGLTF.preload('/model/mailerbox.glb');
useTexture.preload('/texture/Coating/gloss.png');
useTexture.preload('/texture/Coating/matt.png');
useTexture.preload('/texture/Coating/none.png');
useTexture.preload('/texture/Coating/other.png');
useTexture.preload('/texture/Coating/satin.png');
useTexture.preload('/texture/material/Coated White Board.png');
useTexture.preload('/texture/material/Kraft Brown Board.png');
useTexture.preload('/texture/material/Microflute Kraft.png');
useTexture.preload('/texture/material/Microflute White.png');
useTexture.preload('/texture/material/Other.png');
useTexture.preload('/texture/material/Uncoated White Board.png');
for (const material of state.initialMaterial) {
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/1.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/2.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/3.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/4.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/5.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/6.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/7.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/8.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/9.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/10.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/1_inside.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/2_inside.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/3_inside.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/4_inside.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/5_inside.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/6_inside.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/7_inside.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/8_inside.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/9_inside.jpg');
  useTexture.preload('/texture/PrintSpec/texture/'+ material.Name + '/10_inside.jpg');
}
useTexture.preload('/texture/PrintSurface/print-oneside.png');
useTexture.preload('/texture/PrintSurface/print-outside-inside.png');
useTexture.preload('/texture/Finish/texture/emboss-deboss/bumpMap.png');
useTexture.preload('/texture/Finish/texture/emboss-deboss/normalMap.jpg');