const axios = require('axios')

class YesCaptcha {
  constructor() {
    this.yes_captcha_client_key = process.env.YES_CAPTCHA_CLIENTKEY
  }

  async getCaptchaToken() {
    const taskId = await this.send_captcha_request()
    if (!taskId) {
      return null
    }
    let count = 0
    while (count < 20) {
      try {
        const captcha_token = await this.await_captcha_result(taskId)
        if (captcha_token) {
          console.log(`【成功】=> 获取验证码成功！`)
          return captcha_token
        }
        await new Promise(resolve => setTimeout(resolve, 3000))
        count++
      } catch (e) {
        console.log(`【错误】=> 获取验证码失败，等待3s后重试！`)
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
    }
    return null
  }

  async send_captcha_request() {
    try {
      const response = await axios.post('https://api.yescaptcha.com/createTask', {
        "clientKey": this.yes_captcha_client_key,
        "task": {
          "type": "RecaptchaV3TaskProxylessM1S9",
          "websiteURL": "https://dashboard.promptlayer.com/",
          "websiteKey": "6LcZnEErAAAAALNpzeT9jYDPVK0ge1Yd_MEY7cE6",
          "pageAction": "login"
        }
      })
      // console.log(response.data);

      return response.data.taskId
    } catch (e) {
      console.log(`【错误】=> 发送验证码请求失败！`)
      return null
    }
  }

  async await_captcha_result(taskId) {
    try {
      const response = await axios.post("https://api.yescaptcha.com/getTaskResult", {
        "clientKey": this.yes_captcha_client_key,
        "taskId": taskId
      })
      return response.data.solution.gRecaptchaResponse
    } catch (e) {
      console.log(`【错误】=> 等待验证码结果失败！`)
      return null
    }
  }
}

module.exports = new YesCaptcha()