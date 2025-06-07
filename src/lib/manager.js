const axios = require("axios")
require('dotenv').config()
const yes_captcha = require("./yes_captcha")

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
      const account_info = {
        username: null,
        password: null,
        token: null,
        clientId: null,
        workspaceId: null,
        access_token: null,
        refresh: null
      }
      if (account.includes(":")) {
        const [username, password] = account.split(":")
        account_info.username = username
        account_info.password = password
      } else {
        account_info.token = account
      }
      this.accounts.push(account_info)
    }
  }

  async login(username, password, captcha_token) {
    try {
      const response = await axios.post("https://api.promptlayer.com/login", {
        email: username,
        password: password,
        recaptcha_response: captcha_token
      }, {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0"
        }
      })
      // console.log(response.data)

      if (response.data) {
        return response.data.access_token
      }
      return false
    } catch (error) {
      if (error.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this.login(username, password)
      }
      // console.log(error)
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

    let token
    if (account.username && account.password) {
      const captcha_token = await yes_captcha.getCaptchaToken()
      // console.log(captcha_token)
      token = await this.login(account.username, account.password, captcha_token)
      if (!token) {
        return false
      }
    } else {
      token = account.token
    }

    const { clientId, access_token } = await this.getClientId(token)
    if (!clientId || !access_token) {
      return false
    }

    const workspaceId = await this.getWorkspaceId(token)
    if (!workspaceId) {
      return false
    }

    account.token = token
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
      console.log(`初始化账户: ${account.username || "Token 账户"}`)
      const initialized = await this.initAccount(account)
      if (!initialized) {
        console.error(`账户初始化失败: ${account.username}`)
        return this.accounts[0]
      }
    }

    console.log(`当前账户: ${account.username || "Token 账户"}, Token: ${account.token}`)
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
