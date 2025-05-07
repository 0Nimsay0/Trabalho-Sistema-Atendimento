const minhaFila = new FilaCircular(5);

//função
function addElementos(){
    const novoElemento = document.getElementById("txtnovoNome");
    const novoCpf = document.getElementById("txtnovoCpf");
    if(!minhaFila.isFull()){
        const novoAtendimento = new Atendimento(novoElemento.value, novoCpf.value);
       minhaFila.enqueue(novoAtendimento);
       mostrarFila();
       novoElemento.value = "";
       novoCpf.value = ""; //limpar o input
       novoElemento.focus(); //cursor no input
    } 
    else
        alert("Fila cheia!");     
} // fim addElemento

//função para mostrar a fila
function mostrarFila(){
    const listaFila = document.getElementById("listFila");
    listaFila.textContent = minhaFila.toString();
    listaFila.innerHTML = ""; // limpa a lis
    for(let item of minhaFila){
       const listaElemento = document.createElement("li");
       listaElemento.textContent = item;
       listaFila.appendChild(listaElemento);
    }
}

//Função para atender pessoa da fila
function atenderFila(){
    if(!minhaFila.isEmpty()){
        const atendido = minhaFila.dequeue();
        const horario = obterHoraAtual();
        const diferença = calcularDiferencaHoras(atendido.hora, horario);
        //alert("Pessoa Atendida: " +atendido)
        const mostrarAtendimento = document.getElementById("mensagem-remocao");
        mostrarAtendimento.textContent = "Pessoa Atendida: " + atendido.nome + " | Tempo de Espera: "+diferença;
        mostrarFila();
        localStorage.setItem('ultimoAtendido', atendido.nome);
    }
    else {
        alert("Fila Vazia!");
        localStorage.setItem('ultimoAtendido', "Aguardando...");}
}


//Função para buscar
function buscar() {
    const CPF = document.getElementById("txtnovoCpf").value;
    let cont = 0;
    for (let itemFila of minhaFila) {
        cont++;
       if (itemFila.cpf === CPF) {
        const mostrarAtendimento = document.getElementById("mensagem-remocao");
          mostrarAtendimento.textContent =  "Pessoa encontrada: " + itemFila.nome + " || Hora de chegada: " + itemFila.hora + " || Posição na Fila: " +cont;
          return itemFila;
       }
    } }

// Função para obter a data atual formatada
function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
}

// Função para obter a hora atual formatada
function obterHoraAtual() {
    const data = new Date();
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');
    const segundo = data.getSeconds().toString().padStart(2, '0');
    return `${hora}:${minuto}:${segundo}`;
}

// Função para calcular a diferença entre duas horas
function calcularDiferencaHoras(hora1, hora2) {
    const [h1, m1, s1] = hora1.split(':').map(Number);
    const [h2, m2, s2] = hora2.split(':').map(Number);
    const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
    const horas = Math.floor(diferencaSegundos / 3600);
    const minutos = Math.floor((diferencaSegundos % 3600) / 60);
    const segundos = diferencaSegundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}