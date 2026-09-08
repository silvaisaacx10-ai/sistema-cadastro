// Função para buscar o CEP na ViaCEP
async function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove tudo que não for número

    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 números.');
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert('CEP não encontrado.');
            return;
        }

        // Preenche os campos de endereço automaticamente
        document.getElementById('rua').value = dados.logradouro;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('cidade').value = dados.localidade;
        document.getElementById('estado').value = dados.uf;

    } catch (erro) {
        console.error('Erro ao buscar o CEP:', erro);
        alert('Erro ao conectar com a API de CEP.');
    }
}

// Função para validar o CPF (Conectada ao seu Back-end Python local)
async function validarCPF() {
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const dataNasc = document.getElementById('dataNasc').value;
    const statusCpf = document.getElementById('status-cpf');

    if (cpf.length !== 11 || dataNasc.length !== 10) {
        alert('Preencha o CPF e a Data de Nascimento corretamente.');
        return;
    }

    // Aponta para a sua API em Python local
    const url = `http://127.0.0.1:5000/validar-cpf?cpf=${cpf}&data=${dataNasc}`;

    statusCpf.textContent = "Consultando...";
    statusCpf.style.color = "#3b82f6"; 

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.status && dados.status === true) {
            statusCpf.textContent = `CPF Válido! Nome registrado: ${dados.result.nome_da_pf}`;
            statusCpf.style.color = "#22c55e"; 
        } else {
            statusCpf.textContent = "CPF Inválido ou dados não conferem.";
            statusCpf.style.color = "#ef4444"; 
        }

    } catch (erro) {
        console.error('Erro ao validar CPF:', erro);
        statusCpf.textContent = "Erro de conexão. O back-end em Python está rodando?";
        statusCpf.style.color = "#ef4444";
    }
}