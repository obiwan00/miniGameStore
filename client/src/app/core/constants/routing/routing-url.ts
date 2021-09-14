export const routingUrl = {
  auth: {
    baseUrl: 'auth',
    pages: {
      login: 'login',
      register: 'register',
    }
  },
  users: {
    baseUrl: 'users',
    pages: {
      users: '',
      friends: 'friends',
    }
  },
  games: {
    baseUrl: 'games',
    pages: {
      games: '',
      library: 'library',
    }
  },
  profile: {
    baseUrl: 'profile',
    pages: {
      profile: '',
      changePassword: 'change-password',
    }
  },
  '500': {
    baseUrl: '500',
    data: { title: '500', description: 'Internal server error' }
  },
}
