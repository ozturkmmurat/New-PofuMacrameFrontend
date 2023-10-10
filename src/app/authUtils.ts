class FirebaseAuthBackend {

    constructor(firebaseConfig: any) {
       
    }

   
    setLoggeedInUser = (user: any) => {
        sessionStorage.setItem('authUser', JSON.stringify(user));
    }

    /**
     * Returns the authenticated user
     */
    getAuthenticatedUser = () => {
        if (!sessionStorage.getItem('authUser')) {
            return null;
        }
        return JSON.parse(sessionStorage.getItem('authUser')!);
    }

    /**
     * Handle the error
     * @param {*} error
     */
    _handleError(error: any) {
        // tslint:disable-next-line: prefer-const
        var errorMessage = error.message;
        return errorMessage;
    }
}

// tslint:disable-next-line: variable-name
let _fireBaseBackend: FirebaseAuthBackend | null = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = (config: any) => {
    if (!_fireBaseBackend) {
        _fireBaseBackend = new FirebaseAuthBackend(config);
    }
    return _fireBaseBackend;
};

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
    return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };
