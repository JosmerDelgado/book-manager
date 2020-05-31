// @flow

export type book = {
  uuid: string,
  title: string,
  description: string,
  tags: [string],
  imageURL: string,
  createdDate: number,
};

export const bookCreator = (
  uuid: string,
  title: string,
  description: string,
  tags: [string],
  imageURL: string,
  createdDate: number
): book => ({ uuid, title, description, tags, imageURL, createdDate });
