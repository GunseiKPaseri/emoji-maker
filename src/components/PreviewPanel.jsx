import { useRef, useEffect, useState, useCallback } from 'react'
import './PreviewPanel.css'

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
      totalHeight += fontSize * lineHeight // 行間を考慮
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

  // 行数を考慮して最適な行の高さを計算
  const lineCount = lines.length

  // 利用可能な高さの90%を使用
  const availableHeight = maxHeight * 0.9

  // 各行に割り当てられる高さ
  const heightPerLine = availableHeight / lineCount

  // フォントサイズを行の高さから逆算
  const fontSize = heightPerLine / lineHeight

  // 最小8px、最大値は元の制限を維持
  return Math.max(8, Math.min(fontSize, maxHeight))
}

function PreviewPanel({ config }) {
  const canvasRef = useRef(null)
  const lightCanvasRef = useRef(null)
  const darkCanvasRef = useRef(null)
  const [calculatedFontSize, setCalculatedFontSize] = useState(config.fontSize)
  const [showSettings, setShowSettings] = useState(false)
  const [emojiDataUrl, setEmojiDataUrl] = useState('')

  // 各行を通常幅でレンダリングして縮小貼り付けする関数
  const drawTextWithAutoFit = useCallback(
    (ctx, lines, fontSize, fontFamily, targetWidth, canvasSize, lineHeight, verticalOffset) => {
      const actualLineHeight = fontSize * lineHeight
      const totalHeight = lines.length * actualLineHeight
      const verticalOffsetPx = (canvasSize * verticalOffset) / 100 // パーセントをピクセルに変換
      const startY = (canvasSize - totalHeight) / 2 + actualLineHeight / 2 + verticalOffsetPx

      ctx.fillStyle = config.color
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
    [config.color]
  )

  // キャンバスに描画する関数
  const drawToCanvas = useCallback(
    (canvas, isPreview = false, previewBackground = null) => {
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      const {
        text,
        fontSize,
        autoFontSize,
        autoFitWidth,
        fontFamily,
        color,
        backgroundColor,
        transparentBackground,
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

      // 背景を描画
      if (isPreview && previewBackground) {
        ctx.fillStyle = previewBackground
        ctx.fillRect(0, 0, size, size)
      } else if (!transparentBackground) {
        ctx.fillStyle = backgroundColor
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
          // 幅自動調整モードでは高さのみを基準にフォントサイズを計算
          finalFontSize = calculateOptimalFontSizeForAutoFit(ctx, text, size, lineHeight)
        } else {
          // 通常モードでは幅と高さ両方を考慮
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
        if (!isPreview) {
          setCalculatedFontSize(finalFontSize)
        }
      }

      // テキストスタイルを設定
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
          verticalOffset
        )
      } else {
        // 通常モードでの描画
        ctx.font = `${finalFontSize}px ${fontFamily}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        const actualLineHeight = finalFontSize * lineHeight
        const totalHeight = lines.length * actualLineHeight
        const verticalOffsetPx = (size * verticalOffset) / 100 // パーセントをピクセルに変換
        const startY = (size - totalHeight) / 2 + actualLineHeight / 2 + verticalOffsetPx

        lines.forEach((line, index) => {
          const y = startY + index * actualLineHeight
          ctx.fillText(line, size / 2, y)
        })
      }
    },
    [config, drawTextWithAutoFit]
  )

  useEffect(() => {
    // メインキャンバス（ダウンロード用）
    drawToCanvas(canvasRef.current)

    // ライトモードプレビュー
    drawToCanvas(lightCanvasRef.current, true, '#ffffff')

    // ダークモードプレビュー
    drawToCanvas(darkCanvasRef.current, true, '#2f3349')

    // 透明背景バージョンのbase64データを生成
    if (canvasRef.current) {
      const transparentCanvas = document.createElement('canvas')
      drawToCanvas(transparentCanvas, true, 'transparent')
      const dataUrl = transparentCanvas.toDataURL('image/png')
      setEmojiDataUrl(dataUrl)
    }
  }, [config, drawToCanvas])

  const downloadEmoji = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // 現在の日時を取得してフォーマット（YYYYMMDD_HHMMSS形式）
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const dateTime = `${year}${month}${day}_${hours}${minutes}${seconds}`

    // テキストをファイル名に適した形式に変換
    let textForFilename = config.text
      .replace(/\n/g, '-') // 改行をハイフンに
      .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF]/g, '_') // 日本語文字とアルファベット、数字以外をアンダースコアに
      .replace(/_+/g, '_') // 連続するアンダースコアを1つに
      .replace(/^_|_$/g, '') // 先頭末尾のアンダースコアを削除
      .substring(0, 30) // 最大30文字に制限

    // テキストが空の場合のフォールバック
    if (!textForFilename) {
      textForFilename = 'emoji'
    }

    // ファイル名を生成（作成日時_テキスト_サイズ.png）
    const filename = `${dateTime}_${textForFilename}_${config.size}x${config.size}.png`

    // ダウンロードリンクを作成
    const link = document.createElement('a')
    link.download = filename
    link.href = canvas.toDataURL('image/png')

    // 自動ダウンロード
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="preview-panel">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <h2 style={{ margin: 0 }}>プレビュー</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {showSettings ? '設定を隠す' : '設定を表示'}
        </button>
      </div>

      <div className="preview-container">
        <div className="preview-grid">
          <div className="preview-item">
            <h4>ライトモード</h4>
            <div className="canvas-container light-preview">
              <canvas
                ref={lightCanvasRef}
                className="preview-canvas"
                style={{
                  width: '120px',
                  height: '120px',
                  imageRendering: 'pixelated',
                }}
              />
            </div>
          </div>

          <div className="preview-item">
            <h4>ダークモード</h4>
            <div className="canvas-container dark-preview">
              <canvas
                ref={darkCanvasRef}
                className="preview-canvas"
                style={{
                  width: '120px',
                  height: '120px',
                  imageRendering: 'pixelated',
                }}
              />
            </div>
          </div>
        </div>

        {showSettings && (
          <div className="preview-info">
            <div className="info-item">
              <span className="label">サイズ:</span>
              <span className="value">
                {config.size}×{config.size}px
              </span>
            </div>
            <div className="info-item">
              <span className="label">テキスト:</span>
              <span className="value">"{config.text.replace(/\n/g, '\\n')}"</span>
            </div>
            <div className="info-item">
              <span className="label">フォント:</span>
              <span className="value">{config.fontFamily}</span>
            </div>
            {config.autoFontSize && (
              <div className="info-item">
                <span className="label">計算されたフォントサイズ:</span>
                <span className="value">{calculatedFontSize}px</span>
              </div>
            )}
            <div className="info-item">
              <span className="label">行間倍率:</span>
              <span className="value">{config.lineHeight}</span>
            </div>
            <div className="info-item">
              <span className="label">上下位置:</span>
              <span className="value">
                {config.verticalOffset > 0 ? '+' : ''}
                {config.verticalOffset}%
              </span>
            </div>
            <div className="info-item">
              <span className="label">左右余白:</span>
              <span className="value">{config.horizontalPadding}%</span>
            </div>
            <div className="info-item">
              <span className="label">背景:</span>
              <span className="value">
                {config.transparentBackground ? '透明' : config.backgroundColor}
              </span>
            </div>
            <div className="info-item">
              <span className="label">幅調整:</span>
              <span className="value">{config.autoFitWidth ? '各行自動拡大・縮小' : '固定幅'}</span>
            </div>
          </div>
        )}

        {/* Slackスタンプ使用プレビュー */}
        <div className="slack-preview">
          <h4>Slackでの使用例</h4>

          {/* ライトモード */}
          <div className="slack-theme-section">
            <h5 className="theme-title">ライトモード</h5>

            {/* 名前横スタンプ */}
            <div className="slack-message slack-light">
              <div className="slack-avatar">
                <div className="avatar-circle">U</div>
              </div>
              <div className="slack-content">
                <div className="slack-header">
                  <span className="slack-username">ユーザー名</span>
                  {emojiDataUrl && (
                    <img
                      src={emojiDataUrl}
                      alt="emoji"
                      className="emoji-inline"
                      style={{
                        width: '16px',
                        height: '16px',
                        marginLeft: '4px',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                  <span className="slack-time">午後2:30</span>
                </div>
                <div className="slack-text">プロジェクトが完了しました！</div>
              </div>
            </div>

            {/* 単体スタンプ */}
            <div className="slack-message slack-light">
              <div className="slack-avatar">
                <div className="avatar-circle">T</div>
              </div>
              <div className="slack-content">
                <div className="slack-header">
                  <span className="slack-username">田中</span>
                  <span className="slack-time">午後2:31</span>
                </div>
                <div className="slack-text">
                  {emojiDataUrl && (
                    <img
                      src={emojiDataUrl}
                      alt="emoji"
                      className="emoji-large"
                      style={{
                        width: '32px',
                        height: '32px',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 文中スタンプ */}
            <div className="slack-message slack-light">
              <div className="slack-avatar">
                <div className="avatar-circle">S</div>
              </div>
              <div className="slack-content">
                <div className="slack-header">
                  <span className="slack-username">佐藤</span>
                  <span className="slack-time">午後2:32</span>
                </div>
                <div className="slack-text">
                  お疲れ様でした！
                  {emojiDataUrl && (
                    <img
                      src={emojiDataUrl}
                      alt="emoji"
                      className="emoji-inline"
                      style={{
                        width: '20px',
                        height: '20px',
                        margin: '0 2px',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                  素晴らしい成果ですね
                </div>
              </div>
            </div>
          </div>

          {/* ダークモード */}
          <div className="slack-theme-section">
            <h5 className="theme-title">ダークモード</h5>

            {/* 名前横スタンプ */}
            <div className="slack-message slack-dark">
              <div className="slack-avatar">
                <div className="avatar-circle dark">U</div>
              </div>
              <div className="slack-content">
                <div className="slack-header">
                  <span className="slack-username">ユーザー名</span>
                  {emojiDataUrl && (
                    <img
                      src={emojiDataUrl}
                      alt="emoji"
                      className="emoji-inline"
                      style={{
                        width: '16px',
                        height: '16px',
                        marginLeft: '4px',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                  <span className="slack-time">午後2:30</span>
                </div>
                <div className="slack-text">プロジェクトが完了しました！</div>
              </div>
            </div>

            {/* 単体スタンプ */}
            <div className="slack-message slack-dark">
              <div className="slack-avatar">
                <div className="avatar-circle dark">T</div>
              </div>
              <div className="slack-content">
                <div className="slack-header">
                  <span className="slack-username">田中</span>
                  <span className="slack-time">午後2:31</span>
                </div>
                <div className="slack-text">
                  {emojiDataUrl && (
                    <img
                      src={emojiDataUrl}
                      alt="emoji"
                      className="emoji-large"
                      style={{
                        width: '32px',
                        height: '32px',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 文中スタンプ */}
            <div className="slack-message slack-dark">
              <div className="slack-avatar">
                <div className="avatar-circle dark">S</div>
              </div>
              <div className="slack-content">
                <div className="slack-header">
                  <span className="slack-username">佐藤</span>
                  <span className="slack-time">午後2:32</span>
                </div>
                <div className="slack-text">
                  お疲れ様でした！
                  {emojiDataUrl && (
                    <img
                      src={emojiDataUrl}
                      alt="emoji"
                      className="emoji-inline"
                      style={{
                        width: '20px',
                        height: '20px',
                        margin: '0 2px',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                  素晴らしい成果ですね
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="download-btn" onClick={downloadEmoji} disabled={!config.text.trim()}>
          PNG形式でダウンロード
        </button>

        <div className="usage-hint">
          <p>💡 Slackで使用する場合:</p>
          <ol>
            <li>ダウンロードしたPNGファイルを準備</li>
            <li>Slackの絵文字設定で新しい絵文字を追加</li>
            <li>ファイルをアップロードして名前を設定</li>
          </ol>
        </div>
      </div>

      {/* 隠しキャンバス（ダウンロード用） */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default PreviewPanel
