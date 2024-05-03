const fetchUsersBtn = document.querySelector(".btn__users");
const userList = document.querySelector(".user-list");
const deleteBtn = document.querySelector(".btn__delete");
const usersInput = document.querySelector(".users__input");

fetchUsersBtn.addEventListener("click", () => {
    const inputValue = parseInt(usersInput.value);
    if (!isNaN(inputValue)) {
        fetchUsers()
            .then((users) => renderUsers(users.slice(0, inputValue)))
            .catch((error) => console.log(error));
    }
});

deleteBtn.addEventListener("click", () => {
    clearUserList();
    clearInputValue();
});

function clearInputValue() {
    usersInput.value = "";
}

function fetchUsers() {
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}

function renderUsers(users) {
    clearUserList();
    const markup = users
        .map((user) => {
            return `<li>
              <p><b>Name</b>: ${user.name}</p>
              <p><b>Email</b>: ${user.email}</p>
              <p><b>Company</b>: ${user.company.name}</p>
            </li>`;
        })
        .join("<hr class='hr-style'>");
    userList.insertAdjacentHTML("beforeend", markup);
}

function clearUserList() {
    userList.innerHTML = "";
}

// ==========================
document.getElementById('allButton').addEventListener('click', function() {
    fetchAndFilterData('all');
});

document.getElementById('completedButton').addEventListener('click', function() {
    fetchAndFilterData('completed');
});

document.getElementById('notCompletedButton').addEventListener('click', function() {
    fetchAndFilterData('notCompleted');
});

function fetchAndFilterData(status) {
    fetch('https://6633a4c9f7d50bbd9b4a2c47.mockapi.io/Lab4')
        .then(response => response.json())
        .then(data => {
            const processesList = document.querySelector('.processes__list');

            processesList.innerHTML = '';
            data.forEach(item => {
                if ((status === 'completed' && item.Completed) || (status === 'notCompleted' && !item.Completed) || status === 'all') {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <div class="processes__item">
                            <div class="processes__inner">
                                <p class="processes__title">ID: ${item.id}</p>
                                <h1 class="processes__title">Task: ${item.Title}</h1>
                            </div>
                            <p class="processes__text">${item.Completed ? 'Completed' : 'Not Completed'}</p>
                        </div>
                        <div class="processes__buttons">
                            <button class="processes__delete-btn" data-id="${item.id}">Delete</button>                 
                        </div>
                        <div class="line"></div>
                    `;
                    processesList.appendChild(listItem);
                }
            });

            const deleteButtons = document.querySelectorAll('.processes__delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = button.getAttribute('data-id');
                    deleteItem(itemId);
                });
            });

        })
        .catch(error => console.error('Error fetching data:', error));
}

function deleteItem(itemId) {
    fetch(`https://6633a4c9f7d50bbd9b4a2c47.mockapi.io/Lab4/${itemId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Item deleted successfully:', data);
            // Оновлення списку після видалення елементу
            fetchAndFilterData('all');
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
}

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskStatus = document.querySelector('input[name="taskStatus"]:checked').value;

    postData(taskTitle, taskStatus);

    document.getElementById('taskTitle').value = '';
    document.getElementById('active').checked = false;
    document.getElementById('completed').checked = false;
});

function postData(title, status) {
    fetch('https://6633a4c9f7d50bbd9b4a2c47.mockapi.io/Lab4', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Title: title,
            Completed: status === 'completed' ? true : false,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task added successfully:', data);
            fetchAndFilterData('all');
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
}

fetchAndFilterData('all');



function getAndDisplayElementCount() {
    fetch('https://6633a4c9f7d50bbd9b4a2c47.mockapi.io/Lab4')
        .then(response => response.json())
        .then(data => {
            const elementCount = data.length;
            const elementCountDisplay = document.getElementById('elementCount');
            elementCountDisplay.textContent = 'Number of elements: ' + elementCount;
        })
        .catch(error => console.error('Error:', error));
}

window.onload = getAndDisplayElementCount;





