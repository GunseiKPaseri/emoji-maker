import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'

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

const gradientPresets = [
  { colors: ['#FF6B6B', '#4ECDC4'], name: 'Coral-Teal' },
  { colors: ['#667eea', '#764ba2'], name: 'Purple' },
  { colors: ['#f093fb', '#f5576c'], name: 'Pink' },
  { colors: ['#4facfe', '#00f2fe'], name: 'Blue' },
  { colors: ['#43e97b', '#38f9d7'], name: 'Green' },
  { colors: ['#fa709a', '#fee140'], name: 'Sunset' },
  { colors: ['#a8edea', '#fed6e3'], name: 'Pastel' },
  { colors: ['#ff9a9e', '#fecfef'], name: 'Rose' },
]

function ColorPicker({
  useGradient,
  color,
  gradientColor1,
  gradientColor2,
  gradientDirection,
  onUseGradientChange,
  onColorChange,
  onGradientColor1Change,
  onGradientColor2Change,
  onGradientDirectionChange,
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">文字色</label>
      <div className="space-y-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useGradient}
            onChange={e => onUseGradientChange(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500/20 border-gray-300 rounded transition-all cursor-pointer"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">グラデーションを使用</span>
        </label>

        {useGradient ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-2">開始色</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={gradientColor1}
                    onChange={e => onGradientColor1Change(e.target.value)}
                    className="h-8 w-12 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={gradientColor1}
                    onChange={e => onGradientColor1Change(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-2">終了色</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={gradientColor2}
                    onChange={e => onGradientColor2Change(e.target.value)}
                    className="h-8 w-12 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={gradientColor2}
                    onChange={e => onGradientColor2Change(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">グラデーション方向</label>
              <Listbox value={gradientDirection} onChange={onGradientDirectionChange}>
                {({ open }) => (
                  <>
                    <div className="relative">
                      <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left text-sm border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        <span className="block truncate">
                          {gradientDirection === 'horizontal'
                            ? '水平'
                            : gradientDirection === 'vertical'
                              ? '垂直'
                              : '斜め'}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <svg
                            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                              open ? 'rotate-180' : ''
                            }`}
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
                        <ListboxOptions className="absolute z-50 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {[
                            { value: 'horizontal', label: '水平 (左→右)' },
                            { value: 'vertical', label: '垂直 (上→下)' },
                            { value: 'diagonal', label: '斜め (左上→右下)' },
                          ].map(option => (
                            <ListboxOption key={option.value} value={option.value}>
                              {({ focus, selected }) => (
                                <div
                                  className={`relative cursor-default select-none py-2 pl-8 pr-4 ${
                                    focus ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                  }`}
                                >
                                  <span
                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                  >
                                    {option.label}
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
                        </ListboxOptions>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {gradientPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onGradientColor1Change(preset.colors[0])
                    onGradientColor2Change(preset.colors[1])
                  }}
                  title={preset.name}
                  className="h-8 rounded border border-gray-300 hover:scale-105 transition-transform duration-200 cursor-pointer"
                  style={{
                    background: `linear-gradient(45deg, ${preset.colors[0]}, ${preset.colors[1]})`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <Popover className="relative">
            {({ open }) => (
              <>
                <PopoverButton className="flex items-center gap-2 w-full justify-start px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 cursor-pointer">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-gray-700">{color}</span>
                  <svg
                    className={`ml-auto h-4 w-4 text-gray-400 transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
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
                          value={color}
                          onChange={e => onColorChange(e.target.value)}
                          className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={color}
                          onChange={e => onColorChange(e.target.value)}
                          placeholder="#000000"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-8 gap-1.5">
                        {colorPresets.map((preset, index) => (
                          <button
                            key={index}
                            style={{ backgroundColor: preset.color }}
                            onClick={() => onColorChange(preset.color)}
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
        )}
      </div>
    </div>
  )
}

export default ColorPicker
