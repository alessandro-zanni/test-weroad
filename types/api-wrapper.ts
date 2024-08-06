export interface ApiWrapper<T> {
  data: T;
  status?: 'ok' | 'ko';
}
