import { Disclosure } from '@headlessui/react'
import '@fontsource/dela-gothic-one'
import '@fontsource/kaisei-decol'
import '@fontsource/yusei-magic'
import '@fontsource/wdxl-lubrifont-jp-n'
import '@fontsource/kiwi-maru'
import '@fontsource/hina-mincho'
import '@fontsource/dotgothic16'
import '@fontsource/yuji-syuku'
import '@fontsource/zen-kurenaido'
import '@fontsource/reggae-one'

const fontCategories = [
  {
    name: 'システム標準',
    fonts: [
      { name: 'Arial', family: 'Arial, sans-serif' },
      { name: 'Helvetica', family: 'Helvetica, sans-serif' },
      { name: 'Times New Roman', family: 'Times New Roman, serif' },
      { name: 'Georgia', family: 'Georgia, serif' },
      { name: 'Verdana', family: 'Verdana, sans-serif' },
      { name: 'Impact', family: 'Impact, sans-serif' },
      { name: 'Noto Sans JP', family: '"Noto Sans JP", sans-serif' },
      { name: 'Noto Serif JP', family: '"Noto Serif JP", serif' },
    ],
  },
  {
    name: '日本語ゴシック',
    fonts: [
      { name: 'Dela Gothic One', family: '"Dela Gothic One", cursive' },
      { name: 'Kiwi Maru', family: '"Kiwi Maru", serif' },
    ],
  },
  {
    name: '日本語明朝',
    fonts: [
      { name: 'Kaisei Decol', family: '"Kaisei Decol", serif' },
      { name: 'Hina Mincho', family: '"Hina Mincho", serif' },
    ],
  },
  {
    name: '手書き・デザイン',
    fonts: [
      { name: 'Yusei Magic', family: '"Yusei Magic", sans-serif' },
      { name: 'Zen Kurenaido', family: '"Zen Kurenaido", sans-serif' },
    ],
  },
  {
    name: 'インパクト系',
    fonts: [
      { name: 'WDXL Lubrifont JP N', family: '"WDXL Lubrifont JP N", sans-serif' },
      { name: 'DotGothic16', family: '"DotGothic16", sans-serif' },
      { name: 'Reggae One', family: '"Reggae One", cursive' },
    ],
  },
]

const colorPresets = [
  { name: '黒', color: '#2D3748' },
  { name: '白', color: '#F7FAFC' },
  { name: '赤', color: '#E53E3E' },
  { name: '青', color: '#3182CE' },
  { name: '緑', color: '#38A169' },
  { name: '黄', color: '#D69E2E' },
  { name: 'オレンジ', color: '#DD6B20' },
  { name: 'ピンク', color: '#D53F8C' },
  { name: '紫', color: '#805AD5' },
  { name: 'グレー', color: '#718096' },
  { name: 'ティール', color: '#319795' },
  { name: 'インディゴ', color: '#4C51BF' },
  { name: 'ローズ', color: '#E53E3E' },
  { name: 'ライム', color: '#65D69B' },
  { name: 'アンバー', color: '#F6AD55' },
  { name: 'シアン', color: '#0BC5EA' },
]

const textPresets = [
  { name: '基本感情', texts: ['OK', 'NG', 'YES', 'NO', '了解', 'おつ', 'GJ', 'thx', 'LG\nTM'] },
  {
    name: 'リアクション',
    texts: ['草', 'たし\nかに', 'わかる', 'つらい', 'えらい', 'おめ', 'ｳﾜｱｱ'],
  },
  {
    name: 'ステータス',
    texts: ['作業中', '休憩中', '会議中', '完了', '確認中', '急ぎ', '保留'],
  },
  {
    name: '記号・Unicode',
    texts: ['→', '←', '↑', '↓', '○', '×', '△', '□', '☀', '☂', '⚡', '⭐', '♠', '♣', '♥', '♦'],
  },
  {
    name: '外国語',
    texts: ['Да', 'Нет', 'Oui', 'Non', 'Sí', 'No', '是', '否', 'हाँ', 'नहीं'],
  },
  {
    name: '数学・特殊記号',
    texts: ['∞', '≈', '≠', '≤', '≥', '±', '∑', '∆', '∇', 'π', 'Ω', 'α', 'β', 'γ', 'λ', 'μ'],
  },
]

