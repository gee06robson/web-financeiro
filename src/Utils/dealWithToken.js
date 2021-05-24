

export const dealWithToken = (token) => {
  const data = {
    headers: {
      authorization: token
    }
  }

  return data
} 