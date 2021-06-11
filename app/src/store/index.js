import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import example from './module-example'
import documents from './documents'
import auth from './auth'
import features from './features'
import flows from './flows'
import topic from './topic'
import glossary from './glossary'
import statistics from './statistics'
import document_type from './document_type'
import integration_category from './integration_category'
import user_type from './user_type'
import integration_type from './integration_type'
import language from './language'
import steps from './steps'
import steplinks from './steplinks'
import graphs from './graphs'
import user from './user'
import ngo_user from './ngo_user'
import survey from './survey'
import intervention_plan from './intervention_plan'
import intervention from './intervention'
import information from './information'
import information_category from './information_category'
import settings from './settings'
import comments from './comments'
import event from './event'
import event_category from './event_category'
import consent from './consent'
import tenant from './tenant'
import picture_hotspots from './picture_hotspots'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      auth,
      documents,
      features,
      glossary,
      flows,
      topic,
      statistics,
      document_type,
      integration_category,
      user_type,
      integration_type,
      language,
      steps,
      steplinks,
      graphs,
      user,
      ngo_user,
      survey,
      intervention_plan,
      information,
      settings,
      information_category,
      intervention,
      comments,
      event,
      event_category,
      consent,
      tenant,
      picture_hotspots
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [createPersistedState({
      paths: ['auth', 'user.userPic']
    })]
  })

  return Store
}
