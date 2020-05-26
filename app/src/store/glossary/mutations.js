export function setGlossary(state, glossary) {
  state.glossary = glossary
}

export function addNewGlossaryItem(state, glossaryItem) {
  state.glossary.push(glossaryItem)
}

export function editGlossaryItem(state, payload) {
  let elem = state.glossary.filter(g => g.id == payload.id)[0]
  let elemIndex = state.glossary.indexOf(elem)
  state.glossary[elemIndex] = payload
}