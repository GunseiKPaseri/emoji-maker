import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react'

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

function FontSelector({ fontFamily, text, onChange }) {
  // フォント一覧を平坦化してListboxで扱いやすくする
  const allFonts = fontCategories.flatMap(category =>
    category.fonts.map(font => ({
      ...font,
      category: category.name,
    }))
  )

  // 現在選択されているフォントを取得
  const selectedFont = allFonts.find(font => font.family === fontFamily) || allFonts[0]

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">フォント</label>
      <Listbox value={selectedFont} onChange={font => onChange(font.family)}>
        {({ open }) => (
          <>
            <div className="relative">
              <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white py-2.5 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <span className="block truncate" style={{ fontFamily: selectedFont.family }}>
                  {selectedFont.name}
                  {text && (
                    <span className="ml-2 text-gray-500">: {text.replace(/\n/g, ' ').trim()}</span>
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
                                {text && (
                                  <span className="ml-2 text-gray-500 text-sm">
                                    : {text.replace(/\n/g, ' ').trim()}
                                  </span>
                                )}
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
                    </div>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default FontSelector
