// <----------------> Busca HTML <---------------->
// Elementos do HTML para mudar o tema
const body = document.querySelector("body");
const navi = document.querySelector(".navi");
const principal = document.querySelector(".principal");
const filmes = document.querySelector(".filmes");
const button = document.querySelector(".button");
const github_ul = document.querySelector("#repos");

// <----------------> Tema <---------------->
// Muda o tema
function change_theme() {
    body.classList.toggle('dark_body');
    navi.classList.toggle('dark_navi');
    principal.classList.toggle('dark_principal');
    filmes.classList.toggle('dark_filmes');
    button.classList.toggle('dark_button');
}

// <----------------> Github <---------------->
// Pega, se possível, informações da conta do github
const usr_span = document.querySelector("#username");
const usr_img = document.querySelector("#usr_img");

// Pede o json da api do github
async function resgata_json(caminho) {
    let resposta = await fetch("https://api.github.com/users/" + caminho);
    let json = await resposta.json();

    return json;
}

// Atualiza a seção do github com os dados recebidos da api
async function atualiza_usuario() {
    let json_usr = await resgata_json("Teruya11");

    usr_span.innerText = json_usr.login;
    usr_img.src = json_usr.avatar_url;

    let json_repos = await resgata_json("Teruya11/repos");

    let i = 1
    for (let item of github_ul.children) {
        item.children[0].innerText = json_repos[ json_repos.length - i ].name;
        item.children[0].href = json_repos[ json_repos.length - i ].html_url;
        item.children[1].innerText = "- " + "Criado em: " +  json_repos[ json_repos.length - i ].created_at.slice(0, 10);
        i++;
    }
}

atualiza_usuario();

// Efeitos especiais
