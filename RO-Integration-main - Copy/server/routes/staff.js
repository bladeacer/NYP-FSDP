const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Staff } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
const dayjs = require('dayjs')
require('dotenv').config();
const { Op } = require("sequelize");

router.post("/register", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim().min(3).max(50).required()
            .matches(/^[a-zA-Z '-,.]+$/,
                "name only allow letters, spaces and characters: ' - , ."),
        email: yup.string().trim().lowercase().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
                "password at least 1 letter and 1 number"),
        phone: yup.string().lowercase().min(8).max(50).required()
            .matches(/^\+65\s?([689]\d{7}|[1][-\s]\d{7}|[3]\d{3}[-\s]\d{4})$/,
                "Express in the form '+65 81234567'")
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });

        // Check email
        let staff = await Staff.findOne({
            where: { email: data.email }
        });
        if (staff) {
            res.status(400).json({ message: "Email already exists." });
            return;
        }

        // Hash passowrd
        data.password = await bcrypt.hash(data.password, 10);
        // Create staff
        data.role = "admin";
        let result = await Staff.create(data);
        res.json({
            message: `Email ${result.email} was registered successfully.`
        });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.post("/login", async (req, res) => {
    console.log("Received login request");
    let data = req.body;
    console.log("Request body:", data);

    // Validate request body
    let validationSchema = yup.object({
        email: yup.string().trim().lowercase().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    });

    try {
        data = await validationSchema.validate(data, { abortEarly: false });
        console.log("Validated data:", data);

        // Check email and password
        let errorMsg = "Email or password is not correct.";
        let staff = await Staff.findOne({
            where: { email: data.email }
        });
        if (!staff) {
            console.log("Staff not found with email:", data.email);
            res.status(400).json({ message: errorMsg });
            return;
        }

        console.log("Staff found:", staff);

        let match = await bcrypt.compare(data.password, staff.password);
        if (!match) {
            console.log("Password not match for staff:", staff.email);
            res.status(400).json({ message: errorMsg });
            return;
        }

        // Return staff info
        let staffInfo = {
            id: staff.id,
            email: staff.email,
            name: staff.name,
            phone: staff.phone
        };

        console.log("Staff info:", staffInfo);
        let accessToken = sign(staffInfo, process.env.APP_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
        console.log("Generated access token:", accessToken);

        res.json({
            accessToken: accessToken,
            staff: staffInfo,
            user: {
                id: null,
                email: null,
                name: null,
                phone: null
            }
        });
        console.log("Response sent successfully");
    } catch (err) {
        console.log("Validation or authentication error:", err);
        res.status(400).json({ errors: err.errors });
    }
});

router.get("/auth", validateToken, async (req, res) => {
    let staff = await Staff.findByPk(req.user.id);
    if (staff) {
        let staffInfo = {
            id: staff && staff.id,
            email: staff && staff.email,
            name: staff && staff.name,
            phone: staff && staff.phone,
            createdAt: dayjs(staff && staff.createdAt.toString()).format("DD MMM YYYY").toString()
        };
        res.json({
            staff: staffInfo
        });
    }

});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { phone: { [Op.like]: `%${search}%` } }
        ];
    }
    // You can add condition for other columns here
    // e.g. condition.columnName = value;

    let list = await Staff.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.put("/edit/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let staff = await Staff.findByPk(id);
    if (!staff) {
        res.sendStatus(404);
        return;
    }

    // Check request user id
    if (id != staff.id) {
        res.sendStatus(403);
        return;
    }

    let data = req.body;
    data.password = user.password;
    // Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim()
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be at most 50 characters')
            .required('Name is required')
            .matches(/^[a-zA-Z '-,.]+$/,
                "Name only allow letters, spaces and characters: ' - , ."),
        email: yup.string().trim()
            .email('Enter a valid email')
            .max(50, 'Email must be at most 50 characters')
            .required('Email is required'),
        phone: yup.string()
            .required("Phone number is required")
            .matches(/^\+65\s?([689]\d{7}|[1][-\s]\d{7}|[3]\d{3}[-\s]\d{4})$/,
                "Express in the form '+65 81234567'")
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });

        let num = await User.update(data, {
            where: { id: id }
        });
        if (num == 1) {
            res.json({
                message: "Staff was updated successfully."
            });
        }
        else {
            res.status(400).json({
                message: `Cannot update staff with id ${id}.`
            });
        }
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.put("/reset/:id", validateToken, async (req, res) => {
    let id = req.params.id;

    let staff = await Staff.findByPk(id);
    if (!staff) {
        res.sendStatus(404);
        return;
    }

    // Check request user id
    let staffId = req.staff.id;
    if (staff.id != staffId) {
        res.sendStatus(403);
        return;
    }
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    let validationSchema = yup.object({
        password: yup.string().trim().min(8).required()
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
                "password at least 1 letter and 1 number")
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });

        let num = await Staff.update(data, {
            where: { id: id }
        });

        if (num == 1) {
            res.json({
                message: "Staff was updated successfully."
            });
        }
        else {
            res.status(400).json({
                message: `Cannot update user with id ${id}.`
            });
        }

    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

module.exports = router;
