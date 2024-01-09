import db from "../database/db.js";
import checkAuthorization from "../utils/authorization";

const create_compensation_bonuses = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_compensation_bonuses_all = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_compensation_bonuses_info = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const update_compensation_bonuses = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const delete_compensation_bonuses = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

export{
    create_compensation_bonuses,
    read_compensation_bonuses_all,
    read_compensation_bonuses_info,
    update_compensation_bonuses,
    delete_compensation_bonuses
};