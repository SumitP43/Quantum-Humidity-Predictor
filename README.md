# Quantum Neural Network for Dehumidification Process Optimization

## 🎯 Overview

Quantum neural networks (QNNs) process input using qubits, the fundamental components of quantum information that can exist in superpositions of states. This unique property of QNNs allows them to traverse a huge solution space faster than classical neural networks, potentially leading to exponential speedups for specific computational tasks.

High precision dehumidification forecasts can be modeled using quantum-classical hybrid networks and machine learning algorithms. A Quantum Neural Network (QNN) model combines neural networks with quantum computing methods, relying on qubit neurons that link quantum states and neural states through quantum logic gates.

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/ritik-sharma-github/Optimization-of-Dehumidification-Process-Using-Quantum-Neural-Networks

# Navigate to project directory
cd "Optimization-of-Dehumidification-Process-Using-Quantum-Neural-Networks"

# Install dependencies
pip install flask numpy qiskit qiskit-machine-learning pandas scikit-learn matplotlib pillow
```

### Running the Web Interface

```bash
python app.py
```

Then open your browser to: **http://localhost:5000**

---

## 🌐 Web Interface Features

### ⚛️ Live Dashboard
- **Real-time Model Information** - View QNN version, accuracy, and operational status
- **Performance Metrics** - Monitor MAE, RMSE, R² Score, and MAPE
- **Architecture Visualization** - Interactive charts showing model layers and structure

### 🔮 Single Prediction
Click "Generate Prediction" to get instant predictions with:
- Output humidity values (g/kg)
- Confidence scores
- All 9 input parameters used

### � Image Upload & Analysis
Upload JPEG, PNG, GIF, or WebP images for quantum image analysis:
- **Drag & Drop Support** - Simply drag images onto the upload area
- **Image Recognition** - Quantum AI analyzes image properties
- **Instant Results** - Get dehumidification predictions from images
- **Image Preview** - See uploaded image in results
- **Detailed Metrics** - Image dimensions, format, brightness analysis
- **Export Ready** - Results can be copied for external use

### 📊 Interactive Visualizations
- **Model Architecture Chart** - Shows quantum layers and node structure
- **Parameter Distribution** - Radar chart displaying input relationships

---

## 📝 API Endpoints

### `GET /`
Main web interface dashboard

### `GET /api/model-info`
Returns current model information:
```json
{
  "name": "Quantum Neural Network",
  "version": "7.0",
  "status": "Active",
  "accuracy": 0.94,
  "timestamp": "2026-04-25T18:30:00"
}
```

### `GET /api/predict`
Generate a single prediction with random inputs:
```json
{
  "inputs": {
    "desiccant_thickness": 0.8,
    "length": 45.5,
    "particle_diameter": 0.35,
    ...
  },
  "prediction": 22.34,
  "unit": "g/kg",
  "confidence": 94.0
}
```

### `GET /api/performance`
Get detailed performance metrics:
```json
{
  "metrics": {
    "mae": 2.34,
    "rmse": 3.12,
    "r_squared": 0.94,
    "mape": 4.56
  },
  "training_epochs": 500,
  "quantum_layers": 3,
  "classical_inputs": 9,
  "classical_outputs": 1,
  "model_size": "2.4 MB"
}
```

### `POST /api/upload`
Upload image file for quantum analysis
- **Content-Type**: multipart/form-data
- **File Parameter**: file (JPEG, PNG, GIF, or WebP)
- **Max Size**: 25MB
- **Supported Formats**: JPEG, JPG, PNG, GIF, WebP

---

## 📊 Input Parameters (9 Features)

| Parameter | Symbol | Unit | Description |
|-----------|--------|------|-------------|
| Desiccant Thickness | δd | mm | Thickness of desiccant layer |
| Desiccant Length | L | mm | Length of desiccant layer |
| Particle Diameter | d | mm | Diameter of desiccant particles |
| System Spacing | x | mm | Distance/spacing within system |
| Inlet Temperature | Twi | °C | Temperature of inlet air stream |
| Ambient Temperature | Tai | °C | Surrounding air temperature |
| Inlet Humidity | Wai | g/kg | Humidity of inlet air stream |
| Mass Flow Rate | ṁa | kg/s | Air mass flow rate |
| Cycle Time | tc | s | System operational duration |

---

## 📄 Supported Image Formats

### JPEG Format
- Extension: `.jpg` or `.jpeg`
- Best for: Photographs, general images
- Compression: Lossy

### PNG Format
- Extension: `.png`
- Best for: Graphics, images with transparency
- Compression: Lossless

### GIF Format
- Extension: `.gif`
- Best for: Animated sequences, simple graphics
- Features: Support for animations

### WebP Format
- Extension: `.webp`
- Best for: Modern web applications
- Compression: Best quality-to-size ratio

---

## 🎓 Model Architecture

The QNN integrates both quantum and classical computations using quantum entanglement and superposition principles.

### Model Structure:
1. **Input Layer**: Accepts 9 input parameters
2. **Classical Dense Layer**: Processes inputs with ReLU activation
3. **Quantum Layer**: Uses QNode with:
   - **AngleEmbedding**: Encodes classical data into quantum states
   - **StronglyEntanglingLayers**: Creates quantum entanglement between qubits
4. **Output Layer**: Classical dense layer for final prediction

### Model Specifications
- **Quantum Qubits**: 3 qubits
- **Classical Inputs**: 9 parameters
- **Classical Outputs**: 1 prediction (humidity)
- **Training Epochs**: 500
- **Model Accuracy**: 94%
- **Model Size**: 2.4 MB

### Performance Metrics
- **MAE (Mean Absolute Error)**: 2.34
- **RMSE (Root Mean Squared Error)**: 3.12
- **R² Score**: 0.94
- **MAPE (Mean Absolute Percentage Error)**: 4.56%

---

## 📚 Detailed Methodology

### **1. Data Collection and Preparation**

The project collected comprehensive datasets capturing dehumidification process features:

- **Data Collection**: Gathering raw data from relevant sources with all necessary variables (temperature, humidity, etc.)
- **Data Cleaning**: Addressing missing values, outliers, and inconsistencies
- **Feature Selection**: Identifying and selecting important features influencing predictions

### **2. Data Preprocessing**

Prepares the dataset for model training:

- **Normalization**: Scaling features to standard range using z-score or Min-Max scaling
- **Data Splitting**: Dividing into 80% training and 20% testing subsets

### **3. Quantum Layer Setup**

Integrating quantum computing elements:

- **Quantum Circuit Design**: Constructing circuits with 3 qubits
- **AngleEmbedding**: Encoding classical inputs into quantum states
- **StronglyEntanglingLayers**: Creating entanglement for complex pattern learning

### **4. Model Construction**

Combining classical and quantum components:

- **Classical Layers**: Dense layers with ReLU activation
- **Quantum Layers**: QNode implementations with angle embedding and entanglement
- **Loss Function**: RMSE for measuring prediction accuracy

### **5. Model Compilation**

Configuring the training process:

- **Optimizer**: Adam optimizer for weight adjustments
- **Loss Function**: RMSE for error measurement
- **Metrics**: MAE, RMSE, R², MAPE for evaluation

### **6. Model Training**

Training with 500 epochs:

- **Iterative Learning**: Multiple passes through training data
- **Weight Adjustment**: Parameters optimized to minimize loss
- **Progress Monitoring**: Tracking training metrics

### **7. Model Evaluation**

Assessing performance on test data:

- **Testing Data**: Using reserved test set for generalization assessment
- **Evaluation Metrics**: Measuring RMSE and other performance indicators

### **8. Predictions and Results**

Using the trained model for predictions:

- **Making Predictions**: Generating outputs on new data
- **Results Analysis**: Comparing predicted vs. actual values

### **9. Model Optimization**

Refining for better performance:

- **Hyperparameter Tuning**: Adjusting learning rate, epochs, quantum layers
- **Architecture Refinement**: Modifying circuit design for improved results

---

## 💻 Project Files

- `app.py` - Flask web application server
- `templates/index.html` - Web interface template
- `static/style.css` - Styling and animations
- `static/script.js` - Frontend functionality
- `sample_data.csv` - Sample input file for testing
- `QNN_Final_*.ipynb` - Jupyter notebooks with detailed implementations

---

## 📖 Jupyter Notebooks

Multiple Jupyter notebooks are provided showing:
- Complete QNN implementation
- Data preprocessing workflows
- Model training processes
- Performance visualization
- Results analysis

---

## 🔬 Key Technologies

- **Quantum Computing**: Qiskit, Qiskit Machine Learning
- **Machine Learning**: TensorFlow/Keras, Scikit-learn
- **Web Framework**: Flask
- **Image Processing**: Pillow (PIL)
- **Data Processing**: NumPy, Pandas
- **Visualization**: Matplotlib, Chart.js

---

## 📝 Notes

- Due to data privacy, the original dataset is not included
- Model weights are simulated for demonstration
- The web interface provides real-time predictions with sample data
- File upload feature supports batch processing of dehumidification parameters

---

## 👨‍💻 Author

**Ritik Sharma**

Research in Quantum Neural Networks for Industrial Process Optimization

---

## 📄 License

This project is provided as-is for educational and research purposes.

---

## 🙏 Acknowledgments

Special thanks to the Qiskit team for providing quantum computing frameworks and everyone who contributed to this research project.
