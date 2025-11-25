const cepInput = document.getElementById("cep");
const erro = document.getElementById("erro");

cepInput.addEventListener("blur", () => {
    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        erro.textContent = "CEP inválido!";
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                erro.textContent = "CEP não encontrado.";
                return;
            }

            erro.textContent = "";

            document.getElementById("logradouro").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("uf").value = data.uf;
        })
        .catch(() => {
            erro.textContent = "Erro ao consultar CEP.";
        });
});
