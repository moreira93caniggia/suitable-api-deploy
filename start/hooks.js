const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Response = use('Adonis/Src/Response') 
  const responses = [
    { status: 200, name: 'ok', defaultMessage: null },
    { status: 201, name: 'created', defaultMessage: 'Successfully created' },
    { status: 400, name: 'badRequest', defaultMessage: 'Could not perform the operation!' },
    { status: 401, name: 'unauthorized', defaultMessage: 'unauthorized' },
    { status: 403, name: 'forbidden', defaultMessage: 'forbidden' },
    { status: 404, name: 'notFound', defaultMessage: 'notFound' },
    { status: 500, name: 'internalServer', defaultMessage: 'Internal server error' }
  ]

  responses.forEach((res) => {
    Response.macro(res.name, function (data, overrideDefaults = { status: null, message: null }) {
      this.status(overrideDefaults.status || res.status).json({
        message: overrideDefaults.message || res.defaultMessage,
        object: data
      })
    })
  })
})

hooks.after.providersRegistered(() => {
  const Validator = use('Validator') 
})
