# CypherQuest Project

## Objetivo
Implementar um sistema de criptografia de dados sensiveis, utilizando a criptografia PBKDF2 e AES, salvando no banco de dados de forma segura.
## Rotas

### /auth

#### POST /auth/signin

Rota utilizada para autênticar usuários já cadastrados.

##### Corpo da Requisição
| Campo    | Tipo   | Descrição        |
| -------- | ------ | ---------------- |
| email    | String | email do usuário |
| password | String | Senha do usuário |

##### Respostas
- 200 OK: Retorna um token de acesso válido.
- 400 Bad Request: Se o email ou a senha estiverem ausentes no corpo da requisição.
- 401 Unauthorized: Se as credenciais do usuário forem inválidas.

#### POST /auth/signup

Rota utilizada para registrar novos usuários.

##### Corpo da Requisição
| Campo    | Tipo   | Descrição        |
| -------- | ------ | ---------------- |
| document | String | CPF do usuário   |
| email    | String | Email do usuário |
| password | String | Senha do usuário |

##### Respostas
- 201 Created: Retorna uma confirmação de que o usuário foi criado com sucesso.
- 400 Bad Request: Se o Email ou a senha estiverem ausentes no corpo da requisição.
- 409 Conflict: Se o email ou o CPF já estiver em uso.
