// @flow

export type tag = { name: string, count: number };

export const createTag = (name: string, count: number): tag => ({
  name,
  count,
});
