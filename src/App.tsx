import React from 'react'
import { ExtensionProvider40 } from '@looker/extension-sdk-react'

import { SovrnScholar } from './sovrnScholar'

export const App = () => (
  <ExtensionProvider40>
    < SovrnScholar/>
  </ExtensionProvider40>
)
