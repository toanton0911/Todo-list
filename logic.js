const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const userKey = 'TodoData'

const userInput = $('.add-section__input')
const addBtn = $('.add-section__submit')
const ulElement = $('.todo-list')
const app = {
    getDataStorage: localStorage.getItem(userKey) || [],
    userData: JSON.parse(localStorage.getItem(userKey)),
    render: function () {
        const renderHtml = this.userData.map( (element,index) => {
            return `
                <li class="todo-item" data-set=${index}>
                    <p class="todo-item__text">
                        ${index+1}. ${element}
                    </p>
                    <span class="todo-item__delete">Delete</span>
                </li>
            `
        })
        ulElement.innerHTML = renderHtml.join('')
    },

    handleEvent: function() {
        const _this = this
        // add new todo task

        userInput.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault()
                addBtn.click()
            }
        })
        addBtn.onclick = function () {
            if (userInput.value.trim() != 0) {
                _this.addTodo()
                userInput.value = ''
                userInput.focus()
                _this.render()
            }
        }

        // delete todo task

        ulElement.onclick = function (e) {
            if (e.target.closest('.todo-item__delete')) {
                const deleteIndex = e.target.parentElement.getAttribute('data-set')
                _this.deleteTodo(deleteIndex)
                _this.render()
            }
        }
    },

    addTodo: function() {
        this.userData.push(userInput.value)
        localStorage.setItem(userKey, JSON.stringify(this.userData))
    },

    deleteTodo: function(index) {
        this.userData.splice(index, 1)
        localStorage.setItem(userKey, JSON.stringify(this.userData))
    },

    start: function() {

        this.handleEvent()

        this.render()
    }      
}

app.start()
