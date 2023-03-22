var cep = document.getElementById('cep');
var cidade = document.getElementById('cidade');
var logradouro = document.getElementById('endereco');
var estado = document.getElementById('estado');
var bairro = document.getElementById('bairro');
var complemento = document.getElementById('complemento');

async function buscaEndereco(cep) {
    var erroCEP = document.getElementById('erro');
    erroCEP.innerHTML = "";
    try {
        var consulta = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        var consultaJSON = await consulta.json();
        if (consultaJSON.erro) {
            throw Error(alert("CEP não existente."));
        }
        cidade.value = consultaJSON.localidade;
        logradouro.value = consultaJSON.logradouro;
        estado.value = consultaJSON.uf;
        bairro.value = consultaJSON.bairro;
        complemento.value = consultaJSON.complemento;

        return consultaJSON;
    } catch (errado) {
        erroCEP.innerHTML = "<p>CEP inválido, confira e digite novamente!</p>";
    }
}

cep.addEventListener("focusout", () => buscaEndereco(cep.value));