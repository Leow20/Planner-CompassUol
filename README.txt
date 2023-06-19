Planner 

O presente projeto é um gerenciador de tasks semanais, um aplicativo para
organizar tarefas de uma forma mais eficiente e inteligente.


#Instalação

Para a utilização do código é necessario seguir os passos de instalação

npm install firebase

npm install react-router-dom

npm install react-icon

npm install moment

npm install react-toastify

npm install axios



#Uso

Para iniciara o projeto deve-se usar o comando:

------------------------------------------------
npm run dev
------------------------------------------------

Ao iniciar o projeto uma aba será aberta no navegador.

A tela inicial do projeto é a página de login.

O usuario deve inserir um email e senha, caso esse email não estiver
cadastrado abrirá um modal pergunta se o usuario gostaria de criar uma conta.

Na página de registro o usuario deve preencher todos os campos seguindo algumas validações
tais como:

	- Ser maior de 18 anos.
	- Possuir um email com credencias válidas.
	- Uma senha forte que tenha: 6 caracteres, 1 letra maiuscula, 1 numero e 1 caracter especial.
	- Os campos senha e confirmar senha devem ser iguais.

Após o cadastro o usuario será redirecionado para a página de login novamente.

Caso o usaurio erre o Email ou Senha, será mostrado um erro, caso esteja certo
será direcionado para a dashboard.

Na dashboard o usuario irá encontrar todas as tarefas cadastradas.

Também no header encontra o horário local, e o clima da cidade preenchida no momento do cadastro.

Ao lado um link para o site official da compass UOL e um botão de logout, que tira todas as permissões
do usuario, não podendo mais acessar a dashboard.

Em baixo do Header o usuario pode cadastrar as tarefas, sendo obrigatório o preenchimento do conteudo da task
e seu horário, e opcional o dia da semana.

Caso não tenha um dia da semana selecionado será defindo o dia que estiver em evidência.

Existe uma função de deletar todas as taks do dia que o usuario está.

E um botão delete em cada tarefa, onde deleta apenas a tarefa desejada.

Caso o usuario cadastre tarefas no mesmo dia com horario repetido, elas entram em conflito
mudando sua cor para cinza e recebendo uma linha, que percorre as tarefas repetidas.


#Licença

O código é aberto e não possui uma licença para uso.

#Contato
Leonardowinter20@gmail.com



