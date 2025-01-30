const express = require('express');
const db = require("../db/Conn");
const {userAuth} =require("../Utility/auth");
const router = express.Router();



// CREATE a new user
router.post('/user/create', (req, res) => {
    const { UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender } = req.body;
    
    const sql = `INSERT INTO Users (UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.status(201).send({ message: 'User created successfully', userId: result.insertId });
        }
    });
});

// GET all users
router.get('/user/getall', (req, res) => {
    const sql = `SELECT * FROM Users`;

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.status(200).send(results);
        }
    });
});

// GET a user by ID
router.get('/user/getbyid/:id', (req, res) => {
    const userId = req.params.id;
    const sql = `SELECT * FROM Users WHERE UserId = ?`;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else if (result.length === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(result[0]);
        }
    });
});

// UPDATE a user by ID
router.put('/user/update/:id', (req, res) => {
    const userId = req.params.id;
    const { UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender } = req.body;

    const sql = `UPDATE Users SET UserName = ?, FatherName = ?, MotherName = ?, DOB = ?, Address = ?, Email = ?, Phone = ?, District = ?, State = ?, Pincode = ?, Age = ?, Gender = ? WHERE UserId = ?`;

    db.query(sql, [UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender, userId], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send({ message: 'User updated successfully' });
        }
    });
});



// DELETE a user by ID
router.delete('/user/delete/:id', (req, res) => {
    const userId = req.params.id;
    const sql = `DELETE FROM Users WHERE UserId = ?`;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send({ message: 'User deleted successfully' });
        }
    });
});






module.exports = router;