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

app.delete('/cartas/:carta_id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM cartas WHERE carta_id = $1', [id]);
        res.status(200).send({ mensagem: 'Sucesso ao deletar herói 😎' })
    } catch (error) {
        console.error('Erro ao deletar o herói 😲', error);
        res.status(500).send({ mensagem: 'Erro ao deletar o herói 😲', error})
    }
})

app.put('/cartas/:carta_id', async (req, res) => {
    try {
        const { carta_id } = req.params;
        const { nome, caracteristica, habilidade, nivel, xp } = req.body;
        await pool.query('UPDATE cartas SET nome = $1, caracteristica = $2, habilidade = $3, nivel = $4 , xp = $5 WHERE carta_id = $6', [nome, caracteristica, habilidade, nivel, xp, carta_id]);
        res.status(200).send({ mensagem: 'Sucesso ao editar herói 😎' })
    } catch (error) {
        console.error('Erro ao editar o herói 😲', error);
        res.status(500).send({ mensagem: 'Erro ao editar o herói 😲', error })
    }
})

app.get('/cartas/:carta_id', async (req, res) => {
    try {
        const { carta_id } = req.params;
        const resultado = await pool.query('SELECT * FROM cartas WHERE carta_id = $1', [carta_id]);
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

app.get('/batalha/id/:carta_id', async (req, res) => {
    console.log("passou")
    try {
        const { nome } = req.params;
        console.log(nome)
        console.log(typeof (nome))
        const resultado = await pool.query('SELECT * FROM batalha WHERE carta_id = $1', [carta_id]);
        if (resultado.rowCount === 0) {
            res.status(404).send({ mensagem: `batalha com herói de id ${carta_id} não encontrada` });
        } else {
            res.status(200).json(resultado.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao selecionar batalha por id de herói 😲', error);
        res.status(500).send({ mensagem: `Erro ao selecionar batalha por id de herói ${carta_id}` })
    }
})



app.get('/batalha/:carta1/:carta2', async (req, res) => {
    const { carta1, carta2 } = req.params;

    try {
        // Lógica para calcular o vencedor da batalha
        const cartawin = await calculateWinner(carta1, carta2);

        // Insere o registro da batalha na tabela battles
        await pool.query('INSERT INTO batalha (carta1, carta2, carta_win) VALUES ($1, $2, $3)', [carta1, carta2, cartawin]);

        //exibe o vencedor (todos os dados) e a mensagem de sucesso de registro
        const { rows } = await pool.query('SELECT * FROM cartas WHERE carta_id = $1', [cartawin]);
        res.json({ winner: rows[0], message: 'Batalha realizada' });
        
    } catch (error) {
        res.status(500).json({ message: error.message }, error);
    }
});


//////////////////função calcular vencedor

async function calculateWinner(carta1ID, carta2ID) {

    // Lógica para calcular o vencedor da batalha
    const carta1 = await pool.query('SELECT * FROM cartas WHERE carta_id = $1', [carta1ID]);
    const carta2 = await pool.query('SELECT * FROM cartas WHERE carta_id = $1', [carta2ID]);
   
    if (carta1.rows[0].nivel > carta2.rows[0].nivel) {
        return carta1ID;
    } else if (carta2.rows[0].nivel > carta1.rows[0].nivel ) {
        return carta2ID;
    } else {
       
        if (carta1.rows[0].xp > carta2.rows[0].xp) {
            return carta1ID;
        } else if (carta1.rows[0].xp < carta2.rows[0].xp) {
            return carta2ID;
        } else {
            
            return carta1ID;
        }
    }
}



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} 🍄`)
});