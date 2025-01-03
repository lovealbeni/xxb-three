import { shaderMaterial } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { useState, useEffect, useRef } from 'react'

const MeshCustomMaterial = shaderMaterial(
  {
    uFirstPlaneMatrix: new THREE.Matrix4(),
  },
  /* glsl */ `
  varying vec2 vUv;
  varying vec4 vFirstPlaneSpace;

  uniform mat4 uFirstPlaneMatrix;

  void main() {
    vUv = uv;
    vFirstPlaneSpace = inverse(uFirstPlaneMatrix) * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
  `,
  /* glsl */ `
  varying vec2 vUv;
  varying vec4 vFirstPlaneSpace;

  void main() {
    vec2 firstPlaneUV = vFirstPlaneSpace.xy + 0.5;
    bool inFirstPlane = firstPlaneUV.x >= 0.0 && firstPlaneUV.x <= 1.0 && 
                       firstPlaneUV.y >= 0.0 && firstPlaneUV.y <= 1.0;
    
    // 定义颜色
    vec3 overlapColor = vec3(1.0, 0.0, 0.0); // 重叠区域（红色）
    vec3 normalColor = vec3(0.0, 1.0, 0.0);  // 非重叠区域（绿色）
    
    // 混合颜色
    vec3 finalColor = inFirstPlane ? overlapColor : normalColor;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
  `,
)
extend({ MeshCustomMaterial })
const Box = () => {
  const firstPlaneRef = useRef()
  const [firstPlaneMatrix, setFirstPlaneMatrix] = useState(new THREE.Matrix4())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  // 更新第一个平面的变换矩阵
  useEffect(() => {
    if (firstPlaneRef.current) {
      firstPlaneRef.current.updateMatrixWorld()
      setFirstPlaneMatrix(firstPlaneRef.current.matrixWorld.clone())
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event
      const x = clientX / window.innerWidth * 2 - 1
      const y = clientY / window.innerHeight * 2 - 1
      setMousePosition({ x, y:0-y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  },[])

  return (
    <group>
      {/* 第一个平面 */}
      <mesh ref={firstPlaneRef} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} color="blue" /> 
      </mesh>

      {/* 第二个平面 */}
      <mesh position={[mousePosition.x, mousePosition.y, 0]}>
        <planeGeometry args={[1, 1]} />
        {/* <meshBasicMaterial color="blue" />  */}
        <meshCustomMaterial uFirstPlaneMatrix={firstPlaneMatrix} />
      </mesh>
    </group>
  )
}

export default Box