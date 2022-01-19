export default `
- name: name
  label: název projektu
  component: finput
  placeholder: dobře ho promyslete, měl by být výstižný
  rules: required
  class: is-full

- name: desc
  label: stručný popis projektu
  component: ftextarea
  rows: 4
  placeholder: stručný popis, který detailně rozvedete dále ...
  rules: required
  class: is-full

- name: content
  label: úplný popis projektu, rozvedení stručného popisu do podrobnějších detailů
  component: ftextarea
  rows: 8
  placeholder: tak do toho ... ;)
  rules: required
  class: is-full
  
- name: budget
  label: rozpočet projektu, opřený o nějakou referenci (eshop, konzultace se řemeslníkem)
  component: budgeteditor
  rules: required
  class: is-full

- name: poloha
  label: poloha ve formatu
  component: finput
  rules: required

- name: photo
  label: odkaz na fotografii
  component: finput
  rules: required
`