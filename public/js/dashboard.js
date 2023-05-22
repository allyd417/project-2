const newEmployeeSpan = document.querySelector('#new-Employee-span');
const handleToggleNewEmployeeFormContainer = () => {
    const newEmployeeFormContainer = document.querySelector(
        '#new-employee-form-container'
    );
    if (newEmployeeFormContainer.classList.contains('hide')) {
		newEmployeeFormContainer.classList.remove('hide');
		newEmployeeSpan.textContent = '-';
	} else {
		newEmployeeFormContainer.classList.add('hide');
		newEmployeeSpan.textContent = '+';
	}
};

const newEmployeeFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').vaule.trim();
    const role = document.querySelector('#role').value.trim();
    const department = document.querySelector('#depaetment').value.trim();

    if (name && role && department) {
        try {
            const response = await fetch('/api/employee', {
                method: 'POST',
                body: JSON.stringify({
                    employee,
                    role,
                    department,
                    salary,
                    employee_id,
                }),
                headers: { 'Content-Type': 'application/json'},
            });
            if (response.ok) { 
                const data =await response.json();
                console.log(data);
                document.location.replace('/dashboard');
            }
        } catch (err) {
            console.error(error);
        }
    }
};

document.addEventListener('submit', newEmployeeFormHandler);
newEmployeeSpan.addEventListener('click', handleToggleNewEmployeeFormContainer);

