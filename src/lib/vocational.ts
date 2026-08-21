export type AreaKey = "exatas" | "humanas" | "biologicas" | "tecnologia";

export const AREAS: Record<AreaKey, { nome: string; descricao: string; cursos: string[] }> = {
  exatas: {
    nome: "Engenharias e Ciências Exatas",
    descricao:
      "Você gosta de resolver problemas concretos, calcular, projetar e ver a teoria virar coisa real.",
    cursos: [
      "Engenharia Civil - Apucarana (Diurno)",
      "Engenharia Civil - Campo Mourão (Integral)",
      "Engenharia Civil - Curitiba (Integral)",
      "Engenharia Civil - Guarapuava (Diurno)",
      "Engenharia Civil - Pato Branco (Diurno)",
      "Engenharia Civil - Toledo (Diurno)",
      "Engenharia Elétrica - Apucarana (Integral)",
      "Engenharia Elétrica - Cornélio Procópio (Diurno)",
      "Engenharia Elétrica - Curitiba (Diurno e Integral)",
      "Engenharia Elétrica - Medianeira (Manhã)",
      "Engenharia Elétrica - Pato Branco (Diurno)",
      "Engenharia Elétrica - Ponta Grossa (Diurno)",
      "Engenharia Mecânica - Cornélio Procópio (Diurno)",
      "Engenharia Mecânica - Curitiba (Diurno e Integral)",
      "Engenharia Mecânica - Guarapuava (Diurno)",
      "Engenharia Mecânica - Londrina (Diurno)",
      "Engenharia Mecânica - Pato Branco (Diurno)",
      "Engenharia Mecânica - Ponta Grossa (Diurno)",
      "Engenharia Eletrônica - Campo Mourão (Noite)",
      "Engenharia Eletrônica - Cornélio Procópio (Diurno)",
      "Engenharia Eletrônica - Curitiba (Integral)",
      "Engenharia Eletrônica - Toledo (Diurno)",
      "Engenharia Mecatrônica - Curitiba (Diurno)",
      "Engenharia Mecatrônica - Guarapuava (Noite)",
      "Engenharia Mecatrônica - Ponta Grossa (Noite)",
      "Engenharia de Produção - Curitiba (Integral)",
      "Engenharia de Produção - Londrina (Integral)",
      "Engenharia de Produção - Medianeira (Manhã)",
      "Engenharia de Produção - Ponta Grossa (Diurno)",
      "Engenharia de Controle e Automação - Cornélio Procópio (Diurno)",
      "Engenharia de Controle e Automação - Curitiba (Diurno)",
      "Engenharia de Materiais - Londrina (Diurno)",
      "Engenharia Cartográfica e de Agrimensura - Pato Branco (Noite)",
      "Engenharia Têxtil - Apucarana (Diurno)",
      "Engenharia Química - Apucarana (Diurno)",
      "Engenharia Química - Londrina (Diurno)",
      "Engenharia Química - Ponta Grossa (Diurno)",
      "Engenharia Química - Francisco Beltrão (Diurno)",
      "Engenharia Química - Campo Mourão (Integral)",
      "Química (Bacharelado/Licenciatura) - Curitiba",
      "Química (Bacharelado/Licenciatura) - Pato Branco",
      "Química (Bacharelado/Licenciatura) - Apucarana",
      "Química (Bacharelado/Licenciatura) - Campo Mourão",
      "Química (Bacharelado/Licenciatura) - Londrina",
      "Química (Bacharelado/Licenciatura) - Medianeira",
      "Licenciatura em Matemática - Cornélio Procópio (Noite)",
      "Licenciatura em Matemática - Curitiba (Manhã)",
      "Licenciatura em Matemática - Pato Branco (Noite)",
      "Licenciatura em Matemática - Toledo (Noite)",
      "Licenciatura em Física - Curitiba (Tarde)",
      "Tecnologia em Automação Industrial - Curitiba (Noite)",
      "Tecnologia em Automação Industrial - Ponta Grossa (Noite)",
      "Tecnologia em Manutenção Industrial - Medianeira (Noite)",
      "Tecnologia em Manutenção Industrial - Pato Branco (Noite)",
      "Tecnologia em Sistemas de Telecomunicações - Curitiba (Noite)",
    ],
  },
  humanas: {
    nome: "Humanas, Negócios e Criatividade",
    descricao:
      "Você se conecta com pessoas, ideias e organização — liderar, comunicar e criar são seu terreno.",
    cursos: [
      "Arquitetura e Urbanismo - Curitiba (Diurno)",
      "Arquitetura e Urbanismo - Guarapuava (Noite)",
      "Design (Bacharelado) - Curitiba (Diurno)",
      "Tecnologia em Design Gráfico - Curitiba (Noite)",
      "Tecnologia em Design de Moda - Apucarana (Manhã)",
      "Administração - Curitiba (Manhã)",
      "Administração - Pato Branco (Noite)",
      "Ciências Contábeis - Pato Branco (Noite)",
      "Comunicação Organizacional - Curitiba (Noite)",
      "Licenciatura em Letras Inglês - Curitiba (Tarde)",
      "Licenciatura em Letras Português - Curitiba (Noite)",
      "Licenciatura em Letras Português-Inglês - Pato Branco (Noite)",
    ],
  },
  biologicas: {
    nome: "Ciências Biológicas, Agrárias e Saúde",
    descricao:
      "Você tem curiosidade pela vida, pela natureza e por soluções sustentáveis para o planeta.",
    cursos: [
      "Agronomia - Dois Vizinhos (Diurno)",
      "Agronomia - Francisco Beltrão (Integral)",
      "Agronomia - Pato Branco (Diurno)",
      "Agronomia - Santa Helena (Diurno)",
      "Engenharia Florestal - Dois Vizinhos (Diurno)",
      "Zootecnia - Dois Vizinhos (Diurno)",
      "Engenharia de Bioprocessos e Biotecnologia - Dois Vizinhos (Diurno)",
      "Engenharia de Bioprocessos e Biotecnologia - Ponta Grossa (Diurno)",
      "Engenharia de Bioprocessos e Biotecnologia - Toledo (Diurno)",
      "Engenharia Ambiental e Sanitária - Campo Mourão (Noite)",
      "Engenharia Ambiental e Sanitária - Curitiba (Diurno)",
      "Engenharia Ambiental e Sanitária - Londrina (Matutino)",
      "Engenharia Ambiental e Sanitária - Medianeira (Noite)",
      "Ciências Biológicas - Dois Vizinhos (Noite)",
      "Ciências Biológicas - Ponta Grossa (Integral)",
      "Ciências Biológicas - Santa Helena (Noite)",
      "Engenharia/Tecnologia em Alimentos - Campo Mourão (Integral/Noite)",
      "Engenharia/Tecnologia em Alimentos - Francisco Beltrão (Diurno)",
      "Engenharia/Tecnologia em Alimentos - Londrina (Noite)",
      "Engenharia/Tecnologia em Alimentos - Medianeira (Manhã/Noite)",
      "Educação Física - Curitiba (Diurno)",
      "Tecnologia em Radiologia - Curitiba (Tarde)",
      "Gestão do Agronegócio - Medianeira (Noite)",
    ],
  },
  tecnologia: {
    nome: "Tecnologia e Computação",
    descricao:
      "Você pensa em sistemas, dados e automação: criar tecnologia que resolve é o que te move.",
    cursos: [
      "Ciência da Computação - Campo Mourão (Integral)",
      "Ciência da Computação - Medianeira (Tarde)",
      "Ciência da Computação - Ponta Grossa (Diurno)",
      "Ciência da Computação - Santa Helena (Diurno)",
      "Engenharia de Computação - Apucarana (Diurno)",
      "Engenharia de Computação - Cornélio Procópio (Diurno)",
      "Engenharia de Computação - Curitiba (Diurno)",
      "Engenharia de Computação - Pato Branco (Integral)",
      "Engenharia de Computação - Toledo (Diurno)",
      "Engenharia de Software - Cornélio Procópio (Noite)",
      "Engenharia de Software - Dois Vizinhos (Noite)",
      "Sistemas de Informação - Curitiba (Integral)",
      "Sistemas de Informação - Francisco Beltrão (Noite)",
      "Sistemas de Informação - Londrina (Noite)",
      "Tecnologia em Análise e Desenvolvimento de Sistemas - Cornélio Procópio (Noite)",
      "Tecnologia em Análise e Desenvolvimento de Sistemas - Pato Branco (Noite)",
      "Tecnologia em Análise e Desenvolvimento de Sistemas - Ponta Grossa (Noite)",
      "Bacharelado em Ciência de Dados e Inteligência Artificial - Londrina (Noite)",
      "Tecnologia em IA e Sistemas Autônomos / IA Aplicada - Campo Mourão (Noite)",
      "Tecnologia em Segurança Cibernética - Medianeira (Noite)",
      "Tecnologia em Sistemas para Internet - Guarapuava (Noite)",
      "Tecnologia em Sistemas para Internet - Toledo (Noite)",
    ],
  },
};


