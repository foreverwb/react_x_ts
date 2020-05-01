interface SourceDataItem {
  text: string
  value: string
  children?: SourceDataItem[]
}

type A = {
  selected: string[]
  multiple: true
  onChange: (newSelected: string[]) => void
}
type B = {
  selected: string
  multiple?: false
  onChange: (newSelected: string) => void
}
type TreeProps =  {
  sourceData: SourceDataItem[]
} & (A | B)