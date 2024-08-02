export const environment = {
    production: false,
    apiUrl: 'http://complaintdrupal.local/oauth/token',

    investigationListURL: 'http://complaintdrupal.local/rest/investigation/list',
    addInvestigationListURL: 'http://complaintdrupal.local/rest/investigation/list/add',
    deleteInvestigationURL: 'http://complaintdrupal.local/rest/investigation/list/delete/',
    getInvestigationURL: 'http://complaintdrupal.local/api/get-investigation-resource/',

    reportListURL: 'http://complaintdrupal.local/rest/report/list',
    addReportListURL: 'http://complaintdrupal.local/rest/report/create',
    deleteReportURL: 'http://complaintdrupal.local/rest/report/delete/',
    getReportURL: 'http://complaintdrupal.local/rest/report/list',

    addStepURL: 'http://complaintdrupal.local/api/get-investigation-resource/update/',
    updateStepURL: 'http://complaintdrupal.local/api/update-assessment/',
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret'
  };