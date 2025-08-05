import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRouter, routes } from './router'

function App() {
  const { currentPath, navigate } = useRouter()
  
  const renderScene = () => {
    const SceneComponent = routes[currentPath] || routes['/']
    return <SceneComponent />
  }

  return (
    <>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 100, color: 'white' }}>
        <button onClick={() => navigate('/')} style={{ margin: '0 5px' }}>Home</button>
        <button onClick={() => navigate('/box')} style={{ margin: '0 5px' }}>Box</button>
        <button onClick={() => navigate('/scene2')} style={{ margin: '0 5px' }}>Scene 2</button>
        <button onClick={() => navigate('/scene3')} style={{ margin: '0 5px' }}>Scene 3</button>
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {renderScene()}
        <axesHelper args={[5]} />
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
