import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {

    // Url des Authorization-Servers
    // issuer: 'https://auth.dev.escience.uni-freiburg.de/realms/dataplant',
    issuer: 'https://auth.nfdi4plants.org/realms/dataplant',

    // Url der Angular-Anwendung
    // An diese URL sendet der Authorization-Server den Access Code
    // redirectUri: window.location.origin + '/index.html',
  redirectUri: window.location.origin + '/login',

    // Name der Angular-Anwendung
    clientId: 'archigator',

    // Rechte des Benutzers, die die Angular-Anwendung wahrnehmen möchte
    scope: 'profile email',

    // Code Flow (PKCE ist standardmäßig bei Nutzung von Code Flow aktiviert)
    responseType: 'code',

    showDebugInformation: true,
    sessionChecksEnabled: true,
    clearHashAfterLogin: true,
    requireHttps: false,
}
