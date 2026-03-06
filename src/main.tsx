import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Wrapper from './Wrapper.tsx'
import { DataProvider } from "./DataProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <Wrapper />
    </DataProvider>
  </StrictMode>,
)
