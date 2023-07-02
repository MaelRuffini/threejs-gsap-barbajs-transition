import './styles/style.css'
import barba from '@barba/core'
import webgl from './webgl'

// BarbaJS
barba.init({
    transitions: [{
      name: 'default-transition',
      once() {
        webgl()
      },
      leave() {},
      enter() {}
    }],
    views: [
        {
            namespace: 'home',
            beforeEnter() {
                sessionStorage.setItem('page', 'home')
            }
        },
        {
            namespace: 'about',
            beforeEnter() {
                sessionStorage.setItem('page', 'about')
            }
        },
        {
            namespace: 'contact',
            beforeEnter() {
                sessionStorage.setItem('page', 'contact')
            }
        }
    ]
})