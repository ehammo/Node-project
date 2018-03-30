# Node-project

Este projeto serve para ilustrar melhores práticas usando node, bem como explicar em formato de tutorial como usar Node.js

## Observações

Vale resaltar que as vezes eu misturo inglês com português, usando request ao invés de pedido, I/O ao invés de E/S (input output, entrada e saída), caso em algum caso tenha ficado estranho, confuso sinta-se a vontade para me criticar e pedir para eu arrumar!

# Começando a usar Node.js

O que é Node.js? Node.js (Eu só vou ficar chamando Node.js de Node bear with me ok?) Node é um framework de desenvolvimento Javascript para back-end. Ou seja uma paradinha que usamos para desenvolver servidores de aplicações WEB. Node é eficiente, leve e é baseado em **EVENTOS**, além disso ele usa libuv, uma biblioteca com foco em I/O assíncrono. Essas últimas duas informações são importantes, pois a programação em Node é em sua maioria assíncrona e caso você não esteja familiarizado com esse tipo de programação, você pode ter um pouco de dificuldade.

## Instalando Node

Baixe node a partir desse [link](https://nodejs.org/en/download/)

## Instalando o NPM e usando o NPM

O node utiliza um sistema de gerenciamento de pacotes javascript chamado NPM, ele pode ser encontrado nesse [link](https://npmjs.com)
Ou seja, para vocês que já estudaram Django, o node usa o NPM como o Django usa o PIP. No final das contas é um programa para você baixar bibliotecas legais para lhe ajudar a montar uma aplicação.

Agora como eu uso? 

Bem similar ao pip, você pode instalar bibliotecas com o comando ```npm install nome_da_biblioteca``` e pode instalar globalmente usando a opção -g após o comando install: ```npm install -g biblioteca_Global```, neste caso a biblioteca fica armazenada em seu computador e não em uma pasta do projeto. Bibliotecas globais podem ser usadas por qualquer projeto a qualquer momento.

Sempre lembrando de acrescentar a pasta node_modules no seu .gitignore, que contém todas as bibliotecas instaladas. Caso contrário seu projeto fica carregado de dados que poderiam ser re-adquiridos pela internet.

Mas como seus colegas de trabalho vão saber que você instalou uma nova dependência? A maneira mais simples é usar a opção --save do NPM. Que automaticamente salva a dependência no seu package json.

## Criando o Package.json

O package.json é um arquivo dentro do seu projeto node que vai conter as informações mais importantes sobre seu projeto como: quais as dependências que seu projeto possui com aplicações de terceiros (Bibliotecas que você instalou com NPM por exemplo), scripts para facilitar a execução de comandos, versionamento, nome do autor, e mais!

Esses scripts que acabei de mencionar são cortesia do nosso gerenciador de pacotes o NPM. 

Para criar um template do package.json apenas digite npm init no terminal, na pasta do seu projeto. Aperte Enter sempre que terminar de preencher aquele item ou não souber como preenche-lo.

É boa prática adicionar o script "START" no package.json. 

![package_image](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/packageJsonScripts.PNG)

Note que eu chamei meu 'main' de index.js, e é por este motivo que meu start é node index.js. Esses scripts só servem para facilitar a vida do desenvolvedor na hora de rodar as aplicações. Ao invés de digitar um comando enorme você pode encurta-lo com esses scripts. Alguns de vocês fazem isso em Django usando Gulp.

Para executar esses scripts digite ```npm run [script]```

## Testando o NPM

Abra o terminal e rode a código: ```npm install express --save``` Agora abra o seu package json. Perceba que ele agora tem o nó de dependências que inclui o express.

Isso como já explicado antes serve para auxiliar seu colega de trabalho para instalar as dependencias do app de maneira mais fácil. Rodando ````npm install``` o npm instalará todas as dependencias que o package.json contém.

## Criando o index.js

Vamos criar nosso Main. O index.js vai ser o seu arquivo principal, mas ele não deve ser um arquivo grande. Você deve apenas inicializar outros componentes nele, apenas isso.

Por hora, enquanto eu não expliquei programação assíncrona vamos deixar apenas uma linha de código,

 ```console.log('hello from Node.js')``` dessa forma quando você rodar o servidor, ao invés dele ficar esperando por um pedido do cliente, ele vai apenas imprimir, hello from Node.js

## Rodando o servidor

Agora abra o terminal na pasta do projeto e rode ```npm start``` o console imprimirá algo do tipo:

![start_image](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/start.PNG)

## Lint

Nessa altura do campeonato você já ouviu falar em Lint não é? Vou refrescar sua memória mesmo assim!

Lint: Ferramenta de desenvolvimento que analisa erros no seu código e/ou problemas com padrões de código de determinadas linguagens

Para javascript o ideal seria usar o ESLint. Para isso instale-o usando o npm com o seguinte comando ```npm install -g eslint```


# Entendendo programação assíncrona

Para entender programação assíncrona primeiro vamos dar uma olhada na síncrona. Normalmente quando programamos, a maioria das operações de I/O (entrada e saída) acontecem sincronamente. Porém se você tem várias operações desse tipo, que é o que acontece normalmente em um servidor, nós pudemos ficar com uma fila dessa forma

![fila](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/queue.png)

As tarjas vermelhas representam seu servidor parado, sem poder fazer nada, esperando uma resposta externa de algum cliente em específico, as pretas são seu código rodando e as verdes são o restante do tempo.

Agora entrando em programação assíncrona. Em javascript existe um tipo de função chamado **função de alta ordem**. As funções de alta ordem, são aquelas que podem receber uma outra função como parâmetro. E assim **callbacks** nasceram. Nesses casos, as funções de alta ordem não precisam retornar nada, ao invés disso, elas chamam a função que receberam como parâmetro passando seu retorno como parâmetro dela. Ficou confuso? Imaginei! Deixa eu tentar exemplificar:

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

Em node existe um tipo de função chamada ```error-first callbacks``` esses callbacks estão no coração desse framework. Eles recebem dois parâmetros, um erro e um sucesso

Então se eu passar um callback desse para a função de leitura de arquivo, quando a leitura for concluída ele vai chamar o callback. Só lembrando, o callback recebe um erro e um conteúdo, mas não necessariamente os dois precisam ser enviados, um deles pode ser nulo. Então, quando a leitura termina, o callback pode ser chamado mandando A exceção e o conteúdo sendo nulo ou o conteúdo da leitura do arquivo e o erro sendo nulo

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

Então, caso readFile retorne alguma exceção erro será diferente de nulo, o if sera verdadeiro e será impresso na tela o erro e a string 'error happened during reading the file'. Experimente colocar esse código no seu index.js e rodar com npm start.

![erro_leitura](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/erroLeitura.PNG)

Perceba que ele imprime _end of the file_ antes de imprimir o erro _no such file_ Isso acontece por que o callback foi chamado após o termino da leitura do arquivo.

## Loop de eventos

O loop de evento é responsável por operações síncronas.

Vamos só relembrar programação baseada em eventos:

```
Programação baseada em eventos é um paradigma computacional em que o fluxo do programa é
determinado por eventos como ações de usuário (pressionar teclas, clicar com o mouse), saidas de
sensores, mensagens de outros programas, de outras threads, etc.
```

Do nosso ponto de vista, como desenvolvedores, node tem apenas uma thread. Toda a complexidade de multithreading é abstraída usando a **Magia do Node**.

## Fluxo de controle e promessas

Para os que já conhecem mais Javascript podem estar com medo do famoso Callback-hell. Callback-hell é o que acontece quando as pessoass que programavam em C, ruby ou python começam a codar em javascript pela primeira vez. Essas pessoas normalmente cometem esse erro, de tentar montar a execução do código visualmente de cima para baixo, já que nas outras linguagens citadas o que ocorre na linha 1 vai terminar antes da linha 2. Para resolver esse problema podemos usar promessas (Ainda tem como fazer besteira mesmo usando promessas então cuidado)


Segue um exemplo de callback-hell


```
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

Agora um exemplo usando promessas:

```
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

Nestes códigos o objetivo é a leitura de vários arquivos. A função de leitura de um arquivo foi encapsulada em uma promessa. Dessa forma posso executar múltiplas promessas, uma seguida da outra e encapsular todas as respostas em um único objeto.

![promessa1](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/promessa1.PNG)

Perceba também que nesse segundo código a um catch para pegar os erros. Isso significa que, da maneira que esse código foi feito, se houver um único erro a execução do código vai parar e o erro será impresso.

 Em promessas o que define se o código deve ou não parar, se ele deve ou não lançar um exceção são os dois parâmetros: O resolve e o reject do exemplo.

Portanto caso eu desejasse que o programa continuasse mesmo após se deparar com um arquivo inexistente, eu poderia trocar o reject por um resolve.

Minha promessa ficaria assim:

```
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

![promessa2](https://github.com/CITi-UFPE/Node-project/blob/master/assets/images/promessa2.PNG)

# Seu primeiro servidor HTTP usando Node

Node possui modulos como http-module e https-module que servem para setar conexões HTTP, enviar e receber dados. E nessa parte do tutorial eu poderia ensinar a usar esses modulos, porém como temos algo melhor, com mais funcionalidades e mais fácil de aprender acho melhor focar nisso. Estou do falando do **ExpressJS**. Express pode ser chamado de modulo ou de framework, já que possui submodulos, api, metodologia, convenções assim como um framework. No final das contas express é uma biblioteca que amarra todos os componentes necessários para criar um webserver funcional, moderno, com todas as conveniencias necessárias para isso tais como: Hospedagem de arquivos estaticos, POST parsing, cookie parsing, CORS, muito mais funcionalidades do que veremos aqui. Para quem tem curiosidade e quer estudar mais afundo, esteja a vontade nesse [link](http://expressjs.com)

Se você pulou passos desse tutorial talvez não tenha o express instalado ainda. Para instala-lo rode ```npm install express --save``` 

Tendo instalado o express podemos começar a montar nosso servidor!

```
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

Dentro do mundo de backend, webserver são programados usando varios tipos de arquiteturas, linguagens e protocolos. Apesar de para esse tutorial, e pro CITi, o foco seja arquitetura REST outra muito famosa é a SOAP. Nesse link detalha o uso dos dois: [link](https://stackify.com/soap-vs-rest/)

Tendo isso em vista, a principal regra de arquiteturas REST é que as aplicações web devem usar o protocolo HTTP como ele foi envisionado. Ou seja, GETs devem apenas adquirir informações, PUTs devem modifica-las, POSTs devem cria-las, DELETEs devem deleta-las. E para os hipsters que usam PATCH, PATCH é tipo um PUT, mas se usa PATCH quando você sabe que foi modificado apenas parte do objeto enquanto PUT se usa quando você não sabe o que o cliente modificou ou quando o cliente modificou tudo. Mas no fim se você usar PUT para toda modificação não tem bronca.

Agora vamos tentar modificar a string que devolvemos nesse GET. Se é modificação então o verbo é PUT

```
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

Depois do teste talvez você tenha percebido que a string não esta mudando. Isso se deve ao fato que o request.body está vindo Nulo, não modificando a variavel.

Isso se deve ao fato que antes de chegar no roteador o request deve ser tratado, devemos informar que tipos de requests aceitamos. Para descobrir como fazer isso temos que explorar um pouco mais o express.

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




# Banco de dados em Node

# Node.js request module

# Node.js project structure
