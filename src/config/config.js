const encryptedUrl = "aHR0cDovL2xvY2FsaG9zdDo2MDkwL3Yx";
const encryptedProUrl = "aHR0cHM6Ly9teS1icmFuZC1iYWNrZW5kLWFwaXMub25yZW5kZXIuY29tL3Yx";

const isProduction = true;

function decryptUrl() {
  if (isProduction) {
    return atob(encryptedProUrl);
  }

  return atob(encryptedUrl);
}

export const BASE_URL = decryptUrl();
