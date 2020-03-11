//Limpa o console no ínicio da aplicação
console.clear();
// Título da aplicação
function titulo(titulo) {
    const tituloAplicacao = " ".repeat(31) + titulo.toUpperCase() + " ".repeat(31);
    console.log("=".repeat(tituloAplicacao.length));
    console.log(tituloAplicacao);
    console.log("=".repeat(tituloAplicacao.length) + "\n");
}
titulo("sistema escolar")
// Base de dados utilizada
const alunosDaEscola = [{
    nome: "Henrique",
    notas: [],
    cursos: [],
    faltas: 5
}, {
    nome: "Edson",
    notas: [],
    cursos: [],
    faltas: 2
}, {
    nome: "Bruno",
    notas: [10, 9.8, 9.6],
    cursos: [],
    faltas: 0
}, {
    nome: "Guilherme",
    notas: [10, 9.8, 9.6],
    cursos: [{
        nomeDoCurso: "Full Stack",
        dataMatricula: new Date
    }],
    faltas: 0
}, {
    nome: "Carlos",
    notas: [],
    cursos: [],
    faltas: 0
}, {
    nome: "Lucca",
    notas: [10, 9.8, 9.6],
    cursos: [{
        nomeDoCurso: "UX",
        dataMatricula: new Date
    }],
    faltas: 0
}];
// implementação

//flags para validação de funções
var flagBusca = false;
var flagMatricula = false;
var flagFalta = false;
var flagNota = false;
var flagAprovacao = false;


function adicionarAluno(nome) {
    /*Essa função irá receber uma *string* que é nome do aluno a ser criado. 
      E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
      A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.*/

    // Cria o objeto aluno para um novo aluno
    alunosDaEscola.push({
        nome: nome,
        notas: [],
        cursos: [],
        faltas: 0
    })
    console.log("Aluno " + nome + " adicionado ao sistema com SUCESSO!\n")
}

function listarAlunos(arrayAlunos) {
    /*Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema. 
  Vale dizer que As informações deverão ser exibidas em um formato amigável.*/

    //Lista todos os alunos cadastrados no sistema. Em caso de modificação de dados essa função é utilizada para listar o(s) aluno(s) necessários.
    if (!flagBusca) {
        console.log("\nExiste(m) " + arrayAlunos.length + " aluno(s) cadastrado(s) no sistema")
    }
    flagBusca = false;
    //percorre cada um dos elementos do array de alunos e apresenta de forma amigável ao usuário
    arrayAlunos.forEach(function (aluno) {
        console.log("\nAluno: " + aluno.nome);
        // verifica se há dados em cursos, notas e faltas apresenta os mesmos de forma amigável ao usuário
        if (aluno.cursos != "") {
            aluno.cursos.forEach(function (curso) {
                let data = curso.dataMatricula;
                let dataConsole = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();
                console.log("Curso Matriculado: " + curso.nomeDoCurso + " na data " + dataConsole);
            })
        } else {
            console.log("Cursos Matriculado: **Aluno ainda não matriculado**")
        }
        if (aluno.notas != "") {
            console.log("Notas do aluno: " + aluno.notas)
        } else {
            console.log("Notas do aluno: **Aluno ainda não recebeu notas**")
        }
        console.log("Faltas do aluno: " + aluno.faltas);
        console.log("")
        console.log("=+".repeat(25))
    })
}

function buscarAluno(nomeBusca) {
    /* Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno. Ela deverá exibir um feedback, tanto para quando encontrar o aluno, tanto quando não encontrar. E deverá devolver um aluno em seu retorno. */

    //filtra o array base e retorna um novo array com todos os objetos de alunos que satisfazem o nome buscado
    var alunos = alunosDaEscola.filter(aluno => aluno.nome === nomeBusca)
    if (alunos != "") {
        flagBusca = true;
        // retorna todos os alunos encontrados
        if (!flagMatricula & !flagFalta & flagNota & flagAprovacao) {
            console.log("\nForam encontrados " + alunos.length + " aluno(s) com o nome buscado")
            listarAlunos(alunos);
            flagMatricula = false;
        }
        //retorna o array com os objetos alunos encontrados para utilização nas demais funções
        return alunos;
    } else {
        //retorna mensagem de erro caso não encontre nenhum objeto aluno com o nome buscado
        if (!flagMatricula & !flagFalta & flagNota & !flagAprovacao) {
            console.log("Não foram encontrados alunos com o nome buscado");
        }
    }
}

