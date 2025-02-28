const getImageType = (base64String) => {
  const match = base64String.match(/^data:(image\/\w+);base64,/);
  return match ? match[1] : null;
};

const cleanBase64 = (base64String) => {
  return base64String.replace(/^data:image\/\w+;base64,/, "");
};

const base64ToFile = (base64String) => {
  const mimeType = getImageType(base64String);
  const byteCharacters = atob(cleanBase64(base64String));
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const file = new Blob([byteArray], { type: mimeType });

  return file;
};

export default base64ToFile;

