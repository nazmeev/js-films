class AuthModule{

    constructor(){
        this.auth; //используется снаружи
    }

    logOut(){
        sessionStorage.removeItem('auth');
        location.reload();
    }

    checkAuth() {
        return (sessionStorage.getItem('auth') == 'authorized') ? this.auth = true : this.auth = false;  //поэтому так
        // return (sessionStorage.getItem('auth') == 'authorized');
    }
}