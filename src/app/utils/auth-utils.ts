function buildAuthHeaders() {
  const authData = JSON.parse(localStorage.getItem('@@STATE')).user;

  console.log('authData', authData);

  if (authData && authData.userToken.token && authData.userToken.client && authData.uid) {
    console.log('hit');

    return {
      'access-token': authData.userToken.token,
      client: authData.userToken.client,
      uid: authData.uid,
    };
  }

  // Return an empty object or null if the authData is not available
  return {};
}

export { buildAuthHeaders };
