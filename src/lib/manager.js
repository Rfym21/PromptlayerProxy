const axios = require("axios")
require('dotenv').config()

class Manager {
  constructor(accounts) {
    this.accounts = []
    this.init(accounts)
    this.current_account = 0
    this.interval = setInterval(() => {
      this.refreshToken()
    }, 1000 * 60 * 60 * 24 * 5)
  }

  async init(accounts) {
    accounts = accounts.split(",").filter(account => account.trim() !== "")
    for (const account of accounts) {
      // const [username, password] = account.split(":")
      this.accounts.push({
        username: null,
        password: null,
        token: account,
        clientId: null,
        workspaceId: null,
        access_token: null,
        refresh: null
      })
    }
  }

  async login(username, password) {
    try {
      const response = await axios.post("https://api.promptlayer.com/login", {
        email: username,
        password: password
      }, {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0"
        }
      })

      if (response.data) {
        return response.data.access_token
      }
      return false
    } catch (error) {
      if (error.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this.login(username, password)
      }
      return false
    }
  }

  async getClientId(token) {
    try {
      const response = await axios.post("https://api.promptlayer.com/ws-token-request", null, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      if (response.data.success) {
        const access_token = response.data.token_details.token
        const clientId = response.data.token_details.clientId
        return { access_token, clientId }
      }
    } catch (error) {
      // console.error('获取clientId失败:', error)
      return false
    }
  }

  async getWorkspaceId(token) {
    try {
      const response = await axios.get("https://api.promptlayer.com/workspaces", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      if (response.data.success && response.data.workspaces.length > 0) {
        const workspaceId = response.data.workspaces[0].id
        return workspaceId
      }
    } catch (error) {
      // console.error('获取workspaceId失败:', error)
      return false
    }
  }

  async initAccount(account) {
    // const token = await this.login(account.username, account.password)
    // if (!token) {
    //   return false
    // }
    const { clientId, access_token } = await this.getClientId(account.token)
    if (!clientId || !access_token) {
      return false
    }
    const workspaceId = await this.getWorkspaceId(account.token)
    if (!workspaceId) {
      return false
    }
    // account.token = token
    account.clientId = clientId
    account.workspaceId = workspaceId
    account.access_token = access_token
    account.refresh = setInterval(async () => {
      const { access_token, clientId } = await this.getClientId(account.token)
      account.access_token = access_token
      account.clientId = clientId
      console.log(`${account.username} 刷新token成功`)
    }, 1000 * 60 * 30)
    return account
  }

  async getAccount() {
    const account = this.accounts[this.current_account]
    if (!account) {
      console.error('没有可用的账户')
      return null
    }
    
    if (!account.token || !account.access_token || !account.clientId || !account.workspaceId) {
      console.log(`初始化账户: ${account.username}`)
      const initialized = await this.initAccount(account)
      if (!initialized) {
        console.error(`账户初始化失败: ${account.username}`)
        // 尝试下一个账户
        this.current_account++
        if (this.current_account >= this.accounts.length) {
          this.current_account = 0
        }
        // 递归尝试下一个账户
        return await this.getAccount()
      }
    }
    
    console.log(`当前账户: ${account.username}, Token: ${account.token}`)
    this.current_account++
    if (this.current_account >= this.accounts.length) {
      this.current_account = 0
    }
    return account
  }

  async refreshToken() {
    this.accounts = []
    this.init(process.env.ACCOUNTS)
  }


}


if (!process.env.ACCOUNTS || process.env.ACCOUNTS === "" || process.env.AUTH_TOKEN === undefined) {
  console.error("ACCOUNTS 或 AUTH_TOKEN 未设置")
  process.exit(1)
}

const manager = new Manager(process.env.ACCOUNTS)

module.exports = manager