export type Question = {
  id: string;
  pergunta: string;
  opcoes: { texto: string; area: AreaKey }[];
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    pergunta: "O que mais te dá vontade de fazer num sábado livre?",
    opcoes: [
      { texto: "Montar ou consertar alguma coisa", area: "exatas" },
      { texto: "Organizar um evento com amigos", area: "humanas" },
      { texto: "Cuidar de plantas, animais ou trilhar", area: "biologicas" },
      { texto: "Mexer no computador, criar algo digital", area: "tecnologia" },
    ],
  },
  {
    id: "q2",
    pergunta: "Qual matéria da escola te prende mais?",
    opcoes: [
      { texto: "Física e Matemática", area: "exatas" },
      { texto: "História, Sociologia e Redação", area: "humanas" },
      { texto: "Biologia e Química", area: "biologicas" },
      { texto: "Informática e Lógica", area: "tecnologia" },
    ],
  },
  {
    id: "q3",
    pergunta: "Que tipo de problema você gostaria de resolver no futuro?",
    opcoes: [
      { texto: "Construir estruturas e máquinas melhores", area: "exatas" },
      { texto: "Melhorar a vida das pessoas e das cidades", area: "humanas" },
      { texto: "Reduzir impactos ambientais", area: "biologicas" },
      { texto: "Automatizar tarefas com software e dados", area: "tecnologia" },
    ],
  },
  {
    id: "q4",
    pergunta: "Como você prefere trabalhar?",
    opcoes: [
      { texto: "Em campo, laboratório ou obra", area: "exatas" },
      { texto: "Em equipe, conversando e coordenando", area: "humanas" },
      { texto: "Pesquisando e experimentando", area: "biologicas" },
      { texto: "Focado, criando soluções na tela", area: "tecnologia" },
    ],
  },
  {
    id: "q5",
    pergunta: "Um vídeo aparece na sua timeline. Qual você assiste até o fim?",
    opcoes: [
      { texto: "Como uma ponte gigante foi construída", area: "exatas" },
      { texto: "Entrevista sobre comportamento humano", area: "humanas" },
      { texto: "Documentário sobre oceanos", area: "biologicas" },
      { texto: "Tutorial de inteligência artificial", area: "tecnologia" },
    ],
  },
  {
    id: "q6",
    pergunta: "Qual elogio combina mais com você?",
    opcoes: [
      { texto: "Você é muito lógico", area: "exatas" },
      { texto: "Você sabe lidar com as pessoas", area: "humanas" },
      { texto: "Você é curioso e observador", area: "biologicas" },
      { texto: "Você é criativo com tecnologia", area: "tecnologia" },
    ],
  },
  {
    id: "q7",
    pergunta: "Numa feira de ciências, você seria o responsável por:",
    opcoes: [
      { texto: "Construir o protótipo", area: "exatas" },
      { texto: "Apresentar e explicar ao público", area: "humanas" },
      { texto: "Fazer os experimentos", area: "biologicas" },
      { texto: "Programar a parte digital", area: "tecnologia" },
    ],
  },
  {
    id: "q8",
    pergunta: "O que te incomoda mais?",
    opcoes: [
      { texto: "Coisas mal calculadas ou tortas", area: "exatas" },
      { texto: "Injustiça e falta de diálogo", area: "humanas" },
      { texto: "Desperdício e poluição", area: "biologicas" },
      { texto: "Processos manuais e repetitivos", area: "tecnologia" },
    ],
  },
  {
    id: "q9",
    pergunta: "Qual ferramenta você pegaria primeiro?",
    opcoes: [
      { texto: "Uma trena e uma calculadora", area: "exatas" },
      { texto: "Um caderno e um microfone", area: "humanas" },
      { texto: "Um microscópio", area: "biologicas" },
      { texto: "Um notebook", area: "tecnologia" },
    ],
  },
  {
    id: "q10",
    pergunta: "Trabalho em grupo: qual papel você assume?",
    opcoes: [
      { texto: "Quem resolve a parte técnica", area: "exatas" },
      { texto: "Quem organiza e lidera o time", area: "humanas" },
      { texto: "Quem pesquisa a fundo o tema", area: "biologicas" },
      { texto: "Quem monta a solução digital", area: "tecnologia" },
    ],
  },
  {
    id: "q11",
    pergunta: "Que notícia te chama mais atenção?",
    opcoes: [
      { texto: "Nova usina de energia inaugurada", area: "exatas" },
      { texto: "Mudanças na educação do país", area: "humanas" },
      { texto: "Descoberta de uma nova espécie", area: "biologicas" },
      { texto: "Lançamento de um novo app", area: "tecnologia" },
    ],
  },
  {
    id: "q12",
    pergunta: "Você tem R$ 1.000 para um projeto. Gasta em quê?",
    opcoes: [
      { texto: "Materiais e ferramentas", area: "exatas" },
      { texto: "Um evento para a comunidade", area: "humanas" },
      { texto: "Uma horta ou reflorestamento", area: "biologicas" },
      { texto: "Equipamentos e servidores", area: "tecnologia" },
    ],
  },
  {
    id: "q13",
    pergunta: "Como você resolve um problema difícil?",
    opcoes: [
      { texto: "Fazendo contas e testando hipóteses", area: "exatas" },
      { texto: "Conversando com quem entende", area: "humanas" },
      { texto: "Observando padrões na natureza", area: "biologicas" },
      { texto: "Buscando automatizar a solução", area: "tecnologia" },
    ],
  },
  {
    id: "q14",
    pergunta: "Qual ambiente de trabalho te agrada?",
    opcoes: [
      { texto: "Uma fábrica ou canteiro de obras", area: "exatas" },
      { texto: "Uma escola, escritório ou ONG", area: "humanas" },
      { texto: "Um laboratório ou reserva natural", area: "biologicas" },
      { texto: "Uma startup de tecnologia", area: "tecnologia" },
    ],
  },
  {
    id: "q15",
    pergunta: "Qual dessas atividades parece divertida?",
    opcoes: [
      { texto: "Resolver um desafio de física", area: "exatas" },
      { texto: "Debater um tema polêmico", area: "humanas" },
      { texto: "Analisar amostras de água", area: "biologicas" },
      { texto: "Criar um jogo simples", area: "tecnologia" },
    ],
  },
  {
    id: "q16",
    pergunta: "Você é mais reconhecido por:",
    opcoes: [
      { texto: "Precisão e raciocínio rápido", area: "exatas" },
      { texto: "Empatia e boa comunicação", area: "humanas" },
      { texto: "Paciência e atenção a detalhes", area: "biologicas" },
      { texto: "Curiosidade digital e autodidatismo", area: "tecnologia" },
    ],
  },
  {
    id: "q17",
    pergunta: "Se pudesse mudar algo no mundo, seria:",
    opcoes: [
      { texto: "A infraestrutura das cidades", area: "exatas" },
      { texto: "A educação e as desigualdades", area: "humanas" },
      { texto: "A saúde do planeta", area: "biologicas" },
      { texto: "O acesso à tecnologia", area: "tecnologia" },
    ],
  },
  {
    id: "q18",
    pergunta: "Qual disciplina você escolheria como optativa?",
    opcoes: [
      { texto: "Cálculo aplicado", area: "exatas" },
      { texto: "Gestão de pessoas", area: "humanas" },
      { texto: "Ecologia", area: "biologicas" },
      { texto: "Programação", area: "tecnologia" },
    ],
  },
  {
    id: "q19",
    pergunta: "Ao visitar uma empresa, o que você quer ver?",
    opcoes: [
      { texto: "As máquinas e a linha de produção", area: "exatas" },
      { texto: "Como as equipes se organizam", area: "humanas" },
      { texto: "O tratamento de resíduos", area: "biologicas" },
      { texto: "Os sistemas e dados usados", area: "tecnologia" },
    ],
  },
  {
    id: "q20",
    pergunta: "Daqui a 10 anos, você se vê:",
    opcoes: [
      { texto: "Assinando grandes projetos de engenharia", area: "exatas" },
      { texto: "Liderando pessoas e projetos sociais", area: "humanas" },
      { texto: "Pesquisando soluções sustentáveis", area: "biologicas" },
      { texto: "Criando tecnologia usada por milhões", area: "tecnologia" },
    ],
  },
];

export function calcularResultado(respostas: AreaKey[]): AreaKey {
  const contagem = respostas.reduce<Record<string, number>>((acc, area) => {
    acc[area] = (acc[area] ?? 0) + 1;
    return acc;
  }, {});
  let melhor: AreaKey = respostas[0] ?? "tecnologia";
  for (const area of Object.keys(contagem) as AreaKey[]) {
    if ((contagem[area] ?? 0) > (contagem[melhor] ?? 0)) melhor = area;
  }
  return melhor;
}
