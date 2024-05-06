const express = require('express');
const { Pool } = require('pg')

const app = express();
const port = 4006;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'trunfo',
    password: 'ds564',
    port: '5432',
});


app.get('/cartas', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM cartas');
        res.json({
            total: resultado.rowCount,
            cartas: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todos os hóis 😲', error);
        res.status(500).send({ mensagem: 'Erro ao obter todos os heróis 😲' })
    }
})

app.post('/cartas', async (req, res) => {


    try {
        const { nome, caracteristica, habilidade, nivel, xp } = req.body;
        

        await pool.query('INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ($1, $2, $3, $4, $5)', [nome, caracteristica, habilidade, nivel, xp])
        res.status(201).send({ mensagem: 'Sucesso ao criar herói 😎' })
    } catch (error) {
        console.error('Erro ao criar o heróis 😲', error);
        res.status(500).send({ mensagem: 'Erro ao criar o herói 😲' })
    }
})

app.delete('/cartas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM cartas WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Sucesso ao deletar herói 😎' })
    } catch (error) {
        console.error('Erro ao deletar o herói 😲');
        res.status(500).send({ mensagem: 'Erro ao deletar o herói 😲' })
    }
})

app.put('/cartas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, caracteristica, habilidade, nivel, xp } = req.body;
        await pool.query('UPDATE cartas SET nome = 1$, caracteristica = 2$, habilidade = 3$, nivel = 4$ , xp = $5', [nome, caracteristica, habilidade, nivel, xp, id]);
        res.status(200).send({ mensagem: 'Sucesso ao editar herói 😎' })
    } catch (error) {
        console.error('Erro ao editar o herói 😲');
        res.status(500).send({ mensagem: 'Erro ao editar o herói 😲' })
    }
})

app.get('/cartas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM cartas WHERE id = $1', [id]);
        if (resultado.rowCount === 0) {
            res.status(404).send({ mensagem: 'herói não encontrado' });
        } else {
            res.status(200).json(resultado.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao selecionar o herói 😲', error);
        res.status(500).send({ mensagem: 'Erro ao selecionar o herói 😲' })
    }
})


app.get('/cartas/nome/:nome', async (req, res) => {
    console.log("passou")
    try {
        const { nome } = req.params;
        console.log(nome)
        console.log(typeof (nome))
        const resultado = await pool.query('SELECT * FROM cartas WHERE nome = $1', [nome]);
        if (resultado.rowCount === 0) {
            res.status(404).send({ mensagem: `herói ${nome} não encontrado` });
        } else {
            res.status(200).json(resultado.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao selecionar o herói por nome 😲', error);
        res.status(500).send({ mensagem: `Erro ao selecionar herói ${nome}` })
    }
})


///////////////////////////


app.get('/batalha', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM batalha');
        res.json({
            total: resultado.rowCount,
            batalha: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todas as batalhas 😲');
        res.status(500).send({ mensagem: 'Erro ao obter todas as batalhas 😲' })
    }
})

app.get('/batalha/id/:id', async (req, res) => {
    console.log("passou")
    try {
        const { nome } = req.params;
        console.log(nome)
        console.log(typeof (nome))
        const resultado = await pool.query('SELECT * FROM batalha WHERE id = $1', [id]);
        if (resultado.rowCount === 0) {
            res.status(404).send({ mensagem: `batalha com herói de id ${id} não encontrada` });
        } else {
            res.status(200).json(resultado.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao selecionar batalha por id de herói 😲', error);
        res.status(500).send({ mensagem: `Erro ao selecionar batalha por id de herói ${id}` })
    }
})


app.post('/batalha', async (req, res) => {


    try {
        const { carta1, carta2 } = req.body;
        const media1 = carta1.nivel + carta1.xp / 2;
        const media2 = carta2.nivel + carta2.xp / 2;
        const carta_win = null

        if (media1 > media2){
            carta_win = carta1
        } else{
            carta_win = carta2
        }
        

        await pool.query('INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ($1, $2, $3, $4, $5)', [nome, caracteristica, habilidade, nivel, xp])
        res.status(201).send({ mensagem: 'Sucesso ao criar herói 😎' })
    } catch (error) {
        console.error('Erro ao criar o heróis 😲', error);
        res.status(500).send({ mensagem: 'Erro ao criar o herói 😲' })
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} 🍄`)
});