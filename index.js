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
                construirConta();
            } else if (action === "Consultar saldo") {
                console.log(action);
            } else if (action === "Depositar") {
                console.log(action);
            } else if (action === "Sacar") {
                console.log(action);
            } else if (action === "Sair") {
                console.log(chalk.bgBlue.black("Obrigado por usar o accounts"));
                process.exit();
            }
        })
        .catch((err) => console.log(err));
}

//criar conta

function criarConta() {
    console.log(chalk.bgGreen.black("Obrigado por utilizar o Accounts!"));
    console.log(chalk.green("Defina as opções da sua conta a seguir:"));
}

function construirConta() {
    inquirer
        .prompt([
            {
                name: "accountName",
                message: "Digite um nome para a sua conta:",
            },
        ])
        .then((answer) => {
            const accountName = answer["accountName"];

            console.info(accountName);

            if (!fs.existsSync("accounts")) {
                fs.mkdirSync("accounts");
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(
                    chalk.bgRed.black(
                        "Erro, conta já existe, escolha outro nome"
                    )
                );
                construirConta();
                return;
            }

            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance":0}',
                function (err) {
                    console.log(err);
                }
            );

            console.log(chalk.green("Conta criada com sucesso!"));
            operation();
        })

        .catch((err) => console.log(err));
}
