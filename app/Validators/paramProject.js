'use strict'

class paramProject {
  get rules () {
    return {  
      project: 'required'
    }
  }

  get messages () {
    return { 
      'project.required': 'You must provide the name of the project.'
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages[0].message)
  }
}

module.exports = paramProject
