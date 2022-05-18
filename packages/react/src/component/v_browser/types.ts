import { ReactNode } from 'react'

export interface VBrowserWindow {
  path: string
  query?: { [key: string]: string }
  /** 窗口图标 */
  faviconURL?: string
  /** 窗口名，如果不存在将尝试从vBrowser的autoTitle中取 */
  title?: ReactNode | Element
  /** 可否关闭，默认为true */
  closeable?: boolean
}

export interface VBrowserProps {
  /** 窗口数量限制 */
  maxLength?: number
  /** 这里的路由将全屏显示,且不会呈现在Tab栏中 */
  onReady?: Function
  /** 重新打开vBrowser时恢复已打开窗口, 默认为true */
  restore?: boolean
  /** 窗口变化事件 */
  onChange?: (
    from: VBrowserWindow | undefined,
    to: VBrowserWindow,
    windows: VBrowserWindow[]
  ) => void
  /** 窗口打开/切换前调用，返回false会阻止窗口打开/切换 */
  auth?: (from?: VBrowserWindow, to?: VBrowserWindow) => Promise<boolean> | boolean
  onError?: (error: { code: number; message: string }) => void
  autoTitle?: (path: string) => string
}

export interface CacheItem {
  vNode: JSX.Element & {
    ref: {
      current: HTMLDivElement | undefined
    }
  }
}
