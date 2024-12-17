const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');
const session = require('express-session');

//Configura o middleware para analisar solicitações com o tipo de conteudo
const app = express();

app.use(express.json());
app.use(express.static('public'));

const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');

// Configuração do Handlebars
app.engine(
    'handlebars',
    handlebars.engine({
        defaultLayout: 'main',
        extname: '.handlebars',
    })
);
app.set('view engine', 'handlebars');

// Registrar o helper "eq"
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});


app.use(
    express.urlencoded({
        extended: true,
    }),
    session({
        secret: "4MBurguer", /* Palavra Chave */
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

function userLogado(req, res) {
    const user = req.session.idDoUserLogado;

    if (!user) {
        res.redirect('/login');
    }
}

function admLogado(req, res) {
    const adm = req.session.idDoUserLogado;

    if (adm != 1) {
        res.status(500).send("ERRO: Acesso Negado");
        return;
    }
}

// configuração do middleware para verificar solicitações com o tipo de conteudo body
app.use(
    express.urlencoded({
        extended: true
    })
);

//Configuração do handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home')
});

// Login e Cadastro
app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.post('/cadastro/insertCliente', (req, res) => {
    const nome = req.body.Nome;
    const email = req.body.Email;
    const senha = req.body.Senha;
    const endereco = req.body.Endereco;

    const sql = `INSERT INTO Cliente (NomeCliente, EmailCliente, SenhaCliente, EnderecoCliente) VALUES ('${nome}', '${email}', '${senha}', '${endereco}')`
    const sqlEmail = `SELECT EmailCliente FROM Cliente WHERE EmailCliente = '${email}'`


    conn.query(sqlEmail, function (err, data) {
        if (err) {
            console.log("Erro: ", err)
            return;
        }

        if (data.length > 0) {
            res.redirect('/cadastro');
        }
        else {
            conn.query(sql, function (err) {
                if (err) {
                    console.log("Erro ", err);
                    return false;
                }
                else {
                    console.log("Usuário criado")
                    res.redirect('/login');
                }
            })
        }
    })
})

app.post('/login/validacao', (req, res) => {
    const email = req.body.Email;
    const senha = req.body.Senha;
    const sql = `SELECT * FROM Cliente WHERE EmailCliente = "${email}" AND SenhaCliente = "${senha}"`;

    conn.query(sql, function (err, result) {
        console.log("SQL: ", sql);
        if (err) {
            console.log("Erro: ", err);
            return res.status(500).json({ success: false, message: 'Erro no servidor.' });
        }

        if (result.length > 0) {
            req.session.idDoUserLogado = result[0].ClienteID;

            if (email === "adm@gmail.com" && senha === "adm123") {
                console.log("Administrador encontrado");
                return res.status(200).json({ success: true, redirect: '/ADM/GerenciarProduto' });
            } else {
                console.log("Usuário encontrado");
                return res.status(200).json({ success: true, redirect: '/cardapio' });
            }
        } else {
            console.log('Email ou senha incorretos');
            return res.status(401).json({ success: false, message: 'Email ou senha incorretos.' });
        }
    });
});



// Rota do Cardápio 
app.get('/cardapio', (req, res) => {
    userLogado(req, res);
    const sql = `SELECT * FROM Comida;`
    const UserLogado = req.session.idDoUserLogado;
    const nomeLogado = `SELECT NomeCliente FROM Cliente WHERE ClienteID = "${UserLogado}"`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log("Erro: ", err)
            return;
        }

        const CardComida = data;

        conn.query(nomeLogado, function (err, data) {
            if (err) {
                console.log("Erro: ", err)
                return
            }
            const NomeCliente = data;
            res.render('cardapio', { CardComida, NomeCliente })

        })

    })
})

app.get('/cardapio/produto/:id', (req, res) => {
    userLogado(req, res);
    const IDComida = req.params.id;
    const sql = `SELECT * FROM Comida WHERE ComidaID = '${IDComida}'`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log("Erro: ", err);
            return;
        }

        const DetalhesComida = data;
        res.render('detalhesProduto', { DetalhesComida })
    })
})

app.get('/cardapio/:tipo?', (req, res) => {
    userLogado(req, res);
    const { tipo } = req.params;
    const UserLogado = req.session.idDoUserLogado;

    // Define o SQL baseado no parâmetro da rota
    let sqlFiltro = 'SELECT * FROM Comida';
    const sqlParams = [];
    if (tipo && tipo !== 'Todos') {
        sqlFiltro += ' WHERE Tipo = ?';
        sqlParams.push(tipo);
    }

    const nomeLogado = `SELECT NomeCliente FROM Cliente WHERE ClienteID = ?`;

    // Consulta o cardápio com ou sem filtro
    conn.query(sqlFiltro, sqlParams, function (err, cardComidaData) {
        if (err) {
            console.error('Erro ao consultar o cardápio:', err);
            return res.status(500).send('Erro ao carregar o cardápio.');
        }

        const CardComida = cardComidaData;

        // Consulta o nome do usuário logado
        conn.query(nomeLogado, [UserLogado], function (err, nomeClienteData) {
            if (err) {
                console.error('Erro ao consultar o nome do cliente:', err);
                return res.status(500).send('Erro ao carregar informações do cliente.');
            }

            const NomeCliente = nomeClienteData;
            const Titulo = tipo && tipo !== 'Todos' ? tipo : 'Todos os Pratos'; // Título dinâmico

            // Renderiza a página com os dados
            res.render('filtroCardapio', { CardComida, NomeCliente, Titulo });
        });
    });
});


