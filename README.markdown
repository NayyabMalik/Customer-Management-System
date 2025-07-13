# Customer Management System 

This is a Flask-based web application designed to manage customer data securely. It provides role-based access for admins and agents, with features for adding, updating, deleting, and searching customer records. The system uses MongoDB Atlas for data storage and includes robust security measures like XSS prevention and CSRF protection.

## Features

- **Admin Dashboard**:
  - Add multiple customers with fields: Name, Phone, Email, Purchase History, Notes.
  - View, update, or delete customer records.
  - Special characters (e.g., `it's`, `that's`) display correctly in both the customer list and update forms.
  - Change admin password securely.
- **Agent Search**:
  - Search customers by phone number (exact or normalized match).
  - Display customer details without edit capabilities.
- **Security**:
  - Input sanitization to prevent XSS attacks.
  - CSRF protection for all forms.
  - Secure session management with configurable `SECRET_KEY`.
  - Password hashing for user accounts.
- **Logging**: All actions (login, signup, add, update, delete) are logged in `app.log` for auditing.

## Prerequisites

- **Python 3.8+**
- **MongoDB Atlas Account**: For cloud-based database storage.
- **Ubuntu Server** (for deployment): Recommended for production.
- **Dependencies** (listed in `requirements.txt`):
  - flask==2.3.3
  - gunicorn==22.0.0
  - pymongo==4.6.3
  - dnspython==2.4.2
  - werkzeug==3.0.4
  - python-dotenv==1.0.1

## Project Structure

```
customer_management/
├── app.py                    # Main Flask application
├── requirements.txt          # Python dependencies
├── templates/
│   ├── admin.html            # Admin dashboard for managing customers
│   ├── agent_search.html     # Agent page for searching customers
│   ├── index.html           # Home page
│   ├── login.html           # Login page
│   ├── signup.html          # Agent signup page
│   ├── change_password.html # Admin password change page
├── static/
│   ├── css/
│   │   ├── admin.css        # Styles for admin.html
│   │   ├── agent_search.css # Styles for agent_search.html
│   │   ├── change_password.css # Styles for change_password.html
│   ├── js/
│   │   ├── admin.js         # JavaScript for dynamic admin form handling
├── .env                     # Environment variables (not in repo, create manually)
├── app.log                  # Log file for application events
```

## Setup Instructions (Local Testing)

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd customer_management
   ```

2. **Install Dependencies**:

   ```bash
   pip3 install -r requirements.txt
   ```

3. **Set Up MongoDB Atlas**:

   - Create a MongoDB Atlas cluster at https://www.mongodb.com/cloud/atlas.
   - Create a database user (e.g., username: `smartline_admin`, password: `MongoDB#SmartLine2025`).
   - Allow network access (set to `0.0.0.0/0` for testing or specify your IP).
   - Copy the `MONGO_URI` (e.g., `mongodb+srv://smartline_admin:MongoDB#SmartLine2025@smartlinebpo.mongodb.net/customer_management?retryWrites=true&w=majority`).

4. **Configure Environment Variables**: Create a `.env` file in the project root:

   ```bash
   nano .env
   ```

   Add:

   ```
   MONGO_URI=mongodb+srv://smartline_admin:<password>@smartlinebpo.mongodb.net/customer_management?retryWrites=true&w=majority
   ADMIN_PASSWORD=X7#kL9mPqT2vN8wR
   SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_hex(16))")
   ```

   Replace `<password>` with your MongoDB Atlas user password.

5. **Run the Application**:

   ```bash
   python3 app.py
   ```

   - Access at `http://127.0.0.1:5000`.
   - Log in as `admin` with the `ADMIN_PASSWORD` from `.env` (check `app.log` if generated).
   - Test adding a customer (e.g., Name: `Nayyab Malik`, Phone: `1234566777`, Email: `malikg@gmail.com`, Purchase History: `hello it's fine`, Notes: `that's good`).
   - Verify special characters display correctly in the customer list and update form.

