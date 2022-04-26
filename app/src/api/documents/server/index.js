import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchDocuments (id) {
  return axiosInstance
    .get('/documents?filter[include][0][relation]=pictures&filter[include][1][relation]=documentType&filter[where][userId]=' + id)
    .then(response => { return response.data })
    .catch(error_handler)
},
fetchCompletionDocuments () {
  return axiosInstance
    .get('/completed-intervention-documents')
    .then(response => { return response.data })
    .catch(error_handler)
},
fetchShareableDocuments (id) {
  return axiosInstance
    .get('/documents?filter[include][0][relation]=pictures&filter[include][1][relation]=documentType&filter[where][and][2][userId]=' + id + '&filter[where][and][3][shareable]=true')
    .then(response => { return response.data })
    .catch(error_handler)
},
saveDocument (document) {
  console.log("call to save to DB")
  console.log(document)
  // create fake id here
  const savingDocument = JSON.parse(JSON.stringify(document, ['documentTypeId', 'validated', 'expirationDate', 'uploadedByMe', 'validatedByTenant', 'validatedByUser', 'userTenant', 'userId', 'validationDate','shareable']))

  return axiosInstance
    .post('/documents', savingDocument)
    .then(response => response.data)
    .catch(error_handler)
},
saveDocumentPictures (pictures, doc_id) {
  console.log("call to save to DB")
  console.log(process)
  // create fake id here
  const savingPicture = JSON.parse(JSON.stringify(pictures, ['docId', 'picture', 'order']))

  return axiosInstance
    .post('/documents/' + doc_id + '/document-pictures', savingPicture)
    .then(response => response.data)
    .catch(error_handler)
},
saveInterventionDocument(id_doc, id_intervention){
  console.log("call to save to completed intervention doc to DB")
  // create fake id here
  const savingDOc = {idDocument: id_doc, idIntervention: id_intervention}
  console.log("I am the completed document")
  console.log(savingDOc)


  return axiosInstance
    .post('/completed-intervention-documents/' , savingDOc)
    .then(response => response.data)
    .catch(error_handler)
}
}


