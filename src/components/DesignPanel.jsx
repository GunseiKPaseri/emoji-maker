import {
  Disclosure,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
  Popover,
  PopoverButton,
  PopoverPanel,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import '@fontsource/dela-gothic-one'
import '@fontsource/dotgothic16'
import '@fontsource/hachi-maru-pop'
import '@fontsource/hina-mincho'
import '@fontsource/kaisei-decol'
import '@fontsource/kiwi-maru'
import '@fontsource/mochiy-pop-p-one'
import '@fontsource/reggae-one'
import '@fontsource/shippori-mincho'
import '@fontsource/stick'
import '@fontsource/wdxl-lubrifont-jp-n'
import '@fontsource/yomogi'
import '@fontsource/yuji-mai'
import '@fontsource/yuji-syuku'
import '@fontsource/yusei-magic'
import '@fontsource/zen-antique'
import '@fontsource/zen-kurenaido'

const fontCategories = [
  {
    name: 'システム標準',
    fonts: [
      { name: 'Arial', family: 'Arial, sans-serif' },
      { name: 'Georgia', family: 'Georgia, serif' },
      { name: 'Helvetica', family: 'Helvetica, sans-serif' },
      { name: 'Impact', family: 'Impact, sans-serif' },
      { name: 'Noto Sans JP', family: '"Noto Sans JP", sans-serif' },
      { name: 'Noto Serif JP', family: '"Noto Serif JP", serif' },
      { name: 'Times New Roman', family: 'Times New Roman, serif' },
      { name: 'Verdana', family: 'Verdana, sans-serif' },
    ],
  },
  {
    name: '日本語ゴシック',
    fonts: [
      { name: 'デラゴシックワン', family: '"Dela Gothic One", cursive' },
      { name: 'キウイ丸', family: '"Kiwi Maru", serif' },
      { name: 'モッチーポップP', family: '"Mochiy Pop P One", sans-serif' },
    ],
  },
  {
    name: '日本語明朝',
    fonts: [
      { name: 'ひな明朝', family: '"Hina Mincho", serif' },
      { name: 'しっぽり明朝', family: '"Shippori Mincho", serif' },
      { name: '佑字 朴', family: '"Yuji Boku", serif' },
      { name: 'ZENアンチーク', family: '"Zen Antique", serif' },
    ],
  },
  {
    name: '手書き・デザイン',
    fonts: [
      { name: 'はちまるポップ', family: '"Hachi Maru Pop", cursive' },
      { name: '解星デコール', family: '"Kaisei Decol", serif' },
      { name: 'よもぎフォント', family: '"Yomogi", cursive' },
      { name: '佑字 肅', family: '"Yuji Syuku", serif' },
      { name: '佑字 舞', family: '"Yuji Mai", serif' },
      { name: '油性マジック', family: '"Yusei Magic", sans-serif' },
      { name: 'ZEN紅道', family: '"Zen Kurenaido", sans-serif' },
    ],
  },
  {
    name: 'インパクト系',
    fonts: [
      { name: 'ドットゴシック16', family: '"DotGothic16", sans-serif' },
      { name: 'レゲエOne', family: '"Reggae One", cursive' },
      { name: 'ステッキ', family: '"Stick", cursive' },
      { name: '滑油字', family: '"WDXL Lubrifont JP N", sans-serif' },
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
  { name: 'ライム', color: '#65D69B' },
  { name: 'アンバー', color: '#F6AD55' },
  { name: 'シアン', color: '#0BC5EA' },
  { name: 'コーラル', color: '#F56565' },
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

  // フォント一覧を平坦化してListboxで扱いやすくする
  const allFonts = fontCategories.flatMap(category =>
    category.fonts.map(font => ({
      ...font,
      category: category.name,
    }))
  )

  // 現在選択されているフォントを取得
  const selectedFont = allFonts.find(font => font.family === config.fontFamily) || allFonts[0]

  return (
    <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200/50 p-8 backdrop-blur-xs">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          デザイン設定
        </h2>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2 cursor-pointer"
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
        <div className="relative">
          <textarea
            id="text"
            value={config.text}
            onChange={e => handleChange('text', e.target.value)}
            placeholder="絵文字にするテキストを入力&#10;改行で複数行も可能"
            rows={3}
            maxLength="50"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all duration-200"
          />
          <div className="absolute bottom-2 right-3 text-xs text-gray-400">
            {config.text.length}/50
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
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
              </DisclosureButton>
              <DisclosurePanel className="mt-4 space-y-4">
                {textPresets.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.texts.map((text, textIndex) => (
                        <button
                          key={textIndex}
                          onClick={() => handleChange('text', text)}
                          title={text}
                          className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-sm hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                        >
                          {text.replace(/\n/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">フォント</label>
        <Listbox value={selectedFont} onChange={font => handleChange('fontFamily', font.family)}>
          {({ open }) => (
            <>
              <div className="relative">
                <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white py-2.5 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  <span className="block truncate" style={{ fontFamily: selectedFont.family }}>
                    {selectedFont.name}
                    {config.text && (
                      <span className="ml-2 text-gray-500">
                        : {config.text.replace(/\n/g, ' ').trim()}
                      </span>
                    )}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </ListboxButton>

                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {fontCategories.map(category => (
                      <div key={category.name}>
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                          {category.name}
                        </div>
                        {category.fonts.map(font => (
                          <ListboxOption key={font.family} value={font}>
                            {({ focus, selected }) => (
                              <div
                                className={`relative cursor-default select-none py-2 pl-8 pr-4 ${
                                  focus ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                }`}
                              >
                                <span
                                  className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                  style={{ fontFamily: font.family }}
                                >
                                  {font.name}
                                  {config.text && (
                                    <span className="ml-2 text-gray-500 text-sm">
                                      : {config.text.replace(/\n/g, ' ').trim()}
                                    </span>
                                  )}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600">
                                    <svg
                                      className="h-4 w-4"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                ) : null}
                              </div>
                            )}
                          </ListboxOption>
                        ))}
                      </div>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>

      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.autoFontSize}
            onChange={e => handleChange('autoFontSize', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500/20 border-gray-300 rounded transition-all cursor-pointer"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">フォントサイズを自動調整</span>
        </label>
        {!config.autoFontSize && (
          <div className="mt-3">
            <div className="flex items-center gap-4">
              <label htmlFor="fontSize" className="text-sm text-gray-600 w-32">
                フォントサイズ: {config.fontSize}px
              </label>
              <input
                id="fontSize"
                type="range"
                min="12"
                max="64"
                value={config.fontSize}
                onChange={e => handleChange('fontSize', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.autoFitWidth}
            onChange={e => handleChange('autoFitWidth', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500/20 border-gray-300 rounded transition-all cursor-pointer"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            幅自動調整（各行を出力サイズに合わせて拡大・縮小）
          </span>
        </label>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <label htmlFor="lineHeight" className="text-sm font-medium text-gray-700 w-32">
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
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <label htmlFor="verticalOffset" className="text-sm font-medium text-gray-700 w-32">
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
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <label htmlFor="horizontalPadding" className="text-sm font-medium text-gray-700 w-32">
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
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">文字色</label>
        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton className="flex items-center gap-2 w-full justify-start px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 cursor-pointer">
                <div
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-sm text-gray-700">{config.color}</span>
                <svg
                  className={`ml-auto h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </PopoverButton>

              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.color}
                        onChange={e => handleChange('color', e.target.value)}
                        className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.color}
                        onChange={e => handleChange('color', e.target.value)}
                        placeholder="#000000"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-8 gap-1.5">
                      {colorPresets.map((preset, index) => (
                        <button
                          key={index}
                          style={{ backgroundColor: preset.color }}
                          onClick={() => handleChange('color', preset.color)}
                          title={preset.name}
                          aria-label={`色を${preset.name}に変更`}
                          className="w-7 h-7 rounded border border-gray-300 hover:scale-110 transition-transform duration-200 cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>

      <div className="mb-6">
        <label className="flex items-center mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.transparentBackground}
            onChange={e => handleChange('transparentBackground', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500/20 border-gray-300 rounded transition-all cursor-pointer"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">背景を透明にする</span>
        </label>
        {!config.transparentBackground && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">背景色</label>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <PopoverButton className="flex items-center gap-2 w-full justify-start px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 cursor-pointer">
                    <div
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{ backgroundColor: config.backgroundColor }}
                    />
                    <span className="text-sm text-gray-700">{config.backgroundColor}</span>
                    <svg
                      className={`ml-auto h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </PopoverButton>

                  <Transition
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <PopoverPanel className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4">
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={config.backgroundColor}
                            onChange={e => handleChange('backgroundColor', e.target.value)}
                            className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.backgroundColor}
                            onChange={e => handleChange('backgroundColor', e.target.value)}
                            placeholder="#FFFFFF"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-8 gap-1.5">
                          {colorPresets.map((preset, index) => (
                            <button
                              key={index}
                              style={{ backgroundColor: preset.color }}
                              onClick={() => handleChange('backgroundColor', preset.color)}
                              title={preset.name}
                              aria-label={`背景色を${preset.name}に変更`}
                              className="w-7 h-7 rounded border border-gray-300 hover:scale-110 transition-transform duration-200 cursor-pointer"
                            />
                          ))}
                        </div>
                      </div>
                    </PopoverPanel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          出力サイズ: {config.size}×{config.size}px
        </label>
        <Listbox value={config.size} onChange={size => handleChange('size', size)}>
          {({ open }) => (
            <>
              <div className="relative">
                <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white py-2.5 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  <span className="block truncate">
                    {config.size}×{config.size}px (
                    {config.size <= 64
                      ? '小'
                      : config.size <= 128
                        ? '中'
                        : config.size <= 256
                          ? '大'
                          : '特大'}
                    )
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </ListboxButton>

                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {[
                      { value: 64, label: '64×64 (小)' },
                      { value: 128, label: '128×128 (中)' },
                      { value: 256, label: '256×256 (大)' },
                      { value: 512, label: '512×512 (特大)' },
                    ].map(size => (
                      <ListboxOption key={size.value} value={size.value}>
                        {({ focus, selected }) => (
                          <div
                            className={`relative cursor-default select-none py-2 pl-8 pr-4 ${
                              focus ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                            }`}
                          >
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                            >
                              {size.label}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            ) : null}
                          </div>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  )
}

export default DesignPanel
