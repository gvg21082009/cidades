// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const numeroSenha = document.querySelector('.parametro-senha__texto');

let tamanhoSenha = 12;

numeroSenha.textContent = tamanhoSenha;


const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';

const numeros = '0123456789';

const simbolos = '!@#$%*?';


const botoes = document.querySelectorAll(
    '.parametro-senha__botao'
);


const campoSenha = document.querySelector(
    '#campo-senha'
);


const checkbox = document.querySelectorAll(
    '.checkbox'
);


const forcaSenha = document.querySelector(
    '.forca'
);


const valorEntropia = document.querySelector(
    '.entropia'
);


// ==========================================
// DIMINUIR TAMANHO DA SENHA
// ==========================================

function diminuiTamanho() {

    if (tamanhoSenha > 1) {

        tamanhoSenha--;

    }

    numeroSenha.textContent = tamanhoSenha;

    geraSenha();
}


// ==========================================
// AUMENTAR TAMANHO DA SENHA
// ==========================================

function aumentaTamanho() {

    if (tamanhoSenha < 20) {

        tamanhoSenha++;

    }

    numeroSenha.textContent = tamanhoSenha;

    geraSenha();
}


// ==========================================
// EVENTOS DOS BOTÕES
// ==========================================

botoes[0].onclick = diminuiTamanho;

botoes[1].onclick = aumentaTamanho;


// ==========================================
// EVENTOS DOS CHECKBOXES
// ==========================================

for (let i = 0; i < checkbox.length; i++) {

    checkbox[i].onclick = geraSenha;

}


// ==========================================
// GERAR SENHA
// ==========================================

function geraSenha() {

    let alfabeto = '';


    // Letras maiúsculas

    if (checkbox[0].checked) {

        alfabeto += letrasMaiusculas;

    }


    // Letras minúsculas

    if (checkbox[1].checked) {

        alfabeto += letrasMinusculas;

    }


    // Números

    if (checkbox[2].checked) {

        alfabeto += numeros;

    }


    // Símbolos

    if (checkbox[3].checked) {

        alfabeto += simbolos;

    }


    // Caso nenhum checkbox esteja selecionado

    if (alfabeto.length === 0) {

        campoSenha.value = 'Selecione uma opção';

        forcaSenha.classList.remove(
            'fraca',
            'media',
            'forte'
        );

        valorEntropia.textContent = '';

        return;

    }


    // ======================================
    // CRIAÇÃO DA SENHA
    // ======================================

    let senha = '';


    for (
        let i = 0;
        i < tamanhoSenha;
        i++
    ) {

        let numeroAleatorio =
            Math.random() * alfabeto.length;


        numeroAleatorio =
            Math.floor(numeroAleatorio);


        senha =
            senha + alfabeto[numeroAleatorio];

    }


    // Exibe a senha

    campoSenha.value = senha;


    // Classifica a senha

    classificaSenha(alfabeto.length);

}


// ==========================================
// CLASSIFICAR FORÇA DA SENHA
// ==========================================

function classificaSenha(tamanhoAlfabeto) {


    // ======================================
    // CÁLCULO DA ENTROPIA
    // ======================================

    let entropia =
        tamanhoSenha *
        Math.log2(tamanhoAlfabeto);


    // ======================================
    // REMOVE AS CLASSES ANTERIORES
    // ======================================

    forcaSenha.classList.remove(
        'fraca',
        'media',
        'forte'
    );


    // ======================================
    // CLASSIFICAÇÃO
    // ======================================

    if (entropia > 57) {

        forcaSenha.classList.add('forte');

    }

    else if (
        entropia > 35 &&
        entropia < 57
    ) {

        forcaSenha.classList.add('media');

    }

    else {

        forcaSenha.classList.add('fraca');

    }


    // ======================================
    // EXIBIR TEMPO ESTIMADO
    // ======================================

    const dias =
        Math.floor(
            2 ** entropia /
            (100e6 * 60 * 60 * 24)
        );


    valorEntropia.textContent =
        'Um computador pode levar até ' +
        dias +
        ' dias para descobrir essa senha.';

}


// ==========================================
// GERAR SENHA AO ABRIR A PÁGINA
// ==========================================

geraSenha();