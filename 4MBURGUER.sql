CREATE DATABASE HAMBURGUERIA;
USE HAMBURGUERIA;

CREATE TABLE Cliente (
	ClienteID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	NomeCliente VARCHAR(100) NOT NULL,
    EmailCliente VARCHAR (100) NOT NULL,
    SenhaCliente VARCHAR (50) NOT NULL,
    EnderecoCliente VARCHAR (130) NOT NULL	
);

INSERT INTO Cliente (NomeCliente, EmailCliente, SenhaCliente, EnderecoCliente) VALUES 
("Administrador","adm@gmail.com","adm123","Rua Administrador, SP"),
("Rafael Carvalho","rafael.carvalho@gmail.com","123","Rua Teste, SP"),
("Pedro Félix","pedro.felix@gmail.com","123","Rua Teste, SP"),
("João Andrade","joao.andrade@gmail.com","123","Rua Teste, SP"),
("Vinicius Santos","vinicius.santos@gmail.com","123","Rua Teste, SP");

CREATE TABLE Comida (
	ComidaID INT PRIMARY KEY AUTO_INCREMENT,
    NomeComida VARCHAR (100) NOT NULL,
    PrecoComida DECIMAL (4, 2) NOT NULL,
    DescricaoComida VARCHAR (700) NOT NULL,
    Tipo ENUM("Hambúrguer","Porções","Bebidas"),
    IMGComida VARCHAR (250) NOT NULL,
    IMGPais VARCHAR (250) NOT NULL
);

INSERT INTO Comida (NomeComida, PrecoComida, DescricaoComida, Tipo, IMGComida, IMGPais) VALUES 
-- Hamburguers
("Brasil","31.99","O Hamburguer que te remete ao Brasil, um pouco do churrasco, molhos e temperos especiais","Hambúrguer","https://static.vecteezy.com/system/resources/previews/035/753/878/non_2x/very-delicious-burger-free-png.png","https://logodownload.org/wp-content/uploads/2022/05/brazil-flag-bandeira-1.png"),
("Itália","30.99","O Hamburguer que te remete a Itália, molhos e temperos especiais","Hambúrguer","https://static.vecteezy.com/system/resources/previews/035/753/872/non_2x/very-delicious-burger-free-png.png","https://logodownload.org/wp-content/uploads/2023/09/bandeira-italy-flag-4.png"),
("Japão","30.99","O Hamburguer que te remete ao Japão, molhos e temperos especiais","Hambúrguer","https://static.vecteezy.com/system/resources/previews/035/753/854/non_2x/very-delicious-burger-free-png.png","https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/2560px-Flag_of_Japan.svg.png"),
("Rússia","29.99","O Hamburguer que te remete a Rússia, molhos e temperos especiais","Hambúrguer","https://static.vecteezy.com/system/resources/previews/035/753/862/non_2x/very-delicious-burger-free-png.png","https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png"),
-- Porções
("Batata Pequena","7.99","A batata frita mais crocante e seca do mercado, tamanho Pequeno, serve aproximadamente 1 pessoas.","Porções","https://static.vecteezy.com/system/resources/previews/039/557/738/non_2x/ai-generated-isolated-french-fries-with-clear-background-free-png.png","https://logodownload.org/wp-content/uploads/2022/05/brazil-flag-bandeira-1.png"),
("Batata Média","10.99","A batata frita mais crocante e seca do mercado, tamanho Médio, serve aproximadamente 2 pessoas.","Porções","https://static.vecteezy.com/system/resources/previews/025/063/604/non_2x/french-fries-with-ai-generated-free-png.png","https://logodownload.org/wp-content/uploads/2022/05/brazil-flag-bandeira-1.png"),
("Batata Grande","14.99","A batata frita mais crocante e seca do mercado, tamanho Grande, serve aproximadamente 3 pessoas","Porções","https://static.vecteezy.com/system/resources/previews/025/065/286/non_2x/french-fries-with-ai-generated-free-png.png","https://logodownload.org/wp-content/uploads/2022/05/brazil-flag-bandeira-1.png"),
-- Bebidas 
("Coca-Cola","8.99","Coca-cola de lata","Bebidas","https://static.vecteezy.com/system/resources/previews/023/337/456/non_2x/ai-generative-coca-cola-can-transparent-free-png.png","https://logodownload.org/wp-content/uploads/2022/05/brazil-flag-bandeira-1.png");


CREATE TABLE Pedido (
	PedidoID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    ComidaID INT,
    ClienteID INT,
    FOREIGN KEY (ComidaID) REFERENCES Comida (ComidaID),
    FOREIGN KEY (ClienteID) REFERENCES Cliente (ClienteID)
);

INSERT INTO Pedido(ComidaID, ClienteID) VALUES 
("1","2"),
("2","3"),
("2","5"),
("3","4"),
("3","2"),
("4","5"),
("8","3"),
("5","5"),
("7","5");

-- Puxando Nome da Comida
-- SELECT Comida.NomeComida FROM Comida inner join Pedido on Comida.ComidaID = Pedido.ComidaID WHERE Comida.ComidaID = ID Desejado;

-- Puxando Preço da Comida
-- SELECT Comida.PrecoComida FROM Comida inner join Pedido on Comida.ComidaID = Pedido.ComidaID WHERE Comida.ComidaID = ID Desejado;

-- Puxando Nome do Cliente
-- SELECT Cliente.NomeCliente FROM Cliente inner join Pedido on Cliente.ClienteID = Pedido.ComidaID WHERE Cliente.ClienteID = ID Desejado;

SELECT * FROM Cliente;
SELECT * FROM Pedido;
SELECT * FROM Comida;