$(window).on("load", function () {
	const campoE = $("#campoEsquerdo");//primeiro você recupera o elemento após isso você com a variável de acesso a ele "campoE" consegue recuperar o valor como ex: campoE.val() ou campoE.val().length
	const campoD = $("#campoDireito");
	const botaoVerificar = $("#verificar");
	let condicaoEscolhida = $("#escolha");
	let resultadoCampoE = null;//variável que irá armazenar o tipo de dado inserido no input do usuário
	let resultadoCampoD = null;

	//campo Esquerdo
	campoE.on("focusout", function () {
		let valorCampoE = campoE.val();//aqui eu pego apenas o valor que o campo possui e atribuo a variável local, o acesso ao elemento ainda pertênce a variável campoE
		resultadoCampoE = identificaDadoDigitado(valorCampoE);
	});

	//campo Direito
	campoD.on("focusout", function () {
		let valorCampoD = campoD.val();//aqui eu pego apenas o valor que o campo possui e atribuo a variável local, o acesso ao elemento ainda pertênce a variável campoE
		resultadoCampoD = identificaDadoDigitado(valorCampoD);
	});

	botaoVerificar.on("click", function () {
		console.log("Valor recebido pelo campo E: " + typeof resultadoCampoE);
		console.log("Valor recebido pelo campo D: " + typeof resultadoCampoD);

		let sinalComparacao = null;//recebe a string que corresponde ao sinal de comparação
		let resultadoComparacao = null;//recebe o resultado da comparação, sendo true ou false

		if (condicaoEscolhida.val() == 0) {//==
			sinalComparacao = "==";
			resultadoComparacao = (resultadoCampoE == resultadoCampoD);
		}
		if (condicaoEscolhida.val() == 1) {//!=
			sinalComparacao = "!=";
			resultadoComparacao = (resultadoCampoE != resultadoCampoD);
		}
		if (condicaoEscolhida.val() == 2) {//===
			sinalComparacao = "===";
			resultadoComparacao = (resultadoCampoE === resultadoCampoD);
		}
		if (condicaoEscolhida.val() == 3) {//!==
			sinalComparacao = "!==";
			resultadoComparacao = (resultadoCampoE !== resultadoCampoD);
		}

		let valoresComparados = resultadoCampoE + "" + sinalComparacao + "" + resultadoCampoD;
		let tipoDado = typeof resultadoCampoE + " " + typeof resultadoCampoD;

		let linhaCriada = criaLinhas(valoresComparados, tipoDado, resultadoComparacao);
		$(".corpoTabela").append(linhaCriada);//adiciona a linha ao corpo da tabela

	});

	function identificaDadoDigitado(valorDigitadoCampo) {//passo o valor recuperado do campo como argumento na chamada da function

		if (valorDigitadoCampo.length == 0) {//se o campo estiver vazio
			console.log("Você precisa digitar algo no campo");
			$(".erro").remove();
			$("<p>Insira um valor para ser comparado.</p>").addClass("erro").insertAfter($("#pAcimaTabela"));
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
				console.log(valorDigitadoCampo + " não é um número");
				return valorDigitadoCampo;
			} else {//se o valor inputado for um número
				let regexNumeros = /[+-]?([0-9]*[.])?[0-9]+/;//somente números ou sinais + - e , .
				if (regexNumeros.test(valorDigitadoCampo)) {
					let numero = parseFloat(valorDigitadoCampo, 10);//1º arg valor recebido, 2º arg a base de conversão, neste caso decimal
					console.log("Valor convertido para float: " + numero);
					return numero;//retorno o valor convertido para number
				}
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