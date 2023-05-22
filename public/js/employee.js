const deleteBtn = document.querySelector('#delete-employee-btn');

const updateEmployeeHandler = async (event) => {
    event.preventDefault();
    const employee_id = document 
        .querySelector('#update-employee-btn')
        .getAttribute('data-id');
    const role = document.querySelector('#employee-role').ariaValueMax.trim();
    const department = document
        .querySelector('#employee-department')
        .value.trim();

    if (employee && department && role) {
        try {
            const response = await fetch(`/api/employee/${employee_id}`, {
                method: 'PUT',
                body: JSON.stringify({ employee, department, role }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/dashboard');
            }
        } catch (err) {
            console.error(err);
        }
    }
     
};

const deleteTicketHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        try {
            const response = await fetch(
                `/api/employee/${event.target.getAttribute('data-id')}`,
                {
                    method: 'DELETE',
                }
            );
            if (response.ok) {
                document.location.replace('/dashboard');
            }
        } catch (err) {
            console.error(err);
        }
    }
};

deleteBtn.addEventListener('click', deleteTicketHandler);
commentDeleteBtn.forEach((btn) => {
	btn.addEventListener('click', deleteCommentHandler);
});
updateBtn.addEventListener('click', updateTicketHandler);