6. **Check Logs**:

   ```bash
   cat app.log
   ```

## Deployment Instructions (Ubuntu Server)

 1. **SSH into the Server**:

    ```bash
    ssh username@server-ip
    ```

 2. **Install System Dependencies**:

    ```bash
    sudo apt update && sudo apt install python3 python3-pip nginx -y
    sudo apt install certbot python3-certbot-nginx
    ```

 3. **Copy Files**:

    ```bash
    mkdir ~/customer_management
    scp -r app.py templates static requirements.txt username@server-ip:~/customer_management
    ```

 4. **Install Python Dependencies**:

    ```bash
    cd ~/customer_management
    pip3 install -r requirements.txt
    ```

 5. **Configure** `.env`:

    ```bash
    nano ~/customer_management/.env
    ```

    Add the same `.env` content as above.

 6. **Test Locally**:

    ```bash
    python3 app.py
    curl http://localhost:5000
    cat app.log
    ```

 7. **Set Up Gunicorn**:

    ```bash
    gunicorn -w 4 -b 0.0.0.0:8000 app:app
    ```

 8. **Configure Nginx**:

    ```bash
    sudo nano /etc/nginx/sites-available/customer_management
    ```

    Add:

    ```
    server {
        listen 80;
        server_name your-domain.com;
        location / {
            proxy_pass http://localhost:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        location /static {
            alias /home/username/customer_management/static;
        }
    }
    ```

    ```bash
    sudo ln -s /etc/nginx/sites-available/customer_management /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

 9. **Set Up HTTPS**:

    ```bash
    sudo certbot --nginx -d your-domain.com
    ```

10. **Run Gunicorn as a Service**:

    ```bash
    sudo nano /etc/systemd/system/customer_management.service
    ```

    Add:

    ```
    [Unit]
    Description=Customer Management Gunicorn
    After=network.target
    [Service]
    User=username
    Group=www-data
    WorkingDirectory=/home/username/customer_management
    ExecStart=/usr/bin/gunicorn -w 4 -b 0.0.0.0:8000 app:app
    Restart=always
    [Install]
    WantedBy=multi-user.target
    ```

    ```bash
    sudo systemctl enable customer_management
    sudo systemctl start customer_management
    ```

11. **Verify Deployment**:

    - Visit `https://your-domain.com`.
    - Log in as `admin` and test customer management features.
    - Change the admin password at `/admin/change_password` after first login.

## Usage

- **Admin Access**:
  - Log in with username `admin` and the `ADMIN_PASSWORD` from `.env`.
  - Add, update, or delete customers in the admin dashboard (`/admin`).
  - Use the update form to edit customer details, with special characters (e.g., `it's`) displaying correctly.
- **Agent Access**:
  - Sign up at `/signup` to create an agent account.
  - Log in and search for customers by phone number at `/agent_search`.
- **Password Management**:
  - Admins can change their password at `/admin/change_password`.

## Troubleshooting

- **MongoDB Connection Issues**:
  - Ensure `MONGO_URI` is correct in `.env`.
  - Verify network access in MongoDB Atlas (allow server IP or `0.0.0.0/0` for testing).
  - Check `app.log` for connection errors.
- **Special Characters Not Displaying**:
  - Confirm `admin.html` uses the `|safe` filter for customer fields.
  - Verify `static/js/admin.js` and `static/css/admin.css` are loaded (check browser console).
- **Form Not Appearing**:
  - Check browser console (F12) for JavaScript errors.
  - Ensure `static/js/admin.js` is correctly referenced in `admin.html`.

## Support

For issues or questions, contact \[your-email@example.com\].

## Notes

- The application has been tested with MongoDB Atlas to ensure secure data storage.
- Special character display issues (e.g., `it's` appearing as `it's`) have been resolved in both the customer list and update forms.
- Ensure the `ADMIN_PASSWORD` is changed after deployment for security.