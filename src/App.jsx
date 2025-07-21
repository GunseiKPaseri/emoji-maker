import { useState } from 'react'
import './App.css'
import DesignPanel from './components/DesignPanel'
import PreviewPanel from './components/PreviewPanel'

function App() {
  const defaultConfig = {
    text: 'Hello\nWorld',
    fontSize: 24,
    autoFontSize: true,
    autoFitWidth: true, // 自動幅調整モード
    fontFamily: 'Arial',
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
    <div className="app">
      <header className="app-header">
        <h1>Slack Emoji Maker</h1>
        <p>フォント、文字列、色を指定してSlack用の絵文字を作成</p>
      </header>

      <main className="app-main">
        <div className="panels">
          <DesignPanel config={emojiConfig} onConfigChange={setEmojiConfig} onReset={resetConfig} />
          <PreviewPanel config={emojiConfig} />
        </div>
      </main>
    </div>
  )
}

export default App
