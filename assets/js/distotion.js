/* eslint new-cap: 0 */
// import * as PIXI from 'pixi.js' - global import
import { TweenMax, TimelineMax } from 'gsap'

export const CanvasSlides = function(options) {
  //  OPTIONS
  /// ---------------------------
  options = options || {}
  // eslint-disable-next-line no-prototype-builtins
  options.target = options.hasOwnProperty('target') ? options.target : null
  // eslint-disable-next-line no-prototype-builtins
  options.stageWidth = options.hasOwnProperty('stageWidth')
    ? options.stageWidth
    : 1920
  // eslint-disable-next-line no-prototype-builtins
  options.stageHeight = options.hasOwnProperty('stageHeight')
    ? options.stageHeight
    : 1080
  // eslint-disable-next-line no-prototype-builtins
  options.pixiSprites = options.hasOwnProperty('sprites') ? options.sprites : []
  // eslint-disable-next-line no-prototype-builtins
  options.centerSprites = options.hasOwnProperty('centerSprites')
    ? options.centerSprites
    : false
  // eslint-disable-next-line no-prototype-builtins
  options.texts = options.hasOwnProperty('texts') ? options.texts : [] // eslint-disable-next-line no-prototype-builtins

  // eslint-disable-next-line no-prototype-builtins
  options.autoPlay = options.hasOwnProperty('autoPlay')
    ? options.autoPlay
    : true
  // eslint-disable-next-line no-prototype-builtins
  options.autoPlaySpeed = options.hasOwnProperty('autoPlaySpeed')
    ? options.autoPlaySpeed
    : [10, 3]
  // eslint-disable-next-line no-prototype-builtins
  options.fullScreen = options.hasOwnProperty('fullScreen')
    ? options.fullScreen
    : true
  // eslint-disable-next-line no-prototype-builtins
  options.displaceScale = options.hasOwnProperty('displaceScale')
    ? options.displaceScale
    : [200, 70]
  // eslint-disable-next-line no-prototype-builtins
  options.displacementImage = options.hasOwnProperty('displacementImage')
    ? options.displacementImage
    : ''
  // eslint-disable-next-line no-prototype-builtins
  options.navElement = options.hasOwnProperty('navElement')
    ? options.navElement
    : document.querySelectorAll('.scene-nav')
  // eslint-disable-next-line no-prototype-builtins
  options.displaceAutoFit = options.hasOwnProperty('displaceAutoFit')
    ? options.displaceAutoFit
    : false
  // eslint-disable-next-line no-prototype-builtins
  options.wacky = options.hasOwnProperty('wacky') ? options.wacky : false
  // eslint-disable-next-line no-prototype-builtins
  options.interactive = options.hasOwnProperty('interactive')
    ? options.interactive
    : false
  // eslint-disable-next-line no-prototype-builtins
  options.interactionEvent = options.hasOwnProperty('interactionEvent')
    ? options.interactionEvent
    : ''
  options.displaceScaleTo = options.autoPlay === false ? [0, 0] : [20, 20]
  // eslint-disable-next-line no-prototype-builtins
  options.textColor = options.hasOwnProperty('textColor')
    ? options.textColor
    : '#fff'
  // eslint-disable-next-line no-prototype-builtins
  options.displacementCenter = options.hasOwnProperty('displacementCenter')
    ? options.displacementCenter
    : false
  // eslint-disable-next-line no-prototype-builtins
  options.dispatchPointerOver = options.hasOwnProperty('dispatchPointerOver')
    ? options.dispatchPointerOver
    : false

  //  PIXI VARIABLES
  /// ---------------------------
  const renderer = new PIXI.autoDetectRenderer(
    options.stageWidth,
    options.stageHeight,
    {
      transparent: true,
      view: options.target,
    },
  )
  let stage = new PIXI.Container()
  let slidesContainer = new PIXI.Container()
  const displacementSprite = new PIXI.Sprite.fromImage(
    options.displacementImage,
  )
  const displacementFilter = new PIXI.filters.DisplacementFilter(
    displacementSprite,
  )
  let ticker = new PIXI.ticker.Ticker()
  let baseTimeline = null

  //  TEXTS
  /// ---------------------------
  const style = new PIXI.TextStyle({
    fill: options.textColor,
    wordWrap: true,
    wordWrapWidth: 400,
    letterSpacing: 20,
    fontSize: 14,
  })

  //  SLIDES ARRAY INDEX
  /// ---------------------------
  this.currentIndex = 0

  /**
   * destroy method
   */
  this.destroy = () => {
    stage.destroy(true)
    stage = null
    slidesContainer.destroy(true)
    slidesContainer = null
    ticker.destroy()
    ticker = null
    baseTimeline && baseTimeline.kill() && baseTimeline.remove()
  }

  /// ---------------------------
  //  INITIALISE PIXI
  /// ---------------------------
  this.initPixi = () => {
    // Add canvas to the HTML
    // document.body.appendChild(renderer.view)

    // Add child container to the main container
    stage.addChild(slidesContainer)

    // Enable Interactions
    stage.interactive = true

    // console.log(renderer.view.style)

    // Fit renderer to the screen
    if (options.fullScreen === true) {
      renderer.view.style.objectFit = 'cover'
      renderer.view.style.width = '100%'
      renderer.view.style.height = '100%'
      renderer.view.style.top = '50%'
      renderer.view.style.left = '50%'
      renderer.view.style.webkitTransform = 'translate( -50%, -50% ) scale(1.2)'
      renderer.view.style.transform = 'translate( -50%, -50% ) scale(1.2)'
    } else {
      renderer.view.style.maxWidth = '100%'
      renderer.view.style.top = '50%'
      renderer.view.style.left = '50%'
      renderer.view.style.webkitTransform = 'translate( -50%, -50% )'
      renderer.view.style.transform = 'translate( -50%, -50% )'
    }

    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

    // Set the filter to stage and set some default values for the animation
    stage.filters = [displacementFilter]

    if (options.autoPlay === false) {
      displacementFilter.scale.x = 0
      displacementFilter.scale.y = 0
    }

    if (options.wacky === true) {
      displacementSprite.anchor.set(0.5)
      displacementSprite.x = renderer.width / 2
      displacementSprite.y = renderer.height / 2
    }

    displacementSprite.scale.x = 2
    displacementSprite.scale.y = 2

    // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
    displacementFilter.autoFit = options.displaceAutoFit

    stage.addChild(displacementSprite)
  }

  /// ---------------------------
  //  LOAD SLIDES TO CANVAS
  /// ---------------------------
  this.loadPixiSprites = sprites => {
    const rSprites = options.sprites
    const rTexts = options.texts

    for (let i = 0; i < rSprites.length; i++) {
      const texture = new PIXI.Texture.fromImage(sprites[i])
      const image = new PIXI.Sprite(texture)

      if (rTexts) {
        const richText = new PIXI.Text(rTexts[i], style)
        image.addChild(richText)

        richText.anchor.set(0.5)
        richText.x = image.width / 2
        richText.y = image.height / 2
      }

      if (options.centerSprites === true) {
        image.anchor.set(0.5)
        image.x = renderer.width / 2
        image.y = renderer.height / 2
      }
      // image.transform.scale.x = 1.3;
      // image.transform.scale.y = 1.3;

      if (i !== 0) {
        TweenMax.set(image, { alpha: 0 })
      }

      slidesContainer.addChild(image)
    }
  }

  /// ---------------------------
  //  DEFAULT RENDER/ANIMATION
  /// ---------------------------
  if (options.autoPlay === true) {
    ticker.autoStart = options.autoPlay

    ticker.add(delta => {
      displacementSprite.x += options.autoPlaySpeed[0] * delta
      displacementSprite.y += options.autoPlaySpeed[1]

      renderer.render(stage)
    })
  } else {
    ticker.autoStart = true

    ticker.add(delta => {
      renderer.render(stage)
    })
  }

  /// ---------------------------
  //  TRANSITION BETWEEN SLIDES
  /// ---------------------------
  let isPlaying = false
  const slideImages = slidesContainer.children
  this.moveSlider = newIndex => {
    isPlaying = true

    baseTimeline = new TimelineMax({
      onComplete: () => {
        this.currentIndex = newIndex
        isPlaying = false
        if (options.wacky === true) {
          displacementSprite.scale.set(1)
        }
      },
      onUpdate() {
        if (options.wacky === true) {
          displacementSprite.rotation += baseTimeline.progress() * 0.02
          displacementSprite.scale.set(baseTimeline.progress() * 3)
        }
      },
    })

    baseTimeline.clear()

    if (baseTimeline.isActive()) {
      return
    }

    console.log('🏙 distortion newIndex', newIndex)

    baseTimeline
      .to(displacementFilter.scale, 0.5, {
        x: options.displaceScale[0],
        y: options.displaceScale[1],
      })
      .to(slideImages[this.currentIndex], 0.5, { alpha: 0 })
      .to(slideImages[newIndex], 0.5, { alpha: 1 }, 0.25)
      .to(displacementFilter.scale, 1, {
        x: options.displaceScaleTo[0],
        y: options.displaceScaleTo[1],
      })
  }

  /// ---------------------------
  //  CLICK HANDLERS
  /// ---------------------------
  const nav = options.navElement

  for (const navItem of nav) {
    navItem.onclick = event => {
      // Make sure the previous transition has ended
      if (isPlaying) {
        return false
      }

      if (this.getAttribute('data-nav') === 'next') {
        if (
          this.currentIndex >= 0 &&
          this.currentIndex < slideImages.length - 1
        ) {
          this.moveSlider(this.currentIndex + 1)
        } else {
          this.moveSlider(0)
        }
      } else if (
        this.currentIndex > 0 &&
        this.currentIndex < slideImages.length
      ) {
        this.moveSlider(this.currentIndex - 1)
      } else {
        this.moveSlider(options.pixiSprites.length - 1)
      }

      return false
    }
  }

  /// ---------------------------
  //  INIT FUNCTIONS
  /// ---------------------------

  this.init = () => {
    this.initPixi()
    this.loadPixiSprites(options.pixiSprites)

    /*
      if ( options.fullScreen === true ) {
        window.addEventListener("resize", function( event ){
          scaleToWindow( renderer.view );
        });
        scaleToWindow( renderer.view );
      }
      */
  }

  let rafID = 0

  /// ---------------------------
  //  INTERACTIONS
  /// ---------------------------
  function rotateSpite() {
    displacementSprite.rotation += 0.001
    rafID = requestAnimationFrame(rotateSpite)
  }

  if (options.interactive === true) {
    let mouseX = 0
    let mouseY = 0

    // Enable interactions on our slider
    slidesContainer.interactive = true
    slidesContainer.buttonMode = true

    // HOVER
    if (
      options.interactionEvent === 'hover' ||
      options.interactionEvent === 'both'
    ) {
      slidesContainer.pointerover = ({ data }) => {
        mouseX = data.global.x
        mouseY = data.global.y
        TweenMax.to(displacementFilter.scale, 1, {
          x: `+=${Math.sin(mouseX) * 100}`,
          y: `+=${Math.cos(mouseY) * 100}`,
        })
        rotateSpite()
      }

      slidesContainer.pointerout = mouseData => {
        TweenMax.to(displacementFilter.scale, 1, { x: 0, y: 0 })
        cancelAnimationFrame(rafID)
      }
    }

    // CLICK
    if (
      options.interactionEvent === 'click' ||
      options.interactionEvent === 'both'
    ) {
      slidesContainer.pointerup = mouseData => {
        if (options.dispatchPointerOver === true) {
          TweenMax.to(displacementFilter.scale, 1, {
            x: 0,
            y: 0,
            onComplete() {
              TweenMax.to(displacementFilter.scale, 1, { x: 20, y: 20 })
            },
          })
        } else {
          TweenMax.to(displacementFilter.scale, 1, { x: 0, y: 0 })
          cancelAnimationFrame(rafID)
        }
      }

      slidesContainer.pointerdown = ({ data }) => {
        mouseX = data.global.x
        mouseY = data.global.y
        TweenMax.to(displacementFilter.scale, 1, {
          x: `+=${Math.sin(mouseX) * 150}`,
          y: `+=${Math.cos(mouseY) * 150}`,
        })
      }

      slidesContainer.pointerout = mouseData => {
        if (options.dispatchPointerOver === true) {
          TweenMax.to(displacementFilter.scale, 1, {
            x: 0,
            y: 0,
            onComplete() {
              TweenMax.to(displacementFilter.scale, 1, { x: 20, y: 20 })
            },
          })
        } else {
          TweenMax.to(displacementFilter.scale, 1, { x: 0, y: 0 })
          cancelAnimationFrame(rafID)
        }
      }
    }
  }

  /// ---------------------------
  //  CENTER DISPLACEMENT
  /// ---------------------------
  if (options.displacementCenter === true) {
    displacementSprite.anchor.set(0.5)
    displacementSprite.x = renderer.view.width / 2
    displacementSprite.y = renderer.view.height / 2
  }

  /// ---------------------------
  //  START
  /// ---------------------------
  this.init()
}
