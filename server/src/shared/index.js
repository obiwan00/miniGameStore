const UNFAMILIAR_USER_PUBLIC_FIELDS = ['_id', 'username'];
const FRIEND_PUBLIC_FIELDS = ['_id', 'email', 'username', 'birthday'];
const USER_PUBLIC_FIELDS = ['_id', 'email', 'username', 'birthday', 'createdAt'];
const UNPAID_GAME_PUBLIC_FIELDS = ['_id', 'name', 'price', 'description', 'tags', 'shareLink'];
const PAYED_GAME_PUBLIC_FIELDS = [...UNPAID_GAME_PUBLIC_FIELDS, 'downloadLink'];

module.exports = {
  FRIEND_PUBLIC_FIELDS,
  USER_PUBLIC_FIELDS,
  UNFAMILIAR_USER_PUBLIC_FIELDS,
  PAYED_GAME_PUBLIC_FIELDS,
  UNPAID_GAME_PUBLIC_FIELDS,
};
