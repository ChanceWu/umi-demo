
export interface SearchParams {
  parameters?: {
    paramCode: string,
    value: number | string | (string | number)[] | undefined
  }[]
}
