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
			let regexNumeros = /^\d+$/;//somente números
			if(regexNumeros.test(valorCampoE)){
				console.log("Encontrei um número a partir do regex");
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

			//verifica string com "" ou ''
			let primeiroCaractere = valorCampoE.substr(0, 1)//1º arg index início da busca 2º arg qtd de caracteres retornados a partir do ponto de início
			console.log("primeiro caractere: " + primeiroCaractere);
			let ultimoCaractere = valorCampoE.substr(-1, 1)//1º arg index (-1) corresponde a última letra da string, 2º arg qtd de caracteres
			console.log("ultimo caractere: " + ultimoCaractere);

			if (((primeiroCaractere == "'") && (ultimoCaractere == "'")) || ((primeiroCaractere == "\"") && (ultimoCaractere == "\""))) {//aqui eu fiz o "escape" das aspas duplas com uma contra barra \
				let valorRecebido = valorCampoE;
				console.log(`${valorRecebido} é uma string`);
				console.log("O valor inserido é do tipo: " + typeof valorRecebido);
				return valorRecebido;
			}

			//verifica string sem aspas e número
			if (!valorCampoE.includes("\"") && (!valorCampoE.includes("\'") && (!valorCampoE.includes("true") || (!valorCampoE.includes("false"))))) {
				let regex = /^[A-Za-z]+$/;
				if (!regex.test(valorCampoE)) {//se não contiver letras é número
					console.log(`Número recebido ${valorCampoE}!`);
					return valorCampoE;
				} else {//se contiver letras é string sem ""
					console.log(`String recebida ${valorCampoE}!`);
					return valorCampoE;
				}
			}

		}

	});

});