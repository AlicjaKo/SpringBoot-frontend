$(document).ready(function() {
    $('.message a').click(function() {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });

    // Event listener for the login form submission
    $('.login-form').submit(async function(event) {
        event.preventDefault();
        const username = $('.login-form input[placeholder="username"]').val();
        const password = $('.login-form input[placeholder="password"]').val();

        console.log('Login attempt:', { username, password });

        try {
            const response = await fetch('http://localhost:8080/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:5501' // Update with your frontend URL
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // Include credentials in the request
            });

            console.log('Login response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Login successful', data);
            // Handle token and redirect or other post-login actions
        } catch (error) {
            console.error('Login failed', error);
        }
    });

    // Event listener for the registration form submission
    $('.register-form').submit(async function(event) {
        event.preventDefault();
        const email = $('.register-form input[placeholder="email address"]').val();
        const username = $('.register-form input[placeholder="username"]').val();
        const name = $('.register-form input[placeholder="name"]').val();
        const birthDate = $('.register-form input[placeholder="date of birth"]').val(); // Update placeholder text
        const password = $('.register-form input[placeholder="password"]').val();

            

        // Validate input
        if (!email || !username || !name || !birthDate || !password) {
            console.error('All fields are required.');
            return;
        }

        // Format date of birth to day.month.year format
        const formattedDOB = formatDOB(birthDate);

        const age = calculateAge(birthDate);

        const userData = {
            name: name,
            password: password,
            nickName: username,
            avatarUrl: 'http://', // or some default URL if needed
            email: email,
            birthDate: formattedDOB,
            age: age
        };

        console.log('Sending user data:', userData);

        try {
            const response = await fetch('http://localhost:8080/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:5501' // Update with your frontend URL
                },
                body: JSON.stringify(userData)
            });

            console.log('Registration response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Registration successful', data);
            $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        } catch (error) {
            console.error('Registration failed', error);
        }
    });

    function formatDOB(dateString) {
        // Assuming date is in format day.month.year
        const parts = dateString.split('-');
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
        return `${day}.${month}.${year}`;
    }

    function calculateAge(birthDate) {
        // Assuming birthDate is in format day.month.year
        const parts = birthDate.split('-');
        const birthYear = parseInt(parts[0]);
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    }

});


