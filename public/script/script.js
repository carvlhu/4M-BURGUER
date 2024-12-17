/* Toast - Sair da Conta */
function Sair(event) {
    event.preventDefault();

    iziToast.warning({
        title: 'Atenção!',
        message: 'Você sairá da conta.',
        color: 'red',
        position: 'topCenter',
        timeout: 3000,
        onClosed: function () {
            event.target.submit();
        }
    });
}

/* Toast - Validação do Login */
function Login(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    fetch('/login/validacao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                iziToast.success({
                    title: 'Login Realizado!',
                    message: 'Você será redirecionado.',
                    color: 'green',
                    position: 'topCenter',
                    timeout: 3000,
                    onClosed: function () {
                        window.location.href = result.redirect;
                    }
                });
            } else {
                iziToast.error({
                    title: 'Erro no Login',
                    message: result.message,
                    color: 'red',
                    position: 'topCenter',
                    timeout: 3000,
                });
            }

            // Limpa os campos do formulário após a resposta
            event.target.reset();
        })
        .catch(error => {
            iziToast.error({
                title: 'Erro no Servidor',
                message: 'Não foi possível processar o login. Tente novamente mais tarde.',
                color: 'red',
                position: 'topCenter',
                timeout: 3000,
            });
            console.error('Erro:', error);

            // Limpa os campos do formulário mesmo em caso de erro
            event.target.reset();
        });
}

/* Toast - Cadastro */
function cadastro(event) {
    event.preventDefault();

    iziToast.success({
        title: 'Cadastro Concluído!',
        message: 'Cadastro realizado com sucesso!',
        color: 'green',
        position: 'topCenter',
        timeout: 3000,
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
        timeout: 3000,
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
        color: 'green',
        position: 'topRight',
        timeout: 3000,
        onClosed: function () {
            event.target.submit();
        }
    });
}

/* Função ok */
function AdicionarProduto(event) {
    event.preventDefault();

    iziToast.success({
        title: 'Produto Adicionado!',
        message: 'Produto adicionado com sucesso.',
        color: 'green',
        position: 'topRight',
        timeout: 3000,
        onClosed: function () {
            event.target.submit();
        }
    });
}

/* Função ok */
function ExcluirProduto(event) {
    event.preventDefault();

    iziToast.success({
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