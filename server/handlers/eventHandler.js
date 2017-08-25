import axios from 'axios'
import {handleRender} from "../handleRender"

axios.defaults.baseURL = "https://VXMYN1ZQFQ-dsn.algolia.net/1/indexes/Events"

var config = {
    headers:{
        "X-Algolia-API-Key": "4ec6a0aea46dc16f20ca5384a5df9c65",
        "X-Algolia-Application-Id": "VXMYN1ZQFQ"
    }
}

export function getEvent(req, res){
    var queryParam = constructQuery(req.url)
    axios.post("/query",{"params":"query=" + queryParam }, config)
    .then(function(resp){
        handleRender(req,res, 
            {
                url: '/events', 
                event: resp.data.hits[0]
            }
        )
    })
}

function constructQuery(url){
    const splitUrl = url.split("/")
    const param = splitUrl[splitUrl.length - 1]
    const splitParam = param.split("-")
    var queryParam = ""
    splitParam.forEach(function(value){
        queryParam = queryParam + value + " ";
    })
    return queryParam.trim()
}