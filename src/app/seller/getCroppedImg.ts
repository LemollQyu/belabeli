import React, { useRef } from 'react'
import { Area } from 'react-easy-crop'

const getCroppedImg = async (
  imageSrc: string,
  croppedArea: Area | null,
  crop: { x: number; y: number },
  zoom: number,
  rotation: number
): Promise<string> => {
  if (!croppedArea) return imageSrc // Return the original image if no cropping area is defined

  const image = new Image()
  image.src = imageSrc
  await new Promise((resolve) => {
    image.onload = resolve
  })

  // Create canvas and apply rotation
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Failed to get canvas context')

  // Apply rotation
  const radian = (rotation * Math.PI) / 180
  canvas.width = croppedArea.width
  canvas.height = croppedArea.height

  ctx.translate(croppedArea.width / 2, croppedArea.height / 2) // Move to the center of the canvas
  ctx.rotate(radian) // Apply the rotation
  ctx.drawImage(
    image,
    croppedArea.x,
    croppedArea.y,
    croppedArea.width,
    croppedArea.height,
    -croppedArea.width / 2,
    -croppedArea.height / 2,
    croppedArea.width,
    croppedArea.height
  )

  return canvas.toDataURL('image/jpeg') // Return the cropped and rotated image as a data URL
}

export default getCroppedImg
