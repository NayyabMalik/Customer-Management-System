from flask import Flask, render_template, request, redirect, url_for, session, flash
from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['customer_management']
users_collection = db['users']
customers_collection = db['customers']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        
        if users_collection.find_one({'username': username}):
            flash('Username already exists!')
            return redirect(url_for('signup'))
            
        hashed_password = generate_password_hash(password)
        users_collection.insert_one({
            'username': username,
            'password': hashed_password,
            'role': role.upper()
        })
        flash('Registration successful! Please login.')
        return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = users_collection.find_one({'username': username})
        
        if user and check_password_hash(user['password'], password):
            session['username'] = username
            session['role'] = user['role']
            if user['role'] == 'ADMIN':
                return redirect(url_for('admin'))
            else:
                return redirect(url_for('agent_search'))
        flash('Invalid credentials!')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Logged out successfully!')
    return redirect(url_for('index'))

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if 'username' not in session or session['role'] != 'ADMIN':
        flash('Unauthorized access!')
        return redirect(url_for('login'))
        
    if request.method == 'POST':
        action = request.form.get('action')
        if action == 'add':
            names = request.form.getlist('name[]')
            phones = request.form.getlist('phone[]')
            emails = request.form.getlist('email[]')
            purchase_histories = request.form.getlist('purchase_history[]')
            notes = request.form.getlist('notes[]')
            
            for i in range(len(names)):
                if names[i] and phones[i] and emails[i]:  # Ensure required fields are not empty
                    customers_collection.insert_one({
                        'name': names[i],
                        'phone': phones[i],
                        'email': emails[i],
                        'purchase_history': purchase_histories[i] if i < len(purchase_histories) else '',
                        'notes': notes[i] if i < len(notes) else ''
                    })
            flash('Customer(s) added successfully!')
        elif action == 'update':
            customers_collection.update_one(
                {'_id': ObjectId(request.form['customer_id'])},
                {'$set': {
                    'name': request.form['name'],
                    'phone': request.form['phone'],
                    'email': request.form['email'],
                    'purchase_history': request.form['purchase_history'],
                    'notes': request.form['notes']
                }}
            )
            flash('Customer updated successfully!')
        elif action == 'delete':
            customers_collection.delete_one({'_id': ObjectId(request.form['customer_id'])})
            flash('Customer deleted successfully!')
            
    customers = list(customers_collection.find())
    return render_template('admin.html', customers=customers)

@app.route('/agent_search', methods=['GET', 'POST'])
def agent_search():
    if 'username' not in session or session['role'] != 'AGENT':
        flash('Unauthorized access!')
        return redirect(url_for('login'))
        
    customer = None
    if request.method == 'POST':
        phone = request.form['phone']
        customer = customers_collection.find_one({'phone': phone})
        if customer and request.form.get('new_phone'):
            customers_collection.update_one(
                {'_id': customer['_id']},
                {'$set': {'phone': request.form['new_phone']}}
            )
            flash('Phone number updated!')
            customer = customers_collection.find_one({'phone': request.form['new_phone']})
            
    return render_template('agent_search.html', customer=customer)

if __name__ == '__main__':
    app.run()
