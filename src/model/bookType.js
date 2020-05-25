// @flow

export type book = {
  uuid: number,
  title: string,
  description: string,
  tags: [string],
  imageURL: string,
  createdDate: number,
};

export const bookCreator = (
  uuid: number,
  title: string,
  description: string,
  tags: [string],
  imageURL: string,
  createdDate: number
): book => ({ uuid, title, description, tags, imageURL, createdDate });
