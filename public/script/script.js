function Sair() {
    iziToast.show({
        title: 'Atenção!',
        message: 'Você saiu da conta.',
        color: 'black',
        position: 'topCenter',
        timeout: 4000,
        onClosed: function () {
            window.location.href = '/login';
        }
    });
}

// Função Cadastro
function cadastro() {
    iziToast.success({
        title: 'Sucesso!',
        message: 'Cadastro realizado com sucesso!',
        position: 'topRight',
        timeout: 4000,
        onClosed: function () {
            window.location.href = '/login';
        }
    });
}

// Função Pedido
function pedido() {
    iziToast.success({
        title: 'Pedido Confirmado!',
        message: 'Seu pedido foi realizado com sucesso.',
        position: 'topRight',
        timeout: 4000,
        onClosed: function () {
            window.location.href = '/cardapio';
        }
    });
}

// Função Edicao
function Edicao() {
    iziToast.info({
        title: 'Editado!',
        message: 'Produto editado com sucesso.',
        position: 'topRight',
        timeout: 4000,
        onClosed: function () {
            window.location.href = '/ADM/GerenciarProduto';
        }
    });
}



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