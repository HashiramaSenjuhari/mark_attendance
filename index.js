import puppeteer from "puppeteer";

let code = process.env.APP_ID

async function run(){
  if(!code){
    console.log("Please Set the Env variable Please Refer the documentation https://github.com/HashiramaSenjuhari/mark_attendance")
    return
  }
  try {
    let browser = await puppeteer.connect({
      browserWSEndpoint:`ws://127.0.0.1:9222/devtools/browser/${code}`,
      defaultViewport:null
    })
    let page = await browser.newPage()
    await page.goto("https://kalvium.community/")
    await page.waitForNetworkIdle()
    // checking for feedback
    main(page)
  }catch(error){
    console.log(`Error Connecting using Code ${code} , Please Verify the code`)
  }
}
run()

async function sleep(time){
  return new Promise((resolve) => {
    setTimeout(resolve,time)
  })
}

async function mark(page){
  let button = await page.locator("text/Mark Attendance")
  await button.wait()
  await button.click()

  await sleep(4000)

  let mark = await page.locator("text/I'm Present")
  await mark.wait()
  await mark.click()
}

async function main(page){
  try {
      let emoji = await page.waitForSelector("img[src=\"/assets/positive-a9fc674e.svg\"]",{timeout:6000})
      await emoji.click()
      await page.locator("text/Submit").click()
      mark(page)
    }catch(error){
    mark(page)
  }
}
