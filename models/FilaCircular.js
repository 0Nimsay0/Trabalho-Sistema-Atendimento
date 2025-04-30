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
            if(this.#fim === this.#elementos.length -1)
                this.#fim = 0;
            
            else
                this.#fim++
            this.#elementos[this.#fim] = dado;
            this.#qtd++;
            console.log("Ini:"+this.#inicio+ " Fim:"+this.#fim + " Qtd:"+ this.#qtd);
            return true;}
        else
            return false;
    }

    dequeue() {
        if (!this.isEmpty()) {
            const dado = this.#elementos[this.#inicio];
            if(this.#inicio === this.#elementos.length -1)
                this.#inicio = 0;
            else
                this.#inicio++
            this.#qtd--;
            console.log("Ini:"+this.#inicio+ 
                " Fim:"+this.#fim + " Qtd:"+ this.#qtd);
            return dado;
        }//fim if
        return null;
    }

    toString() {
        let filaString = "";
        let pos = this.#inicio;
        for (let i = 0; i < this.#qtd; i++) {
            filaString += this.#elementos[pos] + " | ";
            if (pos === this.#elementos.length - 1) 
                pos = 0 
            else
            pos++
        }
        console.log(filaString);
        return filaString;
    }

}
