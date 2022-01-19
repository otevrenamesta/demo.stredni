export default `
- name: name
  label: název projektu
  component: finput
  placeholder: dobře ho promyslete, měl by být výstižný
  rules: required
  class: is-full

- name: count
  label: počet jednotek
  component: finput
  type: number
  placeholder: kolik toho bude potřeba ...
  rules: required
  class: is-half

- name: price
  label: cena za jednotku
  component: finput
  type: number
  placeholder: kolik to stojí ...
  rules: required
  class: is-half

- name: link
  label: odkaz
  component: finput
  type: number
  class: is-full
  placeholder: odkaz na eshop ...
`