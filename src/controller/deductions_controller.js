import db from "../database/db.js";
import checkAuthorization from "../utils/authorization";

const create_deduction = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_deduction_all = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_deduction_info = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const update_deduction = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const delete_deduction = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

export{
    create_deduction,
    read_deduction_all,
    read_deduction_info,
    update_deduction,
    delete_deduction,
};