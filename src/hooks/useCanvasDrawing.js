import { useCallback } from 'react'

// 通常モード用フォントサイズ自動計算関数（幅と高さ両方を考慮）
const calculateOptimalFontSize = (
  ctx,
  text,
  maxWidth,
  maxHeight,
  fontFamily,
  lineHeight = 1.2,
  horizontalPadding = 10
) => {
  const lines = text.split('\n').filter(line => line.trim())
  if (!lines.length) return 12

  // 左右余白を考慮した実際の使用可能幅
  const availableWidth = maxWidth * (1 - horizontalPadding / 100)

  let fontSize = Math.min(maxWidth, maxHeight)
  let textFits = false

  while (fontSize > 8 && !textFits) {
    ctx.font = `${fontSize}px ${fontFamily}`

    let totalHeight = 0
    let maxLineWidth = 0

    for (const line of lines) {
      const metrics = ctx.measureText(line)
      maxLineWidth = Math.max(maxLineWidth, metrics.width)
      totalHeight += fontSize * lineHeight
    }

    if (maxLineWidth <= availableWidth * 0.9 && totalHeight <= maxHeight * 0.9) {
      textFits = true
    } else {
      fontSize -= 2
    }
  }

  return Math.max(fontSize, 8)
}

// 幅自動調整モード用フォントサイズ計算関数（高さのみを基準とする）
const calculateOptimalFontSizeForAutoFit = (ctx, text, maxHeight, lineHeight = 1.2) => {
  const lines = text.split('\n').filter(line => line.trim())
  if (!lines.length) return 12

  const lineCount = lines.length
  const availableHeight = maxHeight * 0.9
  const heightPerLine = availableHeight / lineCount
  const fontSize = heightPerLine / lineHeight

  return Math.max(8, Math.min(fontSize, maxHeight))
}

