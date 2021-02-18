'use strict'

class createProject {
  get rules () {
    return { 
      file_sql: 'required|file|file_ext:sql|file_size:2mb',
      project_name: 'required'
    }
  }

  get messages () {
    return {
      'file_sql.required': 'You must provide the name of the BD.', 
      'project.required': 'You must provide the name of the project.'
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages[0].message)
  }
}

module.exports = createProject