app.post('/fazerPedido/:id', (req, res) => {
    const IDCliente = req.session.idDoUserLogado;
    const IDComida = req.params.id;
    const sql = `INSERT INTO Pedido(ComidaID, ClienteID) VALUES ("${IDComida}","${IDCliente}");`
    console.log(sql)

    conn.query(sql, function (err) {
        if (err) {
            console.log("Erro: ", err)
            return;
        }
        console.log("Pedido Realizado")
        res.redirect('/cardapio')
    })
})


// ADM - Gerenciar Produtos (Adicionar, Atualizar e Excluir)
app.get('/ADM/GerenciarProduto', (req, res) => {
    admLogado(req, res);
    const sql = ` SELECT * FROM Comida;`;
    const sqlCard = `SELECT ComidaID, NomeComida, PrecoComida, IMGComida, IMGPais FROM Comida;`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log("Erro: ", err);
            return;
        }

        const comida = data;

        conn.query(sqlCard, function (err, data) {
            if (err) {
                console.log("Erro: ", err)
                return;
            }

            const CardComida = data;

            res.render('gerenciarProduto', { comida, CardComida })
        })
    })
})

app.get('/ADM/AdicionarProduto', (req, res) => {
    admLogado(req, res);
    res.render('adicionarProduto');
})

app.get('/ADM/EditarProduto/:id', (req, res) => {
    admLogado(req, res);
    const { id } = req.params;
    const sql = `SELECT * FROM Comida WHERE ComidaID = '${id}'`;

    conn.query(sql, function (err, data) {
        if (err) {
            console.log("Erro: ", err)
            return;
        }

        const CardEdit = data;
        res.render('editarProduto', { CardEdit });
    });
})

app.post('/ADM/GerenciarProduto/Adicionar', (req, res) => {
    const nomeProduto = req.body.NomeProduto;
    const descricao = req.body.Descricao;
    const valor = req.body.Valor;
    const tipo = req.body.Tipo;
    const urlProduto = req.body.URLProduto;
    const urlPais = req.body.URLPais;

    const sql = `INSERT INTO Comida (NomeComida, PrecoComida, DescricaoComida, Tipo, IMGComida, IMGPais) VALUES 
    ('${nomeProduto}','${valor}','${descricao}', '${tipo}', '${urlProduto}','${urlPais}');`;

    conn.query(sql, function (err) {
        if (err) {
            console.log("Erro: ", err)
            return false;
        }
        if (sql) {
            res.redirect('/ADM/GerenciarProduto');
        }
    })
})

app.post('/ADM/GerenciarProduto/Editar', (req, res) => {
    const { id, nomeProduto, descricao, valor, tipo, urlProduto, urlPais } = req.body;
    const sql = `UPDATE Comida SET NomeComida = '${nomeProduto}', PrecoComida = '${valor}', DescricaoComida = '${descricao}', Tipo = '${tipo}', IMGComida = '${urlProduto}', IMGPais = '${urlPais}' WHERE ComidaID = '${id}'`;

    conn.query(sql, function (err) {
        if (err) {
            console.log("Erro: ", err)
            return false;
        }
        if (sql) {
            console.log("Produto editado")
            res.redirect('/ADM/GerenciarProduto');
        }
    })
})

app.post('/ADM/GerenciarProduto/Excluir/:id', (req, res) => {
    const { id } = req.params;
    const sqlTable = `Delete FROM Pedido WHERE ComidaID = '${id}'`;
    const sql = `DELETE FROM Comida WHERE ComidaID = '${id}'`;

    conn.query(sqlTable, function (err) {
        if (err) {
            console.log("Erro: ", err);
            return;
        }
        conn.query(sql, function (err) {
            if (err) {
                console.log("Erro: ", err)
            }

            res.redirect('/ADM/GerenciarProduto');
        })
    })
})

//Rota de Cardápio do ADM
app.get('/ADM/GerenciarProduto/:tipo', (req, res) => {
    admLogado(req, res);
    const { tipo } = req.params;
    const sqlFiltro = `SELECT * FROM Comida WHERE Tipo = "${tipo}"`;

    conn.query(sqlFiltro, function (err, data) {
        if (err) {
            console.log("Erro: ", err);
            return;
        }

        const CardComida = data;
        res.render('filtroProduto', { CardComida });
    })
})


// ADM - Tabela de pedidos
app.get('/ADM/TabelaPedidos', (req, res) => {
    admLogado(req, res);
    const sql = `
        SELECT Pedido.*, Cliente.NomeCliente, Comida.NomeComida, Comida.PrecoComida
        FROM Pedido
        INNER JOIN Cliente ON Cliente.ClienteID = Pedido.ClienteID
        INNER JOIN Comida ON Comida.ComidaID = Pedido.ComidaID;
    `;

    conn.query(sql, function (err, data) {
        if (err) {
            console.log("Erro: ", err);
            return;
        }

        const infoPedidos = data;
        res.render('tabelaPedidos', { infoPedidos });
    });
});

// Button - SAIR
app.get('/Sair', (req, res) => {
    req.session.idDoUserLogado = 0;
    res.redirect('/');
    console.log("Usuário saiu")
});


// Conectando com o banco de dados mysql
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hamburgueria"
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Conectado com o banco de dados");
    app.listen(3000);
})