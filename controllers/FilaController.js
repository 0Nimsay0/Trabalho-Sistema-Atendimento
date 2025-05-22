const filaPrioritaria = new FilaEncadeada();
const filaNormal = new FilaEncadeada();

let cont = 0;

//função
function addElementos(){
    const novoElemento = document.getElementById("txtnovoNome");
    const novoCpf = document.getElementById("txtnovoCpf");
    const novaData = document.getElementById("txtnovaData");

    if (novoElemento.value.trim() === "" || novoCpf.value.trim() === "" || novaData.value.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const idade = calcularIdade(novaData.value)

    if(idade >= 60){
        const novoAtendimento = new Atendimento(novoElemento.value, novoCpf.value);
        filaPrioritaria.enqueue(novoAtendimento);
        mostrarFila();
        novoElemento.value = "";
        novoCpf.value = ""; //limpar o input
        novaData.value = ""; //limpar o input
        novoElemento.focus(); //cursor no input
    } 
    else {
        const novoAtendimento = new Atendimento(novoElemento.value, novoCpf.value);
        filaNormal.enqueue(novoAtendimento);
        mostrarFila2();
        novoElemento.value = "";
        novoCpf.value = ""; //limpar o input
        novaData.value = ""; //limpar o input
        novoElemento.focus(); //cursor no input
    }

    
} // fim addElemento

//função para mostrar a fila
function mostrarFila(){
    const listaFila = document.getElementById("listFila");
    listaFila.innerHTML = ""; // limpa a lis
     for(let item of filaPrioritaria){
       const listaElemento = document.createElement("li");
       listaElemento.textContent = item;
       listaFila.appendChild(listaElemento);
    } 
}

function mostrarFila2(){
    const listaFila = document.getElementById("listFila2");
    listaFila.innerHTML = ""; // limpa a lis
     for(let item of filaNormal){
       const listaElemento = document.createElement("li");
       listaElemento.textContent = item;
       listaFila.appendChild(listaElemento);
    } 
}

//Função para atender pessoa da fila
function atenderFila(){
            if(!filaPrioritaria.isEmpty() && cont < 3){
                const atendido = filaPrioritaria.dequeue();
                const horario = obterHoraAtual();
                const diferenca = calcularDiferencaHoras(atendido.hora, horario);
                //alert("Pessoa Atendida: " +atendido)
                const mostrarAtendimento = document.getElementById("mensagem-remocao");
                mostrarAtendimento.textContent = "- Ultimo Atendimento: " + atendido.nome  + " | | Tempo de Espera: "+diferenca;
                mostrarFila();
                localStorage.setItem('ultimoAtendido', atendido.nome);
                cont++; 
            }    
            else if(!filaNormal.isEmpty()){
                const atendido = filaNormal.dequeue();
                const horario = obterHoraAtual();
                const diferenca = calcularDiferencaHoras(atendido.hora, horario);
                const mostrarAtendimento = document.getElementById("mensagem-remocao");
                mostrarAtendimento.textContent = "- Ultimo Atendimento: " + atendido.nome  + " | | Tempo de Espera: "+diferenca;
                mostrarFila2();
                localStorage.setItem('ultimoAtendido', atendido.nome);
                cont = 0;
            }

            else if (!filaPrioritaria.isEmpty()) {
                const atendido = filaPrioritaria.dequeue();
                const horario = obterHoraAtual();
                const diferenca = calcularDiferencaHoras(atendido.hora, horario);
                const mostrarAtendimento = document.getElementById("mensagem-remocao");
                mostrarAtendimento.textContent = "- Ultimo Atendimento: " + atendido.nome  + " | | Tempo de Espera: "+diferenca;
                mostrarFila();
                localStorage.setItem('ultimoAtendido', atendido.nome);
                cont++;
            } else{
                alert("Fila Vazia!");
                localStorage.setItem('ultimoAtendido', "Aguardando...");
            }
}


//Função para buscar
function buscar() {
    const CPF = document.getElementById("txtnovoCpf").value;
    const mostrarAtendimento = document.getElementById("mensagem-remocao");
    let cont = 0;
    for (let itemFila of filaPrioritaria) {
        cont++;
       if (itemFila.cpf === CPF) {
          mostrarAtendimento.textContent =  "Pessoa encontrada: " + itemFila.nome + " || Hora de chegada: " + itemFila.hora + " || Posição na Fila Prioritaria: " +cont;
          return itemFila;
       } 
    }
    for (let itemFila of filaNormal) {
        cont++;
       if (itemFila.cpf === CPF) {
          mostrarAtendimento.textContent =  "Pessoa encontrada: " + itemFila.nome + " || Hora de chegada: " + itemFila.hora + " || Posição na Fila Normal: " +cont;
          return itemFila;
       } 
    }
    mostrarAtendimento.textContent = "Pessoa nao encontrada";
}

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

//funçao para calcular idade
function calcularIdade(dataNascimento) {
  // Espera data no formato "dd/mm/aaaa"
  const [dia, mes, ano] = dataNascimento.split('/').map(Number);

  const hoje = new Date();
  const dataNasc = new Date(ano, mes - 1, dia); // Mês começa em 0 no JavaScript

  let idade = hoje.getFullYear() - dataNasc.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  // Verifica se a pessoa ainda não fez aniversário neste ano
  if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
    idade--;
  }

  return idade;
}