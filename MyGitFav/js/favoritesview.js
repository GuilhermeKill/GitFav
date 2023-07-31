import { GithubUser } from "./githubUser.js";
import { Favorites } from "./favorites.js";

export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        
        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onadd()
    }

    onadd(){
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')

            this.add(value)
        }
    }

    update(){
        this.removeAllTr()

        this.entries.forEach( user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOK = confirm('Tem certeza que deseja deletar essa linha?')
                if(isOK){
                    this.delete(user)
                }
            }

            this.tbody.append(row)

        })
    }

    createRow(){
        const tr = document.createElement('tr')

        tr.innerHTML = `
            <td class="user">
                <img src="https://github.com/GuilhermeKill.png" alt="">
                <a href="https://github.com/GuilhermeKill" target="_blank">
                <p>Guilherme Reis Kill</p>
                <span>GuilhermeKill</span>
            </a>
            </td>
                <td class="repositories">500</td>
                <td class="followers">1258</td>
            <td>
                <button class="remove">Remover</button>
            </td>
        
        `
        return tr
    }







    removeAllTr(){
        this.tbody.querySelectorAll('tr').forEach(tr => tr.remove())
    }


}






