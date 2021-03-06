// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'Local',
  production: false,
  hmr: true,
  zendesk: {
    redirect: 'https://cardihab.zendesk.com/access/jwt?jwt=',
    widget: ''
  },
  sentry: {
    dsn: 'https://95accab82aff4321afe02b44d1ae0b20@sentry.io/1390927'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
