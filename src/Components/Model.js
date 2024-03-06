import * as THREE from 'three';
import { useSnapshot } from "valtio"
import { state } from "../store"
import { useEffect, useRef, useState } from "react";
import { useTexture, Decal } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';

const BasicMaterial = ({ materials, materialIndex }) => {
    const { gl } = useThree();
    let baseColor = materialIndex === 0 ? new THREE.Color('rgba(255, 255, 255, 1)') : new THREE.Color('rgba(246, 216, 208, 1)');
    let materialTexture = useTexture('/texture/material/' + state.initialMaterial[materialIndex].Name + '.png');

    // Not for "Other" option
    if (materialIndex !== 5) {
        materials.Material_color_outside.map = materialTexture;
        materials.Material_color_outside.color = baseColor
        materials.Material_color_inside.map = materialTexture;
        materials.Material_color_inside.color = baseColor
        materials.Material_side.map = materialTexture;
        materials.Material_side.color = baseColor
        materialTexture.anisotropy = gl.capabilities.getMaxAnisotropy()
    }
    return <>
    </>
}

const PrintSepc = ({ materials, printSpecIndex, printSurfaceIndex }) => {
    // Out Side Print
    if ((printSpecIndex !== 11) && (printSpecIndex !== 0)) {
        const { gl } = useThree();
        let baseColor = state.currentMaterialIndex === 0 ? new THREE.Color('rgba(255, 255, 255, 1)') : new THREE.Color('rgba(246, 216, 208, 1)');
        let texture = useTexture('/texture/PrintSpec/texture/' + state.initialMaterial[state.currentMaterialIndex].Name + '/' + printSpecIndex + '.jpg');
        let insideTexture = useTexture('/texture/PrintSpec/texture/' + state.initialMaterial[state.currentMaterialIndex].Name + '/' + printSpecIndex + '_inside.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = - 1;
        texture.anisotropy = gl.capabilities.getMaxAnisotropy()
        insideTexture.wrapS = THREE.RepeatWrapping;
        insideTexture.repeat.x = - 1;
        insideTexture.anisotropy = gl.capabilities.getMaxAnisotropy()
        materials.Material_color_outside.map = texture;
        materials.Material_color_outside.color = baseColor;
        materials.Material_side.map = texture;
        materials.Material_side.color = baseColor;

        // Inside PrintSpec
        if (printSurfaceIndex) {
            materials.Material_color_inside.map = insideTexture;
            materials.Material_color_inside.color = baseColor;
        }
    }

    return <>
    </>
}

const Coating = ({ materials, coatingIndex }) => {
    let basicMaterial = materials.Material_color_outside;
    let foilMaterial = materials.finishing_gold_foil;
    let spotMaterial = materials.finishing_spot_gloss;
    let insideMaterial = materials.Material_color_inside;
    let sideMaterial = materials.Material_side;

    useEffect(() => {
        switch (coatingIndex) {  // Let's consider whether control metalness or not...
            case 0: // None
                basicMaterial.metalness = 1;
                basicMaterial.roughness = 1;
                foilMaterial.metalness = 1;
                foilMaterial.roughness = 1;
                spotMaterial.metalness = 1;
                spotMaterial.roughness = 1;
                insideMaterial.metalness = 1;
                insideMaterial.roughness = 1;
                sideMaterial.metalness = 1;
                sideMaterial.roughness = 1;
                break;

            case 1: // Gloss
                basicMaterial.metalness = 1;
                basicMaterial.roughness = 0.05;
                foilMaterial.metalness = 1;
                foilMaterial.roughness = 0.05;
                spotMaterial.metalness = 1;
                spotMaterial.roughness = 0.05;
                insideMaterial.metalness = 1;
                insideMaterial.roughness = 0.05;
                sideMaterial.metalness = 1;
                sideMaterial.roughness = 0.05;
                break;

            case 2: // Silk
                basicMaterial.metalness = 1;
                basicMaterial.roughness = 0.7;
                foilMaterial.metalness = 1;
                foilMaterial.roughness = 0.7;
                spotMaterial.metalness = 1;
                spotMaterial.roughness = 0.7;
                insideMaterial.metalness = 1;
                insideMaterial.roughness = 0.7;
                sideMaterial.metalness = 1;
                sideMaterial.roughness = 0.7;
                break;

            case 3: // Matt
                basicMaterial.metalness = 1;
                basicMaterial.roughness = 0.9;
                foilMaterial.metalness = 1;
                foilMaterial.roughness = 0.9;
                spotMaterial.metalness = 1;
                spotMaterial.roughness = 0.9;
                insideMaterial.metalness = 1;
                insideMaterial.roughness = 0.9;
                sideMaterial.metalness = 1;
                sideMaterial.roughness = 0.9;
                break;

            default:
                break;
        }
    }, [coatingIndex])

    return <>
    </>
}

const Finishing = ({ scene, finishingArray }) => {
    let embossBumpMap = useTexture('/texture/Finish/texture/emboss-deboss/bumpMap.png');
    let embossNormalMap = useTexture('/texture/Finish/texture/emboss-deboss/normalMap.jpg');
    embossBumpMap.flipY = false;
    embossNormalMap.flipY = false;
    useEffect(() => {
        finishingArray.forEach((element, index) => {
            switch (index) {
                case 1: // uv-spot
                    let spotMesh = scene.children[0].children[0].children[4];
                    if (element) spotMesh.visible = true;
                    else spotMesh.visible = false;
                    break;

                case 2: // foil
                    let foilMesh = scene.children[0].children[0].children[3];
                    if (element) foilMesh.visible = true;
                    else foilMesh.visible = false;
                    break;

                case 3: // emboss
                    let embossMaterial = scene.children[0].children[0].children[0].material;
                    if (element) {
                        embossMaterial.bumpMap = embossBumpMap
                        embossMaterial.normalMap = embossNormalMap
                    } else {
                        embossMaterial.bumpMap = '';
                        embossMaterial.normalMap = '';
                    }
                    break;
                default:
                    break;
            }
        });
    }, [finishingArray])
    return <>
    </>
}

const Model = ({ materials, animations, scene }) => {
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const snap = useSnapshot(state);

    // InitialHeight
    const initialHeight = 0.1;

    // Shadow
    scene.castShadow = true;
    scene.children[0].castShadow = true;
    scene.children[0].children[0].castShadow = true;
    scene.children[0].children[0].children[0].castShadow = true;
    scene.children[0].children[0].children[1].castShadow = true;
    scene.children[0].children[0].children[2].castShadow = true;
    scene.children[0].children[0].children[3].castShadow = true;
    scene.children[0].children[0].children[4].castShadow = true;

    // Animation
    let mixer = null;
    mixer = new THREE.AnimationMixer(scene);

    // Controlling the material effects additionally
    useEffect(() => {
        if (animationTrigger) {
            if (snap.currentAnimation === 1) {
                const action = mixer.clipAction(animations[0]);
                action.reset();
                // action.setDuration(5);
                action.clampWhenFinished = true;
                action.timeScale = 1;
                action.setLoop(THREE.LoopOnce, 1);
                action.play();
            } else {
                const action = mixer.clipAction(animations[0]);
                // action.setDuration(5);
                action.timeScale = -1;
                action.paused = false;
                action.play();

                setTimeout(() => {
                    action.timeScale = 0;
                }, animations[0].duration * 1000 - 300);
            }
        }
        setAnimationTrigger(true);
    }, [snap.currentAnimation])

    useFrame((state, delta) => {
        if (mixer) {
            mixer.update(delta);
        }
    })

    return <>
        <group>
            <primitive object={scene} position={[0, initialHeight, 0]} rotation={[0, 0, 0]} />;
            <BasicMaterial materials={materials} materialIndex={snap.currentMaterialIndex} />
            <PrintSepc materials={materials} printSpecIndex={snap.currentPrintSpec} printSurfaceIndex={snap.currentPrintSurface} />
            <Coating materials={materials} coatingIndex={snap.currentCoating} />
            <Finishing scene={scene} finishingArray={snap.currentFinishingArray} />
        </group>
    </>
}

export default Model