export type AreaKey = "exatas" | "humanas" | "biologicas" | "tecnologia";

export const AREAS: Record<AreaKey, { nome: string; descricao: string; cursos: string[] }> = {
  exatas: {
    nome: "Exatas e Engenharias",
    descricao:
      "Você gosta de resolver problemas concretos, calcular, projetar e ver a teoria virar coisa real.",
    cursos: ["Engenharia Civil", "Engenharia Mecânica", "Engenharia Elétrica", "Matemática"],
  },
  humanas: {
    nome: "Humanas e Gestão",
    descricao:
      "Você se conecta com pessoas, ideias e organização — liderar, comunicar e planejar são seu terreno.",
    cursos: ["Administração", "Letras", "Licenciaturas", "Engenharia de Produção"],
  },
  biologicas: {
    nome: "Biológicas e Ambientais",
    descricao:
      "Você tem curiosidade pela vida, pela natureza e por soluções sustentáveis para o planeta.",
    cursos: ["Engenharia Ambiental", "Engenharia de Bioprocessos", "Química", "Agronomia"],
  },
  tecnologia: {
    nome: "Tecnologia e Computação",
    descricao:
      "Você pensa em sistemas, dados e automação: criar tecnologia que resolve é o que te move.",
    cursos: ["Ciência da Computação", "Engenharia de Software", "Sistemas de Informação", "Eng. de Computação"],
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
