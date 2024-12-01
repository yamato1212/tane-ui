"use client"

import { TaneButton, HStack } from "@tane-ui/base";



export default function Home() {
  return (
    <div className="grid grid-rows-[auto] grid-cols-2 md:grid-cols-3 gap-4 p-8">
<HStack spacing={4}>
  <TaneButton>Button 1</TaneButton>
  <TaneButton>Button 2</TaneButton>
</HStack>

      {/* 基本バリアント */}
      <TaneButton>Default Button</TaneButton>
      <TaneButton variant="secondary">Secondary</TaneButton>
      <TaneButton variant="destructive">Destructive</TaneButton>
      <TaneButton variant="outline">Outline</TaneButton>
      <TaneButton variant="ghost">Ghost</TaneButton>
      <TaneButton variant="link">Link Style</TaneButton>

      {/* サイズバリエーション */}
      <TaneButton size="sm">Small Button</TaneButton>
      <TaneButton size="default">Default Size</TaneButton>
      <TaneButton size="lg">Large Button</TaneButton>

      {/* アイコン付き */}
      <TaneButton startIcon="→">Start Icon</TaneButton>
      <TaneButton endIcon="←">End Icon</TaneButton>
      <TaneButton startIcon="+" endIcon="→">Both Icons</TaneButton>

      {/* インタラクティブな状態 */}
      <TaneButton loading>Loading State</TaneButton>
      <TaneButton disabled>Disabled State</TaneButton>
      <TaneButton skeleton>Skeleton State</TaneButton>

      {/* アニメーション */}
      <TaneButton animation="bounce" variant="secondary">
        Bounce Effect
      </TaneButton>
      <TaneButton animation="pulse" variant="destructive">
        Pulse Effect
      </TaneButton>
      <TaneButton animation="shake" variant="outline">
        Shake Effect
      </TaneButton>

      {/* 特殊な機能 */}
      <TaneButton
        ripple
        tooltip="リップルエフェクト付きボタン"
        variant="secondary"
      >
        Ripple Effect
      </TaneButton>
      
      <TaneButton
        shortcutKey="Ctrl+B"
        shortcutDescription="ショートカット: Ctrl+B"
        onClick={() => alert('Shortcut Pressed!')}
      >
        With Shortcut
      </TaneButton>

      {/* 長押し機能 */}
      <TaneButton
        onLongPress={() => alert('Long Press Detected!')}
        variant="destructive"
      >
        Long Press Me
      </TaneButton>

      {/* 組み合わせ例 */}
      <TaneButton
       
        size="lg"
        ripple
        animation="slideIn"
        tooltip="複数の機能を組み合わせたボタン"
        startIcon="★"
      >
        Combined Features
      </TaneButton>
    </div>
  );
}