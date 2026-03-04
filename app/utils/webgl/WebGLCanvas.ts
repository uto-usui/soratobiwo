/**
 * WebGL Canvas Utility Class
 * Provides basic WebGL functionality for displacement effects
 */
export class WebGLCanvas {
  private canvas: HTMLCanvasElement
  private gl: WebGLRenderingContext
  private program: WebGLProgram | null = null
  private animationId: number | null = null
  private isDestroyed = false

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const gl = canvas.getContext('webgl', {
      premultipliedAlpha: false,
      alpha: true,
    }) || canvas.getContext('experimental-webgl', {
      premultipliedAlpha: false,
      alpha: true,
    })

    if (!gl) {
      throw new Error('WebGL not supported')
    }

    this.gl = gl as WebGLRenderingContext
    this.setupContextLossHandling()
  }

  private setupContextLossHandling(): void {
    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      this.stopAnimation()
    })

    this.canvas.addEventListener('webglcontextrestored', () => {
      // Re-initialize if needed
    })
  }

  get context(): WebGLRenderingContext {
    return this.gl
  }

  /**
   * Compile a shader from source
   */
  private compileShader(source: string, type: number): WebGLShader {
    const shader = this.gl.createShader(type)
    if (!shader) {
      throw new Error('Failed to create shader')
    }

    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const error = this.gl.getShaderInfoLog(shader)
      this.gl.deleteShader(shader)
      throw new Error(`Shader compilation error: ${error}`)
    }

    return shader
  }

  /**
   * Create a WebGL program from vertex and fragment shaders
   */
  createProgram(vertexSource: string, fragmentSource: string): WebGLProgram {
    const vertexShader = this.compileShader(vertexSource, this.gl.VERTEX_SHADER)
    const fragmentShader = this.compileShader(fragmentSource, this.gl.FRAGMENT_SHADER)

    const program = this.gl.createProgram()
    if (!program) {
      throw new Error('Failed to create program')
    }

    this.gl.attachShader(program, vertexShader)
    this.gl.attachShader(program, fragmentShader)
    this.gl.linkProgram(program)

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      const error = this.gl.getProgramInfoLog(program)
      throw new Error(`Program linking error: ${error}`)
    }

    this.program = program
    this.gl.useProgram(program)

    return program
  }

  /**
   * Load an image as a WebGL texture
   */
  loadTexture(url: string): Promise<WebGLTexture> {
    return new Promise((resolve, reject) => {
      const texture = this.gl.createTexture()
      if (!texture) {
        reject(new Error('Failed to create texture'))
        return
      }

      const image = new Image()
      image.crossOrigin = 'anonymous'

      image.onload = () => {
        if (this.isDestroyed) {
          reject(new Error('WebGL context destroyed'))
          return
        }

        this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          0,
          this.gl.RGBA,
          this.gl.RGBA,
          this.gl.UNSIGNED_BYTE,
          image
        )

        // Set texture parameters for non-power-of-2 textures
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)

        resolve(texture)
      }

      image.onerror = () => {
        reject(new Error(`Failed to load image: ${url}`))
      }

      image.src = url
    })
  }

  /**
   * Create a buffer and fill it with data
   */
  createBuffer(data: Float32Array): WebGLBuffer {
    const buffer = this.gl.createBuffer()
    if (!buffer) {
      throw new Error('Failed to create buffer')
    }

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW)

    return buffer
  }

  /**
   * Set up a vertex attribute
   */
  setupAttribute(
    program: WebGLProgram,
    name: string,
    buffer: WebGLBuffer,
    size: number,
    stride = 0,
    offset = 0
  ): void {
    const location = this.gl.getAttribLocation(program, name)
    if (location === -1) {
      console.warn(`Attribute ${name} not found in shader`)
      return
    }

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.enableVertexAttribArray(location)
    this.gl.vertexAttribPointer(location, size, this.gl.FLOAT, false, stride, offset)
  }

  /**
   * Get uniform location
   */
  getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null {
    return this.gl.getUniformLocation(program, name)
  }

  /**
   * Start an animation loop
   */
  startAnimation(render: (time: number) => void): void {
    if (this.isDestroyed) return

    const loop = (time: number) => {
      if (this.isDestroyed) return
      render(time)
      this.animationId = requestAnimationFrame(loop)
    }

    this.animationId = requestAnimationFrame(loop)
  }

  /**
   * Stop the animation loop
   */
  stopAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  /**
   * Resize the canvas to match display size
   */
  resize(): boolean {
    const displayWidth = this.canvas.clientWidth
    const displayHeight = this.canvas.clientHeight

    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth
      this.canvas.height = displayHeight
      this.gl.viewport(0, 0, displayWidth, displayHeight)
      return true
    }

    return false
  }

  /**
   * Clear the canvas
   */
  clear(): void {
    this.gl.clearColor(0, 0, 0, 0)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }

  /**
   * Destroy the WebGL context and clean up resources
   */
  destroy(): void {
    this.isDestroyed = true
    this.stopAnimation()

    if (this.program) {
      this.gl.deleteProgram(this.program)
      this.program = null
    }

    // Lose context to free GPU resources
    const ext = this.gl.getExtension('WEBGL_lose_context')
    if (ext) {
      ext.loseContext()
    }
  }
}
