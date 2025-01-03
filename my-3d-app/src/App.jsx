import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Box from './Box'


function App() {
//  todo: 增加react router,以及canvas的组件
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box />
        <axesHelper args={[5]} />
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
