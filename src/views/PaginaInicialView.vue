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
			<div class="box-cinza"></div>
		</div>
	</div>
</template>
  
<script>
import { onMounted, ref, defineComponent } from 'vue';

export default defineComponent({
	name: 'PaginaInicial',

	setup() {

		onMounted(() => {



		})


		return {


		}
	}

});


</script>

<style scoped>
.body {
	background-image: url("src/assets/img/fundo.png");
	background-size: cover;
	background-position: center center;
	padding: 0;
	border: 0;
	display: block;
	width: 100vw;
	height: 100vh;
	background-repeat: no-repeat;
}

nav {
	font-family: 'Handjet', sans-serif;
	color: #022E83;
	width: 100%;
	height: 100px;
	background-image: url("src/assets/img/Rectangle5.png");
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
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
	margin-top: 55px;

}

.box-cinza {
	background-color: #1e1e1ed3;
	background-size: cover;
	margin: 0 auto;
	max-width: 400px;
	min-width: 200px;
	height: 400px;
	border-radius: 40px;
}

.canto {
	right: 5%;
	height: 50px;
	width: 50px;
	justify-items: end;

}
.meio{
	margin: 0 auto;
}
</style>