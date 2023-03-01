console.info('chrome-ext template-vue-ts content script')

function getQuestion(): string | void {
  // const tplayerFormulation = document.querySelector('#tplayer_formulation')
  // const tplayerFormulationContent = tplayerFormulation ? tplayerFormulation.innerHTML : null

  // if (tplayerFormulationContent) return 'Вопрос: ' + tplayerFormulationContent
  return 'Вопрос: Система управления персоналом организации НЕ включает следующие функциональные подсистемы'
}

function getAnswers(): string[] | void {
  // const tplayerContent = document.getElementById('tplayer_content')
  // const spanElements = tplayerContent ? tplayerContent.getElementsByTagName('span') : null

  // if (!spanElements) return

  // return Array.from(spanElements)
  //   .filter((span) => span.textContent?.trim().length)
  //   .map((answer, index) => index + 1 + ')' + answer)

  return [
    '1) анализа и совершенствования стимулирования и мотиваций персонала',
    '2) трудовых отношений',
    '3) условий труда',
    '4) стратегии управления',
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

function getQuery() {
  const question = getQuestion()
  const answers = getAnswers()
  return [question, 'Ответы:', answers?.join('/n'), 'Выберите единственно возможный вариант ответа'] // getQuestionType
}

async function sendRequest() {
  const apiKey = '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'
  const prompt = getQuery()

  const url = 'https://api.openai.com/v1/engines/davinci-codex/completions'
  const data = {
    prompt: prompt,
    max_tokens: 60,
    temperature: 0.7,
    n: 1,
    stop: '\n',
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      const message = data.choices[0].text.trim()
      console.log(message)
    })
    .catch((error) => console.error(error))
}

export {}
