import db from "../database/db.js";
import checkAuthorization from "../utils/authorization";

const create_payroll = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_payroll_all = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_payroll_info = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const update_payroll = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const delete_payroll = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

export{
    create_payroll,
    read_payroll_all,
    read_payroll_info,
    update_payroll,
    delete_payroll
};