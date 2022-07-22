import { useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { UnrealBloomPass } from "three-stdlib";
import {
  Effects,
  OrbitControls,
  OrthographicCamera,
  Stats
} from "@react-three/drei";

import * as Scene from "./Scene";
import * as Tree_1 from "./Tree-lv1";
import * as Tree_animated from "./Tree-animated";

extend({ UnrealBloomPass });

export default function App() {
  return (
    <Canvas shadows onPointerUp={(e) => console.log(e)}>
      <color attach="background" args={["#93F0E5"]} />
      <Effects disableGamma>
        <unrealBloomPass threshold={0.75} strength={0.6} radius={0.5} />
      </Effects>

      <Scene.default />
      <Tree_animated.default
        onClick={(e) => console.log(e)}
        position={[0, 0, 0]}
      />
      <Tree_1.default
        onClick={(e) => console.log(e)}
        position={[1, 0, 1]}
        c1="rgb(10,230,233)"
      />

      <ambientLight intensity={0.25} />
      <directionalLight intensity={0.9} position={[-7, 3, 1]} />
      <directionalLight intensity={0.9} position={[1, -2, 7]} />
      <pointLight position={[0, 1, 0]} color={"#F087DD"} intensity={1.4} />
      <OrthographicCamera
        makeDefault
        far={100}
        near={0.01}
        position={[-1, 3.5, 8]}
        zoom={60}
      />
      <OrbitControls enableZoom={true} />
      <Stats />
    </Canvas>
  );
}