function DesignPanel({ config, onConfigChange, onReset }) {
  const handleChange = (key, value) => {
    onConfigChange({
      ...config,
      [key]: value,
    })
  }

  return (
    <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200/50 p-8 backdrop-blur-xs">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          デザイン設定
        </h2>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          リセット
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
          テキスト
        </label>
        <textarea
          id="text"
          value={config.text}
          onChange={e => handleChange('text', e.target.value)}
          placeholder="絵文字にするテキストを入力\n改行で複数行も可能"
          rows={3}
          maxLength="50"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      <div className="mb-6">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                テキストプリセット
              </Disclosure.Button>
              <Disclosure.Panel className="mt-4 space-y-4">
                {textPresets.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.texts.map((text, textIndex) => (
                        <button
                          key={textIndex}
                          onClick={() => handleChange('text', text)}
                          title={text}
                          className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-sm hover:bg-gray-200 transition-colors duration-200"
                        >
                          {text.replace(/\n/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <div className="mb-6">
        <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-2">
          フォント
        </label>
        <select
          id="fontFamily"
          value={config.fontFamily}
          onChange={e => handleChange('fontFamily', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:ring-blue-500 focus:border-blue-500"
        >
          {fontCategories.map(category => (
            <optgroup key={category.name} label={category.name}>
              {category.fonts.map(font => {
                const inputText = config.text.replace(/\n/g, ' ').trim()
                const displayText = inputText ? `${font.name}: ${inputText}` : font.name
                return (
                  <option key={font.family} value={font.family} style={{ fontFamily: font.family }}>
                    {displayText}
                  </option>
                )
              })}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.autoFontSize}
            onChange={e => handleChange('autoFontSize', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-sm"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">フォントサイズを自動調整</span>
        </label>
        {!config.autoFontSize && (
          <div className="mt-3">
            <label htmlFor="fontSize" className="block text-sm text-gray-600 mb-2">
              フォントサイズ: {config.fontSize}px
            </label>
            <input
              id="fontSize"
              type="range"
              min="12"
              max="64"
              value={config.fontSize}
              onChange={e => handleChange('fontSize', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.autoFitWidth}
            onChange={e => handleChange('autoFitWidth', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-sm"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">
            幅自動調整（各行を出力サイズに合わせて拡大・縮小）
          </span>
        </label>
      </div>

      <div className="mb-6">
        <label htmlFor="lineHeight" className="block text-sm font-medium text-gray-700 mb-2">
          行間倍率: {config.lineHeight}
        </label>
        <input
          id="lineHeight"
          type="range"
          min="0.3"
          max="2.0"
          step="0.05"
          value={config.lineHeight}
          onChange={e => handleChange('lineHeight', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="verticalOffset" className="block text-sm font-medium text-gray-700 mb-2">
          上下位置: {config.verticalOffset > 0 ? '+' : ''}
          {config.verticalOffset}%
        </label>
        <input
          id="verticalOffset"
          type="range"
          min="-50"
          max="50"
          step="0.5"
          value={config.verticalOffset}
          onChange={e => handleChange('verticalOffset', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="horizontalPadding" className="block text-sm font-medium text-gray-700 mb-2">
          左右余白: {config.horizontalPadding}%
        </label>
        <input
          id="horizontalPadding"
          type="range"
          min="0"
          max="30"
          step="1"
          value={config.horizontalPadding}
          onChange={e => handleChange('horizontalPadding', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
          文字色
        </label>
        <div className="flex gap-2 mb-3">
          <input
            id="color"
            type="color"
            value={config.color}
            onChange={e => handleChange('color', e.target.value)}
            className="h-10 w-16 rounded-sm border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={config.color}
            onChange={e => handleChange('color', e.target.value)}
            placeholder="#000000"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-8 gap-1">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              style={{ backgroundColor: preset.color }}
              onClick={() => handleChange('color', preset.color)}
              title={preset.name}
              aria-label={`色を${preset.name}に変更`}
              className="w-6 h-6 rounded-sm border border-gray-300 hover:scale-110 transition-transform duration-200"
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={config.transparentBackground}
            onChange={e => handleChange('transparentBackground', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-sm"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">背景を透明にする</span>
        </label>
        {!config.transparentBackground && (
          <div>
            <label
              htmlFor="backgroundColor"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              背景色
            </label>
            <div className="flex gap-2">
              <input
                id="backgroundColor"
                type="color"
                value={config.backgroundColor}
                onChange={e => handleChange('backgroundColor', e.target.value)}
                className="h-10 w-16 rounded-sm border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={config.backgroundColor}
                onChange={e => handleChange('backgroundColor', e.target.value)}
                placeholder="#FFFFFF"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
          出力サイズ: {config.size}×{config.size}px
        </label>
        <select
          id="size"
          value={config.size}
          onChange={e => handleChange('size', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={64}>64×64 (小)</option>
          <option value={128}>128×128 (中)</option>
          <option value={256}>256×256 (大)</option>
          <option value={512}>512×512 (特大)</option>
        </select>
      </div>
    </div>
  )
}

export default DesignPanel
