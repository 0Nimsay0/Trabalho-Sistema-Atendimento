//PainelController.js

function atualizarUltimoAtendimento() {
    // Recupera o último atendido do localStorage
    const ultimoAtendido = localStorage.getItem('ultimoAtendido');
    document.getElementById('ultimoAtendimento').textContent = ultimoAtendido;
  
  }
  
  // Chama a função assim que a página carregar
  atualizarUltimoAtendimento();
  
  // Atualiza a cada segundo
  setInterval(atualizarUltimoAtendimento, 1000); 