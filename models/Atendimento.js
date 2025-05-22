class Atendimento{
    #nome;
    #cpf;
    data;
    hora;
    #dataNascimento;

    constructor(nome, cpf, dataNascimento){
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.hora = obterHoraAtual();
        this.data = obterDataAtual();
    }

    get nome() {
        return this.#nome;
    }
    
    get cpf() {
        return this.#cpf;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }
    
    set nome(novoNome) {
        this.#nome = novoNome;
    }
    
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    set dataNascimento(novaData){
        this.#dataNascimento = novaData;
    }


    toString(){
        return "Nome: " + this.nome + " | CPF: " + this.cpf + " | Data: " + this.data + " | Horario Chegada: " + this.hora;
    }

}