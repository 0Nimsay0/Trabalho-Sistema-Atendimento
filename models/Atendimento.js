class Atendimento{
    #nome;
    #cpf;
    data;
    hora;

    constructor(nome, cpf){
        this.nome = nome;
        this.cpf = cpf;
        this.hora = obterHoraAtual();
        this.data = obterDataAtual();
    }

    get nome() {
        return this.#nome;
    }
    
    get cpf() {
        return this.#cpf;
    }
    
    set nome(novoNome) {
        this.#nome = novoNome;
    }
    
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }


    toString(){
        return this.nome + " | " + this.cpf + " | " + this.data + " | " + this.hora;
    }

}