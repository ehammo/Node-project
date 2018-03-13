const fs = require('fs')

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

Promise.all([
    read('file.txt'),
    read('file2.txt'),
    read('file3.txt'),
    read('arquivoInexistente.txt')    
])
.then((data) => console.log(data))
.catch((err) => console.log(err))