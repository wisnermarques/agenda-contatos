Feature: Gerenciar contatos

  Background:
    Given que estou na página de contatos

  Scenario: Cadastrar um novo contato com sucesso
    When eu crio um contato com nome "Maria Souza", telefone "(11) 98888-7777" e email "maria@email.com"
    Then eu devo ver "Maria Souza" na lista de contatos
    And devo ser redirecionado para "/contatos"
    And devo ver o alerta "Contato cadastrado com sucesso!"

  Scenario: Editar um contato existente
    Given que existe um contato "Maria Souza"
    When eu edito o contato "Maria Souza" para nome "Maria Silva", telefone "(11) 98888-7777" e email "maria.silva@email.com"
    Then eu devo ver o contato atualizado "Maria Silva" na lista

  Scenario: Excluir um contato
    Given que existe um contato "Maria Silva"
    When eu excluo o contato "Maria Silva"
    Then "Maria Silva" não deve aparecer na lista

  Scenario: Validação de formulário com mensagens específicas
    When tento salvar sem preencher os campos obrigatórios
    Then devo ver a mensagem "Nome é obrigatório" no campo nome
    And devo ver a mensagem "Email é obrigatório" no campo email
    And devo ver a mensagem "Telefone é obrigatório" no campo telefone