/* Alert - Sair da Conta */
function Sair() {
    alert('VOCÊ SAIU DA CONTA');
}

/* Alert - Conclusão de cadastro */
function cadastro() {
    alert('Cadastro realizado com sucesso');
}

/* Alert - Conclusão de Pedido */
function pedido() {
    alert('Pedido realizado com sucesso');
}

/* Alert - Editar */
function Edicao() {
    alert('Produto Editado');
}

/* Função do Menu Hamburguer */
function menuShow() {
    let menuMobile = document.querySelector('.menu-mobile-options');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
    } else {
        menuMobile.classList.add('open');
    }
}

function menuShowAdm() {
    let menuMobile = document.querySelector('.menu-mobile-adm-options');
    let barra = document.querySelector('.menu-mobile-adm');

    if (menuMobile.classList.contains('open-adm')) {
        menuMobile.classList.remove('open-adm');
        barra.style.borderBottom = '5px solid #F2CB05';
    } else {
        menuMobile.classList.add('open-adm');
        barra.style.borderBottom = 'black';
    }
}