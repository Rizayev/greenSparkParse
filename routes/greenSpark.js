var puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

    (async () => {
        // Launch the browser and open a new blank page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // set cookie magazine 16394 and BITRIX_SM_SALE_UID 180422340
        await page.setCookie({name: 'magazine', value: '16394', domain: 'green-spark.ru'});
        await page.setCookie({name: 'global_magazine', value: '16394', domain: 'green-spark.ru'});
        await page.setCookie({name: 'BITRIX_SM_SALE_UID', value: '180422340', domain: 'green-spark.ru'});
        // Navigate the page to a URL
        await page.goto('https://green-spark.ru/search/?q=' + req.query.q + '&ajax=y&section=0&only_stock=yes&search_by_model=false');

        // Set screen size
        await page.setViewport({width: 1080, height: 1024});

        // get body data
        await page.waitForTimeout(1 * 2000);
        const body = await page.evaluate(() => document.body.innerHTML);
        // return body;
        res.send(
            JSON.parse(body)
        );
        await browser.close();
    })();
});

module.exports = router;
