const user = {
  checkAdmin: async () => {
    const url = '/api/user/admin/verify'

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (!data.admin) throw new Error('Invalid token')

      return true
    } catch (error) {
      return false
    }
  }
}

export default user