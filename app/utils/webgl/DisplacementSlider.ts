import { WebGLCanvas } from './WebGLCanvas'

// Vertex shader - simple pass-through
const vertexShaderSource = `
attribute vec2 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_texCoord;
}
`

// Fragment shader for transition between two images with water ripple effect
const transitionFragmentShaderSource = `
precision mediump float;

uniform sampler2D u_image1;
uniform sampler2D u_image2;
uniform sampler2D u_displacement;
uniform float u_dispFactor;
uniform float u_progress;
uniform float u_time;
uniform vec2 u_dispScale;
uniform vec2 u_imageAspect1;
uniform vec2 u_imageAspect2;
uniform vec2 u_canvasSize;

varying vec2 v_texCoord;

#define PI 3.14159265359

vec2 getCoverCoord(vec2 texCoord, vec2 imageSize, vec2 canvasSize) {
  float canvasAspect = canvasSize.x / canvasSize.y;
  float imageAspect = imageSize.x / imageSize.y;

  vec2 coverCoord = texCoord;

  if (canvasAspect > imageAspect) {
    float scale = canvasAspect / imageAspect;
    coverCoord.y = (texCoord.y - 0.5) / scale + 0.5;
  } else {
    float scale = imageAspect / canvasAspect;
    coverCoord.x = (texCoord.x - 0.5) / scale + 0.5;
  }

  return coverCoord;
}

// Water ripple function - creates concentric waves from a point
vec2 waterRipple(vec2 uv, vec2 center, float time, float frequency, float amplitude, float decay) {
  vec2 dir = uv - center;
  float dist = length(dir);

  // Create wave that propagates outward
  float wave = sin(dist * frequency - time * 4.0) * amplitude;

  // Apply decay based on distance (ripples fade as they spread)
  wave *= exp(-dist * decay);

  // Also fade wave over time for natural dissipation
  wave *= exp(-time * 0.5);

  // Direction of displacement (radial, pointing away from center)
  vec2 displacement = normalize(dir + 0.001) * wave;

  return displacement;
}

void main() {
  // Calculate cover-fit coordinates for both images
  vec2 coverCoord1 = getCoverCoord(v_texCoord, u_imageAspect1, u_canvasSize);
  vec2 coverCoord2 = getCoverCoord(v_texCoord, u_imageAspect2, u_canvasSize);

  // Aspect ratio correction for circular ripples
  float aspect = u_canvasSize.x / u_canvasSize.y;
  vec2 uv = v_texCoord;
  uv.x *= aspect;

  // Multiple ripple sources for organic feel
  vec2 center1 = vec2(0.3 * aspect, 0.4);
  vec2 center2 = vec2(0.7 * aspect, 0.6);
  vec2 center3 = vec2(0.5 * aspect, 0.3);

  // Slow continuous time for idle animation
  float slowTime = u_time * 0.8;

  // Create multiple overlapping ripples with different phases
  vec2 ripple = vec2(0.0);

  // Ripple 1 - main ripple
  ripple += waterRipple(uv, center1, mod(slowTime, 8.0), 25.0, 0.012, 2.5);

  // Ripple 2 - offset phase
  ripple += waterRipple(uv, center2, mod(slowTime + 2.5, 8.0), 30.0, 0.010, 3.0);

  // Ripple 3 - another offset
  ripple += waterRipple(uv, center3, mod(slowTime + 5.0, 8.0), 22.0, 0.008, 2.8);

  // Scale ripple effect
  ripple *= u_dispScale.x * 8.0;

  // During transition, add extra displacement effect
  float transitionEffect = sin(u_progress * PI);

  // Add noise-based displacement during transition for extra organic feel
  vec2 dispCoord = v_texCoord + vec2(u_time * 0.01, u_time * 0.008);
  vec4 dispTexel = texture2D(u_displacement, dispCoord);
  vec2 noiseOffset = (dispTexel.rg - 0.5) * 2.0 * u_dispScale * transitionEffect * 0.5;

  // Combine ripple and noise
  vec2 totalOffset = ripple + noiseOffset;

  // Distort both images
  vec2 distortedPos1 = coverCoord1 + totalOffset * (1.0 - u_progress * 0.5);
  vec2 distortedPos2 = coverCoord2 - totalOffset * (0.5 + u_progress * 0.5);

  // Sample both images
  vec4 color1 = texture2D(u_image1, distortedPos1);
  vec4 color2 = texture2D(u_image2, distortedPos2);

  // Blend between images
  gl_FragColor = mix(color1, color2, u_progress);
}
`

export interface DisplacementSliderOptions {
  images: string[]
  displacementImage: string
  autoPlay?: boolean
  autoPlaySpeed?: number
  displaceScale?: [number, number]
  transitionDuration?: number
}

