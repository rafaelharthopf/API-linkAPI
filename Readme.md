O objetivo desta API é acessar a mockApi e consolidar os dados dos usuários com seus respectivos endereços e contatos. Esta API foi dividida nas seguintes rotas:

1- '/users': esta rota retorna a listagem de usuários paginada com limite de 10 usuários por páginas e pode ser ordenada por campo em ordem crescente ou decrescente;

query.params desta rota: page, limit, sortyBy, order (asc ou desc).

2- 'users/:userId': esta rota retorna as informações de um usuário específico conforme seu userId.

3- 'users/:userId'/address': esta rota retorna todos os endereços de um usuário específico conforme seu userId.

4- 'users/:userId'/contacts': esta rota retorna todos os contatos de um usuário específico conforme seu userId.
