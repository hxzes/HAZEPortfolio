"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, useGLTF } from "@react-three/drei"
import * as THREE from "three"

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/assets/3d/duck.glb")

  // Create floating particles
  const particlesRef = useRef<THREE.Points>(null)

  useEffect(() => {
    // Create particles
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      colors[i3] = 0.1 + Math.random() * 0.5
      colors[i3 + 1] = 0.3 + Math.random() * 0.5
      colors[i3 + 2] = 0.8 + Math.random() * 0.2
    }

    // Add a timeout to ensure the component is fully mounted
    setTimeout(() => {
      if (particlesRef.current) {
        const geometry = particlesRef.current.geometry
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      }
    }, 100)
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05

      // Animate particles - add safety checks
      const positions = particlesRef.current.geometry.attributes.position

      // Check if positions exists and has a count property
      if (positions && typeof positions.count === "number") {
        const count = positions.count

        for (let i = 0; i < count; i++) {
          const i3 = i * 3
          const x = positions.getX(i)
          const y = positions.getY(i)
          const z = positions.getZ(i)

          positions.setY(i, y + Math.sin(state.clock.elapsedTime * 0.5 + x) * 0.01)
          positions.setX(i, x + Math.sin(state.clock.elapsedTime * 0.3 + z) * 0.01)
        }

        positions.needsUpdate = true
      }
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <group ref={groupRef} position={[0, -1, 0]}>
        <primitive object={scene} scale={2} position={[0, 0, 0]} />

        <Text
          position={[0, 2.5, 0]}
          fontSize={0.5}
          color="#2563eb"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          HAZE DESIGN
        </Text>
      </group>

      <points ref={particlesRef}>
        <bufferGeometry />
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>
    </>
  )
}

