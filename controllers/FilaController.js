const minhaFila = new FilaCircular(5);

function addElementos(){
    const novoElemento = document.getElementById("txtnovoNome");
    if(!minhaFila.isFull()){
       minhaFila.enqueue(novoElemento.value);
       mostrarFila();
       novoElemento.value = ""; //limpar o input
       novoElemento.focus(); //cursor no input
    } 
    else
        alert("Fila cheia!");     
} // fim addElemento

function mostrarFila(){
    const listaFila = document.getElementById("listFila");
    listaFila.textContent = minhaFila.toString();
}

function atenderFila(){
    if(!minhaFila.isEmpty()){
        const atendido = minhaFila.dequeue();
        //alert("Pessoa Atendida: " +atendido)
        const mostrarAtendimento = document.getElementById("mensagem-remocao");
        mostrarAtendimento.textContent = "Pessoa Atendida: " + atendido;
        mostrarFila();
    }
    else 
        alert("Fila Vazia!");
}