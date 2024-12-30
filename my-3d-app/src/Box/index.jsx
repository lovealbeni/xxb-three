import { shaderMaterial } from '@react-three/drei'
import { useState } from 'react'
import { useFrame, extend } from '@react-three/fiber'

const MeshCustomMaterial = shaderMaterial(
  {
    time: 0,
  },
  /* glsl */ `
  void main() {
    gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);;
  }
  `,
  /* glsl */ `
  uniform float time;
  void main() {
    float color = sin(10.0 * time);
    gl_FragColor = vec4(color, 0.0, 0.0, 1.0);
  }
  `,
)
extend({ MeshCustomMaterial })
const Box = () => {
  const [time, setTime] = useState(0)

  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime())
  })
  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <meshCustomMaterial time={time} />
    </mesh>
  )
}

export default Box