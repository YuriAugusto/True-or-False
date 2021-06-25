$(window).on("load", function () {

	let campoE = $("#campoEsquerdo");
	let campoD = $("#campoDireito");
	let condicaoEscolhida = $("#escolha");
	let botaoVerificar = $("#verificar");

	botaoVerificar.on("click", function () {
		let valorCampoE = $("#campoEsquerdo").val();
		let valorCampoD = $("#campoDireito").val();

		if (valorCampoE.length == 0) {
			console.log("Você precisa digitar algo no campo");
		} else {
			//verifica somente números
			let regexNumeros = /^\d+$/;//somente números
			if (regexNumeros.test(valorCampoE)) {
				console.log(`${valorCampoE} um número a partir do regex`);
				return valorCampoE;
			}

			//verifica boolean
			if (valorCampoE == "true") {
				let valor = true;
				console.log("Valor encontrado: " + valor);
				console.log("Typeof do valor encontrado: " + typeof valor);
				return valor;
			} else if (valorCampoE == "false") {
				let valor = false;
				console.log("Valor encontrado: " + valor);
				console.log("Typeof do valor encontrado: " + typeof valor);
				return valor;
			}

			//verifica somente letras sem aspas
			let regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;//regex aceita apenas letras e acentuação
			if (regex.test(valorCampoE)) {//se não contiver letras é número
				console.log(`${valorCampoE} string sem aspas recebida com sucesso!`);
				return valorCampoE;
			}

			//verifica string com "" ou ''
			let primeiroCaractere = valorCampoE.substr(0, 1)//1º arg index início da busca 2º arg qtd de caracteres retornados a partir do ponto de início
			let ultimoCaractere = valorCampoE.substr(-1, 1)//1º arg index (-1) corresponde a última letra da string, 2º arg qtd de caracteres

			if (((primeiroCaractere == "'") && (ultimoCaractere == "'")) 
			|| ((primeiroCaractere == "\"") && (ultimoCaractere == "\""))) {//aqui eu fiz o "escape" das aspas duplas com uma contra barra \
				let valorRecebido = valorCampoE;
				console.log(`${valorRecebido} Recebido com aspas simples ou duplas`);
				return valorRecebido;
			}

		}

	});

});