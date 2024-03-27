import db from "../database/db.js";
import { sanitizeObject } from "../utils/sanitize.js";
import checkAuthorization from "../utils/authorization.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const uploadImage = async (imagePath, company_name) => {
  // Upload image to Cloudinary
  try {
    console.log("Image Path: ", imagePath);
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "Tsekpay/Companies/Logos",
      public_id: company_name,
      overwrite: true,
    });

    fs.unlinkSync(imagePath);
    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
};

const createCompany = async (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { account_id, company_name, tin, address } = req.body;
    try {
      // Check if logo file is uploaded
      if (req.file) {
        // Upload image to Cloudinary
        const result = await uploadImage(req.file.path, company_name);
        if (result != null) {
          db.query(
            "INSERT INTO company(account_id, company_name, tin,  address, logo) VALUES(?, ?, ?, ?, ?)",
            [account_id, company_name, tin, address, result.secure_url],
            (error, response) => {
              if (error) {
                console.error(error);
                res.sendStatus(500);
              } else {
                const recordID = response.insertId;

                const payItemVal = [
                  [recordID, "Basic Pay", "Earnings"],
                  [recordID, "Regular OT", "Earnings"],
                  [recordID, "Night Differential", "Earnings"],
                  [recordID, "Payroll Tax", "Deductions"],
                  [recordID, "SSS", "Deductions"],
                  [recordID, "PHIC", "Deductions"],
                  [recordID, "HDMF", "Deductions"],
                  [recordID, "Company Deductinons", "Deductions"]
                  ];
                db.query(
                  `INSERT INTO pay_item(company_id, name, category) VALUES ?`,
                  [payItemVal],
                  (error, response) => {
                    if (error) {
                      console.error(error);
                      res.sendStatus(500);
                    } else {
                      console.log("Pay Items Inserted!")
                      res.sendStatus(200);
                    }
                  }
                );
              }
            }
          );
        } else {
          console.log("Failed To Upload Image");
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {}
  } else {
    res.sendStatus(401);
  }
};

const readCompanyAll = async (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { id } = req.params;

    db.query(
      "SELECT * FROM company WHERE account_id = ?",
      [id],
      (error, result) => {
        const rows = result;
        if (rows) {
          //res.sendStatus(200);
          res.json({ rows });
        } else {
          res.sendStatus(500);
        }
      }
    );
  } else {
    res.sendStatus(401);
  }
};

const readCompanyInfo = async (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { id } = req.params;

    db.query(
      "SELECT * FROM company WHERE id = ?",
      [id],
      (error, results, fields) => {
        const rows = results;

        if (rows) {
          //res.sendStatus(200);
          res.json({ rows });
        } else {
          res.sendStatus(500);
        }
      }
    );
  } else {
    res.sendStatus(401);
  }
};

// add condition for null logo don't update logo
const updateCompany = async (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { account_id, company_name, tin, address } = req.body;
    const { id } = req.params;
    if (req.file) {
      // Upload image to Cloudinary
      const result = await uploadImage(req.file.path, company_name);
      if (result != null) {
        db.query(
          "UPDATE company SET account_id = ?, company_name = ?, tin = ?, address = ?, logo = ? WHERE id = ?",
          [account_id, company_name, tin, address, result.secure_url, id],
          (error, result) => {
            if (error) {
              console.error(error);
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
          }
        );
      } else {
        console.log("Failed To Upload Image");
      }
    } else {
      db.query(
        "UPDATE company SET account_id = ?, company_name = ?, tin = ?, address = ? WHERE id = ?",
        [account_id, company_name, tin, address, id],
        (error, result) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        }
      );
    }
  } else {
    res.sendStatus(401);
  }
};

const deleteCompany = (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { id } = req.params;
    db.query("DELETE FROM company WHERE id = ?", [id], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
};

export {
  createCompany,
  readCompanyAll,
  readCompanyInfo,
  updateCompany,
  deleteCompany,
};
