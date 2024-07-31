let libros = [
    { titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', paginas: 300 },
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', paginas: 400 },
    { titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', paginas: 350 }
];

    const segundoLibro = libros[1]
        
    libros[0].paginas = 350;    
    const primerLibro = libros[0]

    console.log(`titulo: ${segundoLibro.titulo}, ${segundoLibro.autor}`)
    console.log(`titulo: ${primerLibro.titulo}, ${primerLibro.autor}, Páginas ${primerLibro.paginas} `)
 
    const librosTituloAutor = libros.map(libro =>{
        return{
            titulo: libro.titulo,
            autor: libro.autor,
        };  
    })
    console.log(librosTituloAutor);
