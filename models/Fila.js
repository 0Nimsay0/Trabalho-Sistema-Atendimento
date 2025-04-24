class Fila{
    #inicio;
    #fim;
    #qtd;
    #elementos //vetor

    constructor(tamanho=10){
        this.#inicio = 0;
        this.#fim = -1;
        this.#qtd = 0;
        this.#elementos = new Array(tamanho);
    } //metodos

    isFull(){
        /* if(this.#fim === this.#elementos.length - 1){
            return true;
        } */

        return this.#fim === this.#elementos.length - 1;
    }

    isEmpty(){
        return this.#fim < this.#inicio; 
    }

    enqueue(dado){
        if(!this.isFull()){
            this.#fim++;
            this.#elementos[this.#fim] = dado;
            this.#qtd++;
            return true;
        }
        return false; // se estiver cheio
    }

    dequeue(){
        if(!this.isEmpty()){
            const dado = this.#elementos[this.#inicio];
            this.#inicio++;
            this.#qtd--;
            return dado;
        } //fim if

        return null; // se estiver vazio
    }

    toString(){
        let filaString = "";
        for(let i = this.#inicio; i<=this.#fim; i++){
            filaString += this.#elementos[i] + " | ";
        } //fim for
        console.log(filaString); //mostra no console;
        return filaString;
    }

}//fim da classe