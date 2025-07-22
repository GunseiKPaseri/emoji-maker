function SlackPreview({ emojiDataUrl }) {
  return (
    <div className="mt-10">
      <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Slackでの使用例</h4>

      {/* ライトモード */}
      <div className="mb-8">
        <h5 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full"></div>
          ライトモード
        </h5>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-xs">
          {/* 名前横スタンプ */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-gray-900">ユーザー名</span>
                {emojiDataUrl && <img src={emojiDataUrl} alt="emoji" className="w-4 h-4" />}
                <span className="text-xs text-gray-500">午後2:30</span>
              </div>
              <div className="text-gray-700">プロジェクトが完了しました！</div>
            </div>
          </div>

          {/* 単体スタンプ */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              T
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-gray-900">田中</span>
                <span className="text-xs text-gray-500">午後2:31</span>
              </div>
              <div>
                {emojiDataUrl && <img src={emojiDataUrl} alt="emoji" className="w-10 h-10" />}
              </div>
            </div>
          </div>

          {/* 文中スタンプ */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              S
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-gray-900">佐藤</span>
                <span className="text-xs text-gray-500">午後2:32</span>
              </div>
              <div className="text-gray-700 flex items-center gap-2">
                お疲れ様でした！
                {emojiDataUrl && (
                  <img src={emojiDataUrl} alt="emoji" className="w-6 h-6 inline-block" />
                )}
                素晴らしい成果ですね
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ダークモード */}
      <div className="mb-8">
        <h5 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-linear-to-r from-purple-500 to-indigo-600 rounded-full"></div>
          ダークモード
        </h5>
        <div
          className="border border-gray-700 rounded-2xl p-6 space-y-4 shadow-lg"
          style={{ backgroundColor: '#1d1c1d' }}
        >
          {/* 名前横スタンプ */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-white">ユーザー名</span>
                {emojiDataUrl && <img src={emojiDataUrl} alt="emoji" className="w-4 h-4" />}
                <span className="text-xs text-gray-400">午後2:30</span>
              </div>
              <div className="text-gray-300">プロジェクトが完了しました！</div>
            </div>
          </div>

          {/* 単体スタンプ */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              T
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-white">田中</span>
                <span className="text-xs text-gray-400">午後2:31</span>
              </div>
              <div>
                {emojiDataUrl && <img src={emojiDataUrl} alt="emoji" className="w-10 h-10" />}
              </div>
            </div>
          </div>

          {/* 文中スタンプ */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              S
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-white">佐藤</span>
                <span className="text-xs text-gray-400">午後2:32</span>
              </div>
              <div className="text-gray-300 flex items-center gap-2">
                お疲れ様でした！
                {emojiDataUrl && (
                  <img src={emojiDataUrl} alt="emoji" className="w-6 h-6 inline-block" />
                )}
                素晴らしい成果ですね
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlackPreview
