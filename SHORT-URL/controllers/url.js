const { nanoid } = require("nanoid");
const URL = require('../model/url')

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error : `url is required` })
    const shortID = nanoid(8);
    await URL.Create({
        shortId : shortID,
        redirectURL: body.url,
        visitHistory: [],  
    }) 
    return res.json({id: shortID});
}
async function handleGetAnalytics(req,res) {
    const shortID =  req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length, analytics})
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}