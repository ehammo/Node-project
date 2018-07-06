# Node-project

Este projeto serve para explicar em formato de tutorial como usar Node.js, bem como ilustrar as melhores práticas

## Observações

### Inglês-Português

Vale resaltar que as vezes eu misturo inglês com português, usando request ao invés de pedido, I/O ao invés de E/S (input output, entrada e saída), caso em algum caso tenha ficado estranho ou confuso, sinta-se a vontade para me criticar e exigir uma modificação!

### Front-end

Em Node existem diversas formas de fazer o front-end, isto é, varias formas de renderizar páginas HTML, usando CSS ou SASS. Eu constumava usar o [espress-handlebars](https://www.npmjs.com/package/express-handlebars), ou conectar o Node com outro framework para desenvolvimento front-end como o Angular, React, dentre outros. Nesse tutorial vamos focar como montar um webserver, sem front end.

## Começando a usar Node.js

O que é Node.js? Node é um framework de desenvolvimento Javascript para back-end. Ou seja, um conjunto de bibliotecas javascript que trabalham em conjunto, otimizando o modo de se trabalhar com javascript para desenvolver servidores de aplicações WEB. Node é eficiente, leve e é baseado em **EVENTOS**, além disso ele usa libuv, uma biblioteca com foco em I/O assíncrono. Essas últimas duas informações são importantes, pois a programação em Node é em sua maioria assíncrona e, caso você não esteja familiarizado com esse tipo de programação, você pode ter um pouco de dificuldade.
O node precisa de um arquivo dentro do seu projeto que contenha as informações mais importantes sobre seu projeto como: quais as dependências que seu projeto possui com aplicações de terceiros, scripts para facilitar a execução de comandos, versão do projeto, nome do autor, dentre outras. Esse arquivo é chamado de **package.json**.
Esses scripts que acabei de mencionar são cortesia do nosso gerenciador de pacotes o NPM.

### Instalando Node

Baixe node a partir desse [link](https://nodejs.org/en/download/). Para gerenciar a instalação do seu node, atualizando a versão, para utilizar múltiplas versões de node na sua maquina, você pode usar o nvm[https://github.com/creationix/nvm/blob/master/README.md].

### Instalando o NPM e usando o NPM

O node utiliza um sistema de gerenciamento de pacotes javascript chamado NPM, ele pode ser encontrado nesse [link](https://npmjs.com). Ou seja, para vocês que já estudaram Django, o node usa o NPM como o Django usa o PIP. No final das contas é um programa para você baixar bibliotecas legais para lhe ajudar a montar uma aplicação. Só sempre devemos ter cuidado para não encher nosso projeto com dependências.
Agora como eu uso?
Bem similar ao pip, você pode instalar bibliotecas com o comando ```npm install nome_da_biblioteca``` e pode instalar globalmente usando a opção -g após o comando install: ```npm install -g biblioteca_Global```, neste caso a biblioteca fica armazenada em seu computador e não em uma pasta do projeto. Bibliotecas globais podem ser usadas por qualquer projeto a qualquer momento.

Um bom exemplo de uma biblioteca que pode ser instalada globalmente é o **nodemon**, utilizada para reiniciar o servidor sempre que há mudança no código. Se ela for instalada globalmente ela pode funcionar no seu terminal fora dos scripts contidos no package.json falaremos dele logo adiante.

Outro lembrete importante é acrescentar a pasta node_modules no seu .gitignore, que contém todas as bibliotecas instaladas. Caso contrário seu projeto fica carregado de dados que poderiam ser re-adquiridos pela internet.
Mas como seus colegas de trabalho vão saber que você instalou uma nova dependência? A maneira mais simples é usar a opção - save do NPM. Que automaticamente salva a dependência no seu **package.json**.

### Criando o Package.json

Para criar um template do package.json apenas digite ```npm init``` no terminal, na pasta do seu projeto. Aperte Enter sempre que terminar de preencher aquele item ou não souber como preenche-lo.
É boa prática adicionar o script "START" no package.json.

![package_image](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/packageJsonScripts.PNG)

Note que eu chamei meu 'main' de index.js, e é por este motivo que meu start é node index.js. Esses scripts só servem para facilitar a vida do desenvolvedor na hora de rodar as aplicações. Ao invés de digitar um comando enorme você pode encurta-lo com esses scripts. Alguns de vocês fazem isso em Django usando Gulp.

Para executar esses scripts digite ```npm run [script]```, sendo a única exceção o script start que pode ser rodado sem o comando run: ```npm start``` 

## Testando o NPM

Abra o terminal e rode a código: ```npm install express --save``` Agora abra o seu package json. Perceba que ele agora tem o nó de dependências que inclui o express.

Isso como já explicado antes serve para auxiliar seu colega de trabalho para instalar as dependencias do app de maneira mais fácil. Rodando ```npm install``` o npm instalará todas as dependencias que o package.json contém.

### Criando o index.js

Vamos criar nosso Main. O index.js vai ser o seu arquivo principal, mas ele não deve ser um arquivo grande. Você deve apenas inicializar outros componentes nele, apenas isso.

Por hora, enquanto eu não expliquei programação assíncrona vamos deixar apenas uma linha de código,

 ```console.log('hello from Node.js')``` dessa forma quando você rodar o servidor, ao invés dele ficar esperando por um pedido do cliente, ele vai apenas imprimir, hello from Node.js

### Rodando o servidor

Agora abra o terminal na pasta do projeto e rode ```npm start``` o console imprimirá algo do tipo:

![start_image](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/start.PNG)

### Lint

Nessa altura do campeonato você já ouviu falar em Lint não é? Vou refrescar sua memória mesmo assim!

Lint: Ferramenta de desenvolvimento que analisa erros no seu código e/ou problemas com padrões de código de determinadas linguagens

Para javascript o ideal seria usar o ESLint. Para isso use o npm com o seguinte comando ```npm install -g eslint```

Em seguinda instale as dependencias

```javascript

npm install -g eslint-config-standard
npm install -g eslint-plugin-import
npm install -g eslint-plugin-node
npm install -g eslint-plugin-promise
npm install -g eslint-plugin-standard

```

Se voce instalar o ESLint localmente você não precisa seguir esses passos já que essas dependencias serão instaladas sozinhas, porém para todo projeto será necessário instalar o ESLint.

Após instalar o ESLint e suas dependencias é necessário informar ao seu editor de texto que você esta usando o eslint. [Um tutorial para varios editores](https://developer.ibm.com/node/2016/07/27/auto-fixing-formatting-your-javascript-with-eslint/)

Mas eu uso o VisualStudio Code. Para o Visual Studio Code basta instalar a extensão ESLint.

Depois de extensão instalada basta rodar ```eslint --init``` e responder as perguntas assim:

```r

? How would you like to configure ESLint? Use a popular style guide
? Which style guide do you want to follow? Standard
? What format do you want your config file to be in? JSON

```

Depois disso tudo já vai estar rodando.

## Entendendo programação assíncrona

Para entender programação assíncrona primeiro vamos dar uma olhada na síncrona. Normalmente quando programamos, a maioria das operações de I/O (entrada e saída) acontecem sincronamente. Porém se você tem várias operações desse tipo, que é o que acontece normalmente em um servidor, nós pudemos ficar com uma fila dessa forma

![fila](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/queue.png)

O objetivo de um servidor é receber vários request de múltiplos clientes, com o servidor bloqueado isso não é possível. As tarjas vermelhas representam seu servidor parado, sem poder fazer nada, esperando uma resposta externa de algum cliente em específico, as pretas são seu código rodando e as verdes são o restante do tempo.

Esse problema é parcialmente resolvido pela arquitetura do node de gerenciar seus eventos. Porém, nós desenvolvedores ainda temos que programar de forma assíncrona para o melhor desempenho do webserver.

Em javascript existe um tipo de função chamado função de alta ordem. As funções de alta ordem são aquelas que podem receber uma outra função como parâmetro. Essas funções receberiam callbacks, para serem executados depois. Nesses casos, as funções de alta ordem não precisam retornar nada, ao invés disso, elas chamam a função que receberam como parâmetro, o callback, passando seu retorno como parâmetro dela. Ficou confuso? Imaginei! Deixa eu tentar exemplificar:

Digamos que eu tenha o seguinte código, codado usando conceitos de programação síncrona, em node:

```javascript

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

Em node existe um tipo de função chamada ```error-first callbacks``` esses callbacks estão no coração desse framework. Eles recebem dois parâmetros, um erro e um sucesso

Então se eu passar um callback desse para a função de leitura de arquivo, quando a leitura for concluída ele vai chamar o callback. Só lembrando, o callback recebe um erro e um conteúdo, mas não necessariamente os dois precisam ser enviados, um deles pode ser nulo. Então, quando a leitura termina, o callback pode ser chamado mandando A exceção e o conteúdo sendo nulo ou o conteúdo da leitura do arquivo e o erro sendo nulo

Nosso código node ficaria assim:

```javascript

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

Então, caso readFile retorne alguma exceção erro será diferente de nulo, o if sera verdadeiro e será impresso na tela o erro e a string 'error happened during reading the file'. Experimente colocar esse código no seu index.js e rodar com npm start.

![erro_leitura](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/erroLeitura.PNG)

Perceba que ele imprime _end of the file_ antes de imprimir o erro _no such file_. Isso acontece por que o callback foi chamado após o termino do método read file, provando que a execução foi feita assincronamente.

## Loop de eventos

O loop de evento é responsável por operações síncronas.

Vamos só relembrar programação baseada em eventos:

```r

Programação baseada em eventos é um paradigma computacional em que o fluxo do programa é
determinado por eventos como ações de usuário (pressionar teclas, clicar com o mouse), saidas de
sensores, mensagens de outros programas, de outras threads, etc.

```

Basicamente ele é um loop infinito, que em cada iteração verifica se existem novos eventos em sua fila de eventos.
Quando um determinado código emite um evento, o mesmo é enviado para a fila de eventos para que o Event-loop execute-o, e em seguida retorne seu resultado em um callback

Você pode se aprofundar em como o loop de eventos funciona nesse link[https://nodejs.org/api/events.html], para desenvolver códigos com o objetivo de escutar por eventos e trabalhar sincronamente com node.

Node lida com requests de clientes como eventos, e como o EventLoop usa apenas uma única thread, isso significa que 
a arquitetura para pedidos e respostas é um pouco diferente do webserver convencional. 

Como node lida com isso, e quais as principais diferenças entre as arquiteturas pode ser melhor estudado nesse link[https://www.journaldev.com/7462/node-js-architecture-single-threaded-event-loop]


## Callback-hell e promises

Para os que já conhecem mais Javascript podem estar com medo do famoso Callback-hell. Callback-hell é o que acontece quando pessoas tentam montar a execução do código visualmente de cima para baixo, como fazem em c por exemplo, o que ocorre na linha 1 vai terminar antes da linha 2. Callback-hell é um problema mais visual, a questão é que fica difícil a leitura do código quando temos vários callbacks emparelhados.

Segue um exemplo de callback-hell


```javascript

function readFiles(file, file2, file3){
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      console.log(err.toString())
      return (err)
    }
    console.log(data)
    fs.readFile(file2, 'utf-8', (err2, data2) => {
      if (err2) {
        console.log(err2.toString())
        return (err2)
      }
      console.log(data2)
      fs.readFile(file3, 'utf-8', (err3, data3) => {
        if (err3) {
          console.log(err3.toString())
          return (err3)
        }
        console.log(data3)
      })
    })
  })
}

```

Um bom indicativo são as 4 últimas linhas de código: uma pirâmide de chaves e parênteses.

Agora um exemplo usando promises:

```javascript

const fs = require('fs')

function read (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        return reject (err)
      }
      resolve(data)
    })
  })
}

Promise.all([
    read('file.txt'),
    read('file2.txt'),
    read('file3.txt')
])
.then((data) => console.log(data))
.catch((err) => console.log(err))

```

Mesma funcionalidade com mais clareza, esse código é bem mais limpo e mais fácil de acompanhar.

Nestes códigos o objetivo é a leitura de vários arquivos. A função de leitura de um arquivo foi encapsulada em uma promise. Dessa forma posso executar múltiplas promises, uma seguida da outra e encapsular todas as respostas em um único objeto.

![promise1](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/promessa1.PNG)

Perceba também que nesse segundo código há um catch para pegar os erros. Isso significa que, da maneira que esse código foi feito, se houver um único erro a execução do código vai parar e o erro será impresso.

 Em promises o que define se o código deve ou não parar, se ele deve ou não lançar um exceção são os dois parâmetros: O resolve e o reject do exemplo.

Portanto caso eu desejasse que o programa continuasse mesmo após se deparar com um arquivo inexistente, eu poderia trocar o reject por um resolve.

Minha promise ficaria assim:

```javascript

function read (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        return resolve (err.toString())
      }
      resolve(data)
    })
  })
}

```

Dessa forma o erro seria encapsulado como uma resposta positiva, obtendo esse resultado:

![promise2](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/promessa2.PNG)

Se você ainda está confuso com a vantagem de promises recomendo a leitura dos seguinte links:

* [stackoverflow](https://stackoverflow.com/questions/22539815/arent-promises-just-callbacks)

* [tutorial de promises](https://developers.google.com/web/fundamentals/primers/promises)

## Seu primeiro servidor HTTP usando Node

Node possui modulos como http-module e https-module que servem para setar conexões HTTP, enviar e receber dados. E nessa parte do tutorial eu poderia ensinar a usar esses modulos, porém como temos algo melhor, com mais funcionalidades e mais fácil de aprender acho melhor focar nisso. Estou do falando do **ExpressJS**. Express pode ser chamado de modulo ou de framework, já que possui submodulos, api, metodologia, convenções assim como um framework. No final das contas express é uma biblioteca que amarra todos os componentes necessários para criar um webserver funcional, moderno, com todas as conveniencias necessárias para isso tais como: Hospedagem de arquivos estaticos, POST parsing, cookie parsing, CORS (Cross-origin resource sharing), muito mais funcionalidades do que veremos aqui. Para quem tem curiosidade e quer estudar mais afundo, esteja a vontade nesse [link](http://expressjs.com)

Para instala-lo rode ```npm install express --save```

Tendo instalado o express podemos começar a montar nosso servidor!

```javascript

var express = require('express'); //importa o express
var app = express(); //cria um router
var port = 3000 //define a porta

/*
define que se o cliente der um get no servidor,
respondemos com a string 'Hello from Express!'
*/
app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

/*
define a porta que o servidor deve escutar
*/
app.listen(port, ()=>{
  console.log(`Server running on port: ${port}`)
})

```

Rodando o servidor agora com ```npm start```

Se acessarmos o nosso [servidor](localhost:3000/) podemos ver a string 'Hello from Express'

### Entendendo REST

Dentro do mundo de backend, webserver são programados usando varios tipos de arquiteturas, linguagens e protocolos. Apesar de para esse tutorial, e pro CITi, o foco seja arquitetura REST outra muito famosa é a SOAP. Nesse link detalha o uso dos dois: [link](https://stackify.com/soap-vs-rest/)

Tendo isso em vista, a principal regra de arquiteturas REST é que as aplicações web devem usar o protocolo HTTP como ele foi envisionado. Ou seja, GETs devem apenas adquirir informações, PUTs devem modifica-las, POSTs devem cria-las, DELETEs devem deleta-las. E para os hipsters que usam PATCH, PATCH é tipo um PUT, mas se usa PATCH quando você sabe que foi modificado apenas parte do objeto, portanto você cliente, você front-end, envia apenas o que foi modificado. Enquanto PUT se usa quando você não sabe o que o cliente modificou ou quando o cliente modificou tudo, enviando o objeto inteiro. Mas no fim se você usar PUT para toda modificação não tem bronca.

Agora vamos tentar modificar a string que devolvemos nesse GET. Se é modificação então o verbo é PUT

```javascript

var string = 'Hello from Express!';
app.get('/', (request, response) => {
  response.send(string)
})

app.put('/', (request, response) => {
  if(request.body != null){
    string = request.body.string;
  }
  response.send(string)
})

```

Ficando com o codigo assim, podemos testar usando o [postman](https://www.getpostman.com).

Depois do teste talvez você tenha percebido que a string não esta mudando. Isso se deve ao fato que o request.body está vindo Nulo, não modificando a variável.

Isso se deve ao fato que antes de chegar no roteador o request deve ser tratado, devemos informar que tipos de requests aceitamos. Para descobrir como fazer isso temos que explorar um pouco mais o express.

### Os middlewares do express

Vamos então para a parte complicada de Express. Express usa o conceitos de middleware para lidar com os pedidos e respostas de seu servidor.

![middlewares](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/middlewares.PNG)

No exemplo anterior não usamos middleware algum, indo direto para o roteamento. Com app.use podemos definir os middlewares, e ele recebe até 3 parametros: um request, um response e um callback. Na maior parte dos exemplos que irei mostrar aqui usaremos o app.use passando apenas o callback, ou seja apenas uma função.

Os middlewares servem para pre-processar informações antes delas chegarem nas rotas. Um bom exemplo disso é o submodulo de express chamado [body-parser](https://github.com/expressjs/body-parser).

O body-parser é um middleware que lê as informações enviadas no request e verifica se elas seguem um determinado padrão. Você pode usar esse middleware mais de uma vez caso deseje que seu webserver possa receber mais de um padrão. Era o middleware que estavamos precisando para nosso PUT começar a funcionar!

Acrescentando essa linha no nosso servidor, limitamos o recebimento de requests que sigam o padrão json.
```app.use(bodyParser.json()); // parse application/json```

No postman:

![put](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/put.PNG)

Podemos perceber que usando o metodo escolhido, json, podemos agora modificar o texto do servidor.

Uma coisa importante de levantar é que os middlewares são alocados na ordem que os ```app.use``` estão sendo colocados. Se por exemplo a estrutura do codigo for:

```javascript

var string = 'Hello from Express!';
app.get('/', (request, response) => {
  response.send(string)
})

app.put('/', (request, response) => {
  if(request.body != null){
    string = request.body.string;
  }
  response.send(string)
})
app.use(bodyParser.json()); // parse application/json

```

Voltariamos a estaca zero, já que nosso servidor processaria o put antes de processar o json.

### Erros

Em toda plataforma de desenvolvimento lidar com erros é essencial. Quando trabalhamos com ExpressJS temos um meio diferente de capturar erros. Um middleware com 4 parametros. Fica algo mais ou menos assim:

```javascript

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send('Erro!');
})

var string = 'Hello from Express!';
app.get('/', (request, response) => {
//  response.send(string);
  throw new Error('oops');
 });

```

O middleware/função que captura o erro deve ser o **último** a ser adicionado com app.use, pois caso contrário os erros lançados em roteamento não chegaram a ser tratados e no final o cliente pode acabar vendo o stacktrace do erro, o que não é ideal.

Outra coisa a se mencionar é o uso de **status**. Eu não cheguei a mencionar antes mas em HTML existe centenas de padrões sobre esses status como por exemplo: 200 significa que ocorreu tudo bem, 404 não foi encontrado e 500 erro interno no servidor. Uma lista desses status se encontra dentro da pasta assets deste projeto.

Quanto os 4 parametros da função, o *err* e o *next* são os mais interessantes para destacar. Em err temos o erro que foi levantado e em next um callback que pode ser usado caso se deseje encadear multiplos erros.

Por exemplo

```javascript

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

```

Nesse exemplo, logErrors só escreve o log do erro, clientError verifica se é um erro do cliente, caso seja trata de um modo, caso contrario passa adiante, e então, trata-se como um erro inexperado.

## Banco de dados em Node

Finalmente, chegamos em banco de dados. Vocês já devem ter escutado que existem dois tipo principais de banco de dados: SQL e NoSQL.

### SQL

Vamos começar com SQL. SQL é uma linguagem usada para lidar com bancos de dados relacionais. Dependendo do produto que você está usando esses bancos podem mudar um pouco (de Postgres pra mysql por exemplo), porém eles contém os mesmos fundamentos.

A informação é armazenada em tabelas, e cada objeto inserido é representado como uma linha na tabela como uma planilha do Excel.

Dentro de um banco de dados SQL você define esquemas, isto é um esqueleto para a informação que você vai colocar. A montagem desse esquema é chamada de **modelagem de dados**. Nele você define o tipo de cada coluna, os relacionamentos entre as tabelas, dentre outras coisas.

#### Vantagens de SQL

* SQL permite você a fazer queries complexas, relatórios complexos, em questão de segundos.
SQL mantém os principios ACID, ou seja, Atomicidade, Consistencia, Isolamento e Durabilidade.

* Atomicidade: Na transação ou se faz tudo ou nada. Numa transação podemos ter mais de uma operação, por exemplo um venda: podemos criar um cliente novo, gerar uma nota fiscal e ter uma baixa no estoque, ao final desta transação, devemos confirmar a transação por inteiro e gravar todas estas operações, se esta transação não se confirmar ao final, nenhuma destas operações pode ser gravada no banco de dados, garantindo assim a atomicidade da transação

* Consistencia: Tem por objetivo garantir que o banco de dados antes da transação esteja consistente e, que após a transação o banco permaneça consistente, sem problemas de integridade. Neste ponto, podemos contribuir com o trabalho do banco de dados, criando mecanismos que evitem problemas de integridade como **triggers**

* Isolamento: Objetiva garantir que nenhuma transação seja interferida por outra até que ela seja completada. Ou seja se eu tento inserir 2 cliente simultaneamente insere-se um primeiro e o outro depois. No entanto existem transações que podem ocorrer de forma simultânea sob os mesmos dados, como por exemplo consultas.

* Durabilidade: Como o nome já pode nos remeter, esta propriedade garante que a informação gravada no banco de dados dure de forma imutável até que alguma outra transação de atualização, ou exclusão afete-a. Em termos mais populares, podemos dizer que este conceito garante que os dados não sejam corrompidos, ou seja, desapareçam ou se modifiquem sem motivo aparente.

E esse principio, ACID, garante estabilidade, segurança e previsibilidade em todo o banco de dados e para cada transação. Esta previsibilidade, da uma facilidade de uso para o SQL, já que hoje, com pouco ou sem nenhum conhecimento da linguagem você ainda assim consegue trabalhar com ela usando ferramentas especiais, em Node isso nao é diferente já que podemos usar middlewares como **Sequelize** para nos auxiliar no quesito de bancos SQL.

#### Desvantagens de SQL

* Escalabilidade. Já que SQL tem tantas regras e segurança ele demora mais para processar informação. E existem sistemas que não precisam de tanta segurança quando falamos do ACD de ACID.

### NoSQL

Os bancos de dados NoSQL ficaram bastante populares de 2010 para ca. Com NoSQL você não precisa definir um esquema e pode organizar seus dados em um json arbitrario. Isso é vantajoso em JavaScript já que podemos transformar qualquer objeto em JSON facilmente. Porém, tenha cuidado, você não consegue garantir consistencia em um banco NoSQL por conta da falta de um esquema. Você nunca sabe ao certo o que esta no banco de dados.

#### Vantagens de NoSQL

* A rapidez interativa. Por esse motivo NoSQL é utilizado quando se trabalha com sistemas em tempo real que necessitem fazer muitas transações rapidamente.
* A eficiencia da escalabilidade. NoSQL é extremamente escalável, pode aumentar 100 vezes de tamanho e manter a mesma velocidade de trabalho.

NoSQL não segue o ACID, motivo pelo qual ele é tão escalável. Ele por sua vez segue o principio BASE

* Basicamente disponivel: Funciona quase o tempo todo, não trava para executar transações uma de cada vez.

* Estado leve: Não tem que ser consistente o tempo todo, devido a falta de um esquema.

* Eventualmente consistente: porém o sistema é consistente no momento certo.

#### Desvantagens de NoSQL

* Como NoSQL abrem mão do ACD de ACID, para serem mais escaláveis eles não conseguem fazer queries complexas, a informação é menos segura e isso pode trazer problemas. Nem toda aplicação precisa de tanta segurança, mas se você escolher NoSQL para sua aplicação garanta que ela não precisa.
* Replicação de dados. Por conta de sua estruturação para manter a velocidade de interação se replica muitos dados em NoSQL

### Observação

Importante mencionar que ao avaliar as vantagens e limitações de bancos de dados, é importante lembrar que nem todos os produtos, estão sujeitos aos problemas ou oferecem as vantagens da mesma forma. Isto é, existem sistemas NoSQL mais escaláveis que outros por exemplo.

## We deploy / Heroku

[wedeploylink](http://server-citiproject.wedeploy.io)

## Node.js request module

## Node.js project structure
