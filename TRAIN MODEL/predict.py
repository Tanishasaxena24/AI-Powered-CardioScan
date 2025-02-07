# import cv2
# import numpy as np
# from tensorflow.keras.models import load_model

# def predict_image(image_path, model_path, target_size=(128, 128)):
#     model = load_model(model_path)
    
#     img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
#     img = cv2.resize(img, target_size)
#     img = cv2.normalize(img, None, 0, 1, cv2.NORM_MINMAX)
#     img = img.reshape(1, target_size[0], target_size[1], 1)
    
#     prediction = model.predict(img)
#     class_map = {0: 'Normal', 1: 'Abnormal'}
#     return class_map[np.argmax(prediction)]

# # Predict an image
# # image_path = 'D:/final year projet/data/train/abnormal/e1ae289c-0e5a-4399-8d2a-d0eac9db1587.jpg'
# image_path = 'D:/final year projet/data/train/normal/6f231a86-acd6-43d5-b659-da0cc88b0c00.jpg'
# model_path = 'models/cardio_scan_model.h5'
# result = predict_image(image_path, model_path)
# print(f"The result for the image is: {result}")






# from tensorflow.keras.models import load_model
# from preprocessing import preprocess_single_image  # Import the helper function
# import numpy as np

# def predict_image(image_path, model_path):
#     # Load the trained model
#     model = load_model(model_path)
    
#     # Preprocess the input image using the helper function
#     img = preprocess_single_image(image_path)
    
#     # Make a prediction
#     prediction = model.predict(img)
#     class_map = {0: 'Normal', 1: 'Abnormal'}
#     return class_map[np.argmax(prediction)]

# # Predict an image
# # image_path = 'D:\\final year projet\\data\\train\\normal\\Normaltestdata_1.jpg'  # Replace with your image path
# image_path = 'D:\\final year projet\\data\\train\\abnormal\\Abnormal-testdata_11.jpg.'
# model_path = 'models/cardio_scan_model.h5'
# result = predict_image(image_path, model_path)
# print(f"The result for the image is: {result}")



# import os
# import sys
# from tensorflow.keras.models import load_model
# import cv2
# import numpy as np

# # Set environment variable to suppress oneDNN logs
# os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# # Suppress unnecessary logs
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# # Load and compile the model
# model_path = 'D:/final year projet/models/cardio_scan_model.h5'
# model = load_model(model_path, compile=False)
# model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# def predict_image(image_path):
#     img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
#     img = cv2.resize(img, (128, 128))
#     img = img.astype('float32') / 255  # Normalize the image
    
#     img = np.reshape(img, (1, 128, 128, 1))  # Add batch dimension

#     # Perform prediction
#     prediction = model.predict(img)
#     predicted_class = np.argmax(prediction)
#     confidence = prediction[0][predicted_class] * 100

#     return predicted_class, confidence

# # Example image path
# image_path = 'D:/final year projet/data/train/abnormal/Abnormal-testdata_2.jpg'
# result, confidence = predict_image(image_path)

# print(f"Prediction: {'Abnormal' if result == 1 else 'Normal'}, Confidence: {confidence:.2f}%")





# after vision transformer

import os
from tensorflow.keras.models import load_model
from preprocessing import preprocess_single_image
import numpy as np

# Suppress unnecessary logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Load the hybrid ensemble model
model_path = 'D:/final year projet/models/ensemble_model.h5'
model = load_model(model_path, compile=False)

def predict_image(image_path):
    """
    Predict whether the image is 'Normal' or 'Abnormal' using the hybrid ensemble model.
    """
    # Preprocess the image for both CNN-LSTM and Vision Transformer
    img_cnn, img_vit = preprocess_single_image(image_path)
    
    # Perform prediction
    prediction = model.predict([img_cnn, img_vit])  # Pass both inputs to the model
    predicted_class = np.argmax(prediction)  # Get class with highest probability
    confidence = prediction[0][predicted_class] * 100  # Confidence as percentage

    return predicted_class, confidence

# Example usage
if __name__ == "__main__":
    # Provide the image path
    image_path = 'D:/final year projet/data/train/normal/Normaltestdata_2.jpg'
    
    # Predict and print results
    result, confidence = predict_image(image_path)
    print(f"Prediction: {'Abnormal' if result == 1 else 'Normal'}, Confidence: {confidence:.2f}%")
