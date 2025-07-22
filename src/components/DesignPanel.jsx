import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
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

import ColorPicker from './ColorPicker'
import FontSelector from './FontSelector'
import TextPresets from './TextPresets'

function DesignPanel({ config, onConfigChange, onReset }) {
  const handleChange = (key, value) => {
    onConfigChange({
      ...config,
      [key]: value,
    })
  }

  return (
    <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6 lg:p-8 backdrop-blur-xs">
      <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          デザイン設定
        </h2>
        <button
          onClick={onReset}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-linear-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-1 sm:gap-2 cursor-pointer"
        >
          <svg
            className="w-3 sm:w-4 h-3 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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
            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all duration-200"
          />
          <div className="absolute bottom-2 right-3 text-xs text-gray-400">
            {config.text.length}/50
          </div>
        </div>
      </div>

      <TextPresets onTextSelect={text => handleChange('text', text)} />

      <FontSelector
        fontFamily={config.fontFamily}
        text={config.text}
        onChange={fontFamily => handleChange('fontFamily', fontFamily)}
      />

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

      <ColorPicker
        useGradient={config.useGradient}
        color={config.color}
        gradientColor1={config.gradientColor1}
        gradientColor2={config.gradientColor2}
        gradientDirection={config.gradientDirection}
        onUseGradientChange={value => handleChange('useGradient', value)}
        onColorChange={value => handleChange('color', value)}
        onGradientColor1Change={value => handleChange('gradientColor1', value)}
        onGradientColor2Change={value => handleChange('gradientColor2', value)}
        onGradientDirectionChange={value => handleChange('gradientDirection', value)}
      />

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
