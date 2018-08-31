import { config } from './common';

const backEndUrl = "http://app-24f6f6e2-ba85-43d5-8166-24bc7eabcb95.cleverapps.io/"

export const environment = Object.assign({
  production: true,
  baseUrl: `${backEndUrl}`,
  publierAnnonceUrl: `${backEndUrl}api/publier_annonce`,
  listerAnnonceUrl: `${backEndUrl}api/listerannonce`
}, config);