interface ImageInfo {
  texture: WebGLTexture
  width: number
  height: number
}

export class DisplacementSlider {
  private webgl: WebGLCanvas
  private canvas: HTMLCanvasElement
  private program: WebGLProgram | null = null
  private imageInfos: ImageInfo[] = []
  private displacementTexture: WebGLTexture | null = null
  private currentIndex = 0
  private nextIndex = 0
  private progress = 0
  private isTransitioning = false
  private startTime = 0
  private options: Required<DisplacementSliderOptions>
  private uniforms: {
    u_image1: WebGLUniformLocation | null
    u_image2: WebGLUniformLocation | null
    u_displacement: WebGLUniformLocation | null
    u_dispFactor: WebGLUniformLocation | null
    u_progress: WebGLUniformLocation | null
    u_time: WebGLUniformLocation | null
    u_dispScale: WebGLUniformLocation | null
    u_imageAspect1: WebGLUniformLocation | null
    u_imageAspect2: WebGLUniformLocation | null
    u_canvasSize: WebGLUniformLocation | null
  } | null = null
  private isInitialized = false
  private autoPlayTimer: ReturnType<typeof setTimeout> | null = null

  constructor(canvas: HTMLCanvasElement, options: DisplacementSliderOptions) {
    this.canvas = canvas
    this.webgl = new WebGLCanvas(canvas)
    this.options = {
      images: options.images,
      displacementImage: options.displacementImage,
      autoPlay: options.autoPlay ?? true,
      autoPlaySpeed: options.autoPlaySpeed ?? 5000,
      displaceScale: options.displaceScale ?? [0.1, 0.1],
      transitionDuration: options.transitionDuration ?? 1200,
    }
  }

