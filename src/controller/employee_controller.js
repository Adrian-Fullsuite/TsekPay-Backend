import bcrypt from "bcrypt";
import db from "../database/db.js";
import checkAuthorization from "../utils/authorization.js";
const create_employee = ( req, res ) => {
    if(checkAuthorization(req.headers)){
        const{
            first_name,
            middle_name,
            last_name,
            emp_num,
            work_email,
            password,
            role,
            emp_pic,
            personal_email,
            contact_num,
            dob,
            p_address,
            c_address,
            date_hired,
            date_regularization,
            date_separated,
            emp_status,
            sex,
            gender,
            civil_status,
            emergency_contact_name,
            emergency_contact_num,
            emp_key
        } = req.body;
        const saltRounds = Number(process.env.SALT_ROUNDS);
        
        try {
            bcrypt.genSalt(saltRounds, (err, salt) =>{
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err){
                        throw new Error(err);
                    } else{
                        const result = db.query(
                            "INSERT INTO `employee`(`f_name`, `m_name`, `s_name`, `emp_num`, `work_email`, `password`, `role`, `emp_pic`, `personal_email`, `contact_num`, `dob`, `p_address`, `c_address`, `date_hired`, `date_regularization`, `date_separated`, `emp_status`, `sex`, `gender`, `civil_status`, `emergency_contact_name`, `emergency_contact_num`, `emp_key`"
                            + "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)",
                            [
                                first_name,
                                middle_name,
                                last_name,
                                emp_num,
                                work_email,
                                hash,
                                role,
                                emp_pic,
                                personal_email,
                                contact_num,
                                dob,
                                p_address,
                                c_address,
                                date_hired,
                                date_regularization,
                                date_separated,
                                emp_status,
                                sex,
                                gender,
                                civil_status,
                                emergency_contact_name,
                                emergency_contact_num,
                                emp_key
                            ]
                        );

                        result
                        .then((response) => {
                            res.sentStatus(200);
                        })
                        .catch((error) => {
                            console.error(error);
                            res.sendStatus(500);
                        });
                    }
                });
            });
        } catch(error){
            console.error(error);
            res.sendStatus(500);
        }
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
        const {rows} = await db.query(
            "SELECT * FROM employee WHERE employee_id = $1",
            [id]
        );
        if(rows){
            res.sendStatus(200);
        } else{
            res.sentStatus(500);
        }
    } else{
        res.sendStatus(401);
    }
};

const update_employee = ( req, res) => {
    if(checkAuthorization(req.headers)){
        const{
            first_name,
            middle_name,
            last_name,
            emp_num,
            work_email,
            password,
            role,
            emp_pic,
            personal_email,
            contact_num,
            dob,
            p_address,
            c_address,
            date_hired,
            date_regularization,
            date_separated,
            emp_status,
            sex,
            gender,
            civil_status,
            emergency_contact_name,
            emergency_contact_num,
            emp_key,
            id
        } = req.body;

        const result = db.query(
            "UPDATE `employee` SET `f_name`=$1,`m_name`=$2,`s_name`=$3,`emp_num`=$4,`work_email`=$5,`password`=$6,`role`=$7,`emp_pic`=$8,`personal_email`=$9,`contact_num`=$10,`dob`=$11,`p_address`=$12,`c_address`=$13,`date_hired`=$14,`date_regularization`=$15,`date_separated`=$16,`emp_status`=$17,`sex`=$18,`gender`=$19,`civil_status`=$20,`emergency_contact_name`=$21,`emergency_contact_num`=$22,`emp_key`= $23 WHERE `employee_id` = $24",
            [
                first_name,
                middle_name,
                last_name,
                emp_num,
                work_email,
                hash,
                role,
                emp_pic,
                personal_email,
                contact_num,
                dob,
                p_address,
                c_address,
                date_hired,
                date_regularization,
                date_separated,
                emp_status,
                sex,
                gender,
                civil_status,
                emergency_contact_name,
                emergency_contact_num,
                emp_key,
                id
            ]
        );
        result
            .then((response) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500);
            });
    } else{
        res.sendStatus(401);
    }
};

const delete_employee = ( req, res ) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.params;
        const result = db.query(
            "DELETE FROM employee WHERE id = $1",
            [id]
        );
        result
            .then((response) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500);
            });
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