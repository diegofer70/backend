const { Sequelize } = require('sequelize');

// postgresql://banco_diego_user:6zrwmW8U4DXHKCV36F72wh3M31ZjcOUp@dpg-cqp1g60gph6c73ff36b0-a.oregon-postgres.render.com/banco_diego

// Configuração da conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize('banco_diego', 'banco_diego_user', '', {
    host: 'dpg-cqp1g60gph6c73ff36b0-a.oregon-postgres.render.com',
    dialect: 'postgres',
});

module.exports = sequelize;

const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    // Definição dos campos do modelo
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = User;

const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
const port = 3000;

// Middleware para parsing de JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Endpoint para criar um novo usuário
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Sincronização do banco de dados e inicialização do servidor
sequelize.sync({ force: true }).then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});
