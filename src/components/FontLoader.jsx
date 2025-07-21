import '@fontsource/dela-gothic-one'
import delaGothicOneURL from '@fontsource/dela-gothic-one/files/dela-gothic-one-latin-400-normal.woff2?url'
import '@fontsource/kaisei-decol'
import kaiseiDecolURL from '@fontsource/kaisei-decol/files/kaisei-decol-latin-400-normal.woff2?url'
import '@fontsource/yusei-magic'
import yuseiMagicURL from '@fontsource/yusei-magic/files/yusei-magic-latin-400-normal.woff2?url'
import '@fontsource/wdxl-lubrifont-jp-n'
import wdxlLubrifontJPURL from '@fontsource/wdxl-lubrifont-jp-n/files/wdxl-lubrifont-jp-n-latin-400-normal.woff2?url'
import '@fontsource/kiwi-maru'
import kiwiMaruURL from '@fontsource/kiwi-maru/files/kiwi-maru-latin-400-normal.woff2?url'
import '@fontsource/hina-mincho'
import hinaMinchoURL from '@fontsource/hina-mincho/files/hina-mincho-latin-400-normal.woff2?url'
import '@fontsource/dotgothic16'
import dotGothic16URL from '@fontsource/dotgothic16/files/dotgothic16-latin-400-normal.woff2?url'
import '@fontsource/yuji-syuku'
import yujiSyukuURL from '@fontsource/yuji-syuku/files/yuji-syuku-latin-400-normal.woff2?url'
import '@fontsource/zen-kurenaido'
import zenKurenaidoURL from '@fontsource/zen-kurenaido/files/zen-kurenaido-latin-400-normal.woff2?url'
import '@fontsource/reggae-one'
import reggaeOneURL from '@fontsource/reggae-one/files/reggae-one-latin-400-normal.woff2?url'

const FontLoader = () => {
  return (
    <>
      <link
        rel="preload"
        as="font"
        href={delaGothicOneURL}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        href={kaiseiDecolURL}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        href={yuseiMagicURL}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        href={wdxlLubrifontJPURL}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="preload" as="font" href={kiwiMaruURL} type="font/woff2" crossOrigin="anonymous" />
      <link
        rel="preload"
        as="font"
        href={hinaMinchoURL}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        href={dotGothic16URL}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="preload" as="font" href={yujiSyukuURL} type="font/woff2" crossOrigin="anonymous" />
      <link
        rel="preload"
        as="font"
        href={zenKurenaidoURL}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="preload" as="font" href={reggaeOneURL} type="font/woff2" crossOrigin="anonymous" />
    </>
  )
}

export default FontLoader
