export class StorageHelper {

  static getFromStorage(storageId) {
    const stringifiedFile = localStorage.getItem(storageId);
    if (stringifiedFile) {
      try {
        return JSON.parse(stringifiedFile);
      } catch (e) {
        console.log('error to parse from storage id ', storageId);
      }
    }
  }

  static addToStorage(file: any, storageId: string) {
    localStorage.setItem(storageId, JSON.stringify(file));
  }

  static removeFromStorage(storageId) {
    localStorage.removeItem(storageId);
  }

  //session storage
  static getFromSessionStorage(storageId) {
    const stringifiedFile = sessionStorage.getItem(storageId);
    if (stringifiedFile) {
      try {
        return JSON.parse(stringifiedFile);
      } catch (e) {
        console.log('error to parse from storage id ', storageId);
      }
    }
  }

  static addToSessionStorage(file: any, storageId: string) {
    sessionStorage.setItem(storageId, JSON.stringify(file));
  }

  static removeFromSessionStorage(storageId) {
    sessionStorage.removeItem(storageId);
  }

}