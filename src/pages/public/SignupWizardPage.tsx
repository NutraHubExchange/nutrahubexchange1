import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { CheckCircle, Upload } from 'lucide-react';

const SignupWizardPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyDescription: '',
    location: '',
    categories: [] as string[],
    certifications: [] as File[],
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      window.location.hash = '/dashboard';
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Supplier Profile</CardTitle>
            <CardDescription>
              Let's set up your account to start receiving RFQs
            </CardDescription>
            <Progress value={progress} className="mt-4" />
            <p className="text-sm text-gray-600 mt-2">Step {step} of {totalSteps}</p>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <h3>Company Information</h3>
                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Tell buyers about your company, capabilities, and experience..."
                    value={formData.companyDescription}
                    onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Primary Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State/Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3>Product Categories</h3>
                <p className="text-sm text-gray-600">
                  Select the categories that match your product offerings
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['Herbal Extracts', 'Marine Extracts', 'Probiotics', 'Vitamins', 'Minerals', 'Amino Acids', 'Enzymes', 'Organic Ingredients'].map((category) => (
                    <label key={category} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, categories: [...formData.categories, category] });
                          } else {
                            setFormData({ ...formData, categories: formData.categories.filter(c => c !== category) });
                          }
                        }}
                        className="rounded"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3>Upload Certifications</h3>
                <p className="text-sm text-gray-600">
                  Upload your certifications now or skip and add them later from your profile
                </p>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="mb-2">Drag and drop certification documents</p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <Button variant="outline">Browse Files</Button>
                  <p className="text-xs text-gray-500 mt-4">
                    Accepted formats: PDF, JPG, PNG (Max 10MB each)
                  </p>
                </div>
                {formData.certifications.length > 0 && (
                  <div className="space-y-2">
                    {formData.certifications.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}
              <div className="flex-1" />
              <Button onClick={handleNext}>
                {step === totalSteps ? 'Complete Setup' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SignupWizardPage;