function matricularAluno(aluno, curso) {
    /* Essa funcionalidade irá permitir, cadastrar um aluno em um curso. 
    Essa função só poderá ser executada em um aluno já devidamente cadastrado no sistema, e deverá armazenar a data atual no momento da matricula
    Lembre-se de exibir o feedback para o usuário. */
    flagMatricula = true;
    // matricula um aluno no curso informado na data vigente. Inserido no inicio do array [cursos] para que seja exibido em ordem decrescente de matrícula
    let alunos = buscarAluno(aluno);
    if (alunos != undefined) {
        alunos.forEach(function (aluno) {
            aluno.cursos.unshift({
                nomeDoCurso: curso,
                dataMatricula: new Date
            })
        })
        console.log("Aluno(s) matriculado(s) com SUCESSO!")
        listarAlunos(alunos);
    } else {
        console.log("Não foi possível realizar a matrícula de " + aluno + ". Aluno(s) ainda não cadastrado(s) no sistema!")
    }
}

function aplicarFalta(aluno) {
    /*
     Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá incrementar uma falta ao aluno. Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar falta em aluno se o mesmo tiver matriculado em um curso.
    */
    flagFalta = true;
    let alunos = buscarAluno(aluno);
    if (alunos != undefined) {
        //aplica falta a todos os alunos encontrados se forem encontrados objetos alunos com os paramentros fornecidos e se os alunos estiverem matriculados
        alunos.forEach(function (aluno) {
            if (aluno.cursos != "") {
                aluno.faltas++;
                console.log("Falta(s) aplicada(s) com SUCESSO!")

            } else {
                //retorna mensagem de erro caso o aluno não esteja matriculado em um curso.
                console.log("Não foi possível aplicar falta à " + aluno + ". Aluno(s) não matriculado(s) em um curso!");
            }
        })
        listarAlunos(alunos);
    } else {
        //retorna mensagem de erro caso o aluno não esteja cadastrado no sistema.
        console.log("Não foi possível aplicar falta à " + aluno + ". Aluno(s) não cadastrado(s) no sistema!")
    }
}

function aplicarNota(aluno, ...nota) {
    /*
     Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá adicionar uma nota ao aluno na sua lista de notas. Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar nota em aluno se o mesmo tiver matriculado em um curso.
    */
    flagNota = true;
    let alunos = buscarAluno(aluno);
    if (alunos != undefined) {
        //atribui nota a todos os alunos encontrados se forem encontrados objetos alunos com os paramentros fornecidos e se os alunos estiverem matriculados
        alunos.forEach(function (aluno) {
            if (aluno.cursos != "") {
                aluno.notas.unshift(...nota)
                console.log("Notas(s) aplicada(s) com SUCESSO!")
            } else {
                //retorna mensagem de erro caso o aluno não esteja matriculado em um curso.
                console.log("Não foi possível aplicar nota à " + aluno.nome + ". Aluno(s) não matriculado(s) em um curso!");
            }
        })
        listarAlunos(alunos);
    } else {
        //retorna mensagem de erro caso o aluno não esteja cadastrado no sistema.
        console.log("Não foi possível aplicar nota à " + aluno + ". Aluno(s) não cadastrados(s) no sistema!");
    }
}

function aprovarAluno(aluno) {
    /* 
    Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se o mesmo está aprovado ou não. Os critérios de aprovação são: ter no máximo 3 faltas e média 7 em notas.
    Só o aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.
    */
    flagAprovacao = true;
    let aprovado = false;
    let alunos = buscarAluno(aluno);
    if (alunos != undefined) {
        alunos.forEach(function (aluno) {
            if (aluno.cursos != "" & aluno.notas != "") {
                let media = (aluno.notas.reduce((somaNotas, nota) => somaNotas + nota)) / (aluno.notas.length)
                if (media >= 7) {
                    if (aluno.faltas <= 3) {
                        aprovado = true;
                    } else {
                        console.log("Aluno REPROVADO por número de faltas maior que 3.");
                        console.log("Faltas do Aluno: " + aluno.faltas);
                        aprovado = false
                    }
                } else {
                    console.log("Aluno REPROVADO por média das notas menor que 7.0");
                    console.log("Média das notas do aluno: " + media.toPrecision(2));
                    aprovado = false;
                }
                if (aprovado) {
                    console.log("Aluno " + aluno.nome + " APROVADO com média de notas " + media.toPrecision(2) + " e " + aluno.faltas + " falta(s).")
                } else {
                    console.log("Reproved")
                }
            } else {
                console.log("Não foi possível avaliar o(s) aluno(s) " + aluno.nome + ". Aluno(s) ainda matrículado(s) ou notas não atribuída(s)!");
            }
        })
    } else {
        console.log("Não foi possível avaliar o(s) aluno(s) " + aluno + ". Aluno(s) ainda não cadastrado(s) no sistema!")
    }
}

//Estrutura de testes da Plataforma

// adicionarAluno("Pedro")
// adicionarAluno("Pedro")
// matricularAluno("Pedro", "Fullstack")
// aplicarFalta("Pedro")
// aplicarNota("Pedro", 7, 9, 10, 2)
// aprovarAluno("Pedro")