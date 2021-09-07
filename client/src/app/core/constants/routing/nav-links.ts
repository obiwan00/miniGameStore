import { routingUrl } from "./routing-url";

interface NavLink {
  url: string[],
  title: string,
}

export const navLinks: NavLink[] = [
  {
    url: [routingUrl.users.baseUrl],
    title: 'Users',
  },
  {
    url: [routingUrl.users.baseUrl, routingUrl.users.pages.friends],
    title: 'Friends',
  },
  {
    url: [routingUrl.games.baseUrl],
    title: 'Games',
  },
  {
    url: [routingUrl.games.baseUrl, routingUrl.games.pages.library],
    title: 'Library',
  }
]
