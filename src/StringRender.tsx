import React, { CSSProperties } from 'react'
import { Tooltip, Typography } from 'antd'

interface StringProps {
  data: any
  tooltip?: string | React.ReactNode
  copyable?: boolean | { tooltips?: boolean; text?: string }
  callback?: (value?: any) => void
  style: CSSProperties
}

const { Paragraph } = Typography

const StringRender: React.FC<StringProps> = (props) => {
  const { copyable, data, tooltip, callback, style } = props
  const tlp = tooltip && tooltip !== '' ? tooltip : data

  if (!data || String(data).length <= 0) {
    return <span>-</span>
  }

  // copyable here means whether to display~
  if (copyable) {
    return (
      <Tooltip title={tlp} placement="topLeft">
        <Paragraph
          style={{ marginBottom: 0 }}
          copyable={copyable as any}
          ellipsis
        >
          {data}
        </Paragraph>
      </Tooltip>
    )
  }

  return (
    <Tooltip title={tlp} placement="topLeft">
      {callback ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          className="tcr-colla-button"
          style={{ textAlign: 'left', ...style }}
          onClick={() => {
            callback()
          }}
        >
          {data}
        </a>
      ) : (
        <span className="tcr-colla-string" style={style}>
          {data}
        </span>
      )}
    </Tooltip>
  )
}

export default StringRender
