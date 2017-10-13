export class SessionManager{

     static sessionData = new Map();

     static getSessionValue(key){
               if(SessionManager.sessionData.has(key))
                    return SessionManager.sessionData.get(key);
               return null;
     }

     static setSessionValue(key,value){
          SessionManager.sessionData.set(key,value);
     }

     static clearSession(){
          SessionManager.sessionData.clear();
    }

    // this method is for testing and will be removed
    static getSessionObject(){
         return SessionManager.sessionData;
    }
}
