import { useState, useEffect } from 'react'
import Box from './Box'

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  return { currentPath, navigate }
}

export const routes = {
  '/': () => <Box />,
  '/box': () => <Box />,
  '/scene2': () => (
    <>
      <Box position={[-2, 0, 0]} />
      <Box position={[2, 0, 0]} color="hotpink" />
    </>
  ),
  '/scene3': () => (
    <>
      <Box position={[0, 2, 0]} color="orange" />
      <Box position={[-2, -1, 0]} color="lightblue" />
      <Box position={[2, -1, 0]} color="lightgreen" />
    </>
  )
}