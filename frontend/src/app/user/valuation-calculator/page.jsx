'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast'
import { Car, Calculator, TrendingUp, Clock, MapPin, Calendar, Gauge, Fuel } from 'lucide-react'

const ValuationCalculator = () => {
  const [isCalculating, setIsCalculating] = useState(false)
  const [valuation, setValuation] = useState(null)

  // Car brands and models data
  const carBrands = [
    'Toyota', 'Honda', 'Suzuki', 'Daihatsu', 'Nissan', 'Mitsubishi', 
    'Hyundai', 'Kia', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz',
    'Audi', 'Volkswagen', 'Skoda', 'MG', 'Haval', 'Changan', 'Other'
  ]

  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG']
  const transmissionTypes = ['Manual', 'Automatic', 'CVT']
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor']

  // Validation schema
  const validationSchema = Yup.object({
    brand: Yup.string().required('Brand is required'),
    model: Yup.string().required('Model is required'),
    year: Yup.number()
      .min(1990, 'Year must be 1990 or later')
      .max(new Date().getFullYear() + 1, 'Year cannot be in the future')
      .required('Year is required'),
    mileage: Yup.number()
      .min(0, 'Mileage cannot be negative')
      .max(1000000, 'Mileage seems too high')
      .required('Mileage is required'),
    fuelType: Yup.string().required('Fuel type is required'),
    transmission: Yup.string().required('Transmission is required'),
    condition: Yup.string().required('Condition is required'),
    engineCapacity: Yup.number()
      .min(0.5, 'Engine capacity must be at least 0.5L')
      .max(10, 'Engine capacity seems too high')
      .required('Engine capacity is required'),
    color: Yup.string().required('Color is required'),
    location: Yup.string().required('Location is required')
  })

  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      year: '',
      mileage: '',
      fuelType: '',
      transmission: '',
      condition: '',
      engineCapacity: '',
      color: '',
      location: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsCalculating(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Calculate valuation based on car details
      const calculatedValuation = calculateValuation(values)
      setValuation(calculatedValuation)
      setIsCalculating(false)
      
      toast.success('Valuation calculated successfully!')
    }
  })

  const calculateValuation = (carDetails) => {
    // Base values for different brands (in INR)
    const brandBaseValues = {
      'Toyota': 1200000,
      'Honda': 1100000,
      'Suzuki': 800000,
      'Daihatsu': 700000,
      'Nissan': 900000,
      'Mitsubishi': 850000,
      'Hyundai': 750000,
      'Kia': 800000,
      'Ford': 900000,
      'Chevrolet': 850000,
      'BMW': 2500000,
      'Mercedes-Benz': 2800000,
      'Audi': 2300000,
      'Volkswagen': 1400000,
      'Skoda': 1200000,
      'MG': 1100000,
      'Haval': 900000,
      'Changan': 800000,
      'Other': 900000
    }

    let baseValue = brandBaseValues[carDetails.brand] || 2000000

    // Year depreciation (newer cars worth more)
    const currentYear = new Date().getFullYear()
    const age = currentYear - carDetails.year
    const yearMultiplier = Math.max(0.3, 1 - (age * 0.08)) // 8% depreciation per year, minimum 30%
    baseValue *= yearMultiplier

    // Mileage adjustment
    const mileageMultiplier = Math.max(0.5, 1 - (carDetails.mileage / 200000) * 0.3)
    baseValue *= mileageMultiplier

    // Condition multiplier
    const conditionMultipliers = {
      'Excellent': 1.1,
      'Good': 1.0,
      'Fair': 0.8,
      'Poor': 0.6
    }
    baseValue *= conditionMultipliers[carDetails.condition]

    // Fuel type adjustment
    const fuelMultipliers = {
      'Petrol': 1.0,
      'Diesel': 1.05,
      'Hybrid': 1.15,
      'Electric': 1.2,
      'CNG': 0.9
    }
    baseValue *= fuelMultipliers[carDetails.fuelType]

    // Transmission adjustment
    const transmissionMultipliers = {
      'Manual': 0.95,
      'Automatic': 1.05,
      'CVT': 1.0
    }
    baseValue *= transmissionMultipliers[carDetails.transmission]

    // Engine capacity adjustment
    const engineMultiplier = Math.min(1.2, 0.8 + (carDetails.engineCapacity * 0.1))
    baseValue *= engineMultiplier

    // Location adjustment (major cities might have higher values)
    const locationMultiplier = carDetails.location.toLowerCase().includes('mumbai') || 
                              carDetails.location.toLowerCase().includes('delhi') || 
                              carDetails.location.toLowerCase().includes('bangalore') ||
                              carDetails.location.toLowerCase().includes('hyderabad') ||
                              carDetails.location.toLowerCase().includes('chennai') ||
                              carDetails.location.toLowerCase().includes('kolkata') ||
                              carDetails.location.toLowerCase().includes('pune') ||
                              carDetails.location.toLowerCase().includes('ahmedabad') ? 1.05 : 1.0
    baseValue *= locationMultiplier

    return {
      estimatedValue: Math.round(baseValue),
      breakdown: {
        baseValue: Math.round(brandBaseValues[carDetails.brand] || 2000000),
        yearAdjustment: Math.round((yearMultiplier - 1) * (brandBaseValues[carDetails.brand] || 2000000)),
        mileageAdjustment: Math.round((mileageMultiplier - 1) * baseValue / mileageMultiplier),
        conditionAdjustment: Math.round((conditionMultipliers[carDetails.condition] - 1) * baseValue / conditionMultipliers[carDetails.condition]),
        fuelAdjustment: Math.round((fuelMultipliers[carDetails.fuelType] - 1) * baseValue / fuelMultipliers[carDetails.fuelType]),
        transmissionAdjustment: Math.round((transmissionMultipliers[carDetails.transmission] - 1) * baseValue / transmissionMultipliers[carDetails.transmission])
      }
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Car Valuation Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get an instant and accurate valuation for your car. Our advanced algorithm considers multiple factors to provide you with the most reliable estimate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Car className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Enter Car Details</h2>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Brand and Model */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <select
                    name="brand"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.brand}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Brand</option>
                    {carBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  {formik.touched.brand && formik.errors.brand && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.brand}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    name="model"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.model}
                    placeholder="e.g., Corolla, Civic"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formik.touched.model && formik.errors.model && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.model}</p>
                  )}
                </div>
              </div>

              {/* Year and Mileage */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <input
                    type="number"
                    name="year"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.year}
                    placeholder="e.g., 2020"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formik.touched.year && formik.errors.year && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.year}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mileage (km) *
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mileage}
                    placeholder="e.g., 50000"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formik.touched.mileage && formik.errors.mileage && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.mileage}</p>
                  )}
                </div>
              </div>

              {/* Fuel Type and Transmission */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type *
                  </label>
                  <select
                    name="fuelType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fuelType}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {formik.touched.fuelType && formik.errors.fuelType && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.fuelType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission *
                  </label>
                  <select
                    name="transmission"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.transmission}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Transmission</option>
                    {transmissionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {formik.touched.transmission && formik.errors.transmission && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.transmission}</p>
                  )}
                </div>
              </div>

              {/* Condition and Engine Capacity */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition *
                  </label>
                  <select
                    name="condition"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.condition}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                  {formik.touched.condition && formik.errors.condition && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.condition}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Engine Capacity (L) *
                  </label>
                  <input
                    type="number"
                    name="engineCapacity"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.engineCapacity}
                    placeholder="e.g., 1.6"
                    step="0.1"
                    min="0.5"
                    max="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formik.touched.engineCapacity && formik.errors.engineCapacity && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.engineCapacity}</p>
                  )}
                </div>
              </div>

              {/* Color and Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color *
                  </label>
                  <input
                    type="text"
                    name="color"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.color}
                    placeholder="e.g., White, Black"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formik.touched.color && formik.errors.color && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.color}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formik.touched.location && formik.errors.location && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isCalculating || !formik.isValid}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Calculating Valuation...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Valuation
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Valuation Result</h2>
            </div>

            {valuation ? (
              <div className="space-y-6">
                {/* Main Valuation */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Estimated Market Value</h3>
                    <div className="text-4xl font-bold text-green-600">
                      {formatCurrency(valuation.estimatedValue)}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Based on current market conditions and your car specifications
                    </p>
                  </div>
                </div>

                {/* Valuation Breakdown */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Valuation Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Base Value</span>
                      <span className="font-medium">{formatCurrency(valuation.breakdown.baseValue)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Year Adjustment</span>
                      <span className={`font-medium ${valuation.breakdown.yearAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {valuation.breakdown.yearAdjustment >= 0 ? '+' : ''}{formatCurrency(valuation.breakdown.yearAdjustment)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Mileage Adjustment</span>
                      <span className={`font-medium ${valuation.breakdown.mileageAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {valuation.breakdown.mileageAdjustment >= 0 ? '+' : ''}{formatCurrency(valuation.breakdown.mileageAdjustment)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Condition Adjustment</span>
                      <span className={`font-medium ${valuation.breakdown.conditionAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {valuation.breakdown.conditionAdjustment >= 0 ? '+' : ''}{formatCurrency(valuation.breakdown.conditionAdjustment)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Fuel Type Adjustment</span>
                      <span className={`font-medium ${valuation.breakdown.fuelAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {valuation.breakdown.fuelAdjustment >= 0 ? '+' : ''}{formatCurrency(valuation.breakdown.fuelAdjustment)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Transmission Adjustment</span>
                      <span className={`font-medium ${valuation.breakdown.transmissionAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {valuation.breakdown.transmissionAdjustment >= 0 ? '+' : ''}{formatCurrency(valuation.breakdown.transmissionAdjustment)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-yellow-800 mb-1">Important Notice</h5>
                      <p className="text-sm text-yellow-700">
                        This is an estimated valuation based on market data. Actual sale price may vary depending on market conditions, 
                        buyer preferences, and specific vehicle condition. We recommend getting a professional inspection for the most accurate valuation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Valuation Yet</h3>
                <p className="text-gray-500">
                  Fill in your car details and click "Calculate Valuation" to get an instant estimate.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 hover:shadow-2xl">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Market-Based Pricing</h3>
            <p className="text-gray-600">
              Our algorithm uses real market data to provide accurate valuations based on current trends.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 hover:shadow-2xl">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Get your car valuation in seconds with our advanced calculation engine.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 hover:shadow-2xl">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Aware</h3>
            <p className="text-gray-600">
              Valuations consider regional market differences for more accurate estimates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValuationCalculator