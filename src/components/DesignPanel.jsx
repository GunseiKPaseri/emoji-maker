import { useState } from 'react'
import './DesignPanel.css'

const fontFamilies = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Courier New',
  'Comic Sans MS',
  'Impact',
  'Trebuchet MS',
  'Lucida Console',
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
  const [isPresetOpen, setIsPresetOpen] = useState(false)

  const handleChange = (key, value) => {
    onConfigChange({
      ...config,
      [key]: value,
    })
  }

  return (
    <div className="design-panel">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <h2 style={{ margin: 0 }}>デザイン設定</h2>
        <button
          onClick={onReset}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#c82333'
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={e => {
            e.target.style.background = '#dc3545'
            e.target.style.transform = 'scale(1)'
          }}
        >
          リセット
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="text">テキスト</label>
        <textarea
          id="text"
          value={config.text}
          onChange={e => handleChange('text', e.target.value)}
          placeholder="絵文字にするテキストを入力\n改行で複数行も可能"
          rows={3}
          maxLength="50"
        />
      </div>

      <div className="form-group">
        <label>
          <button
            type="button"
            className="preset-toggle"
            onClick={() => setIsPresetOpen(!isPresetOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: 'inherit',
              padding: 0,
            }}
          >
            <span
              style={{
                transform: isPresetOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            >
              ▶
            </span>
            テキストプリセット
          </button>
        </label>
        {isPresetOpen && (
          <div className="text-presets">
            {textPresets.map((category, categoryIndex) => (
              <div key={categoryIndex} className="preset-category">
                <h4 className="category-title">{category.name}</h4>
                <div className="preset-buttons">
                  {category.texts.map((text, textIndex) => (
                    <button
                      key={textIndex}
                      className="text-preset-btn"
                      onClick={() => handleChange('text', text)}
                      title={text}
                    >
                      {text.replace(/\n/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="inline-control">
          <label htmlFor="fontFamily">フォント</label>
          <select
            id="fontFamily"
            value={config.fontFamily}
            onChange={e => handleChange('fontFamily', e.target.value)}
          >
            {fontFamilies.map(font => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={config.autoFontSize}
            onChange={e => handleChange('autoFontSize', e.target.checked)}
          />
          フォントサイズを自動調整
        </label>
        {!config.autoFontSize && (
          <div className="inline-control">
            <label htmlFor="fontSize">フォントサイズ: {config.fontSize}px</label>
            <input
              id="fontSize"
              type="range"
              min="12"
              max="64"
              value={config.fontSize}
              onChange={e => handleChange('fontSize', parseInt(e.target.value))}
            />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={config.autoFitWidth}
            onChange={e => handleChange('autoFitWidth', e.target.checked)}
          />
          幅自動調整（各行を出力サイズに合わせて拡大・縮小）
        </label>
      </div>

      <div className="form-group">
        <div className="inline-control">
          <label htmlFor="lineHeight">行間倍率: {config.lineHeight}</label>
          <input
            id="lineHeight"
            type="range"
            min="0.3"
            max="2.0"
            step="0.05"
            value={config.lineHeight}
            onChange={e => handleChange('lineHeight', parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="inline-control">
          <label htmlFor="verticalOffset">
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
          />
        </div>
      </div>

      <div className="form-group">
        <div className="inline-control">
          <label htmlFor="horizontalPadding">左右余白: {config.horizontalPadding}%</label>
          <input
            id="horizontalPadding"
            type="range"
            min="0"
            max="30"
            step="1"
            value={config.horizontalPadding}
            onChange={e => handleChange('horizontalPadding', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="color">文字色</label>
        <div className="color-input-group">
          <input
            id="color"
            type="color"
            value={config.color}
            onChange={e => handleChange('color', e.target.value)}
          />
          <input
            type="text"
            value={config.color}
            onChange={e => handleChange('color', e.target.value)}
            placeholder="#000000"
          />
        </div>
        <div className="preset-colors">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              className="color-preset-btn"
              style={{ backgroundColor: preset.color }}
              onClick={() => handleChange('color', preset.color)}
              title={preset.name}
              aria-label={`色を${preset.name}に変更`}
            />
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={config.transparentBackground}
            onChange={e => handleChange('transparentBackground', e.target.checked)}
          />
          背景を透明にする
        </label>
        {!config.transparentBackground && (
          <div className="form-group">
            <label htmlFor="backgroundColor">背景色</label>
            <div className="color-input-group">
              <input
                id="backgroundColor"
                type="color"
                value={config.backgroundColor}
                onChange={e => handleChange('backgroundColor', e.target.value)}
              />
              <input
                type="text"
                value={config.backgroundColor}
                onChange={e => handleChange('backgroundColor', e.target.value)}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="inline-control">
          <label htmlFor="size">
            出力サイズ: {config.size}×{config.size}px
          </label>
          <select
            id="size"
            value={config.size}
            onChange={e => handleChange('size', parseInt(e.target.value))}
          >
            <option value={64}>64×64 (小)</option>
            <option value={128}>128×128 (中)</option>
            <option value={256}>256×256 (大)</option>
            <option value={512}>512×512 (特大)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default DesignPanel
