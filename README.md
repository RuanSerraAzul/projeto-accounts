<h1 align="left">Projeto Accounts</h1>

<!--ts-->

-   [Sobre](#Sobre)
-   [Instalação](#instalacao)
-   [Como usar](#como-usar)

## Sobre

<p align="left">Este projeto é uma aplicação que usa Node.JS, e os módulos FS, Chalk e Inquirer, para realizar operações que simulam um banco, como criar conta, depósitar e sacar valores, além de ver o seu saldo. É um projeto que fiz para aprender melhor os conceitos de Node.JS. O armazenamento das informações são feitos em JSON com a ajuda do FS.</p>

## Instalacao

Requisitos:
-Node.js

Para começar a rodar o projeto basta baixar o repositorio usando:
**git clone https://github.com/RuanSerraAzul/projeto-accounts.git**

Feito isso basta navegar até o diretório do arquivo, abrir um terminal e executar o comando:
**npm install**
para instalar as depências.

Depois é só iniciar o projeto usando:
**npm start**

Pronto, uma tela com as opções do Accounts deve ser exibida.

# Como usar

Para todas as opções, basta selecionar e digitar o nome da conta e dar ENTER.

Não são permitidos saques ou depósitos negativos, caso sejam inseridos a aplicação retornará um erro.
