/*
export function someMutation (state) {
}
*/

export function setSteps (state, steps) {
  state.steps = steps
}

export function addNode (state, step) {
  state.steps.push(step)
}

export function changeStep (state, step) {
  //  state.graphs.elements.push(node)
  step.is_edited = true
  let editingIndex = state.steps.findIndex(entry => entry.id == step.id)
  console.log(editingIndex)
  state.steps.splice(editingIndex, 1, JSON.parse(JSON.stringify(step)))

}

export function deleteStep (state, id) {
  const deletingStep = state.steps.filter(step => { return step.id === id })[0];
  const index = state.steps.findIndex(item => item.id === id);

  if (deletingStep.is_new) {
    // since it is new I can delete without problem bacause it is not in the DB
    state.steps.splice(index, 1)

  } else {
    // since is not new I wil have to keep it to delete it from the DB
    deletingStep.to_delete = true
    state.steps.splice(index, 1, JSON.parse(JSON.stringify(deletingStep)))
  }
}


export function editSteps (state, steps) {
  console.log("update the state")
  const index = state.steps.findIndex(item => item.id === steps.id);
  if (index !== -1) state.steps.splice(index, 1, steps);
}

export function saveSteps (state, steps) {
  console.log("save to the state")
  console.log(steps)

  state.steps.push(steps);
  console.log(state.steps)
}

export function deleteSteps (state, index) {
  const idx = state.steps.findIndex(item => item.id === index);
  if (idx !== -1) state.steps.splice(idx, 1);
}

export function setStepIcons (state, step_icons) {
  console.log("IN ICONS MUTATION")
  console.log(step_icons)
      var icons = step_icons.filter((icon)=>{
        return icon.relatedEntity == 2
      })
      state.step_icons = icons
    }
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