export function useCanvasDrawing() {
  // 正方形グラデーションを作成する関数
  const createSquareGradient = useCallback(
    (ctx, canvasSize, gradientDirection, gradientColor1, gradientColor2) => {
      let gradient

      switch (gradientDirection) {
        case 'horizontal':
          gradient = ctx.createLinearGradient(0, 0, canvasSize, 0)
          break
        case 'vertical':
          gradient = ctx.createLinearGradient(0, 0, 0, canvasSize)
          break
        case 'diagonal':
          gradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize)
          break
        default:
          gradient = ctx.createLinearGradient(0, 0, canvasSize, 0)
      }

      gradient.addColorStop(0, gradientColor1 || '#FF6B6B')
      gradient.addColorStop(1, gradientColor2 || '#4ECDC4')
      return gradient
    },
    []
  )

  // 文字の配置情報を計算する関数
  const calculateTextLayout = useCallback(
    (ctx, text, fontSize, fontFamily, canvasSize, lineHeight, verticalOffset) => {
      ctx.font = `${fontSize}px ${fontFamily}`
      const lines = text.split('\n').filter(line => line.trim())

      if (lines.length === 0) return null

      const actualLineHeight = fontSize * lineHeight
      const totalHeight = lines.length * actualLineHeight
      const verticalOffsetPx = (canvasSize * verticalOffset) / 100
      const startY = (canvasSize - totalHeight) / 2 + actualLineHeight / 2 + verticalOffsetPx

      return {
        lines,
        actualLineHeight,
        totalHeight,
        startY,
      }
    },
    []
  )

  // マスキング処理でグラデーションを文字に適用する関数
  const drawTextWithGradientMask = useCallback(
    (
      ctx,
      textLayout,
      fontSize,
      fontFamily,
      canvasSize,
      gradient,
      autoFitWidth = false,
      targetWidth = null
    ) => {
      if (!textLayout) return

      const { lines, actualLineHeight, startY } = textLayout

      // 一時的なキャンバスを作成してグラデーション用
      const gradientCanvas = document.createElement('canvas')
      gradientCanvas.width = canvasSize
      gradientCanvas.height = canvasSize
      const gradientCtx = gradientCanvas.getContext('2d')

      // 正方形全体にグラデーションを描画
      gradientCtx.fillStyle = gradient
      gradientCtx.fillRect(0, 0, canvasSize, canvasSize)

      // 文字用の一時キャンバスを作成
      const textCanvas = document.createElement('canvas')
      textCanvas.width = canvasSize
      textCanvas.height = canvasSize
      const textCtx = textCanvas.getContext('2d')

      // 文字を白で描画（マスクとして使用）
      textCtx.fillStyle = 'white'
      textCtx.font = `${fontSize}px ${fontFamily}`
      textCtx.textAlign = 'center'
      textCtx.textBaseline = 'middle'

      if (autoFitWidth && targetWidth) {
        // 幅自動調整モード：各行を個別にスケール
        lines.forEach((line, index) => {
          const y = startY + index * actualLineHeight

          if (line.length === 0) return

          // 各行の実際の幅を測定
          const lineMetrics = textCtx.measureText(line)
          const actualLineWidth = lineMetrics.width

          // ターゲット幅に合わせて拡大または縮小して描画
          const scaleX = targetWidth / actualLineWidth

          textCtx.save()
          textCtx.translate(canvasSize / 2, y)
          textCtx.scale(scaleX, 1)
          textCtx.fillText(line, 0, 0)
          textCtx.restore()
        })
      } else {
        // 通常モード：固定幅で描画
        lines.forEach((line, index) => {
          const y = startY + index * actualLineHeight
          textCtx.fillText(line, canvasSize / 2, y)
        })
      }

      // グラデーションキャンバスに文字マスクを適用
      gradientCtx.globalCompositeOperation = 'destination-in'
      gradientCtx.drawImage(textCanvas, 0, 0)

      // 最終結果をメインキャンバスに描画
      ctx.drawImage(gradientCanvas, 0, 0)
    },
    []
  )

  // 幅自動調整モード用のテキストレイアウトを計算する関数（単色モード用）
  const drawTextWithAutoFit = useCallback(
    (
      ctx,
      lines,
      fontSize,
      fontFamily,
      targetWidth,
      canvasSize,
      lineHeight,
      verticalOffset,
      color
    ) => {
      const actualLineHeight = fontSize * lineHeight
      const totalHeight = lines.length * actualLineHeight
      const verticalOffsetPx = (canvasSize * verticalOffset) / 100
      const startY = (canvasSize - totalHeight) / 2 + actualLineHeight / 2 + verticalOffsetPx

      ctx.fillStyle = color || '#000000'
      ctx.font = `${fontSize}px ${fontFamily}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      lines.forEach((line, index) => {
        const y = startY + index * actualLineHeight

        if (line.length === 0) return

        // 各行の実際の幅を測定
        const lineMetrics = ctx.measureText(line)
        const actualLineWidth = lineMetrics.width

        // ターゲット幅に合わせて拡大または縮小して描画
        const scaleX = targetWidth / actualLineWidth

        // 拡大・縮小して描画
        ctx.save()
        ctx.translate(canvasSize / 2, y)
        ctx.scale(scaleX, 1)
        ctx.fillText(line, 0, 0)
        ctx.restore()
      })
    },
    []
  )

  // キャンバスに描画する関数
  const drawToCanvas = useCallback(
    (canvas, config, isPreview = false, previewBackground = null) => {
      if (!canvas || !config) return

      const ctx = canvas.getContext('2d')
      const {
        text,
        fontSize,
        autoFontSize,
        autoFitWidth,
        fontFamily,
        color,
        useGradient = false,
        gradientColor1,
        gradientColor2,
        gradientDirection,
        size,
        lineHeight,
        verticalOffset,
        horizontalPadding,
      } = config

      // キャンバスサイズを設定
      canvas.width = size
      canvas.height = size

      // 背景をクリア
      ctx.clearRect(0, 0, size, size)

      // 背景を描画（プレビュー用のみ）
      if (isPreview && previewBackground && previewBackground !== 'transparent') {
        ctx.fillStyle = previewBackground
        ctx.fillRect(0, 0, size, size)
      }

      // 高品質なレンダリング（アンチエイリアス適用）
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.textRenderingOptimization = 'optimizeQuality'
      if (ctx.textRendering) {
        ctx.textRendering = 'geometricPrecision'
      }

      const lines = text.split('\n').filter(line => line.trim())
      if (!lines.length) return

      // フォントサイズを決定
      let finalFontSize = fontSize
      if (autoFontSize) {
        if (autoFitWidth) {
          finalFontSize = calculateOptimalFontSizeForAutoFit(ctx, text, size, lineHeight)
        } else {
          finalFontSize = calculateOptimalFontSize(
            ctx,
            text,
            size,
            size,
            fontFamily,
            lineHeight,
            horizontalPadding
          )
        }
      }

      if (useGradient) {
        // グラデーションモード：統一的にマスキング処理を使用
        const gradient = createSquareGradient(
          ctx,
          size,
          gradientDirection,
          gradientColor1,
          gradientColor2
        )

        const textLayout = calculateTextLayout(
          ctx,
          text,
          finalFontSize,
          fontFamily,
          size,
          lineHeight,
          verticalOffset
        )

        if (autoFitWidth) {
          // 幅自動調整モード：マスキング処理 + 幅調整
          const targetWidth = size * (1 - horizontalPadding / 100) * 0.9
          drawTextWithGradientMask(
            ctx,
            textLayout,
            finalFontSize,
            fontFamily,
            size,
            gradient,
            true, // autoFitWidth
            targetWidth
          )
        } else {
          // 通常モード：マスキング処理のみ
          drawTextWithGradientMask(
            ctx,
            textLayout,
            finalFontSize,
            fontFamily,
            size,
            gradient,
            false // autoFitWidth
          )
        }
      } else {
        // 単色モード
        ctx.fillStyle = color

        if (autoFitWidth) {
          // 幅自動調整モードでの描画（各行を個別に縮小）
          const targetWidth = size * (1 - horizontalPadding / 100) * 0.9
          drawTextWithAutoFit(
            ctx,
            lines,
            finalFontSize,
            fontFamily,
            targetWidth,
            size,
            lineHeight,
            verticalOffset,
            color
          )
        } else {
          // 通常モードでの描画
          ctx.font = `${finalFontSize}px ${fontFamily}`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          const actualLineHeight = finalFontSize * lineHeight
          const totalHeight = lines.length * actualLineHeight
          const verticalOffsetPx = (size * verticalOffset) / 100
          const startY = (size - totalHeight) / 2 + actualLineHeight / 2 + verticalOffsetPx

          lines.forEach((line, index) => {
            const y = startY + index * actualLineHeight
            ctx.fillText(line, size / 2, y)
          })
        }
      }

      return finalFontSize
    },
    [createSquareGradient, calculateTextLayout, drawTextWithGradientMask, drawTextWithAutoFit]
  )

  return {
    drawToCanvas,
  }
}
