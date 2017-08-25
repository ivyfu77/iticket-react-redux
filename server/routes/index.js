var express = require("express")
var router = express.Router();

import {getIndex, getSearch} from "../handlers/indexHandler"
router.use(
    function(req,res,next){
        next();
    }
)

router.get("/", getIndex)
router.get("/search", getSearch)



module.exports = router


