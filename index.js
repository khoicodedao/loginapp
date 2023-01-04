const puppeteer = require('puppeteer')
const fs = require('fs')

var array = fs
  .readFileSync('C:/Users/Khoi/Desktop/ToolAdmin/mail.txt')
  .toString()
  .split('\n')

let fullCheck = async () => {
  try {
    for (i of array) {
      try {
        let [url, dataLogin] = i.split(' ')
        let userName = dataLogin.split(':')[0]
        let password = dataLogin.split(':')[1]
        let data = await Check(url, userName, password)
      } catch (e) {
        continue
      }
    }
  } catch (e) {}
}
fullCheck()
async function Check(url, username, password) {
  const browser = await puppeteer.launch({ headless: false })
  try {
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('#username')

    await page.type('#username', username, { delay: 100 })
    await page.type('#password', password, { delay: 100 })
    await page.keyboard.press('Enter')
    await page.waitForTimeout(2000)
    if (
      !page.url().includes('auth') ||
      !page.url().includes('Login') ||
      !page.url().includes('login')
    ) {
      console.log(url, username, password)
    }
    await browser.close()
  } catch (e) {
    await browser.close()
  }
}
