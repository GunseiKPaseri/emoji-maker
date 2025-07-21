import { useState } from 'react'
import DesignPanel from './components/DesignPanel'
import PreviewPanel from './components/PreviewPanel'

function App() {
  const defaultConfig = {
    text: 'Hello\nWorld',
    fontSize: 24,
    autoFontSize: true,
    autoFitWidth: true, // 自動幅調整モード
    fontFamily: 'Arial, sans-serif',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    transparentBackground: true,
    size: 128,
    lineHeight: 1.2, // 行間倍率
    verticalOffset: 0, // 上下位置オフセット
    horizontalPadding: 10, // 左右余白（パーセント）
  }

  const [emojiConfig, setEmojiConfig] = useState(defaultConfig)

  const resetConfig = () => {
    // 現在のテキストを保持してリセット
    const currentText = emojiConfig.text
    setEmojiConfig({ ...defaultConfig, text: currentText })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Slack Emoji Maker
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                フォント、文字列、色を指定して美しいSlack用絵文字を簡単に作成
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                高品質PNG出力 • 透明背景対応 • リアルタイムプレビュー
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            <DesignPanel
              config={emojiConfig}
              onConfigChange={setEmojiConfig}
              onReset={resetConfig}
            />
          </div>
          <div className="space-y-6">
            <PreviewPanel config={emojiConfig} />
          </div>
        </div>
      </main>

      {/* フローティング要素 */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200/50">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App
