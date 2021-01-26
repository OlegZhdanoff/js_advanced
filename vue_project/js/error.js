Vue.component('err', {
    props: ['err1'],
    template: `
<div class="card" v-show="err1">
  <h5 class="card-header">Ошибка!</h5>
  <div class="card-body">
    <h5 class="card-title">Ошибка связи с сервером!</h5>
    <p class="card-text">Попробуйте перегрузить страницу.</p>
  </div>
</div>
    `,
})