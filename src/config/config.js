const encryptedUrl = "aHR0cDovL2xvY2FsaG9zdDo2MDkw";

function decryptUrl(encrypted) {
  return atob(encrypted);
}

export const BASE_URL = decryptUrl(encryptedUrl);
