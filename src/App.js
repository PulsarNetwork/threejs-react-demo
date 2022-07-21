import { useRef, useState } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { UnrealBloomPass } from 'three-stdlib'
import { Effects, OrbitControls, OrthographicCamera, Stats } from '@react-three/drei'

import * as Scene from './Scene'
import * as Tree_1 from './Tree-lv1'
import * as Tree_animated from './Tree-animated'

extend({ UnrealBloomPass })

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


export default function App() {
  return (
    <Canvas shadows onPointerUp={(e) => console.log(e)}>
      <color attach="background" args={['#93F0E5']} />
      <Effects disableGamma>
        <unrealBloomPass threshold={0.75} strength={0.6} radius={0.5} />
      </Effects>

      <Scene.default />
      <Tree_animated.default onClick={(e) => console.log(e)} position={[0,0,0]}/>
      <Tree_1.default onClick={(e) => console.log(e)} position={[1,0,1]} c1="rgb(10,230,233)"/>

      <ambientLight intensity={.25} />
      <directionalLight intensity={0.8} position={[-7, 3, 1]} />
      <directionalLight intensity={0.3} position={[1, -2, 7]} />
      <pointLight position={[0,0.4,0]} intensity={0.6} />
      <OrthographicCamera makeDefault far={100} near={0.01} position={[-1, 3.5, 8]} zoom={60} />
      <OrbitControls enableZoom={true} />
      <Stats />
    </Canvas>
  )
}
