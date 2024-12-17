/* Função ok */
function Sair(event) {
    event.preventDefault();

    iziToast.show({
        title: 'Atenção!',
        message: 'Você sairá da conta.',
        color: 'red',
        position: 'topCenter',
        timeout: 3500,
        onClosed: function () {
            event.target.submit();
        }
    });
}

/* Fazer Função para quando as informações estiverem erradas */
function Login(event) {
    event.preventDefault();

    setTimeout(() => {
        iziToast.success({
            title: 'Login Realizado!',
            message: 'Você será redirecionado.',
            color: 'black',
            position: 'topCenter',
            timeout: 3000,
            onClosed: function () {
                event.target.submit();
            }
        });
    }, 200);
}

/* Função ok */
function cadastro(event) {
    event.preventDefault();

    iziToast.success({
        title: 'Cadastro Concluído!',
        message: 'Cadastro realizado com sucesso!',
        color: 'green',
        position: 'topCenter',
        timeout: 3500,
        onClosed: function () {
            event.target.submit()
        }
    });
}

/* Função ok */
function pedido(event) {
    event.preventDefault();

    iziToast.success({
        title: 'Pedido Confirmado!',
        message: 'Seu pedido foi realizado com sucesso.',
        color: 'yellow',
        position: 'topCenter',
        timeout: 3500,
        onClosed: function () {
            event.target.submit()
        }
    });
}

/* Função ok */
function Edicao(event) {
    event.preventDefault();

    iziToast.info({
        title: 'Produto Editado!',
        message: 'Produto editado com sucesso.',
        color: 'black',
        position: 'topRight',
        timeout: 2500,
        onClosed: function () {
            event.target.submit();
        }
    });
}

/* Função ok */
function AdicionarProduto(event) {
    event.preventDefault();

    iziToast.info({
        title: 'Produto Adicionado!',
        message: 'Produto adicionado com sucesso.',
        color: 'green',
        position: 'topRight',
        timeout: 3500,
        onClosed: function () {
            event.target.submit();
        }
    });
}

/* Função ok */
function ExcluirProduto(event) {
    event.preventDefault();

    iziToast.show({
        title: 'Produto Excluído!',
        message: 'Produto será excluído.',
        color: 'red',
        position: 'topRight',
        timeout: 1500,
        onClosed: function () {
            event.target.submit();
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