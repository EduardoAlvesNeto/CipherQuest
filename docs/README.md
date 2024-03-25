<div align="center">
    <img src="./Banner.svg"></img>
<br>
<br>

![LastCommit](https://img.shields.io/github/last-commit/EduardoAlvesNeto/CipherQuest?logo=Hello&logoColor=%23282828&style=for-the-badge)

</div>


<br>
<div align="center">
    <h1>CipherQuest</h1>
</div>


## Índice 📚

- [Índice 📚](#índice-)
- [Descrição 📝](#descrição-)
- [Pré-requisitos ✅](#pré-requisitos-)
- [Instalação 🔧](#instalação-)
- [Explicação 🎯](#explicação-)
- [Licença 📜](#licença-)

## Descrição 📝

CipherQuest é uma aplicação que tem a função de criptografar os números de cartão de credito usando a criptografia AES e guarda-los no banco de dados de forma segura!

## Pré-requisitos ✅

Para rodar este projeto, você precisa ter instalado:

- Node.js
- PNPM ou NPM

## Instalação 🔧

Para instalar as dependências do projeto, siga os passos abaixo:

1. Clone este repositório em sua máquina local.
2. No terminal, navegue até a pasta `api` e execute os seguintes comandos:
    ```
    pnpm install
    pnpm prisma migrate dev
    pnpm dev
    ```
3. Renomeie o arquivo `.env.example` para `.env`.
4. No terminal, navegue até a pasta `web` e execute:
    ```
    pnpm install
    pnpm dev
    ```

## Explicação 🎯
Após o usuário cadastrar um cartão, a API joga o número do cartão para um módulo responsável por proteger esses dados. Nesse caso, é utilizado o módulo nativo do Node chamado `crypto` para realizar a criptografia.

Para garantir a segurança da criptografia, a API gera um ID para o cartão utilizando a função `crypto.randomUUID()`. Logo depois usa os primeiros 16 dígitos desse ID junto de uma chave privada de 256 bits que está no arquivo `.env` para criptografar o número, dessa forma, a cada novo cartão cadastrado, é gerada uma chave única para criptografar seus dados.

Então um número como esse: `5454 5454 5454 5454`.

Se transforma nisso: `829b8ae6d756b171e8931e0804fe3c84ea4dd308258b341c13b79de62335d6f6`.

## Licença 📜

Este projeto está licenciado sob a licença [MIT](https://opensource.org/license/MIT/). Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.
