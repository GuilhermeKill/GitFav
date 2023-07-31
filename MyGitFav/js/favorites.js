import { GithubUser } from "./githubUser.js"
import { FavoritesView } from "./favoritesview.js"

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username){
        try{
            const userExist = this.entries.find(entry => entry.login === username)  

            if(userExist){
                throw new Error('Usuário já cadastrado')
            }

            const user = await GithubUser.search(username)
        
            if(user.login === undefined){
                throw new Error('Usuário não encontrado')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        }catch(error){
            alert(error.message)
        }
    }

    delete(user){
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        
        this.entries = filteredEntries
        this.update()
        this.save()
    }
    


}