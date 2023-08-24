<h1 align="center">📅 Weekly Task Manager</h1>

<p align="center">
  Um aplicativo inteligente para organizar suas tarefas semanais de forma eficiente! ✨
</p>

## 🚀 Instalação

Siga os passos abaixo para configurar e instalar o projeto:

1. Clone este repositório:

   ```sh
   git clone https://github.com/seu-usuario/nome-do-repositorio.git

2. Dependências

   ```sh
   npm install firebase react-router-dom react-icons moment react-toastify axios
   
## 📌 Uso

1. **Iniciar o Projeto:** Para iniciar o projeto, utilize o seguinte comando no terminal:

   ```sh
   npm start

Após a execução do comando, uma nova aba será aberta no navegador.

2. **Página Inicial e Login:** Ao iniciar o projeto, a página inicial exibirá a tela de login. Insira seu email e senha.

Se o email não estiver cadastrado, um modal será exibido perguntando se você deseja criar uma conta.

3. **Registro de Usuário:**
 * Acesse a página de registro para criar uma conta.
 * Preencha todos os campos seguindo as seguintes validações:
 * Ter mais de 18 anos.
 * Ter um email válido.
 * Escolher uma senha forte (mínimo de 6 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial).
 * Confirmar a senha, que deve ser igual à senha escolhida.

4. **Redirecionamento Após Registro:** Após o cadastro, você será redirecionado novamente para a página de login.

5. **Login Bem-Sucedido:** Ao inserir o email e a senha corretos, você será direcionado para a dashboard.

6. **Dashboard:**

 * Na dashboard, você encontrará todas as tarefas cadastradas.
 * No cabeçalho, é exibido o horário local e o clima da cidade preenchida no momento do cadastro.
 
7. **Recursos no Cabeçalho:**

 * Um link para o site oficial da Compass UOL.
 * Um botão de logout, que encerrará sua sessão e revogará suas permissões, impedindo o acesso à dashboard.

8. **Cadastro de Tarefas:**

 * Logo abaixo do cabeçalho, você pode cadastrar novas tarefas.
 * É obrigatório preencher o conteúdo da tarefa e o horário.
 * O campo para selecionar o dia da semana é opcional.
 * Se nenhum dia da semana for selecionado, será considerado o dia em evidência.

9. **Gerenciamento de Tarefas:**

 * Uma função permite deletar todas as tarefas do dia atual.
 * Cada tarefa possui um botão de delete individual para removê-la.

10. **Conflitos de Tarefas:**

 * Se você cadastrar tarefas no mesmo dia com horários repetidos, elas serão destacadas em cinza e receberão uma linha indicativa.

## 📜 Licença

O código é aberto e não possui uma licença para uso.

## 📞 Contato
Para qualquer dúvida ou feedback, entre em contato pelo email: Leonardowinter20@gmail.com



