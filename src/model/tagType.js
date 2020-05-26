// @flow

export type tag = { name: string, count: number };

export const createTag = (name: string, count: number = 1): tag => ({
  name,
  count,
});
