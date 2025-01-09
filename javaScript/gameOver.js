function reiniciar() {
  window.location.href = "../index.html";
}

let nivel = document.getElementById("nivel");

function iniciar() {
  if (nivel.value === "") {
    // função para o jogador selecione um nivel para iniciar o game
    alert("Selecione um Nível");
    return false; // finalizar a acao
  }
  window.location.href = "./page/reiniciar.html?" + nivel.value;
}
