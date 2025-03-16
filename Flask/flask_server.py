from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load models
model = joblib.load(os.path.join("models", "diet_nutrient_model.pkl"))
disease_encoder = joblib.load(os.path.join("models", "disease_encoder.pkl"))
scaler = joblib.load(os.path.join("models", "scaler.pkl"))
feature_columns = joblib.load(os.path.join("models", "feature_columns.pkl"))

# Load food dataset
df_food = pd.read_csv(os.path.join("data", "diet_food.csv"))
df_food.drop_duplicates(inplace=True)


def generate_diet_plan(total_calories, total_protein, total_carbs, total_fat):
    meal_plan = {
        'Breakfast': [], 'Morning Snack': [], 'Lunch': [], 
        'Afternoon Snack': [], 'Snack': [], 'Evening Snack': [], 'Dinner': []
    }

    for _, row in df_food.iterrows():
        if (row['Calories_per_100g'] <= total_calories and
            row['Protein_per_100g'] <= total_protein and
            row['Carbs_per_100g'] <= total_carbs and
            row['Fat_per_100g'] <= total_fat):

            meal_time = row['Meal_Time']
            if meal_time in meal_plan and len(meal_plan[meal_time]) < 4:
                meal_plan[meal_time].append(f"{row['Food_Item']} ({row['Portion_Size']})")

    return meal_plan

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    disease_name = data.get("disease", "")

    if disease_name not in disease_encoder.classes_:
        return jsonify({"error": "Disease not found in training data"}), 400

    # Encode disease
    disease_encoded = disease_encoder.transform([disease_name])[0]

    # Prepare input
    input_array = np.zeros((1, len(feature_columns)))
    input_array[0, feature_columns.index('Chronic_Disease')] = disease_encoded
    input_scaled = scaler.transform(input_array)

    # Predict nutrient needs
    recommended_values = model.predict(input_scaled)[0]
    recommended_calories, recommended_protein, recommended_carbs, recommended_fat = map(float, recommended_values)

    # Get diet plan
    diet_plan = generate_diet_plan(recommended_calories, recommended_protein, recommended_carbs, recommended_fat)

    return jsonify({
        "calories": recommended_calories,
        "protein": recommended_protein,
        "carbs": recommended_carbs,
        "fat": recommended_fat,
        "meal_plan": diet_plan
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
