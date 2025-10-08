import puppeteer from "puppeteer";

async function run(){
  let browser = await puppeteer.connect({
    browserWSEndpoint:"ws://127.0.0.1:9222/devtools/browser/1fdf334f-2135-4435-acb2-fdff2dc54442",
    defaultViewport:null
  })
  let page = await browser.newPage()
  await page.goto("https://kalvium.community/")
  let button = await page.locator("text/Mark Attendance")
  await button.wait()
  await button.click()

  await sleep(4000)

  let mark = await page.locator("text/I'm Present")
  await mark.wait()
  await mark.click()
}
run()

async function sleep(time){
  return new Promise((resolve) => {
    setTimeout(resolve,time)
  })
}
