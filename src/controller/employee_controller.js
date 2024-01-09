import db from "../database/db.js";
import checkAuthorization from "../utils/authorization.js";

const create_employee = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_employee_all = async ( req, res ) => {
    if(checkAuthorization(req.headers)){
        const {rows} = await db.query("SELECT * FROM employee");
        if(rows){
            res.sendStatus(200);
        } else{
            res.sendStatus(500);
        }
    } else{
        res.sendStatus(401);
    }
};

const read_employee_info = async ( req, res ) => {
    if(checkAuthorization(req.headers)){
        const {id} = req.params;
        
    } else{
        res.sendStatus(401);
    }
};

const update_employee = ( req, res) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const delete_employee = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

export{
    create_employee,
    read_employee_all,
    read_employee_info,
    update_employee,
    delete_employee
};