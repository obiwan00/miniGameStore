import { Tag } from "./tag.models";

export interface Game {
  _id: string
  name: string
  price: number
  description: string
  tags: Tag[]
  shareLink: string
  downloadLink?: string
}
