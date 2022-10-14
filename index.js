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
                pegarValorConta();
            } else if (action === "Depositar") {
                deposito();
            } else if (action === "Sacar") {
                sacar();
            } else if (action === "Sair") {
                console.log(chalk.bgBlue.black("Obrigado por usar o accounts"));
                process.exit();
            }
        })
        .catch((err) => console.log(err));
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
            chalk.bgRed.black("Esta conta não existe, tente novamente!")
        );
        return false;
    }

    return true;
}

function pegarConta(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "utf8",
        flag: "r",
    });

    return JSON.parse(accountJSON);
}

function pegarValorConta() {
    inquirer
        .prompt([
            {
                name: "accountName",
                message: "Qual nome da sua conta? ",
            },
        ])
        .then((answer) => {
            const accountName = answer["accountName"];

            if (!checkAccount(accountName)) {
                return pegarValorConta();
            }

            const accountData = pegarConta(accountName);

            console.log(
                chalk.bgBlueBright.black(
                    `Seu saldo é de R$ ${accountData.balance}`
                )
            );

            operation();
        })
        .catch((err) => {
            console.log(err);
        });
}

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

function fazerDeposito(accountName, amount) {
    const accountData = pegarConta(accountName);

    if (amount <= 0 || !amount) {
        console.log(
            chalk.bgRed.black("Ocorreu um erro, tente digitar um valor válido")
        );
        process.exit();
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err);
        }
    );

    console.log(
        chalk.green(
            `Foi depósitado o valor de R$ ${amount} na conta ${accountName}`
        )
    );
}

function deposito() {
    inquirer
        .prompt([
            {
                name: "accountName",
                message: "Digite o nome da conta onde será feito o depósito:",
            },
        ])
        .then((answer) => {
            const accountName = answer["accountName"];

            if (!checkAccount(accountName)) {
                return deposito();
            }

            inquirer
                .prompt([
                    {
                        name: "amount",
                        message: "Digite o valor que você quer depositar:",
                    },
                ])
                .then((answer) => {
                    const amount = answer["amount"];

                    fazerDeposito(accountName, amount);

                    operation();
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => console.log(err));
}

function sacar() {
    inquirer
        .prompt([
            {
                name: "accountName",
                message: "Digite o nome da conta onde será feito o saque:",
            },
        ])
        .then((answer) => {
            const accountName = answer["accountName"];

            if (!checkAccount(accountName)) {
                return sacar();
            }

            inquirer
                .prompt([
                    {
                        name: "amount",
                        message: "Digite o valor que você quer sacar:",
                    },
                ])
                .then((answer) => {
                    const amount = answer["amount"];

                    fazerSaque(accountName, amount);

                    operation();
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => console.log(err));
}

function fazerSaque(accountName, amount) {
    const accountData = pegarConta(accountName);

    if (amount <= 0 || !amount) {
        console.log(
            chalk.bgRed.black("Ocorreu um erro, tente digitar um valor válido")
        );
        process.exit();
    }

    if (amount > accountData.balance) {
        console.log(
            chalk.bgRed.black(
                "Ocorreu um erro, você está tentando sacar um valor maior que o que você possui em sua conta."
            )
        );
        process.exit();
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err);
        }
    );

    console.log(
        chalk.green(
            `Foi sacado o valor de R$ ${amount} na conta ${accountName}`
        )
    );
}
