export interface NameValueItem<T = any> {
  name: string;
  value: T;
}

export interface SimpleObject<T = any> {
  [key: string]: T
}
