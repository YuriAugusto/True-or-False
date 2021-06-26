$(window).on("load", function () {
	// let valorCampoEVal = $("#campoEsquerdo").val();//não funciona 1º você recupera o elemento e quando for utilizar ele você consegue atribuir do elemento ".val() ou . length" a uma variável local
	// let valorCampoEValLength = $("#campoEsquerdo").val().length;//não funciona

	const campoE = $("#campoEsquerdo");
	const campoD = $("#campoDireito");
	const condicaoEscolhida = $("#escolha");
	const botaoVerificar = $("#verificar");

	//campo Esquerdo
	campoE.on("focusout", function () {
		const valorCampoE = campoE.val();//aqui eu pego apenas o valor que o campo possui e atribuo a variável local, o acesso ao elemento ainda pertênce a variável campoE
		console.log(valorCampoE);
		const resultado = identificaDadoDigitado(valorCampoE)
		console.log("Valor recuperado da function campo E: " + typeof resultado);
	});

	//campo Direito
	campoD.on("focusout", function () {
		const valorCampoD = campoD.val();//aqui eu pego apenas o valor que o campo possui e atribuo a variável local, o acesso ao elemento ainda pertênce a variável campoE
		console.log(valorCampoD);
		const resultado = identificaDadoDigitado(valorCampoD)
		console.log("Valor recuperado da function campo D: " + typeof resultado);
	});

	function identificaDadoDigitado(valorCampo) {

		if (valorCampo.length == 0) {
			console.log("Você precisa digitar algo no campo");
			return null;
		} else {
			//verifica somente números
			let regexNumeros = /^\d+$/;//somente números
			if (regexNumeros.test(valorCampo)) {
				console.log(`${valorCampo} um número a partir do regex`);
				let numero = parseInt(valorCampo, 10);//1º arg valor recebido, 2º arg a base de conversão, neste caso decimal
				return numero;//retorno o valor convertido para number
			}

			//verifica boolean
			if (valorCampo == "true") {
				let valor = true;
				console.log("Valor booleano encontrado: " + valor);
				return valor;
			} else if (valorCampo == "false") {
				let valor = false;
				console.log("Valor booleano encontrado: " + valor);
				return valor;
			}

			//verifica somente letras sem aspas
			let regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;//regex aceita apenas letras e acentuação
			if (regex.test(valorCampo)) {//se não contiver letras é número
				console.log(`${valorCampo} string sem aspas recebida com sucesso`);
				return valorCampo;
			}

			//verifica string com "" ou ''
			let primeiroCaractere = valorCampo.substr(0, 1)//1º arg index início da busca 2º arg qtd de caracteres retornados a partir do ponto de início
			let ultimoCaractere = valorCampo.substr(-1, 1)//1º arg index (-1) corresponde a última letra da string, 2º arg qtd de caracteres

			if (((primeiroCaractere == "'") && (ultimoCaractere == "'"))
				|| ((primeiroCaractere == "\"") && (ultimoCaractere == "\""))) {//aqui eu fiz o "escape" das aspas duplas com uma contra barra \
				let valorRecebido = valorCampo;
				console.log(`${valorRecebido} string recebida com aspas simples ou duplas`);
				return valorRecebido;
			}
		}
	}
});