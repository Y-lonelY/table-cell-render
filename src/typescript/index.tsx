import React, { CSSProperties } from 'react'
import { Tooltip, Button, Tag, Badge, Typography } from 'antd'
import dayjs from 'dayjs'
import { Types, Config } from '../../index.d'
import './style.css'

const initConfig = {
  format: 'YYYY-MM-DD HH:mm:ss',
  wrap: 'nowrap',
}

const { Paragraph } = Typography

export default function renderCell(
  type: keyof typeof Types = 'string',
  data: any = 'TableCellRender',
  style: CSSProperties = {},
  config: Config = {}
) {
  const { callback, format, color, copyable, wrap } = Object.assign(
    {},
    initConfig,
    config
  )
  switch (type) {
    case 'status': {
      let cr = 'blue'
      if (typeof color === 'string') {
        cr = color
      } else if (Array.isArray(color)) {
        const current = color.find((item) => {
          return item.value === data
        })
        cr = current?.color ?? 'blue'
      }
      return <Badge color={cr} text={data ?? '-'} />
    }
    case 'tags': {
      let closeable = false
      let cr = 'blue'
      if (callback) {
        closeable = true
      }
      if (typeof color === 'string') {
        cr = color
      } else if (Array.isArray(color)) {
        const current = color.find((item) => {
          return item.value === data
        })
        cr = current?.color ?? 'blue'
      }
      return (
        <Tag
          color={cr ?? 'blue'}
          closable={closeable}
          onClose={() => {
            callback && callback()
          }}
        >
          {data ?? '-'}
        </Tag>
      )
    }
    case 'code': {
      return (
        <>
          {wrap === 'nowrap' && (
            <pre className="tcr-code-pre" style={style}>
              <code>{String(data)}</code>
            </pre>
          )}
          {wrap === 'wrap' && <code>{String(data)}</code>}
        </>
      )
    }
    case 'date': {
      const isValid = dayjs(data, format).isValid()
      return <span>{isValid ? dayjs(data).format(format) : '-'}</span>
    }
    case 'string': {
      if (copyable) {
        return (
          <Tooltip title={data} placement="topLeft">
            <Paragraph style={{ marginBottom: 0 }} copyable ellipsis>
              {data}
            </Paragraph>
          </Tooltip>
        )
      }
      return String(data).length > 0 ? (
        <Tooltip title={data} placement="topLeft">
          {callback ? (
            <Button
              className="tcr-colla-button"
              style={style}
              type="link"
              onClick={() => {
                callback()
              }}
            >
              {data}
            </Button>
          ) : (
            <span className="tcr-colla-string" style={style}>
              {data}
            </span>
          )}
        </Tooltip>
      ) : (
        '-'
      )
    }
  }
}
