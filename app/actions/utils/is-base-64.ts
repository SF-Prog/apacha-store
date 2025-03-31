export function isBase64Image(imageString) {
  // Regular expression to check for base64 image data URL
  const regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,[A-Za-z0-9+/=]+$/;

  // Check if the string matches the base64 data URL pattern
  if (regex.test(imageString)) {
    try {
      // Extract the base64 part from the string and try to decode it
      const base64Data = imageString.split(',')[1];
      // Check if the base64 part is a valid base64 string
      atob(base64Data);  // `atob` throws an error if the string is not valid base64
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}