import {Canvas,useLoader} from '@react-three/fiber'
import './Main.css';
import {  Stars } from '@react-three/drei'
import {Physics,usePlane} from "@react-three/cannon"
import Wall from './components/wall/Wall'
import * as THREE from 'three'
import img from './img/floor.png'
import { User } from './components/user/User';



function Plane() {
  const [ref] = usePlane(()=>({
    rotation: [-Math.PI / 2,0,0]
  }));
  const texture = useLoader(THREE.TextureLoader, img)
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(15, 15);
    texture.anisotropy = 16;
  }
  return(
    <mesh position={[0,0.5,0]} rotation={[-Math.PI/ 2,0,0]}>
      <planeBufferGeometry attach="geometry" args={[100,100]}/>
      <meshLambertMaterial attach="material" map={texture} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas style={{height:'100vh', background:'#161616'}}>
      {/* <OrbitControls  target={[0,3,0]} position={[0,5,0]}/> */}
      <Stars />
      <ambientLight intensity={0.5}/>
      <spotLight
        position={[10,15,10]}
        angle={0.3}
      />
      <Physics gravity={[0, -30, 0]}>
        <User position={[15, 5, 10]} mass={1}/>
        <Wall/>
        <Plane />
      </Physics>
    </Canvas>
  );
}

export default App;