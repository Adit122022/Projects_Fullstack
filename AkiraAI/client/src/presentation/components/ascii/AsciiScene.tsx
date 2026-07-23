import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AsciiRenderer, Float } from '@react-three/drei'
import * as THREE from 'three'
import styles from './AsciiScene.module.css'

function BunnyEar({ side }: { side: 1 | -1 }) {
  const earRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (earRef.current) {
      // ears sway independently, slight phase offset per side
      earRef.current.rotation.z = side * 0.15 + Math.sin(t * 1.4 + side) * 0.06
      earRef.current.rotation.x = Math.sin(t * 0.9 + side * 2) * 0.04
    }
  })

  return (
    <group ref={earRef} position={[side * 0.32, 1.05, 0]}>
      <mesh position={[0, 0.55, 0]} rotation={[0, 0, side * 0.05]}>
        <capsuleGeometry args={[0.14, 0.75, 8, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      {/* inner ear shading via slightly smaller inset capsule */}
      <mesh position={[0, 0.5, 0.09]} rotation={[0, 0, side * 0.05]}>
        <capsuleGeometry args={[0.07, 0.55, 8, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} emissive="#000000" />
      </mesh>
    </group>
  )
}

function Bunny() {
  const groupRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Mesh>(null)
  const headRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const carrotRef = useRef<THREE.Group>(null)
  const pawLRef = useRef<THREE.Mesh>(null)
  const pawRRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // whole-body idle sway + gentle hop
    if (groupRef.current) {
      groupRef.current.position.y = Math.abs(Math.sin(t * 1.1)) * 0.12
      groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.2
    }

    // breathing body
    if (bodyRef.current) {
      const breathe = 1 + Math.sin(t * 1.8) * 0.03
      bodyRef.current.scale.set(breathe, 1 / breathe + 0.02, breathe)
    }

    // head tilts curiously, looks around
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.6) * 0.05
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.15
    }

    // blink cycle
    const cycle = (t * 0.6) % 4
    const blinking = cycle > 3.85
    const eyeScale = blinking ? 0.1 : 1
    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScale
    if (rightEyeRef.current) rightEyeRef.current.scale.y = eyeScale

    // chewing carrot: small up-down nibble + paws squeeze
    const chew = Math.sin(t * 4) * 0.03
    if (carrotRef.current) {
      carrotRef.current.position.y = 0.15 + chew
      carrotRef.current.rotation.x = Math.sin(t * 4) * 0.05
    }
    if (pawLRef.current) pawLRef.current.position.x = -0.22 + Math.sin(t * 4) * 0.015
    if (pawRRef.current) pawRRef.current.position.x = 0.22 - Math.sin(t * 4) * 0.015
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.6} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* body */}
        <mesh ref={bodyRef} position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>

        {/* head */}
        <group ref={headRef} position={[0, 0.55, 0]}>
          <mesh>
            <sphereGeometry args={[0.85, 32, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.6} />
          </mesh>

          {/* muzzle bump */}
          <mesh position={[0, -0.15, 0.72]}>
            <sphereGeometry args={[0.42, 24, 24]} />
            <meshStandardMaterial color="#ffffff" roughness={0.7} />
          </mesh>

          {/* eyes — big, round, glossy */}
          <mesh ref={leftEyeRef} position={[-0.3, 0.12, 0.72]}>
            <sphereGeometry args={[0.14, 20, 20]} />
            <meshStandardMaterial color="#050505" roughness={0.15} />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.3, 0.12, 0.72]}>
            <sphereGeometry args={[0.14, 20, 20]} />
            <meshStandardMaterial color="#050505" roughness={0.15} />
          </mesh>

          {/* nose */}
          <mesh position={[0, -0.08, 1.08]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>

          {/* ears */}
          <BunnyEar side={1} />
          <BunnyEar side={-1} />
        </group>

        {/* paws holding carrot */}
        <mesh ref={pawLRef} position={[-0.22, -0.05, 0.75]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>
        <mesh ref={pawRRef} position={[0.22, -0.05, 0.75]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>

        {/* carrot */}
        <group ref={carrotRef} position={[0, 0.15, 0.9]} rotation={[0.3, 0, 0]}>
          <mesh>
            <coneGeometry args={[0.13, 0.55, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <coneGeometry args={[0.06, 0.18, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} wireframe />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 6, 6]} intensity={1.3} color="#ffffff" />
      <pointLight position={[-5, -3, -4]} intensity={0.5} color="#ffffff" />
      <spotLight position={[0, 8, 2]} angle={0.4} penumbra={1} intensity={0.7} color="#ffffff" />
    </>
  )
}

function InteractiveCamera() {
  const mouse = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current.x * 1.4, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.current.y * 0.8 + 0.6, 0.05)
    state.camera.lookAt(0, 0.1, 0)
  })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return null
}

export function AsciiScene() {
  return (
    <div className={styles.container}>
      <div className={styles.scanlines} />
      <div className={styles.glow} />
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 0.8, 5.5], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#000000']} />
        <SceneLights />
        <Bunny />
        <InteractiveCamera />
        <AsciiRenderer
          fgColor="#ffffff"
          bgColor="transparent"
          invert={false}
          resolution={0.17}
        />
      </Canvas>
      <div className={styles.label}>
        <span>SNOWBALL_</span>
        <span className={styles.blink}>_</span>
      </div>
    </div>
  )
}
