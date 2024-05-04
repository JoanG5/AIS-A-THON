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
      <div className="flex justify-center items-center flex-col gap-20">
        <h1>
          <span className="text-4xl font-bold">About the classifier</span>
        </h1>
        <code className="whitespace-pre-wrap w-4/5">
          {`
            import tensorflow as tf

            def get_model(): 
            """ Returns a compiled neural network model.  """ 
            
            model = tf.keras.models.Sequential([
                tf.keras.layers.Input(shape=(FEATURES,)), # FEATURES is amount of input columns
                tf.keras.layers.Dense(128, activation='relu', kernel_regularizer=l2(0.001)), # 
                tf.keras.layers.BatchNormalization(), tf.keras.layers.Dropout(0.2),
                tf.keras.layers.Dense(64, activation='relu', kernel_regularizer=l2(0.001)), tf.keras.layers.BatchNormalization(),
                tf.keras.layers.Dropout(0.2), tf.keras.layers.Dense(1, activation='sigmoid') # Output 1 or 0 ]) 
            
                # Train neural network
                model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"] ) 
                return model`}
        </code>
      </div>
    </div>
  );
}
export default Classifier;
