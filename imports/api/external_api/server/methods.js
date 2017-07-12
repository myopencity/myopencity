const Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

Api.addRoute('consults', {authRequired: false}, {
  get: function(){
    return {consults: 'trololo'}
  }
})
