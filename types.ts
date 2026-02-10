
export enum DietType {
  VEGAN = 'Vegan',
  VEGETARIAN = 'Vegetarian',
  KETO = 'Keto/Low Carb',
  MEDITERRANEAN = 'Mediterranean',
  WESTERN = 'Western (High Processed)',
  BALANCED = 'Balanced/Whole Foods'
}

export enum StressLevel {
  LOW = 'Low (Zen)',
  MODERATE = 'Moderate (Manageable)',
  HIGH = 'High (Burnout Risk)',
  EXTREME = 'Extreme (Constant Tension)'
}

export enum IntakeLevel {
  NONE = 'None',
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
  EXCESSIVE = 'Excessive'
}

export interface UserHabits {
  age: number;
  gender: string;
  smokingFrequency: number;
  alcoholFrequency: number;
  sleepHours: number;
  stressLevel: StressLevel;
  dietType: DietType;
  exerciseHours: number;
  yogaMinutes: number;
  physicalInactivityHours: number;
  // New factors
  waterLiters: number;
  sugarIntake: IntakeLevel;
  screenTimeHours: number;
  socialHours: number;
}

export interface PredictionResult {
  estimatedLifespan: number;
  estimatedDeathDate: string;
  healthScore: number;
  keyFactors: {
    factor: string;
    impact: 'Positive' | 'Negative' | 'Neutral';
    description: string;
  }[];
  recommendations: string[];
  scientificInsights: string;
}
