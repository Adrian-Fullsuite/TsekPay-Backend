import db from "../database/db.js";
import checkAuthorization from "../utils/authorization";

const create_employee_attendance = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_employee_attendance_all = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const read_employee_attendance_info = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const update_employee_attendance = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

const delete_employee_attendance = ( req, res ) => {
    if(checkAuthorization(req.headers)){

    } else{
        res.sendStatus(401);
    }
};

export{
    create_employee_attendance,
    read_employee_attendance_all,
    read_employee_attendance_info,
    update_employee_attendance,
    delete_employee_attendance
};