  /**
   * Load an image and return texture with dimensions
   */
  private loadImageWithInfo(url: string): Promise<ImageInfo> {
    return new Promise((resolve, reject) => {
      const gl = this.webgl.context
      const texture = gl.createTexture()

      if (!texture) {
        reject(new Error('Failed to create texture'))
        return
      }

      const image = new Image()
      image.crossOrigin = 'anonymous'

      image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          image
        )

        // Set texture parameters for non-power-of-2 textures
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        resolve({
          texture,
          width: image.naturalWidth,
          height: image.naturalHeight,
        })
      }

      image.onerror = () => {
        reject(new Error(`Failed to load image: ${url}`))
      }

      image.src = url
    })
  }

  async init(): Promise<void> {
    const gl = this.webgl.context

    // Force initial resize to set canvas dimensions
    this.canvas.width = this.canvas.clientWidth || 800
    this.canvas.height = this.canvas.clientHeight || 600
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Create program
    this.program = this.webgl.createProgram(vertexShaderSource, transitionFragmentShaderSource)

    // Set up geometry (full-screen quad)
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ])

    const texCoords = new Float32Array([
      0, 1,
      1, 1,
      0, 0,
      0, 0,
      1, 1,
      1, 0,
    ])

    const positionBuffer = this.webgl.createBuffer(positions)
    const texCoordBuffer = this.webgl.createBuffer(texCoords)

    this.webgl.setupAttribute(this.program, 'a_position', positionBuffer, 2)
    this.webgl.setupAttribute(this.program, 'a_texCoord', texCoordBuffer, 2)

    // Get uniform locations
    this.uniforms = {
      u_image1: this.webgl.getUniformLocation(this.program, 'u_image1'),
      u_image2: this.webgl.getUniformLocation(this.program, 'u_image2'),
      u_displacement: this.webgl.getUniformLocation(this.program, 'u_displacement'),
      u_dispFactor: this.webgl.getUniformLocation(this.program, 'u_dispFactor'),
      u_progress: this.webgl.getUniformLocation(this.program, 'u_progress'),
      u_time: this.webgl.getUniformLocation(this.program, 'u_time'),
      u_dispScale: this.webgl.getUniformLocation(this.program, 'u_dispScale'),
      u_imageAspect1: this.webgl.getUniformLocation(this.program, 'u_imageAspect1'),
      u_imageAspect2: this.webgl.getUniformLocation(this.program, 'u_imageAspect2'),
      u_canvasSize: this.webgl.getUniformLocation(this.program, 'u_canvasSize'),
    }

    // Load textures with dimension info
    const imagePromises = this.options.images.map((url) => this.loadImageWithInfo(url))
    this.imageInfos = await Promise.all(imagePromises)
    this.displacementTexture = await this.webgl.loadTexture(this.options.displacementImage)

    // Set up texture units
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.imageInfos[0].texture)
    gl.uniform1i(this.uniforms.u_image1, 0)

    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.imageInfos[0].texture)
    gl.uniform1i(this.uniforms.u_image2, 1)

    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_2D, this.displacementTexture)
    gl.uniform1i(this.uniforms.u_displacement, 2)

    // Set initial uniform values
    gl.uniform1f(this.uniforms.u_dispFactor, 1.0)
    gl.uniform1f(this.uniforms.u_progress, 0.0)
    gl.uniform2f(this.uniforms.u_dispScale, this.options.displaceScale[0], this.options.displaceScale[1])

    // Set initial image aspects and canvas size
    const firstImage = this.imageInfos[0]
    gl.uniform2f(this.uniforms.u_imageAspect1, firstImage.width, firstImage.height)
    gl.uniform2f(this.uniforms.u_imageAspect2, firstImage.width, firstImage.height)
    gl.uniform2f(this.uniforms.u_canvasSize, this.canvas.width, this.canvas.height)

    this.isInitialized = true
    this.startTime = performance.now()

    // Start render loop
    this.webgl.startAnimation((time) => this.render(time))

    // Start autoplay if enabled
    if (this.options.autoPlay && this.imageInfos.length > 1) {
      this.startAutoPlay()
    }
  }

  private render(time: number): void {
    if (!this.isInitialized || !this.uniforms) return

    const gl = this.webgl.context

    // Handle resize - update canvas size to match CSS size
    const displayWidth = this.canvas.clientWidth
    const displayHeight = this.canvas.clientHeight

    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth
      this.canvas.height = displayHeight
      gl.viewport(0, 0, displayWidth, displayHeight)
    }

    this.webgl.clear()

    // Update canvas size uniform for cover calculation
    gl.uniform2f(this.uniforms.u_canvasSize, this.canvas.width, this.canvas.height)

    // Update time uniform for continuous displacement animation
    const elapsedTime = (time - this.startTime) / 1000
    gl.uniform1f(this.uniforms.u_time, elapsedTime)

    // Update progress during transition
    gl.uniform1f(this.uniforms.u_progress, this.progress)

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  private startAutoPlay(): void {
    this.stopAutoPlay()
    this.autoPlayTimer = setTimeout(() => {
      this.next()
      this.startAutoPlay()
    }, this.options.autoPlaySpeed)
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer)
      this.autoPlayTimer = null
    }
  }

  /**
   * Transition to a specific slide
   */
  goTo(index: number): void {
    if (this.isTransitioning || index === this.currentIndex) return
    if (index < 0 || index >= this.imageInfos.length) return

    this.isTransitioning = true
    this.nextIndex = index

    const gl = this.webgl.context

    // Update image aspect uniforms
    const currentImage = this.imageInfos[this.currentIndex]
    const nextImage = this.imageInfos[this.nextIndex]

    gl.uniform2f(this.uniforms!.u_imageAspect1, currentImage.width, currentImage.height)
    gl.uniform2f(this.uniforms!.u_imageAspect2, nextImage.width, nextImage.height)

    // Bind current image to texture unit 0
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.imageInfos[this.currentIndex].texture)

    // Bind next image to texture unit 1
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.imageInfos[this.nextIndex].texture)

    // Animate progress
    this.animateProgress(0, 1, this.options.transitionDuration, () => {
      this.currentIndex = this.nextIndex
      this.progress = 0
      this.isTransitioning = false

      // Update texture unit 0 to current image
      const newCurrentImage = this.imageInfos[this.currentIndex]
      gl.uniform2f(this.uniforms!.u_imageAspect1, newCurrentImage.width, newCurrentImage.height)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, this.imageInfos[this.currentIndex].texture)
    })
  }

  /**
   * Go to next slide
   */
  next(): void {
    const nextIndex = (this.currentIndex + 1) % this.imageInfos.length
    this.goTo(nextIndex)
  }

  /**
   * Go to previous slide
   */
  prev(): void {
    const prevIndex = (this.currentIndex - 1 + this.imageInfos.length) % this.imageInfos.length
    this.goTo(prevIndex)
  }

  /**
   * Animate a value with easing
   */
  private animateProgress(
    from: number,
    to: number,
    duration: number,
    onComplete?: () => void
  ): void {
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const t = Math.min(elapsed / duration, 1)

      // Ease in-out quad
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

      this.progress = from + (to - from) * eased

      if (t < 1) {
        requestAnimationFrame(animate)
      } else {
        this.progress = to
        onComplete?.()
      }
    }

    requestAnimationFrame(animate)
  }

  /**
   * Get current slide index
   */
  getCurrentIndex(): number {
    return this.currentIndex
  }

  /**
   * Get total number of slides
   */
  getSlideCount(): number {
    return this.imageInfos.length
  }

  /**
   * Destroy the slider and free resources
   */
  destroy(): void {
    this.stopAutoPlay()
    this.webgl.destroy()
  }
}
