// packages/base/tests/setup.ts
import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import 'vitest-dom/extend-expect'

afterEach(() => {
  cleanup()
})