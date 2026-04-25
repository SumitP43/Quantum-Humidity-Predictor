from flask import Flask, render_template, jsonify, request
import numpy as np
from datetime import datetime
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Create uploads folder if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Simulated QNN Model Data
class QNNModel:
    def __init__(self):
        self.name = "Quantum Neural Network"
        self.version = "7.0"
        self.status = "Active"
        self.accuracy = 0.94
        
    def predict(self, inputs):
        """Simulate QNN prediction"""
        # Mock prediction for dehumidification
        noise = np.random.normal(0, 0.01, 1)[0]
        output = np.mean(inputs) * 0.5 + np.sum(inputs) * 0.1 + noise
        return float(np.clip(output, 0, 100))

qnn_model = QNNModel()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/model-info')
def model_info():
    return jsonify({
        'name': qnn_model.name,
        'version': qnn_model.version,
        'status': qnn_model.status,
        'accuracy': qnn_model.accuracy,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/predict', methods=['GET'])
def predict():
    # Sample input parameters for dehumidification
    inputs = [
        np.random.uniform(0.5, 2.0),    # δd (desiccant thickness)
        np.random.uniform(10, 100),      # L (length)
        np.random.uniform(0.1, 1.0),     # d (diameter)
        np.random.uniform(1, 50),        # x (distance/spacing)
        np.random.uniform(20, 60),       # Twi (inlet temp)
        np.random.uniform(15, 50),       # Tai (ambient temp)
        np.random.uniform(5, 30),        # Wai (inlet humidity)
        np.random.uniform(0.1, 2.0),     # ṁa (mass flow)
        np.random.uniform(100, 1000),    # tc (cycle time)
    ]
    
    prediction = qnn_model.predict(inputs)
    
    return jsonify({
        'inputs': {
            'desiccant_thickness': round(inputs[0], 2),
            'length': round(inputs[1], 2),
            'particle_diameter': round(inputs[2], 2),
            'spacing': round(inputs[3], 2),
            'inlet_temp': round(inputs[4], 2),
            'ambient_temp': round(inputs[5], 2),
            'inlet_humidity': round(inputs[6], 2),
            'mass_flow': round(inputs[7], 4),
            'cycle_time': round(inputs[8], 0),
        },
        'prediction': round(prediction, 2),
        'unit': 'g/kg',
        'confidence': round(qnn_model.accuracy * 100, 1),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/performance')
def performance():
    return jsonify({
        'metrics': {
            'mae': 2.34,
            'rmse': 3.12,
            'r_squared': 0.94,
            'mape': 4.56
        },
        'training_epochs': 500,
        'quantum_layers': 3,
        'classical_inputs': 9,
        'classical_outputs': 1,
        'model_size': '2.4 MB'
    })

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file upload and prediction"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not file.filename.endswith(('.csv', '.txt')):
        return jsonify({'error': 'Only CSV and TXT files allowed'}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    try:
        # Parse the file
        if filename.endswith('.csv'):
            data = np.genfromtxt(filepath, delimiter=',', skip_header=1)
        else:
            data = np.genfromtxt(filepath, delimiter=' ')
        
        if data.ndim == 1:
            data = data.reshape(1, -1)
        
        # Make predictions
        predictions = []
        for row in data:
            if len(row) == 9:  # Expecting 9 input features
                pred = qnn_model.predict(row)
                predictions.append({
                    'inputs': {
                        'desiccant_thickness': round(float(row[0]), 2),
                        'length': round(float(row[1]), 2),
                        'particle_diameter': round(float(row[2]), 2),
                        'spacing': round(float(row[3]), 2),
                        'inlet_temp': round(float(row[4]), 2),
                        'ambient_temp': round(float(row[5]), 2),
                        'inlet_humidity': round(float(row[6]), 2),
                        'mass_flow': round(float(row[7]), 4),
                        'cycle_time': round(float(row[8]), 0),
                    },
                    'prediction': round(pred, 2),
                    'unit': 'g/kg',
                    'confidence': round(qnn_model.accuracy * 100, 1)
                })
        
        # Clean up
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'filename': filename,
            'total_predictions': len(predictions),
            'predictions': predictions,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        if os.path.exists(filepath):
            os.remove(filepath)
        return jsonify({'error': f'Error processing file: {str(e)}'}), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 QUANTUM NEURAL NETWORK - WEB INTERFACE")
    print("="*60)
    print("📊 Dehumidification Process Optimization")
    print("🔗 Starting server at: http://localhost:5000")
    print("="*60 + "\n")
    app.run(debug=True, port=5000, use_reloader=False)
