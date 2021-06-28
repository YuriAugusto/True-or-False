$(document).ready(function () {//executa assim que a página carrega
	const campoE = $("#campoEsquerdo");//primeiro você recupera o elemento após isso você com a variável de acesso a ele "campoE" consegue recuperar o valor como ex: campoE.val() ou campoE.val().length
	const campoD = $("#campoDireito");
	const botaoVerificar = $("#verificar");
	let condicaoEscolhida = $("#escolha");
	let tipoDeDadoCampoE = null;//variável que irá armazenar o tipo de dado inserido no input do usuário
	let tipoDeDadoCampoD = null;

	//campo Esquerdo
	campoE.on("focusout", function () {
		let valorCampoE = campoE.val();//aqui eu pego apenas o valor que o campo possui e atribuo a variável local, o acesso ao elemento ainda pertênce a variável campoE
		tipoDeDadoCampoE = identificaDadoDigitado(valorCampoE);
	});

	//campo Direito
	campoD.on("focusout", function () {
		let valorCampoD = campoD.val();//aqui eu pego apenas o valor que o campo possui e atribuo a variável local, o acesso ao elemento ainda pertênce a variável campoE
		tipoDeDadoCampoD = identificaDadoDigitado(valorCampoD);
	});

	//quando clicar
	botaoVerificar.on("click", function () {
		let sinalComparacao = null;//recebe a string que corresponde ao sinal de comparação
		let resultado = null;//recebe o resultado da comparação, sendo true ou false

		if (condicaoEscolhida.val() == 0) {//==
			sinalComparacao = "==";
			resultado = (tipoDeDadoCampoE == tipoDeDadoCampoD);
		}
		if (condicaoEscolhida.val() == 1) {//!=
			sinalComparacao = "!=";
			resultado = (tipoDeDadoCampoE != tipoDeDadoCampoD);
		}
		if (condicaoEscolhida.val() == 2) {//===
			sinalComparacao = "===";
			resultado = (tipoDeDadoCampoE === tipoDeDadoCampoD);
		}
		if (condicaoEscolhida.val() == 3) {//!==
			sinalComparacao = "!==";
			resultado = (tipoDeDadoCampoE !== tipoDeDadoCampoD);
		}

		//variáveis para serem passadas como argumento na function que cria linha
		let valoresComparados = tipoDeDadoCampoE + "" + sinalComparacao + "" + tipoDeDadoCampoD;
		let tipoDeDado = typeof tipoDeDadoCampoE + " " + typeof tipoDeDadoCampoD;

		//1º arg valor dos campos 2º arg typeof dos dois valores 3º arg resultado da comparação
		let linhaCriada = criaLinhas(valoresComparados, tipoDeDado, resultado);
		$(".corpoTabela").prepend(linhaCriada);//adiciona a linha ao elemento recuperado que corresponde ao corpo da tabela

	});

	function identificaDadoDigitado(valorDigitadoCampo) {//passo o valor recuperado do campo como argumento na chamada da function
		if (valorDigitadoCampo.length == 0) {//se o campo estiver vazio
			$(".erro").remove();
			$("<p>Se o campo estiver vazio a comparação não ocorrerá corretamente.</p>").addClass("erro").insertAfter($("#pAcimaTabela"));
			return null;

		} else {
			$(".erro").remove();
			//verifica boolean
			if (valorDigitadoCampo == "true") {
				let verdadeiro = true;
				return verdadeiro;
			} else if (valorDigitadoCampo == "false") {
				let falso = false;
				return falso;
			}

			//verifica strings sem aspas
			let regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;//regex aceita apenas letras e acentuação
			if (regex.test(valorDigitadoCampo)) {//se não contiver letras é número
				return valorDigitadoCampo;
			}

			//verifica string com "" ou ''
			let primeiroCaractere = valorDigitadoCampo.substr(0, 1)//1º arg index início da busca 2º arg qtd de caracteres retornados a partir do ponto de início
			let ultimoCaractere = valorDigitadoCampo.substr(-1, 1)//1º arg index (-1) corresponde a última letra da string, 2º arg qtd de caracteres

			if (((primeiroCaractere == "'") && (ultimoCaractere == "'"))
				|| ((primeiroCaractere == "\"") && (ultimoCaractere == "\""))) {//aqui eu fiz o "escape" das aspas duplas com uma contra barra \
				return valorDigitadoCampo;
			}

			//verifica se o valor inputado não é número (NAN)
			if (isNaN(valorDigitadoCampo)) {//se o valor inputado não for um número, ex: a1, 12a, '645", "97'...
				return valorDigitadoCampo;
			} else {//se o valor inputado for um número				
				let numero = parseFloat(valorDigitadoCampo);
				return numero;
			}
		}
	}

	//cria linha
	function criaLinhas(valores, tipoDeDado, resultado) {
		let linha = "<tr>" +
			"<td>" + valores + "</td>" +
			"<td>" + tipoDeDado + "</td>" +
			"<td>" + resultado + "</td>" +
			"</tr>";
		return linha;
	}
});