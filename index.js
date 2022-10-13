//modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

//modulos internos
const fs = require("fs");

console.log("...Iniciando Accounts...");

operation();

function operation() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "action",
                message: "O que você deseja fazer?",
                choices: [
                    "Criar conta",
                    "Consultar saldo",
                    "Depositar",
                    "Sacar",
                    "Sair",
                ],
            },
        ])
        .then((answer) => {
            const action = answer["action"];

            if (action === "Criar conta") {
                criarConta();
            }
        })
        .catch((err) => console.log(err));
}

//criar conta

function criarConta() {
    console.log(chalk.bgGreen.black("Obrigado por utilizar o Accounts!"));
    console.log(chalk.green("Defina as opções da sua conta a seguir:"));
}
