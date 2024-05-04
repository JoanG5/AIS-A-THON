import numpy as np
import os
import sys
import tensorflow as tf
import pandas as pd

from tensorflow.keras.regularizers import l2
from sklearn.model_selection import train_test_split


FILENAME = "Healthcare-Diabetes.csv"
EPOCHS = 10
FEATURES = 8
TEST_SIZE = 0.4


def main():

    # Load data, split into features and target
    X, y = load_data(FILENAME)

    # Split data into training and testing sets
    x_train, x_test, y_train, y_test = train_test_split(
        X, y, 
        test_size=TEST_SIZE,
        shuffle=True
    )

    # Get a compiled neural network
    model = get_model()

    # Fit model on training data
    model.fit(x_train, y_train, epochs=EPOCHS)

    # Evaluate neural network performance
    model.evaluate(x_test, y_test, verbose=2)

    # Save model to file if filename specified
    if len(sys.argv) == 2:
        filename = sys.argv[1]
        model.save(filename)
        print(f"Model saved to {filename}.")


def load_data(data_dir):
    """
    Load data from CSV file.
    Split relevant data into features and target.
    """
    data = pd.read_csv(data_dir)
    data.drop("Id", axis=1, inplace=True) # Drop the ID column

    X = data.drop("Outcome", axis=1) # Features
    y = data["Outcome"] # Target
    return X, y


def get_model():
    """
    Returns a compiled convolutional neural network model. Assume that the
    `input_shape` of the first layer is `(FEATURES,)`.
    The output layer should have 2 units, one for each category.
    """
    # Create a convolutional neural network
    model = tf.keras.models.Sequential([
        tf.keras.layers.Input(shape=(FEATURES,)),
        tf.keras.layers.Dense(128, activation='relu', kernel_regularizer=l2(0.001)),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(64, activation='relu', kernel_regularizer=l2(0.001)),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(1, activation='sigmoid') # Output 1 or 0
    ])

    # Train neural network
    model.compile(
        optimizer="adam",
        loss="binary_crossentropy",
        metrics=["accuracy"]
    )

    return model

if __name__ == "__main__":
    main()
