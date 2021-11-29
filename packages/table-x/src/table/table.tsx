/*
 * @Description: 组合各种中间件列表
 */
import React, { useMemo } from 'react'
import {
  diyTableXHOC,
  batchActionSelectTableXHOC,
  expandTableXHOC,
  sortableTableXHOC,
  editTableXHOC,
  subTableXHOC,
  selectTableXHOC,
} from '../hoc'

import BaseTable from './base_table'
import { HocMiddleware, TableProps } from './types'
import { applyMiddleware } from './util'

function Table<D extends object = any>({
  isDiy,
  isBatchSelect,
  isExpand,
  isSort,
  isEdit,
  isSub,
  isKeyboard,
  isSelect,
  ...res
}: TableProps<D>) {
  const Table = useMemo(() => {
    // 按需引入
    let keyboardTableXHOC
    if (isKeyboard) {
      keyboardTableXHOC = require('@gm-pc/keyboard').keyboardTableXHOC
    }
    // 配置中间件
    const hocMiddles = [
      isExpand && expandTableXHOC,
      isBatchSelect && batchActionSelectTableXHOC,
      isDiy && diyTableXHOC,
      isSelect && selectTableXHOC,
      isSort && sortableTableXHOC,
      isEdit && editTableXHOC,
      isSub && subTableXHOC,
      isKeyboard && keyboardTableXHOC,
    ].filter(Boolean) as HocMiddleware[]

    const TempTable = applyMiddleware(...hocMiddles)(BaseTable)
    return TempTable as typeof BaseTable
  }, [isDiy, isBatchSelect, isExpand, isSort, isEdit, isSub, isKeyboard, isSelect])

  const tableProps = (res as unknown) as TableProps<D>
  return <Table {...tableProps} />
}
export default Table
