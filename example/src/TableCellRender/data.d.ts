export enum Types {
  code,
  string,
  date,
  tags,
  status,
  list,
  number
}

enum WrapType {
  wrap,
  nowrap,
}

export interface Config {
  callback?: (value?: any) => void
  tooltip?: string | React.ReactNode
  format?: string
  color?: string | { value: any; color: string; label?: string }[]
  copyable?: boolean | { tooltips?: boolean, text?: string}
  // control whether code should be break
  wrap?: keyof typeof WrapType
  // control list target and display nums
  max?: number
  key?: string
  splitLabel?: string
  itemRender?: (value: any, index: number) => React.ReactNode
}
