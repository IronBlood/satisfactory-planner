import {
  StrictMode,
  Suspense,
  lazy,
} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { DataProvider } from "./DataProvider.tsx";

const Wrapper = lazy(() => import('./Wrapper.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <Suspense fallback={null}>
        <Wrapper />
      </Suspense>
    </DataProvider>
  </StrictMode>,
)
