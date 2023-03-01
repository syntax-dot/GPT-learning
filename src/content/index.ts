console.info('chrome-ext template-vue-ts content script')

function selectElement(element: Element) {}

function getQuestion(): string | void {
  const tplayerFormulation = document.querySelector('#tplayer_formulation')
  // const tplayerFormulationContent = tplayerFormulation ? tplayerFormulation.innerHTML : null

  // if (tplayerFormulationContent) return 'Вопрос: ' + tplayerFormulationContent
  return 'Вопрос: При гашении частного права, в первую очередь, учитываются'
}

function getAnswers(): string[] | void {
  // const tplayerContent = document.getElementById('tplayer_content')
  // const spanElements = tplayerContent ? tplayerContent.getElementsByTagName('span') : null

  // if (!spanElements) return

  // return Array.from(spanElements)
  //   .filter((span) => span.textContent?.trim().length)
  //   .map((answer, index) => index + 1 + ')' + answer)

  return [
    '1) задолженность, обеспеченная залогом',
    '2) внеочередные расходы',
    '3) исчезновение приобретения, отчуждения имущества',
    '4) займы, кредиты',
  ]
}

function getQuestionType(): string[] | void {
  // const tplayerContent = document.getElementById('tplayer_content')
  // const spanElements = tplayerContent ? tplayerContent.getElementsByTagName('span') : null
  // if (!spanElements) return
  // return Array.from(spanElements)
  //   .filter((span) => span.textContent?.trim().length)
  //   .map((answer, index) => index + 1 + ')' + answer)
}

function getQuery(): string {
  const question = getQuestion()
  const answers = getAnswers()
  return [
    question,
    'Ответы:',
    ...(answers ?? []),
    'Выберите единственно возможный вариант ответа',
  ].join('\n') // getQuestionType
}

export async function sendRequest(): Promise<string> {
  const apiKey = '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'
  const prompt = getQuery()
  console.log(prompt)
  // navigator.clipboard.writeText(prompt)

  const url = 'https://api.openai.com/v1/engines/davinci-codex/completions'
  const data = {
    prompt: prompt,
    max_tokens: 300,
    temperature: 0.7,
    n: 1,
    stop: '\n',
  }

  const { choices } = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))

  console.log(choices[0].text.trim())
  console.log(choices)

  return choices[0].text.trim() ?? 'Возникла ошибка!'
}

export {}
