from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Store user applications in an array
applications = []

@app.route('/api/accept_application', methods=['POST'])
def accept_application():
    data = request.get_json()
    name = data.get('name')
    zip_code = data.get('zipCode')

    # Generate application number
    app_number = len(applications) + 1

    # Create new application entry
    new_application = {
        'appNumber': app_number,
        'name': name,
        'zipCode': zip_code,
        'status': 'received'  # Default status
    }

    # Adds the incoming application to the list
    applications.append(new_application)

    #Confirms that the application was received
    return jsonify({'applicationNumber': app_number, 'message': 'Application received'})

@app.route('/api/check_status/<int:app_number>', methods=['GET'])
def check_status(app_number):
    application = next((app for app in applications if app['appNumber'] == app_number), None)
    if application:
        return jsonify({'status': application['status']})
    else:
        return jsonify({'message': 'Application not found'}), 404

@app.route('/api/change_status', methods=['POST'])
def change_status():
    data = request.get_json()
    app_number = data.get('appNumber')
    new_status = data.get('newStatus')

    # Finds the user application from the list
    application = next((app for app in applications if app['appNumber'] == app_number), None)
    if application:
        application['status'] = new_status
        return jsonify({'message': f"Status updated to {new_status}"})
    else:
        return jsonify({'message': 'Application not found'}), 404

# The route to render the html page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
