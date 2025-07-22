import { useRef, useEffect, useState } from 'react'

import { useCanvasDrawing } from '../hooks/useCanvasDrawing'

import SlackPreview from './SlackPreview'

function PreviewPanel({ config }) {
  const canvasRef = useRef(null)
  const lightCanvasRef = useRef(null)
  const darkCanvasRef = useRef(null)
  const [calculatedFontSize, setCalculatedFontSize] = useState(config.fontSize)
  const [showSettings, setShowSettings] = useState(false)
  const [emojiDataUrl, setEmojiDataUrl] = useState('')

  const { drawToCanvas } = useCanvasDrawing()

  useEffect(() => {
    // メインキャンバス（ダウンロード用）
    const fontSize = drawToCanvas(canvasRef.current, config)
    if (fontSize && config.autoFontSize) {
      setCalculatedFontSize(fontSize)
    }

    // ライトモードプレビュー
    drawToCanvas(lightCanvasRef.current, config, true, '#ffffff')

    // ダークモードプレビュー
    drawToCanvas(darkCanvasRef.current, config, true, '#1d1c1d')

    // 透明背景バージョンのbase64データを生成
    if (canvasRef.current) {
      const transparentCanvas = document.createElement('canvas')
      drawToCanvas(transparentCanvas, config, true, 'transparent')
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
    <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6 lg:p-8 backdrop-blur-xs">
      <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          プレビュー
        </h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-linear-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
        >
          {showSettings ? '設定を隠す' : '設定を表示'}
        </button>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="text-center">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center justify-center gap-2">
              <svg
                className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 18a8 8 0 100-16 8 8 0 000 16z"
                  clipRule="evenodd"
                />
              </svg>
              ライトモード
            </h4>
            <div className="inline-block p-3 sm:p-4 lg:p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <canvas
                ref={lightCanvasRef}
                className="block rounded-lg"
                style={{
                  width: '96px',
                  height: '96px',
                  imageRendering: 'pixelated',
                }}
              />
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center justify-center gap-2">
              <svg
                className="w-3 sm:w-4 h-3 sm:h-4 text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              ダークモード
            </h4>
            <div
              className="inline-block p-3 sm:p-4 lg:p-6 border-2 border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: '#1d1c1d' }}
            >
              <canvas
                ref={darkCanvasRef}
                className="block rounded-lg"
                style={{
                  width: '96px',
                  height: '96px',
                  imageRendering: 'pixelated',
                }}
              />
            </div>
          </div>
        </div>

        {showSettings && (
          <div className="bg-linear-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 backdrop-blur-xs">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">設定詳細</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-600">サイズ:</span>
                <span className="text-gray-900 font-mono bg-white px-2 py-1 rounded-sm">
                  {config.size}×{config.size}px
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-600">テキスト:</span>
                <span className="text-gray-900 font-mono bg-white px-2 py-1 rounded-sm truncate ml-2 max-w-32">
                  "{config.text.replace(/\n/g, '\\n')}"
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-600">フォント:</span>
                <span className="text-gray-900 bg-white px-2 py-1 rounded-sm truncate ml-2 max-w-32">
                  {config.fontFamily}
                </span>
              </div>
              {config.autoFontSize && (
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-600">計算サイズ:</span>
                  <span className="text-gray-900 font-mono bg-white px-2 py-1 rounded-sm">
                    {calculatedFontSize}px
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-600">行間倍率:</span>
                <span className="text-gray-900 font-mono bg-white px-2 py-1 rounded-sm">
                  {config.lineHeight}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-600">上下位置:</span>
                <span className="text-gray-900 font-mono bg-white px-2 py-1 rounded-sm">
                  {config.verticalOffset > 0 ? '+' : ''}
                  {config.verticalOffset}%
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-600">左右余白:</span>
                <span className="text-gray-900 font-mono bg-white px-2 py-1 rounded-sm">
                  {config.horizontalPadding}%
                </span>
              </div>
              <div className="flex justify-between items-center py-2 col-span-1 md:col-span-2">
                <span className="font-medium text-gray-600">幅調整:</span>
                <span className="text-gray-900 bg-white px-2 py-1 rounded-sm">
                  {config.autoFitWidth ? '各行自動拡大・縮小' : '固定幅'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-600">グラデーション:</span>
                <span className="text-gray-900 bg-white px-2 py-1 rounded-sm">
                  {config.useGradient ? 'ON' : 'OFF'}
                </span>
              </div>
              {config.useGradient && (
                <>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-600">開始色:</span>
                    <span className="text-gray-900 bg-white px-2 py-1 rounded-sm">
                      {config.gradientColor1}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-600">終了色:</span>
                    <span className="text-gray-900 bg-white px-2 py-1 rounded-sm">
                      {config.gradientColor2}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-600">方向:</span>
                    <span className="text-gray-900 bg-white px-2 py-1 rounded-sm">
                      {config.gradientDirection === 'horizontal'
                        ? '水平'
                        : config.gradientDirection === 'vertical'
                          ? '垂直'
                          : '斜め'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <SlackPreview emojiDataUrl={emojiDataUrl} />
      </div>

      <div className="mt-10 space-y-6">
        <button
          onClick={downloadEmoji}
          disabled={!config.text.trim()}
          className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold text-base sm:text-lg rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            PNG形式でダウンロード
          </div>
        </button>

        <div className="bg-linear-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-2xl">💡</div>
            <div>
              <p className="text-blue-800 font-semibold mb-3">Slackで使用する手順:</p>
              <ol className="text-blue-700 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>ダウンロードしたPNGファイルを準備</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Slackの絵文字設定で新しい絵文字を追加</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>ファイルをアップロードして名前を設定</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* 隠しキャンバス（ダウンロード用） */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

export default PreviewPanel
