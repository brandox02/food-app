import React from 'react';
import { MainStep } from './accesories/mainStep';
import { ExtrasStep } from './accesories/ExtrasStep';
import { useActions } from './useActions';
import { FormProvider } from '../../components/react-hook-form/FormProvider';
import { SummaryStep } from './accesories/summaryStep';

export const Menu = ({ menu, isPreview = false }) => {
  const { currentStep, setCurrentStep, stepOneItems, extraStepItems, methods, onAction, summaryPayload, setSummaryPayload, mock } = useActions({ menu })

  return (
    <div className="w-full flex flex-col gap-6">
      <FormProvider methods={methods} onSubmit={onAction}>
        {currentStep === 1 && <MainStep items={stepOneItems} />}
        {currentStep === 2 && <ExtrasStep goBack={() => setCurrentStep(1)} items={extraStepItems} typeId={mock.typeId} />}
        {currentStep === 3 && <SummaryStep isPreview={isPreview} goBack={() => setCurrentStep(2)} summaryPayload={summaryPayload} setSummaryPayload={setSummaryPayload} />}
      </FormProvider>
    </div>
  );
};

