import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

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

function TextPresets({ onTextSelect }) {
  return (
    <div className="mb-6">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  open ? 'rotate-90' : 'rotate-0'
                }`}
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
                        onClick={() => onTextSelect(text)}
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
  )
}

export default TextPresets
