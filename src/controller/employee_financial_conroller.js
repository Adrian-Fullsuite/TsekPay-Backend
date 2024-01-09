import db from "../database/db.js";
import checkAuthorization from "../utils/authorization";

const create_employee_financial = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_employee_financial_all = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_employee_financial_info = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const update_employee_financial = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const delete_employee_financial = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

export {
    create_employee_financial,
    read_employee_financial_all,
    read_employee_financial_info,
    update_employee_financial,
    delete_employee_financial
};