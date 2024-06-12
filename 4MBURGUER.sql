CREATE DATABASE HAMBURGUERIA;
USE HAMBURGUERIA;

CREATE TABLE Cliente (
	ClienteID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	NomeCliente VARCHAR(100) NOT NULL,
    EmailCliente VARCHAR (100) NOT NULL,
    SenhaCliente VARCHAR (50) NOT NULL,
    EnderecoCliente VARCHAR (130) NOT NULL	
);

CREATE TABLE Comida (
	ComidaID INT PRIMARY KEY AUTO_INCREMENT,
    NomeComida VARCHAR (100) NOT NULL,
    PrecoComida DECIMAL (4, 2) NOT NULL,
    DescricaoComida VARCHAR (1000) NOT NULL,
    Tipo ENUM("Hambúrguer","Porções","Bebidas"),
    IMGComida VARCHAR (250) NOT NULL,
    IMGPais VARCHAR (250) NOT NULL
);

CREATE TABLE Pedido (
	PedidoID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    ComidaID INT,
    ClienteID INT,
    FOREIGN KEY (ComidaID) REFERENCES Comida (ComidaID),
    FOREIGN KEY (ClienteID) REFERENCES Cliente (ClienteID)
);

-- Puxando Nome da Comida
SELECT Comida.NomeComida FROM Comida inner join Pedido on Comida.ComidaID = Pedido.ComidaID WHERE Comida.ComidaID = 1;

-- Puxando Preço da Comida
SELECT Comida.PrecoComida FROM Comida inner join Pedido on Comida.ComidaID = Pedido.ComidaID WHERE Comida.ComidaID = 1;

-- Puxando Nome do Cliente
SELECT Cliente.NomeCliente FROM Cliente inner join Pedido on Cliente.ClienteID = Pedido.ComidaID WHERE Cliente.ClienteID = 1;

SELECT * FROM Cliente;
SELECT * FROM Pedido;
SELECT * FROM Comida;