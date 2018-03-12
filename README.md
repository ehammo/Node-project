# Node-project

Este projeto serve para ilustrar melhores práticas usando node, bem como explicar em formato de tutorial como usar Node.js

# Começando a usar Node.js

O que é Node.js? Node.js (Eu só vou ficar chamando Node.js de Node bear with me ok?) Node é um framework de desenvolvimento Javascript para back-end. Ou seja uma paradinha que usamos pra desenvolver servidores de aplicações WEB. Node é eficiente, leve e é baseado em **EVENTOS**, além disso ele usa libuv, uma biblioteca com foco em I/O assícrono. Essas últimas duas informações são importantes, pois a programação em Node é em sua maioria assíncrona e caso você não esteja familiarizado com esse tipo de programação, você pode ter um pouco de dificuldade.

## Instalando Node

Baixe node a partir desse [link](https://nodejs.org/en/download/)

## Instalando o NPM e usando o NPM

O node utiliza um sistema de gerenciamento de pacotes javascript chamado NPM, ele pode ser encontrado nesse [link](https://npmjs.com)
Ou seja, para vocês que já estudaram Django, o node usa o NPM como o Django usa o PIP. No final das contas é um programa para você baixar bibliotecas legais para lhe ajudar a montar uma aplicação.

Agora como eu uso? 

Bem similar ao pip, você pode instalar bibliotecas com o comando ```npm install nome_da_biblioteca``` e pode instalar globalmente usando a opção -g após o comando install: ```npm install -g biblioteca_Global```, neste caso a biblioteca fica armazenada em seu computador e não em uma pasta do projeto. Bibliotecas globais podem ser usadas por qualquer projeto a qualquer momento.

Sempre lembrando de no seu .gitignore acrescentar a pasta node_modules, que contém todas as bibliotecas instaladas. Caso contrario seu projeto fica carregado de dados que poderiam ser re-adquiridos pela internet.

Mas como seus colegas de trabalho vão saber que você instalou uma nova dependência? A maneira mais simples é usar a opção --save do NPM. Que automaticamente salva a dependência no seu package json.

## Criando o Package.json

O package.json é um arquivo dentro do seu projeto node que vai conter as informações mais importantes sobre seu projeto como: quais as dependencias que seu projeto possui com aplicações de terceiros (Bibliotecas que você intalou com NPM por exemplo), scripts para facilitar a execução de comandos, versionamento, nome do autor, e mais!

Esses scripts que acabei de mencionar são cortesia do nosso gerenciador de pacotes o NPM. 

Para criar um template do package.json apenas digite npm init no terminal, na pasta do seu projeto. Aperte Enter sempre que terminar de preencher aquele item ou não souber como preenche-lo.

É boa pratica adicionar o script "START" no package.json. 

![package_image](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/packageJsonScripts.PNG)

Note que eu chamei meu 'main' de index.js, e é por este motivo que meu start é node index.js. Esses scripts só servem para facilitar a vida do desenvolvedor na hora de rodar as aplicações. Ao invés de digitar um comando enorme você pode encurta-lo com esses scripts. Alguns de vocês fazem isso em Django usando Gulp.

## Testando o NPM

Abra o terminal e rode a código: ```npm install express --save``` Agora abra o seu package json. Perceba que ele agora tem o nó de dependências que inclui o express.

## Criando o index.js

Vamos criar nosso Main. O index.js vai ser o seu arquivo principal, mas ele não deve ser um arquivo grande. Voce inicializa as coisas nele, apenas isso.

Por hora, enquanto eu não expliquei programação assíncrona vamos deixar apenas uma linha de codigo,

 ```console.log('hello from Node.js')``` dessa forma quando você rodar o servidor, ao invés dele ficar esperando por um pedido do cliente, ele vai apenas imprimir, hello from Node.js

## Rodando o servidor

Agora abra o terminal na pasta do projeto e rode ```npm start``` o console imprimirá algo do tipo:

![start_image](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/start.PNG)

## Lint

Nessa altura do campeonato você já ouviu falar em Lint não é? Vou refrescar sua memoria mesmo assim!

Lint: Ferramenta de desenvolvimento que analisa erros no seu código e/ou problemas com padrões de código de determinadas linguagens

Para javascript o ideal seria usar o ESLint. Para isso intale-o usando o npm com o seguinte comando ```npm install -g eslint```


# Entendendo programação assíncrona

Para entender programação assíncrona primeiro vamos dar uma olhada na síncrona. Normalmente quando programamos, a maioria das operações de I/O (entrada e saída) acontecem síncronamente. Porém se você tem varias operações desse tipo, que é o que acontece normalmente em um servidor, nós podemos ficar com uma fila dessa forma

![fila](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/queue.png)

As tarjas vermelhas representam seu servidor parado, sem poder fazer nada, esperando uma resposta externa de algum cliente em específico, as pretas são seu código rodando e as verdes são o restante do tempo.

Agora entrando em programação assíncrona. Em javascript existe um tipo de função chamado **função de alta ordem**. As funções de alta ordem, são aquelas que podem receber uma outra função como parametro. E assim **callbacks** nasceram. Nesses casos, as funções de alta ordem não precisam retornar nada, ao invés disso, elas chamam a função que receberam como parametro passando seu retorno como parametro dela. Ficou confuso? Imaginei! Deixa eu tentar exemplificar:

Digamos que eu tenha o seguinte código, codado usando conceitos de programação síncrona, em node:

```
const fs = require('fs')
let content
try {
  content = fs.readFileSync('file.md', 'utf-8')
} catch (ex) {
  console.log(ex)
}
console.log(content)
```

Perceba que a função readFileSync tem dois possíveis resultados: content, conteúdo do arquivo, ou ex, exceção I/O

Em node existe um tipo de função chamada ```error-first callbacks``` esses callbacks estão no coração desse framework. Eles recebem dois parametros, um erro e um sucesso

Então se eu passar um callback desse para a função de leitura de arquivo, quando a leitura for concluida ele vai chamar o callback mandando ou 'A exceção com sucesso sendo vazio' ou 'O sucesso da leitura do arquivo e o erro sendo igual a vazio'

Nosso código node ficaria assim:

```
const fs = require('fs')

console.log('start reading a file...')

//tente mudar file.md para README.md e você verá o arquivo ao invés do erro
fs.readFile('file.md', 'utf-8', function (erro, content) {
  if (erro) {
      console.log('erro: '+erro)
      return console.log('error happened during reading the file')
  }else{
    return console.log(content)
  }
})

console.log('end of the file')
```

Então, caso readFile retorne alguma exceção erro será diferente de nulo, o if sera verdadeiro e será impresso na tela o erro e a string 'error happened during reading the file'. Experimente colocar esse codigo no seu index.js e rodar com npm start.

![erro_leitura](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/erroLeitura.PNG)

Perceba que ele imprime _end of the file_ antes de imprimir o erro _no such file_ Isso acontece por que o callback foi chamado após o termino da leitura do arquivo.

## Loop de eventos

O loop de evento é responsável por operações síncronas.

Vamos só relembrar programação baseada em eventos:

```
programação baseada em eventos é um paradigma computacional em que o fluxo do programa é determinado por eventos como ações de usuario (pressionar teclas, clicar com o mouse), saidas de sensores, mensagens de outros programas, de outras threads, etc.
```

Do nosso ponto de vista, como desenvolvedores, node tem apenas uma thread. Toda a complexidade de multithreading é abstraida usando a **Magia do Node**.

## Fluxo de controle e promessas


# Seu primeiro servidor HTTP usando Node

# Banco de dados em Node

# Node.js request module

# Node.js project structure
