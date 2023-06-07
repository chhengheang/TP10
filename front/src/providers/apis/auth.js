const auth={
    async getMe(){
        const res=await fetch("http://localhost:3001/me",{
            method:'GET',
            credentials: 'include',
            headers:{
                "Content-type": "application/json",
                Origin: "http://localhost:3000",
            }
        })
        const result=await res.json();
        // if(result?.success ==false) return false;
        // return result;

        return result.success
    }
}

export default auth;