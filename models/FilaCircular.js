//FilaCircur.js

class FilaCircular {
    #inicio;
    #fim;
    #qtd;
    #elementos; //vetor

    constructor(tamanho = 10) {
        this.#inicio = 0;
        this.#fim = -1;
        this.#qtd = 0;
        this.#elementos = new Array(tamanho);
    }

    //metodos

    isFull() {
        /* if(this.#fim === this.#elementos.length - 1){
            return true;
        } */
        return this.#qtd === this.#elementos.length;
    }

    isEmpty() {
        return this.#qtd === 0;
    }

    enqueue(dado) {
        if (!this.isFull()) {
            this.#fim = (this.#fim + 1) % this.#elementos.length;
            this.#elementos[this.#fim] = dado;
            this.#qtd++;
            return true;
        }
        return false;
    }

    dequeue() {
        if (!this.isEmpty()) {
            const dado = this.#elementos[this.#inicio];
            this.#inicio = (this.#inicio + 1) % this.#elementos.length;
            this.#qtd--;
            return dado;
        }
        return null;
    }

    toString() {
        let filaString = "";
        let i = this.#inicio;
        for (let cont = 0; cont < this.#qtd; cont++) {
            filaString += this.#elementos[i] + " | ";
            i = (i + 1) % this.#elementos.length;
        }
        console.log(filaString);
        return filaString;
    }
}
