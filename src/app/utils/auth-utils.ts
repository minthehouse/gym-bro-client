function buildAuthHeaders() {
  const token = JSON.parse(localStorage.getItem('@@STATE')).token;
  const user = JSON.parse(localStorage.getItem('@@STATE')).user;

  console.log('authData', token);

  if (user && token && token.client && user.uid) {
    console.log('hit');

    return {
      'access-token': token.token,
      client: token.client,
      uid: user.uid,
    };
  }

  // Return an empty object or null if the authData is not available
  return {};
}

export { buildAuthHeaders };
