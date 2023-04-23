<template>
	<div class="body">
		<nav>
			<div class="meio">
				<h1>
					<b>DOMINÓLLE</b>
				</h1>
			</div>
			<div class="canto">
				<img src="src/assets/img/univille1.png" class="univ" id="univ">
			</div>
		</nav>
		<div class="principal" id="principal">
			<div class="box-cinza">
				
				<button class="botaojogar" id="botaojogar" @click="router.push('/jogo')"> <b>Jogar Agora!</b></button>
				<button class="botaoregras" id="botaoregras" @click="router.push('/regras')"> <b>Regras do Jogo</b></button>
				<button class="botaocredito" id="botaocredito" @click="router.push('/creditos')"> <b>Créditos</b></button>
				<div class="homenagem" id="homenagem">
					<p>Uma homenagem aos jogadores de Joinville </p>
				</div>
			</div>

		</div>
	</div>
</template>
  
<script>
import { onMounted, ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'PaginaInicial',

	setup() {

		const router = useRouter();

		onMounted(() => {



		})


		return {
			router
		}
	}

});


</script>

<style scoped>
.body {
	background-image: url("src/assets/img/fundo_palmeiras.jpg");
	background-size: cover;
	background-position: center 100%;
	padding: 0;
	border: 0;
	display: block;
	width: 100%;
	min-height: 100vh;
	max-height: 100%;
	background-repeat: no-repeat;
}

nav {
	font-family: 'Handjet', sans-serif;
	color: #022E83;
	width: 100%;
	height: 110px;
	background-image: url("src/assets/img/Rectangle5.png");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 5px#022E83 solid;
}

h1 {
	text-align: center;
	padding-top: 15px;
	font-size: 100px;
	font-weight: bold;
}

img.univ {
	width: 80px;
}

div.principal {
	justify-content: center;
	align-items: center;
	text-align: center;
	display: block;
	margin-top: 4%;

}

.box-cinza {
	background-color: #1e1e1ed3;
	margin: 0 auto;
	max-width: 35%;
	min-width: 400px;
	height: 100%;
	border-radius: 40px;
	margin-top: 60px;
}

.canto {
	right: 5%;
	height: 50px;
	width: 50px;
	justify-items: end;

}

.meio {
	margin: 0 auto;
}

.botaojogar {
	background-color: #1A9AAB;
	width: 70%;
	height: 70px;
	margin-top: 90px;
	font-family: 'Handjet', sans-serif;
	font-size: 40px;
	color: white;
	border-radius: 30px;
}

.botaoregras {
	background-color: #E6DF37;
	width: 70%;
	height: 70px;
	margin-top: 10%;
	font-family: 'Handjet', sans-serif;
	font-size: 40px;
	color: white;
	border-radius: 30px;
}

.botaocredito {
	background-color: #0A7F55;
	width: 70%;
	height: 70px;
	margin-top: 10%;
	font-family: 'Handjet', sans-serif;
	font-size: 40px;
	color: white;
	border-radius: 30px;
	font-weight: bold;
}

div.homenagem {
	font-size: 2rem;
	color: white;
	font-family: 'Handjet', sans-serif;
	text-align: center;
	width: 300px;
	margin: 0 auto;
	margin-top: 1%;
	line-height: 1;
}


</style>