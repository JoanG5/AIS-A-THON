import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Classifier() {
  return (
    <div>
      <Link to="/hub" className="mr-auto">
        <Button variant="ghost" className="m-5">
          &lt; Head to Hub
        </Button>
      </Link>
      <div className="flex justify-center items-center flex-col gap-14">
        <h1>
          <span className="text-4xl font-bold">About the classifier</span>
        </h1>
        <div className="text-center flex flex-col gap-2">
          <p>
            We trained a binary classifer using tensorflow using this{" "}
            <a
              href="https://www.kaggle.com/datasets/nanditapore/healthcare-diabetes?resource=download"
              className="text-blue-500"
            >
              DATASET
            </a>
          </p>
          <p>
            The dataset contains 2000 rows and 9 columns. We used the first 8
            columns as input features and the last column as the target variable.
          </p>
          <p>
            It has around <code className="text-red-500 bg-gray-100">75%</code>{" "}
            accuracy on the test set.
          </p>
        </div>
        <code className="whitespace-pre-wrap w-4/5 bg-gray-100 pb-7 rounded-lg">
          {`
            import tensorflow as tf

            def get_model(): 
            """ Returns a compiled neural network model.  """ 
            
                model = tf.keras.models.Sequential([
                    tf.keras.layers.Input(shape=(FEATURES,)), # FEATURES is amount of input columns
                    tf.keras.layers.Dense(128, activation='relu', kernel_regularizer=l2(0.001)), # First layer of neurons fully connected
                    tf.keras.layers.BatchNormalization(), # Normalize to prevent overfitting
                    tf.keras.layers.Dropout(0.2), # Randomly drop 20% of neurons to prevent overfitting
                    tf.keras.layers.Dense(64, activation='relu', kernel_regularizer=l2(0.001)), # Second layer of neurons
                    tf.keras.layers.BatchNormalization(), 
                    tf.keras.layers.Dropout(0.2), 
                    tf.keras.layers.Dense(1, activation='sigmoid') # Output 1 or 0 
                ]) 
            
                # Train neural network
                model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"] ) 
                return model`}
        </code>
      </div>
    </div>
  );
}
export default Classifier;
