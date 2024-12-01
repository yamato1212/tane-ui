import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, {
    // ラッパーが必要な場合はここで追加
    ...options,
  })
}

export * from '@testing-library/react'
export { customRender as render }