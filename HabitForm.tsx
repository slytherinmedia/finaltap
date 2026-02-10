
import React from 'react';
import { UserHabits, DietType, StressLevel, IntakeLevel } from '../types';

interface HabitFormProps {
  onSubmit: (habits: UserHabits) => void;
  isLoading: boolean;
}

const HabitForm: React.FC<HabitFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<UserHabits>({
    age: 25,
    gender: 'Other',
    smokingFrequency: 0,
    alcoholFrequency: 0,
    sleepHours: 7,
    stressLevel: StressLevel.MODERATE,
    dietType: DietType.BALANCED,
    exerciseHours: 3,
    yogaMinutes: 0,
    physicalInactivityHours: 8,
    waterLiters: 2,
    sugarIntake: IntakeLevel.MODERATE,
    screenTimeHours: 6,
    socialHours: 10
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "w-full bg-black/60 border border-red-900 rounded-lg p-3 text-red-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all shadow-inner";
  const labelClass = "block text-xs font-hell text-red-500 mb-1 uppercase tracking-[0.2em]";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Vessel Basics */}
        <div className="space-y-4 p-6 bg-black/40 border border-red-900/30 rounded-2xl">
          <h3 className="text-red-600 font-hell border-b border-red-900/20 pb-2 mb-4">The Vessel</h3>
          <div>
            <label className={labelClass}>Current Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Gender Identity</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Mortal Sins */}
        <div className="space-y-4 p-6 bg-black/40 border border-red-900/30 rounded-2xl">
          <h3 className="text-orange-600 font-hell border-b border-orange-900/20 pb-2 mb-4">Mortal Sins</h3>
          <div>
            <label className={labelClass}>Smoke (Cigs/Day)</label>
            <input type="number" name="smokingFrequency" value={formData.smokingFrequency} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Alcohol (Drinks/Wk)</label>
            <input type="number" name="alcoholFrequency" value={formData.alcoholFrequency} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sugar Gluttony</label>
            <select name="sugarIntake" value={formData.sugarIntake} onChange={handleChange} className={inputClass}>
              {Object.values(IntakeLevel).map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
        </div>

        {/* Soul Maintenance */}
        <div className="space-y-4 p-6 bg-black/40 border border-red-900/30 rounded-2xl">
          <h3 className="text-emerald-600 font-hell border-b border-emerald-900/20 pb-2 mb-4">Soul Maintenance</h3>
          <div>
            <label className={labelClass}>Water Hydration (L/Day)</label>
            <input type="number" step="0.1" name="waterLiters" value={formData.waterLiters} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Exercise (Hrs/Wk)</label>
            <input type="number" name="exerciseHours" value={formData.exerciseHours} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Social Connection (Hrs/Wk)</label>
            <input type="number" name="socialHours" value={formData.socialHours} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* Drainers */}
        <div className="space-y-4 p-6 bg-black/40 border border-red-900/30 rounded-2xl">
          <h3 className="text-purple-600 font-hell border-b border-purple-900/20 pb-2 mb-4">Life Drainers</h3>
          <div>
            <label className={labelClass}>Digital Trance (Screen Hrs/Day)</label>
            <input type="number" name="screenTimeHours" value={formData.screenTimeHours} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sedentary Rot (Daily Hrs)</label>
            <input type="number" name="physicalInactivityHours" value={formData.physicalInactivityHours} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sleep (Hrs/Night)</label>
            <input type="number" step="0.5" name="sleepHours" value={formData.sleepHours} onChange={handleChange} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-black/40 border border-red-900/30 rounded-2xl">
          <label className={labelClass}>Existential Dread (Stress)</label>
          <select name="stressLevel" value={formData.stressLevel} onChange={handleChange} className={inputClass}>
            {Object.values(StressLevel).map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>
        <div className="p-6 bg-black/40 border border-red-900/30 rounded-2xl">
          <label className={labelClass}>Sustenance Archetype (Diet)</label>
          <select name="dietType" value={formData.dietType} onChange={handleChange} className={inputClass}>
            {Object.values(DietType).map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-6 rounded-2xl text-xl font-hell transition-all transform hover:scale-[1.01] flex items-center justify-center gap-4 relative overflow-hidden group ${
          isLoading 
            ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800' 
            : 'bg-gradient-to-r from-red-800 via-orange-700 to-red-900 hover:from-red-700 hover:to-orange-600 text-white shadow-[0_0_30px_rgba(153,27,27,0.4)] border-t border-red-500/30'
        }`}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner animate-spin"></i>
            CONSULTING THE LEDGER...
          </>
        ) : (
          <>
            <i className="fas fa-gavel"></i>
            REVEAL THE FINAL TAP
          </>
        )}
      </button>
    </form>
  );
};

export default HabitForm;
