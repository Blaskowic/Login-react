const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const app = express();
// Middleware para permitir peticiones desde cualquier origen
app.use(cors());
// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());
// Conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});
// Endpoint para registrar un usuario
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            // Si hay un error, devolvemos un mensaje de error
            return res.status(500).json({ message: "Error al registrar el usuario" });
        }
        // Si no hay error, devolvemos los datos del usuario registrado
        return res.json(data);
    });
});
// Endpoint para hacer login
app.post('/login', [
    // Validamos que el email tenga un formato correcto y una longitud entre 10 y 30 caracteres
    check('email', "El email debe tener entre 10 y 30 caracteres")
        .isEmail()
        .isLength({ min: 10, max: 30 }),
    // Validamos que la contraseña tenga una longitud entre 8 y 10 caracteres
    check('password', "La contraseña debe tener entre 8 y 10 caracteres")
        .isLength({ min: 8, max: 10 })
], (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        // Validamos los errores de validación de express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            if (err) {
                // Si hay un error en la base de datos, devolvemos un mensaje de error
                return res.status(500).json({ message: "Error al hacer login" });
            }
            if (data.length > 0) {
                // Si encontramos un usuario con ese email y contraseña, devolvemos un mensaje de éxito
                return res.json({ message: "Login exitoso" });
            } else {
                // Si no encontramos un usuario con ese email y contraseña, devolvemos un mensaje de error
                return res.status(400).json({ message: "Email o contraseña incorrectos" });
            }
        }
    });
});
// Inicio del servidor
app.listen(8081, () => {
    console.log("Servidor iniciado en el puerto 8081");
});