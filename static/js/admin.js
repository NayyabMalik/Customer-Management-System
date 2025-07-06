        // // Toggle add customer form
        // function toggleAddForm() {
        //     const form = document.getElementById('add-customer-form');
        //     form.classList.toggle('hidden');
        //     const addBtn = document.querySelector('.add-customer-btn');
            
        //     if (form.classList.contains('hidden')) {
        //         addBtn.innerHTML = `
        //             <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        //                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        //             </svg>
        //             Add Customers`;
        //     } else {
        //         addBtn.innerHTML = `
        //             <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        //                 <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        //             </svg>
        //             Cancel`;
        //     }
        // }

        // // Add new customer row
        // function addCustomerRow() {
        //     const container = document.getElementById('customer-rows');
        //     const row = document.createElement('div');
        //     row.className = 'customer-form-row animate__animated animate__fadeIn';
        //     row.innerHTML = `
        //         <div class="form-grid">
        //             <div class="form-field">
        //                 <label>Name</label>
        //                 <input type="text" name="name[]" required>
        //             </div>
        //             <div class="form-field">
        //                 <label>Phone</label>
        //                 <input type="text" name="phone[]" required>
        //             </div>
        //             <div class="form-field">
        //                 <label>Email</label>
        //                 <input type="email" name="email[]" required>
        //             </div>
        //             <div class="form-field">
        //                 <label>Purchase History</label>
        //                 <input type="text" name="purchase_history[]">
        //             </div>
        //             <div class="form-field full-width">
        //                 <label>Notes</label>
        //                 <textarea name="notes[]"></textarea>
        //             </div>
        //             <div class="form-actions full-width">
        //                 <button type="button" onclick="removeCustomerRow(this)" class="remove-btn">
        //                     Remove
        //                 </button>
        //             </div>
        //         </div>
        //     `;
        //     container.appendChild(row);
            
        //     // Scroll to the new row
        //     setTimeout(() => {
        //         row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        //     }, 100);
        // }

        // // Remove customer row
        // function removeCustomerRow(button) {
        //     const row = button.closest('.customer-form-row');
        //     row.classList.add('animate__animated', 'animate__fadeOut');
            
        //     setTimeout(() => {
        //         row.remove();
        //     }, 300);
        // }

        // // Toggle update form
        // function toggleUpdateForm(customerId) {
        //     const form = document.getElementById(`update-form-${customerId}`);
        //     form.classList.toggle('hidden');
            
        //     if (!form.classList.contains('hidden')) {
        //         form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        //     }
        // }
        // Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements after DOM is loaded
    const addCustomerForm = document.getElementById('add-customer-form');
    const addCustomerBtn = document.querySelector('.add-customer-btn');
    
    // Toggle add customer form with enhanced animation
    function toggleAddForm() {
        if (!addCustomerForm || !addCustomerBtn) {
            console.error('Required elements not found');
            return;
        }
        
        addCustomerForm.classList.toggle('hidden');
        
        if (addCustomerForm.classList.contains('hidden')) {
            addCustomerBtn.innerHTML = `
                <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                </svg>
                Add Customers`;
            addCustomerForm.classList.remove('animate__fadeIn');
            addCustomerForm.classList.add('animate__fadeOut');
        } else {
            addCustomerBtn.innerHTML = `
                <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                Cancel`;
            addCustomerForm.classList.remove('hidden', 'animate__fadeOut');
            addCustomerForm.classList.add('animate__animated', 'animate__fadeIn');
        }
    }

    // Add new customer row with enhanced animation
    function addCustomerRow() {
        const container = document.getElementById('customer-rows');
        if (!container) {
            console.error('Customer rows container not found');
            return;
        }
        
        const row = document.createElement('div');
        row.className = 'customer-form-row';
        row.innerHTML = `
            <div class="form-grid">
                <div class="form-field">
                    <label>Name</label>
                    <input type="text" name="name[]" required>
                </div>
                <div class="form-field">
                    <label>Phone</label>
                    <input type="text" name="phone[]" required>
                </div>
                <div class="form-field">
                    <label>Email</label>
                    <input type="email" name="email[]" required>
                </div>
                <div class="form-field">
                    <label>Purchase History</label>
                    <input type="text" name="purchase_history[]">
                </div>
                <div class="form-field full-width">
                    <label>Notes</label>
                    <textarea name="notes[]"></textarea>
                </div>
                <div class="form-actions full-width">
                    <button type="button" class="remove-btn">
                        Remove
                    </button>
                </div>
            </div>
        `;
        container.appendChild(row);
        
        // Add animation
        row.classList.add('animate__animated', 'animate__fadeIn');
        
        // Add event listener to the new remove button
        const removeBtn = row.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                removeCustomerRow(this);
            });
        }
        
        // Scroll to the new row
        setTimeout(() => {
            row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Focus on the first input
            const firstInput = row.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }

    // Remove customer row with enhanced animation
    function removeCustomerRow(button) {
        const row = button.closest('.customer-form-row');
        if (!row) {
            console.error('Row element not found');
            return;
        }
        
        row.classList.add('animate__animated', 'animate__fadeOut');
        
        setTimeout(() => {
            row.remove();
        }, 300);
    }

    // Toggle update form with enhanced animation
    function toggleUpdateForm(customerId) {
        const form = document.getElementById(`update-form-${customerId}`);
        if (!form) {
            console.error(`Form with ID update-form-${customerId} not found`);
            return;
        }
        
        form.classList.toggle('hidden');
        
        if (!form.classList.contains('hidden')) {
            form.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            form.classList.remove('animate__fadeIn');
            form.classList.add('animate__fadeOut');
        }
    }

    // Initialize event listeners
    if (addCustomerBtn) {
        addCustomerBtn.addEventListener('click', toggleAddForm);
    }
    
    const addRowBtn = document.querySelector('.add-row-btn');
    if (addRowBtn) {
        addRowBtn.addEventListener('click', addCustomerRow);
    }
    
    // Initialize all remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            removeCustomerRow(this);
        });
    });
    
    // Initialize all update buttons
    document.querySelectorAll('[onclick^="toggleUpdateForm"]').forEach(btn => {
        const match = btn.getAttribute('onclick').match(/toggleUpdateForm\('(.*?)'\)/);
        if (match && match[1]) {
            btn.addEventListener('click', function() {
                toggleUpdateForm(match[1]);
            });
            // Remove the inline onclick handler
            btn.removeAttribute('onclick');
        }
    });

    // Add smooth transitions for all interactive elements
    const buttons = document.querySelectorAll('button, .logout-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('transition', 'duration-300');
        });
    });
    
    // Add focus effects to all form inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('ring-2', 'ring-accent');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('ring-2', 'ring-accent');
        });
    });
});