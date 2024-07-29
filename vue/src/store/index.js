import { createStore } from "vuex";


const store = createStore({

    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        }
    },
    getters: {},
    actions: {
        register({commit}, user) {
          return fetch('http://127.0.0.1:8000/api/register',{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify(user),
          })
          .then((resp) => resp.json() )
          .then((resp) => {
            commit("setUser", resp);
          });
        },
    },

    mutations:{

        setUser: (state, userData) => {
            state.user.data = userData.user;
            state.user.token = userData.token;
            sessionStorage.setItem('TOKEN', userData.token);
          },
        setToken: (state, token) => {
        state.user.token = token;
        sessionStorage.setItem('TOKEN', token);
          },

        logout: (state) => {
            state.user.token = sessionStorage.setItem('TOKEN', null);
            state.user.data = {};
        },
    },
    modules:{}

})

export default store;