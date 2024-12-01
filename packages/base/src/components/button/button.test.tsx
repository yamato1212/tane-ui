import { render, screen, fireEvent } from "../../../tests/test-utils"
import { describe, it, expect, vi } from 'vitest'
import { TaneButton } from './button'

describe('Button', () => {
  // 基本的なレンダリング
  it('renders correctly', () => {
    render(<TaneButton>Click me</TaneButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  // クリックイベント
  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<TaneButton onClick={handleClick}>Click me</TaneButton>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // バリアント
  it('handles variants correctly', () => {
    const { container } = render(<TaneButton variant="destructive">Delete</TaneButton>)
    expect(container.firstChild).toHaveClass('bg-destructive')
  })

  // ローディング状態
  it('shows loading state correctly', () => {
    render(<TaneButton loading loadingText="Loading...">Submit</TaneButton>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  // スケルトン状態
  it('renders skeleton state', () => {
    const { container } = render(<TaneButton skeleton>Loading</TaneButton>)
    expect(container.firstChild).toHaveClass('animate-pulse', 'bg-gray-200')
  })

  // アイコンの表示
  it('renders with start and end icons', () => {
    const startIcon = <span data-testid="start-icon">→</span>
    const endIcon = <span data-testid="end-icon">←</span>

    render(
      <TaneButton startIcon={startIcon} endIcon={endIcon}>
        With Icons
      </TaneButton>
    )

    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
  })

  // ショートカットキー
  it('handles keyboard shortcuts', () => {
    const handleClick = vi.fn()
    render(
      <TaneButton
        shortcutKey="ctrl+s"
        onClick={handleClick}
      >
        Save
      </TaneButton>
    )

    // キーボードイベントをシミュレート
    fireEvent.keyDown(document, { 
      key: 's',
      ctrlKey: true,
      code: 'KeyS' 
    })

    expect(handleClick).toHaveBeenCalled()
  })

  // 長押し機能
  it('handles long press', () => {
    vi.useFakeTimers()
    const onLongPress = vi.fn()
    
    render(
      <TaneButton onLongPress={onLongPress} longPressDelay={500}>
        Hold me
      </TaneButton>
    )

    fireEvent.mouseDown(screen.getByText('Hold me'))
    vi.advanceTimersByTime(500)
    
    expect(onLongPress).toHaveBeenCalled()
    
    vi.useRealTimers()
  })

  // disabled状態
  it('handles disabled state', () => {
    const handleClick = vi.fn()
    render(<TaneButton disabled onClick={handleClick}>Disabled</TaneButton>)
    
    fireEvent.click(screen.getByText('Disabled'))
    expect(handleClick).not.toHaveBeenCalled()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  // アニメーション
  it('applies animation classes correctly', () => {
    const { container } = render(<TaneButton animation="bounce">Bounce</TaneButton>)
    expect(container.firstChild).toHaveClass('hover:animate-bounce')
  })

  // ツールチップ
  it('renders with tooltip', () => {
    render(<TaneButton tooltip="Help text">Hover me</TaneButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-describedby')
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help text')
  })
})