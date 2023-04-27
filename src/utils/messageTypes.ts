export const SELECTION_CHANGE = 'alldata:selection';
export const INNER_CONDITION_CHANGE = 'alldata:conditionchange:inner';
export const FINAL_CONDITION_CHANGE = 'alldata:conditionchange:final';
export const ROW_OPERATION = 'alldata:rowOperation';
export const PAGE_MOUNTED = 'page:mounted';

export interface PostMessage {
  data: {
    type:
      | typeof SELECTION_CHANGE
      | typeof INNER_CONDITION_CHANGE
      | typeof PAGE_MOUNTED
      | typeof ROW_OPERATION
      | typeof FINAL_CONDITION_CHANGE;
    payload: any;
  };
}
