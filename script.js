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

// Função para validar o CPF no Hub do Desenvolvedor
async function validarCPF() {
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const dataNasc = document.getElementById('dataNasc').value;
    const statusCpf = document.getElementById('status-cpf');

    if (cpf.length !== 11 || dataNasc.length !== 10) {
        alert('Preencha o CPF e a Data de Nascimento corretamente.');
        return;
    }

    // AVISO: Em um sistema real, NUNCA deixe seu token exposto aqui!
    const token = '216767750hzDNQCcbyx391367600';
    
    // Removido o "?xml" para que a API retorne em JSON (padrão web)
    const url = `https://ws.hubdodesenvolvedor.com.br/v2/cpf/?cpf=${cpf}&data=${dataNasc}&token=${token}`;

    statusCpf.textContent = "Consultando...";
    statusCpf.style.color = "blue";

    try {
        const resposta = await fetch(url);
        
        // Se a API bloquear por CORS (muito comum em consultas de CPF direto do navegador), 
        // você precisará fazer essa requisição via Back-end (Python, Node, PHP).
        const dados = await resposta.json();

        if (dados.status && dados.status === true) {
            statusCpf.textContent = `CPF Válido! Nome registrado: ${dados.result.nome_da_pf}`;
            statusCpf.style.color = "green";
        } else {
            statusCpf.textContent = "CPF Inválido ou dados não conferem.";
            statusCpf.style.color = "red";
        }

    } catch (erro) {
        console.error('Erro ao validar CPF:', erro);
        statusCpf.textContent = "Erro ao consultar a API. Pode ser bloqueio de CORS (necessário usar Back-end).";
        statusCpf.style.color = "red";
    }
}